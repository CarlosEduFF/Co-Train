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
import { ExercicieOptionsImages } from '~/constants/exerciseOptions';
import { TreinoFormData, treinoSchema } from '~/schemas/trainMuscleSchema';
import { getTreinoyId, updateTreinoById } from '~/services/trainsService';
import CustomModalSucesso from '~/components/modal/modalSucesso';
import Modal from '~/components/modal/modalAlert'

export default function FormEditar() {
  const { id } = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const router = useRouter();
  const [notify, setNotify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSucessoModal, setShowSucessoModal] = useState(false);
  const [SucessoMessage, setSucessoMessage] = useState('');

  const {
    control,
    handleSubmit,
    reset,
    watch,              // <<< adiciona aqui
    formState: { errors }
  } = useForm<TreinoFormData>({
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

  const handleUpdatePlano = async (data: any) => {
    setIsLoading(true);
    try {
      await updateTreinoById(id as string, data, notify);
      setSucessoMessage('Seu plano foi atualizado.')
      setShowSucessoModal(true)
    } catch (error) {
      Alert.alert("Erro", (error as Error).message);
      setErrorMessage('Preencha todos os campos')
      setShowErrorModal(true)
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <ActivityIndicator size="large" color={colors.vermEscuro} style={{ flex: 1 }} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Header title="Planejamento Semanal" text="Visualize seus treinos" />

        <View style={styles.formContainer}>
          {/* Grupo Muscular */}
          <Text style={styles.label}>Músculo:</Text>
          <Text style={styles.valueText}>
            {watch("parte") || "Não informado"}
          </Text>

          {/* Lista de exercícios */}
          {fields.map((field, index) => (
            <View key={field.id} style={{ marginBottom: 16 }}>
              <View style={styles.row}>
                <View style={styles.inputHalf}>
                  <Text style={styles.label}>Exercício {index + 1}:</Text>
                  <Text style={styles.valueText}>
                    {watch(`exercicios.${index}.nome`) || "Não informado"}
                  </Text>
                </View>

                <View style={styles.inputHalf}>
                  <Text style={styles.label}>Séries:</Text>
                  <Text style={styles.valueText}>
                    {watch(`exercicios.${index}.series`) || "Não informado"}
                  </Text>
                </View>
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={styles.optionalLabel}>Carga:</Text>
                <Text style={styles.valueText}>
                  {watch(`exercicios.${index}.carga`) || "Não informada"}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Modais (mantidos para feedback de erro ou sucesso) */}
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
    </ScrollView>
  );
}