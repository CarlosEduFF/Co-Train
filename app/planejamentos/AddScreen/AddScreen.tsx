import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useAuth } from '~/components/AuthContext';

import { User } from 'firebase/auth';
import { TreinoCard } from '~/components/trainCard/TrainCardMod/trainCard';
import { Feather } from '@expo/vector-icons';
import styles from './style';
import { router, useLocalSearchParams } from 'expo-router';
import ModalSucesso from '~/components/modal/modalSucesso';
import ModalAlert from '~/components/modal/modalAlert';
import ModalPlanejamento from '~/components/modal/modalPlanejamentos';
import { Header } from '~/components/header/header';
import { DayKey } from '~/constants/diasSemana';
import { Treino } from '~/types/train';
import { subscribeToTrains, updateDaysWeekTrain } from '~/services/Train';
import { useTranslation } from 'react-i18next';

export default function ListaTreinos() {
  const { t } = useTranslation();
  const { user, loading: authLoading } = useAuth();
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { dia } = useLocalSearchParams<{ dia?: string }>();

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSucessoModal, setShowSucessoModal] = useState(false);
  const [sucessoMessage, setSucessoMessage] = useState('');
  const [showPlanejamentosModal, setShowPlanejamentosModal] = useState(true);
  const [planejamentosMessage] = useState('Você ainda não tem treinos planejados.');

  const [diasSelecionadosPorTreino, setDiasSelecionadosPorTreino] = useState<Record<string, DayKey[]>>({});

  useEffect(() => {
    if (!user) {
      setErrorMessage(t('planning.noUserError'));
      setShowErrorModal(true);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = subscribeToTrains(
      user as User,
      undefined, // não filtra pelo dia aqui
      (treinosData) => {
        setTreinos(treinosData);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user,t]);

  const handleCardPress = (id: string) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDaysChange = (treinoId: string, dias: DayKey[]) => {
    setDiasSelecionadosPorTreino((prev) => ({
      ...prev,
      [treinoId]: dias,
    }));
  };

  const handleAddPress = async () => {
    if (selectedIds.length === 0) {
      setErrorMessage(t('planning.selectWorkoutError'));
      setShowErrorModal(true);
      return;
    }

    // Verifica se todos os treinos selecionados têm pelo menos 1 dia
    const treinosSemDias = selectedIds.filter(
      (id) => !diasSelecionadosPorTreino[id] || diasSelecionadosPorTreino[id].length === 0
    );

    if (treinosSemDias.length > 0) {
      setErrorMessage(t('planning.selectDayError'));
      setShowErrorModal(true);
      return;
    }

    try {
      const updates = Object.entries(diasSelecionadosPorTreino).map(([treinoId, dias]) =>
        updateDaysWeekTrain(treinoId, dias)
      );
      await Promise.all(updates);

      setSucessoMessage(t('planning.updateSuccess'));
      setShowSucessoModal(true);
      setSelectedIds([]);
      router.push('/planejamentos');
    } catch (error) {
      console.error('Erro ao atualizar treinos:', error);
      setErrorMessage(t('planning.updateError'));
      setShowErrorModal(true);
    }
  };


  if (loading || authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (treinos.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ModalPlanejamento
          visible={showPlanejamentosModal}
          title={t('planning.noWorkoutsTitle')}
          message={planejamentosMessage}
          onClose={() => setShowPlanejamentosModal(false)}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 , backgroundColor:'#fff'}}>
      <Header title={t('header.planningTitle')} text={t('header.planningTextAdd')} />

      {/* Botão salvar */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
        <Feather name="plus-circle" size={24} color="#fff" />
        <Text style={styles.addText}>{t('buttons.saveButton')}</Text>
      </TouchableOpacity>

      {/* Lista de treinos */}
      <FlatList
        data={treinos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TreinoCard
            treino={item}
            onPress={() => handleCardPress(item.id)}
            onPurpose="Edit"
            isSelected={selectedIds.includes(item.id)}
            onDaysChange={handleDaysChange}
          />
        )}
        contentContainerStyle={{ paddingBottom: 32 }}
      />

      <ModalAlert
        visible={showErrorModal}
        title={t('common.error')}
        message={errorMessage}
        onClose={() => setShowErrorModal(false)}
      />
      <ModalSucesso
        visible={showSucessoModal}
        title={t('common.success')}
        message={sucessoMessage}
        onClose={() => setShowSucessoModal(false)}
      />
    </View>
  );
}
