import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from "./styles"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { colors } from '../../../constants/colors';
import { Input } from '../../../components/input/inputNormal';
import { Select } from '../../../components/input/select';
import { Header } from '../../../components/header/header';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { routes } from '~/constants/routes';
import { useAuth } from '~/components/AuthContext';
import { TreinoFormData, treinoSchema } from '~/schemas/trainMuscleSchema';
import CustomModalSucesso from '~/components/modal/modalSucesso';
import Modal from '~/components/modal/modalAlert'
import { getTrainById, updateTrainById } from '~/services/Train';
import { Treino } from '~/types/train';

export default function FormEditar() {
  const { id } = useLocalSearchParams();

  const { user, loading } = useAuth();
  const router = useRouter();
  const [notify, setNotify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSucessoModal, setShowSucessoModal] = useState(false);
  const [SucessoMessage, setSucessoMessage] = useState('');

  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm<TreinoFormData>({
    resolver: zodResolver(treinoSchema) as any, // forçar compatibilidade
    defaultValues: treinoSchema.parse({})
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercicios"
  });

  useEffect(() => {
    console.log('Auth state:', { loading, user });
    if (!loading && !user) {
      router.replace(routes.login);
    }
  }, [loading, user]);

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
          reset(planoData);
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


  if (isFetching) {
    return <ActivityIndicator size="large" color={colors.vermEscuro} style={{ flex: 1 }} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Header title="Planejamento Semanal" text="Visualize seus treinos" />


        <View style={styles.trainCard}>
          <Text style={styles.trainMuscle}>
            {watch("parte") || watch("planoTitulo") || "Músculo não informado"}
          </Text>
          <Text style={styles.trainTitle}>Treinamento Semanal</Text>


          <View style={styles.infoRow}>
            <View style={styles.onlineTag}>
              <Feather name="zap" size={14} color="green" />
              <Text style={styles.onlineText}>Ativo</Text>
            </View>
          </View>


          {fields.map((field, index) => (
            <View key={field.id} style={styles.exerciseCard}>
              <View style={styles.exerciseHeader}>
                <Feather name="check-circle" size={18} color={colors.vermEscuro} />
                <Text style={styles.exerciseTitle}>
                  Exercício {index + 1}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Feather name="edit-3" size={16} color="#555" />
                <Text style={styles.label}>Nome:</Text>
                <Text style={styles.valueText}>
                  {watch(`exercicios.${index}.nome`) || "Não informado"}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Feather name="list" size={16} color="#555" />
                <Text style={styles.label}>Séries:</Text>
                <Text style={styles.valueText}>
                  {watch(`exercicios.${index}.series`) || "Não informado"}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Feather name="bar-chart-2" size={16} color="#555" />
                <Text style={styles.optionalLabel}>Carga:</Text>
                <Text style={styles.valueText}>
                  {watch(`exercicios.${index}.carga`) || "Não informada"}
                </Text>
              </View>
            </View>
          ))}

          <Modal
            visible={showErrorModal}
            title="Erro"
            message={errorMessage}
            onClose={() => {
              setShowErrorModal(false);
              router.back();
            }}
          />

          <CustomModalSucesso
            visible={showSucessoModal}
            title="Sucesso"
            message={SucessoMessage}
            onClose={() => {
              setShowSucessoModal(false);
              router.back();
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}