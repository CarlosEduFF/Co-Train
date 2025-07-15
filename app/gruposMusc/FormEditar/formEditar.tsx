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
import CustomModalSucesso from '~/components/modal/modalSucesso';
import Modal from '~/components/modal/modalAlert'
import ModalDelete from '~/components/modal/ModalDelete'

export default function FormEditar() {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [treinoIdToDelete, setTreinoIdToDelete] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal]= useState(false);
  const [errorMessage,setErrorMessage] = useState('');
  const [showSucessoModal, setShowSucessoModal]= useState(false);
  const [SucessoMessage,setSucessoMessage] = useState('');
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
           setErrorMessage('Plano não encontrado')
           setShowErrorModal(true)
         
        }
      } catch (error) {
        console.error('Erro ao buscar plano:', error);
        
           setErrorMessage('Erro ao carregar o plano.')
           setShowErrorModal(true)
        
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
       setSucessoMessage('Treino atualizado com sucesso!');
       setShowSucessoModal(true);
    } catch (error) {
      console.error(error);
       setErrorMessage('Erro ao atualizar treino.');
       setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTreino = () => {
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!id) return;
    setDeleteModalVisible(false);
    setIsLoading(true);
    try {
      await deleteTreinoById(id);
      setSucessoMessage('Treino excluído com sucesso!');
      setShowSucessoModal(true);
    } catch (error) {
      console.error(error);
      setErrorMessage('Erro ao excluir treino.');
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
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
              <Text style={styles.optionalLabel}>Carga:</Text>
              <Input
                name={`exercicios.${index}.carga`}
                control={control}
                placeholder="Ex: 10 kg"
                error={errors.exercicios?.[index]?.carga?.message}
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



        <TouchableOpacity style={styles.buttonAdicionar} onPress={() => append({ nome: '', series: '', carga: '' })}>
          <Text style={styles.adicionarButton}>Adicionar Exercício</Text>
          <Feather name="plus-circle" size={20} color="#3D0000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonAdicionar, fields.length <= 1 && styles.buttonDisabled]}
          onPress={() => remove(fields.length - 1)}
          disabled={fields.length <= 1}
        >
          <Text>Remover Último Exercício</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonAdicionar} onPress={handleDeleteTreino} disabled={isLoading}>
          <Text >Deletar Treino</Text>
        </TouchableOpacity>

        { }
        <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit(handleUpdateTreino)} disabled={isLoading}>

          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>SALVAR ALTERAÇÕES</Text>}
        </TouchableOpacity>

      <Modal
        visible={showErrorModal}
        title='Erro'
        message={errorMessage}
          onClose={() => {
          setShowErrorModal(false);
           router.back(); 
          }}
      />
      <CustomModalSucesso
        visible={showSucessoModal}
        title='Sucesso'
        message={SucessoMessage}
          onClose={() => {
          setShowSucessoModal(false);
           router.back(); 
          }}
      />
      <ModalDelete
        visible={deleteModalVisible}
        title="Remover Treino"
        message="Deseja remover este treino do planejamento semanal?"
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={confirmDelete}
       />
      </View>
    </ScrollView >

  );
}