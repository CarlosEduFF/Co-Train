import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '~/components/AuthContext'; // Seu hook de autenticação
import { atualizarDiasDaSemanaTreino, subscribeToTreinosGrupados } from '~/services/trainsService';
import { Treino } from '~/constants/train';
import { User } from 'firebase/auth';
import { TreinoCard } from '~/components/trainCard/trainCard';
import { mapPlanoToTreino } from '~/utils/myPlantoTrain';
import { Feather } from '@expo/vector-icons';
import styles from './style';
import { router, useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '~/config/firebase';
import CustomModalSucesso from '~/components/modal/modalSucesso';
import Modal from '~/components/modal/modalAlert'

export default function ListaTreinos() {
  const { user, loading: authLoading } = useAuth();
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { dia } = useLocalSearchParams<{ dia?: string }>();
  const [showErrorModal, setShowErrorModal]= useState(false);
  const [errorMessage,setErrorMessage] = useState('');
  const [showSucessoModal, setShowSucessoModal]= useState(false);
  const [SucessoMessage,setSucessoMessage] = useState('');

  useEffect(() => {
    if (!user) {
      setErrorMessage('Usuário não autenticado')
      setShowErrorModal(true)
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = subscribeToTreinosGrupados(
      user as User,
      undefined, // <<< não passar o dia
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
        <Text>Nenhum treino encontrado.</Text>
      </View>
    );
  }



  const handleCardPress = (id: string) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id) // desmarca
        : [...prevSelected, id] // adiciona
    );
  };


  const handleAddPress = async () => {
    if (!dia) {
      setErrorMessage('Dia não informado.')
      setShowErrorModal(true)
      return;
    }

    if (selectedIds.length === 0) {
      setErrorMessage('Selecione ao menos um treino.')
      setShowErrorModal(true)
      return;
    }

    try {
      await Promise.all(
        selectedIds.map(async (treinoId) => {
          const treinoRef = doc(firestore, 'treinos_grupados', treinoId);
          const treinoSnap = await getDoc(treinoRef);

          if (treinoSnap.exists()) {
            const treinoData = treinoSnap.data();
            const diasAtuais: string[] = treinoData.diasDaSemana || [];

            // Adiciona o dia se não estiver no array ainda
            const novosDias = diasAtuais.includes(dia.toLowerCase())
              ? diasAtuais
              : [...diasAtuais, dia.toLowerCase()];

            await atualizarDiasDaSemanaTreino(treinoId, novosDias);
          }
        })
      );

      setSucessoMessage( `Treinos atualizados para o dia ${dia}!`)
      setShowSucessoModal(true)
      setSelectedIds([]); // limpa seleção
      router.push('/planejamentos');
    } catch (error) {
      console.error('Erro ao atualizar treinos:', error);
      setErrorMessage('Não foi possível atualizar os treinos.')
      setShowErrorModal(true)
    }
  };


  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Botão de adicionar */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
        <Feather name="plus-circle" size={24} color="#fff" />
        <Text style={styles.addText}>Adicionar Treino</Text>
      </TouchableOpacity>

      {/* Lista de treinos */}
      <FlatList
        data={treinos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TreinoCard
            treino={mapPlanoToTreino(item)}
            onPress={handleCardPress}
            isSelected={selectedIds.includes(item.id)} // <<< agora checa se está na lista
          />
        )}
        contentContainerStyle={{ paddingBottom: 32 }}
      />

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
    </View>
  );
}


