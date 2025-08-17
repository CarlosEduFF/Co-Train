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

import { mapPlanoToTreino } from '~/utils/myPlantoTrain';
import { deleteTreinoById, removerDiaEspecifico, subscribeToTreinosGrupados } from '~/services/trainsService';
import { Treino } from '~/constants/train';
import CustomModalSucesso from '~/components/modal/modalSucesso';
import Modal from '~/components/modal/modalAlert'
import ModalDelete from '~/components/modal/ModalDelete'
import { id } from 'zod/v4/locales';
import { TreinoCard } from '~/components/trainCard/trainCardColunSema/trainCardColun';



export default function Adicionar() {
  const { dia } = useLocalSearchParams<{ dia?: string }>();

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [treinoIdToDelete, setTreinoIdToDelete] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSucessoModal, setShowSucessoModal] = useState(false);
  const [SucessoMessage, setSucessoMessage] = useState('');
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
      setErrorMessage('Dia não informado');
      setShowErrorModal(true);
      return;
    }
    setTreinoIdToDelete(treinoId)
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (treinoIdToDelete && dia) {
      try {
        await removerDiaEspecifico(treinoIdToDelete, dia);
        setDeleteModalVisible(false);
        setSucessoMessage('Treino removido com sucesso');
        setShowSucessoModal(true);
      } catch (error) {
        setDeleteModalVisible(false);
        setErrorMessage('Erro ao remover treino');
        setShowErrorModal(true);
      }
    }
  };


  const handleCardPress = (id: string) => {
    router.push({
      pathname: '/planejamentos/ViewTrain/ViewTrain',
      params: { id: id }
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
              onPurpose='View'
              onDelete={handleDelete}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <Modal
        visible={showErrorModal}
        title='Erro'
        message={errorMessage}
        onClose={() => setShowErrorModal(false)}
      />
      <CustomModalSucesso
        visible={showSucessoModal}
        title='Sucesso'
        message={SucessoMessage}
        onClose={() => setShowSucessoModal(false)}
      />
      <ModalDelete
        visible={deleteModalVisible}
        title="Remover Treino"
        message="Deseja remover este treino do planejamento semanal?"
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={confirmDelete}
      />
    </View>
  );
}
