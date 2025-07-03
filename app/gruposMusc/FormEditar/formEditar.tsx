import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from "../FormAdicionar/style";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { colors } from '../../../constants/colors';
import { Input } from '../../../components/input/inputNormal';
import { Select } from '../../../components/input/select';
import { Header } from '../../../components/header/header';
import { router, useLocalSearchParams } from 'expo-router';
import { TreinoFormData, treinoSchema } from '~/schemas/trainMuscleSchema';
import { deleteTreinoById, getTreinoyId, updateTreinoById } from '~/services/trainsService';
import { ExercicieOptionsImages } from '~/constants/exerciseOptions';

export default function FormEditar() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [notify, setNotify] = useState(false);
  const { control, handleSubmit, reset, formState: { errors } } = useForm<TreinoFormData>({
    resolver: zodResolver(treinoSchema),
    defaultValues: {
      parte: '',
      exercicios: [{ nome: '', series: '', carga: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercicios"
  });

  useEffect(() => {
    if (!id) {
      setIsFetching(false);
      return;
    }

    const fetchPlano = async () => {
      try {
        const planoId = Array.isArray(id) ? id[0] : id;
        const planoData = await getTreinoyId(planoId);

        if (planoData) {
          reset(planoData);
          setNotify(planoData.notify || false);
          if (planoData.imagemUrl) {
            setSelectedImage(planoData.imagemUrl);
          }
        } else {
          Alert.alert('Plano não encontrado');
          router.back();
        }
      } catch (error) {
        console.error('Erro ao buscar plano:', error);
        Alert.alert('Erro ao carregar o plano.');
        router.back();
      } finally {
        setIsFetching(false);
      }
    };

    fetchPlano();
  }, [id, reset, router]);

  const handleUpdateTreino = async (data: TreinoFormData) => {
    if (!id) return;

    setIsLoading(true);

    try {
      const dataToUpdate = {
        ...data,
        imagemUrl: selectedImage,
      };

      await updateTreinoById(id, dataToUpdate, notify);
      Alert.alert("Sucesso", "Treino atualizado!");
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível atualizar o treino.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTreino = () => {
    if (!id) return;

    Alert.alert(
      "Excluir Treino",
      "Você tem certeza que deseja excluir este treino?",
      [
        { text: "Cancelar", style: 'cancel' },
        {
          text: "Excluir",
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true);
            try {
              await deleteTreinoById(id);
              Alert.alert("Sucesso", "Treino excluído.");
              router.back();
            } catch (error) {
              console.error(error);
              Alert.alert("Erro", "Não foi possível excluir o treino.");
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  if (isFetching) {
    return <ActivityIndicator size="large" color={colors.vermEscuro} style={{ flex: 1 }} />
  }

  return (
    <ScrollView style={styles.container}>
      <Header title='Editar Treino' text='Ajuste ou remova seu treino' />
      <View style={styles.formContainer}>
        { }
        <Text style={styles.label}>Músculo:</Text>
        <Select
          control={control}
          name="parte"
          error={errors.parte?.message}
          options={ExercicieOptionsImages}
          onSelectExtraData={(selectedItem) => {
            setSelectedImage(selectedItem.image ?? null);
          }}
        />


        {fields.map((field, index) => (
          <View key={field.id} style={{ marginBottom: 16 }}>
            <View style={styles.row}>
              <View style={styles.inputHalf}>
                <Text style={styles.label}>Exercício {index + 1}:</Text>
                <Input
                  name={`exercicios.${index}.nome`}
                  control={control}
                  placeholder="Ex: Supino Reto"
                  error={errors.exercicios?.[index]?.nome?.message}
                  keyboardType="default"
                />
              </View>

              <View style={styles.inputHalf}>
                <Text style={styles.label}>Séries:</Text>
                <Input
                  name={`exercicios.${index}.series`}
                  control={control}
                  placeholder="Ex: 4x10"
                  error={errors.exercicios?.[index]?.series?.message}
                  keyboardType="default"
                />
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={styles.optionalLabel}>Carga (opcional):</Text>
              <Input
                name={`exercicios.${index}.carga`}
                control={control}
                placeholder="Ex: 10 kg"
                keyboardType="default"
              />
            </View>

            {index > 0 && (
              <TouchableOpacity onPress={() => remove(index)} style={styles.removeIcon}>
                <Feather name="x-circle" size={20} color={colors.vermEscuro} />
              </TouchableOpacity>
            )}
          </View>
        ))}



        <TouchableOpacity style={styles.buttonAdicionar} onPress={() => append({ nome: '', series: '' })}>
          <Text style={styles.adicionarButton}>Adicionar Exercício</Text>
          <Feather name="plus-circle" size={20} color="#3D0000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonAdicionar, fields.length <= 1 && styles.buttonDisabled]}
          onPress={() => remove(fields.length - 1)}
          disabled={fields.length <= 1}
        >
          <Text>REMOVER ÚLTIMO EXERCÍCIO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonAdicionar} onPress={handleDeleteTreino} disabled={isLoading}>
          <Text >DELETAR TREINO</Text>
        </TouchableOpacity>

        { }
        <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit(handleUpdateTreino)} disabled={isLoading}>

          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>SALVAR ALTERAÇÕES</Text>}
        </TouchableOpacity>


      </View>
    </ScrollView >

  );
}