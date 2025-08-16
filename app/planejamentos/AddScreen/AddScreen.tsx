import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useAuth } from '~/components/AuthContext';
import { atualizarDiasDaSemanaTreino, subscribeToTreinosGrupados } from '~/services/trainsService';
import { Treino } from '~/constants/train';
import { User } from 'firebase/auth';
import { TreinoCard } from '~/components/trainCard/trainCard';
import { Feather } from '@expo/vector-icons';
import styles from './style';
import { router, useLocalSearchParams } from 'expo-router';
import ModalSucesso from '~/components/modal/modalSucesso';
import ModalAlert from '~/components/modal/modalAlert';
import ModalPlanejamento from '~/components/modal/modalPlanejamentos';
import { Header } from '~/components/header/header';
import { DayKey } from '~/constants/diasSemana';

export default function ListaTreinos() {
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
      setErrorMessage('Usuário não autenticado');
      setShowErrorModal(true);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = subscribeToTreinosGrupados(
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
  }, [user]);

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
      setErrorMessage('Selecione ao menos um treino.');
      setShowErrorModal(true);
      return;
    }

    // Verifica se todos os treinos selecionados têm pelo menos 1 dia
    const treinosSemDias = selectedIds.filter(
      (id) => !diasSelecionadosPorTreino[id] || diasSelecionadosPorTreino[id].length === 0
    );

    if (treinosSemDias.length > 0) {
      setErrorMessage('Selecione ao menos um dia para todos os treinos selecionados.');
      setShowErrorModal(true);
      return;
    }

    try {
      const updates = Object.entries(diasSelecionadosPorTreino).map(([treinoId, dias]) =>
        atualizarDiasDaSemanaTreino(treinoId, dias)
      );
      await Promise.all(updates);

      setSucessoMessage('Treinos atualizados com sucesso!');
      setShowSucessoModal(true);
      setSelectedIds([]);
      router.push('/planejamentos');
    } catch (error) {
      console.error('Erro ao atualizar treinos:', error);
      setErrorMessage('Não foi possível atualizar os treinos.');
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
          title="Necessário ter criado um treino na aba de grupo muscular"
          message={planejamentosMessage}
          onClose={() => setShowPlanejamentosModal(false)}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Header title="Planejamento Semanal" text="Adicione seu planejamento" />

      {/* Botão salvar */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
        <Feather name="plus-circle" size={24} color="#fff" />
        <Text style={styles.addText}>Salvar</Text>
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
        title="Erro"
        message={errorMessage}
        onClose={() => setShowErrorModal(false)}
      />
      <ModalSucesso
        visible={showSucessoModal}
        title="Sucesso"
        message={sucessoMessage}
        onClose={() => setShowSucessoModal(false)}
      />
    </View>
  );
}
