import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from "../FormEditar/style";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray, SubmitHandler, Controller } from 'react-hook-form';
import { colors } from '../../../constants/colors';
import { Input } from '../../../components/input/inputNormal';
import { Select } from '../../../components/input/select';
import { Header } from '../../../components/header/header';
import { router, useLocalSearchParams } from 'expo-router';
import { treinoSchema } from '~/schemas/trainMuscleSchema';
import { ExercicieOptionsImages } from '~/constants/exerciseOptions';
import CustomModalSucesso from '~/components/modal/modalSucesso';
import Modal from '~/components/modal/modalAlert';
import ModalDelete from '~/components/modal/ModalDelete';
import { getTrainById, updateTrainById } from '~/services/Train';
import { Treino } from '~/types/train';
import ExercisesFields from '~/components/ExercisesFields/exerciseField';
import { pickImage } from '~/utils/handleMediaManeger';
import {useTranslation} from "react-i18next";

export default function FormEditar() {
  const {t} = useTranslation();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [treinoIdToDelete, setTreinoIdToDelete] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSucessoModal, setShowSucessoModal] = useState(false);
  const [SucessoMessage, setSucessoMessage] = useState('');
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // selectedImage será a imagem do grupo (ou imagem atual do plano)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // modo da UI (musculo | plano) — será ajustado ao carregar os dados
  const [mode, setMode] = useState<'musculo' | 'plano'>('musculo');

  // form
  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<Treino>({
    resolver: zodResolver(treinoSchema) as any,
    defaultValues: {
      id: '',
      modo: 'grupo',
      parte: '',
      planoTitulo: '',
      planoImagem: '',
      exercicios: [{ nome: '', series: '', carga: '' }],
      diasDaSemana: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercicios",
  });

  // helper: transforma qualquer valor em string-uri segura ou null
  const safeImageUri = (value: unknown): string | null => {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null && 'uri' in (value as any) && typeof (value as any).uri === 'string') {
      return (value as any).uri;
    }
    return String(value);
  };

  // watch do campo planoImagem do form
  const watchedPlanoImagem = watch('planoImagem');

  useEffect(() => {
    if (!id) {
      setIsFetching(false);
      return;
    }

    const fetchPlano = async () => {
      try {
        const planoId = Array.isArray(id) ? id[0] : id;
        const planoData = await getTrainById(planoId);

        if (planoData) {
          // popula o form com os dados do servidor
          reset(planoData);

          // ajusta modo da UI com base no campo salvo (assume 'modo' no Treino seja 'grupo'|'plano')
          if (planoData.modo === 'plano') {
            setMode('plano');
          } else {
            setMode('musculo');
          }

          // inicializa selectedImage para preview:
          // - se houver planoImagem salvo (string URL), usa ela
          // - senão, se for modo 'grupo' e parte corresponder a uma opção com imagem, usa essa imagem
          const imgFromPlano = safeImageUri(planoData.planoImagem);
          if (imgFromPlano) {
            setSelectedImage(imgFromPlano);
          } else if (planoData.modo === 'grupo' && planoData.parte) {
            const opt = ExercicieOptionsImages.find(o => String(o.value) === String(planoData.parte) || o.label === planoData.parte);
            if (opt?.image) {
              setSelectedImage(safeImageUri(opt.image));
            } else {
              setSelectedImage(null);
            }
          } else {
            setSelectedImage(null);
          }

          // se houver diasDaSemana, garantir que estejam no form (lowercase)
          if (planoData.diasDaSemana) {
            setValue('diasDaSemana', planoData.diasDaSemana.map(d => String(d).toLowerCase()));
          }
        } else {
          setErrorMessage(t("errors.notFound"));
          setShowErrorModal(true);
        }
      } catch (error) {
        console.error('Erro ao buscar plano:', error);
        setErrorMessage(t("errors.loadError"));
        setShowErrorModal(true);
      } finally {
        setIsFetching(false);
      }
    };

    fetchPlano();
  }, [id, reset, setValue]);

  const handlePickPlanoImage = async (onChange?: (v: string | null) => void) => {
    try {
      const imageUri = await pickImage(); // pickImage deve retornar string | null
      if (imageUri) {
        onChange?.(imageUri);
        setSelectedImage(imageUri);
      }
    } catch (err) {
      console.error('Erro ao selecionar imagem:', err);
    }
  };

  const handleUpdateTreino: SubmitHandler<Treino> = async (data) => {
    const planoId = Array.isArray(id) ? id[0] : id;
    if (!planoId) return;

    setIsLoading(true);

    // converte o mode da UI para o que o service espera
    const modo: 'grupo' | 'plano' = mode === 'musculo' ? 'grupo' : 'plano';

    // validação extra para grupo (mesma lógica usada no save)
    if (modo === 'grupo' && !selectedImage && !(data.planoImagem && String(data.planoImagem).trim())) {
      setIsLoading(false);
      setErrorMessage(t("errors.errorValidImage"));
      setShowErrorModal(true);
      return;
    }

    try {
      // normaliza o payload no formato do Treino (sem sobrescrever id)
      const payload: Partial<Treino> = {
        ...data,
        modo,
        parte: modo === 'grupo' ? data.parte ?? '' : data.parte ?? '',
        planoTitulo: data.planoTitulo ?? '',
        exercicios: (data.exercicios ?? []).map((e) => ({
          nome: e.nome ?? '',
          series: e.series ?? '',
          carga: e.carga ?? '',
        })),
        diasDaSemana: (data.diasDaSemana ?? []).map((d) => String(d).toLowerCase()),
        // prioriza valor do form (string) ou undefined
        planoImagem: data.planoImagem ? String(data.planoImagem) : undefined,
      };

      // se tiver selectedImage (por exemplo, imagem de grupo escolhida), envie também
      const payloadToSend: any = { ...payload };
      if (selectedImage) payloadToSend.imagemUrl = selectedImage;

      // chamada ao serviço (ajuste assinatura se necessário)
      await updateTrainById(planoId, payloadToSend, selectedImage ?? null);

      setSucessoMessage(t("success.updateTrain"));
      setShowSucessoModal(true);
      // opcional: navegar de volta
      // router.back();
    } catch (error) {
      console.error('Erro ao atualizar treino:', error);
      setErrorMessage(t("error.errorUpdate"));
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <ActivityIndicator size="large" color={colors.vermEscuro} style={{ flex: 1 }} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Header title={t("header.grupsMuscTitleEdit")} text={t("header.grupsMuscTextEdit")} />

      {/* Seletor de modo igual ao Add */}
      <View style={{ 
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#ccc',
          borderRadius: 20,
          marginStart:3,
          marginEnd:3,
          padding:3
           }}>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'musculo' && styles.modeButtonActive ]}
          onPress={() => setMode('musculo')}
        >
          <Text style={{ color: mode === 'musculo' ? '#fff' : '#8d8d8dff' }}>{t("grupsMusc.forGrup")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'plano' && styles.modeButtonActive]}
          onPress={() => setMode('plano')}
        >
          <Text style={{ color: mode === 'plano' ? '#fff' : '#8d8d8dff' }}>{t("grupsMusc.forTrain")}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        {mode === 'musculo' && (
          <>
            <Text style={styles.label}>{t("grupsMusc.musc")}</Text>
            <Controller
              control={control}
              name="parte"
              render={({ field: { value, onChange } }) => (
                <Select
                  control={control}
                  name="parte"
                  placeholder="Selecione o grupo muscular"
                  error={errors.parte?.message}
                  options={ExercicieOptionsImages}
                  onSelectExtraData={(selectedItem) => {
                    // atualiza imagem do grupo para preview
                    const img = safeImageUri((selectedItem as any).image) ?? null;
                    setSelectedImage(img);
                    onChange(selectedItem.value ?? selectedItem.label ?? value);
                  }}
                />
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

        {mode === 'plano' && (
          <>
            <Text style={styles.label}>{t("grupsMusc.titlePlanning")}</Text>
            <Controller
              control={control}
              name="planoTitulo"
              render={({ field }) => (
                <Input
                  control={control} keyboardType={'twitter'} {...field}
                  placeholder="Digite o título do plano"
                  error={errors.planoTitulo?.message} />
              )}
            />

            <Text style={styles.label}>{t("grupsMusc.ImagPlanning")}</Text>
            <Controller
              control={control}
              name="planoImagem"
              render={({ field: { value, onChange } }) => {
                // prioriza: campo do form -> selectedImage (estado) -> null
                const imageUri = safeImageUri(value) ?? selectedImage;
                return (
                  <TouchableOpacity
                    style={styles.imageUpload}
                    onPress={async () => {
                      await handlePickPlanoImage(onChange);
                    }}
                  >
                    {imageUri ? (
                      <Image
                        source={{ uri: imageUri }}
                        style={styles.imagePreview}
                        resizeMode="contain"
                      />
                    ) : (
                      <Text>{t("grupsMusc.selectImag")}</Text>
                    )}
                  </TouchableOpacity>
                );
              }}
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


        <TouchableOpacity
          style={styles.buttonSave}
          onPress={handleSubmit(handleUpdateTreino)}
          disabled={isLoading}
        >
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{t("buttons.saveAlter")}</Text>}
        </TouchableOpacity>

        <Modal
          visible={showErrorModal}
          title={t("common.error")}
          message={errorMessage}
          onClose={() => {
            setShowErrorModal(false);
          }}
        />
        <CustomModalSucesso
          visible={showSucessoModal}
          title={t("common.success")}
          message={SucessoMessage}
          onClose={() => {
            setShowSucessoModal(false);
            router.replace("/gruposMusc");
          }}

        />
      </View>
    </ScrollView>
  );
}
