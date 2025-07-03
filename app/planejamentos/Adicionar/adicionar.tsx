import { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, router } from 'expo-router';
import styles from './style';
import { Header } from '../../../components/header/header';
import { colors } from '~/constants/colors';
import { routes } from '~/constants/routes';
import { useAuth } from '~/components/AuthContext';
import { TreinoCard } from '~/components/trainCard/trainCard';
import { mapPlanoToTreino } from '~/utils/myPlantoTrain';
import { deleteTreinoById, removerDiaEspecifico, subscribeToTreinosGrupados } from '~/services/trainsService';
import { Treino } from '~/constants/train';
export default function Adicionar() {
  const { dia } = useLocalSearchParams<{ dia?: string }>();


  const [planos, setPlanos] = useState<Treino[]>([]);
  const [loadingPlanos, setLoadingPlanos] = useState(true);
  const getDayName = (diaParam?: string) =>
    diaParam ? diaParam.charAt(0).toUpperCase() + diaParam.slice(1) : 'Seu Treino';
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log('Auth state:', { loading, user });

    if (!loading && !user) {
      router.replace(routes.login);
    }
  }, [loading, user]);


  useEffect(() => {
    if (!loading && !user) {
      router.replace(routes.login);
    }
  }, [loading, user]);


  useFocusEffect(
    useCallback(() => {
      if (!user || !dia) {
        setLoadingPlanos(false);
        return;
      }

      setLoadingPlanos(true);

      const unsubscribe = subscribeToTreinosGrupados(
        user,
        dia.toLowerCase(), // passa o dia para filtrar
        (treinosData) => {
          setPlanos(treinosData);
          setLoadingPlanos(false);
        },
        (error) => {
          console.error('Erro ao carregar treinos:', error);
          setPlanos([]);
          setLoadingPlanos(false);
        }
      );

      return () => {
        if (unsubscribe) unsubscribe();
      };
    }, [user, dia]) // inclua `dia` nas dependências
  );

  const handleDelete = (treinoId: string) => {
    if (!dia) {
      Alert.alert('Erro', 'Dia não informado.');
      return;
    }

    Alert.alert('Remover do Dia', 'Você quer remover este treino do planejamento semanal?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          try {
            await removerDiaEspecifico(treinoId, dia);
          } catch {
            Alert.alert('Erro', 'Não foi possível remover o treino do dia.');
          }
        },
      },
    ]);
  };

  const handleCardPress = (id: string) => {
    router.push(`/planejamentos/FormEditar/${id}`);
  };

  const handleAddPress = () => {
    router.push({
      pathname: '/planejamentos/FormAdicionar/formAdicionar',
      params: { dia }, // expo-router transforma isso em `?dia=segunda`
    });
  };


  if (loading || loadingPlanos) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.vermEscuro} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title='Planejamento Semanal'
        text={`Gerencie seus treinos de ${getDayName(dia)}`}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddPress}>
        <Text style={styles.adicionarButton}>Adicionar</Text>
        <Feather name='plus-circle' size={30} color='#3D0000' />
      </TouchableOpacity>

      {planos.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Text>Nenhum plano adicionado para este dia..</Text>
          <Text>Clique em "Adicionar" para começar!</Text>
        </View>
      ) : (
        <FlatList
          data={planos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TreinoCard
              treino={mapPlanoToTreino(item)}
              onPress={handleCardPress}
              onDelete={handleDelete}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}
