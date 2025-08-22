import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image, ImageSourcePropType } from 'react-native';
import styles from "./style";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray, SubmitHandler, Resolver, Controller } from 'react-hook-form'; // <- Resolver importado
import { Input } from '../../../components/input/inputNormal';
import { Select } from '../../../components/input/select';
import { Header } from '../../../components/header/header';
import { router } from 'expo-router';
import { ExercicieOptionsImages } from '~/constants/exerciseOptions';
import { treinoSchema } from '~/schemas/trainMuscleSchema';
import CustomModalSucesso from '~/components/modal/modalSucesso';
import Modal from '~/components/modal/modalAlert'
import { Treino } from '~/types/train'; // assume que isso é `z.infer<typeof treinoSchema>`
import { pickImage } from '~/utils/handleMediaManeger';
import { images } from '~/constants/images';
import * as Animatable from "react-native-animatable";
import ExercisesFields from '~/components/ExercisesFields/exerciseField';
import { saveTrain } from '~/services/Train';

export default function FormAdicionar() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSucessoModal, setShowSucessoModal] = useState(false);
  const [SucessoMessage, setSucessoMessage] = useState('');
  const [mode, setMode] = useState<'musculo' | 'plano'>('musculo');
  const [logoUri, setLogoUri] = useState(images.logo);

  // <-- aqui aplicamos o cast no resolver para satisfazer o TS
  const { control, handleSubmit, formState: { errors } } = useForm<Treino>({
    resolver: zodResolver(treinoSchema) as unknown as Resolver<Treino, any>,
    defaultValues: treinoSchema.parse({}), // garante valores padrão (saída do zod)
  });

  // useFieldArray
  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercicios"
  });

  const handleSaveTreino: SubmitHandler<Treino> = async (data) => {
    setIsLoading(true);

    // converte o mode da UI para o que o service espera
    const modo: 'grupo' | 'plano' = mode === 'musculo' ? 'grupo' : 'plano';

    // validação extra para grupo
    if (modo === 'plano' && !selectedImage) {
      setIsLoading(false);
      setErrorMessage('Imagem do grupo muscular não selecionada. Por favor, selecione o músculo novamente.');
      setShowErrorModal(true);
      return;
    }

    try {
      // normaliza o payload no formato do TreinoFormData
      const payload: Treino = {
        ...data,
        modo,
        parte: modo === 'grupo' ? data.parte ?? '' : '',         // só usado em grupo
        planoTitulo: data.planoTitulo, // só usado em plano
        exercicios: (data.exercicios ?? []).map((e) => ({
          nome: e.nome ?? '',
          series: e.series ?? '',
          carga: e.carga ?? '',
        })),
        diasDaSemana: (data.diasDaSemana ?? []).map((d) => d.toLowerCase()),
        planoImagem: String(data.planoImagem) ?? '', // caso exista no form
      };

      await saveTrain(
        payload,
        selectedImage ?? null,
        () => {
          setSucessoMessage(
            modo === 'grupo' ? 'Treino por grupo muscular salvo!' : 'Plano de treino salvo!'
          );
          setShowSucessoModal(true);
          router.push('/gruposMusc'); // ou ajuste a rota para planos
        },
        (error) => {
          console.error('Erro ao salvar treino:', error);
          setErrorMessage('Não foi possível salvar o treino.');
          setShowErrorModal(true);
        }
      );
    } catch (error) {
      console.error('Erro inesperado ao salvar treino:', error);
      setErrorMessage('Ocorreu um erro inesperado.');
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };


  const handlePickImage = async () => {
    const image = await pickImage();
    if (image) {
      setLogoUri(image);
    }
  };



  return (
    <ScrollView style={styles.container}>
      <Header title="Adicionar Novo Treino" text="Preencha os dados abaixo" />

      {/* Seletor de modo */}
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'musculo' && styles.modeButtonActive]}
          onPress={() => setMode('musculo')}
        >
          <Text style={styles.modeText}>Por Grupo Muscular</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'plano' && styles.modeButtonActive]}
          onPress={() => setMode('plano')}
        >
          <Text style={styles.modeText}>Por Plano de Treino</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        {mode === 'musculo' && (
          <>
            <Text style={styles.label}>Músculo:</Text>
            <Select
              control={control}
              name="parte"
              placeholder="Selecione o grupo muscular"
              error={errors.parte?.message}
              options={ExercicieOptionsImages}
              onSelectExtraData={(selectedItem) => setSelectedImage(selectedItem.image ?? null)}
            />

            <ExercisesFields
              fields={fields}
              control={control}
              errors={errors}
              append={append}
              remove={remove}
              styles={styles}
              minItems={1}
            />
          </>
        )}

        {mode === 'plano' && (
          <>
            <Text style={styles.label}>Título do Plano:</Text>
            <Input
              name="planoTitulo"                       // atenção ao nome do campo no schema
              control={control}
              placeholder="Digite o título do plano"
              error={errors.planoTitulo?.message}
              keyboardType={'default'}
            />

            <Text style={styles.label}>Imagem do Plano:</Text>
            <Controller
              control={control}
              name="planoImagem"
              render={({ field: { value, onChange } }) => (
                <TouchableOpacity
                  style={styles.imageUpload}
                  onPress={async () => {
                    const imageUri = await pickImage();
                    if (imageUri) {
                      onChange(imageUri); // sempre string
                    }
                  }}
                >
                  {value ? (
                    <Image
                      source={{ uri: value }} // agora value é sempre string
                      style={styles.imagePreview}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text>Selecionar imagem</Text>
                  )}
                </TouchableOpacity>
              )}
            />



            <ExercisesFields
              fields={fields}
              control={control}
              errors={errors}
              append={append}
              remove={remove}
              styles={styles}
              minItems={1}
            />
          </>
        )}

        <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit(handleSaveTreino)} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Salvar</Text>}
        </TouchableOpacity>
      </View>

      <Modal
        visible={showErrorModal}
        title="Erro"
        message={errorMessage}
        onClose={() => setShowErrorModal(false)}
      />

      <CustomModalSucesso
        visible={showSucessoModal}
        title="Sucesso"
        message={SucessoMessage}
        onClose={() => {
          setShowSucessoModal(false);
          router.replace("/gruposMusc");
        }}

      />
    </ScrollView>
  );
}
