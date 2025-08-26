import { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect, useLocalSearchParams, router } from 'expo-router';
import styles from './style';
import { Header } from '../../../components/header/header';
import { colors } from '~/constants/colors';
import { routes } from '~/constants/routes';
import { useAuth } from '~/components/AuthContext';
import { mapPlanoToTreino } from '~/utils/myPlantoTrain';

import CustomModalSucesso from '~/components/modal/modalSucesso';
import Modal from '~/components/modal/modalAlert'
import ModalDelete from '~/components/modal/ModalDelete'
import { TreinoCard } from '~/components/trainCard/TrainCardMod/trainCard';
import { Treino } from '~/types/train';
import { removeDayEspecific, subscribeToTrains } from '~/services/Train';
import { useTranslation } from 'react-i18next';

export default function Adicionar() {
  const { t } = useTranslation();
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

  useFocusEffect(
    useCallback(() => {
      if (!user || !dia) {
        setLoadingPlanos(false);
        return;
      }

      setLoadingPlanos(true);

      const unsubscribe = subscribeToTrains(
        user,
        { dia: dia.toLowerCase() },
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

  const handleDelete = async (treinoId?: string, confirm?: boolean) => {
    if (!dia) {
      setErrorMessage(t("errors.noDay"));
      setShowErrorModal(true);
      return;
    }

    if (!confirm) {
      // Etapa 1 → só abrir modal
      setTreinoIdToDelete(treinoId || null);
      setDeleteModalVisible(true);
      return;
    }

    // Etapa 2 → confirmar e excluir
    if (treinoIdToDelete) {
      try {
        await removeDayEspecific(treinoIdToDelete, dia);
        setSucessoMessage(t("errors.deleteSuccess"));
        setShowSucessoModal(true);
      } catch (error) {
        setErrorMessage(t("errors.deleteError"));
        setShowErrorModal(true);
      } finally {
        setDeleteModalVisible(false);
        setTreinoIdToDelete(null);
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
        title={t("header.planningTitle")}
        text={t("header.planningTextViewScreen",{ day: getDayName(dia) })}
      />
      {planos.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Text>{t("planning.noPlanForDay")}</Text>
          <Text>{t("planning.clickAdd")}</Text>
        </View>
      ) : (
        <FlatList
          data={planos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TreinoCard
              treino={mapPlanoToTreino(item)}
              onPress={handleCardPress}
              onPurpose="View"
              onDelete={() => handleDelete(item.id)}
            />
          )}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <Modal
        visible={showErrorModal}
        title={t("common.error")}
        message={errorMessage}
        onClose={() => setShowErrorModal(false)}
      />
      <CustomModalSucesso
        visible={showSucessoModal}
        title={t("common.success")}
        message={SucessoMessage}
        onClose={() => setShowSucessoModal(false)}
      />
      <ModalDelete
        visible={deleteModalVisible}
        title={t("planning.deleteTitle")}
        message={t("planning.deleteMessage")}
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={() => handleDelete(undefined, true)} // confirma exclusão
      />
    </View>
  );
}
