import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from "./style";
import { router, useFocusEffect, useLocalSearchParams  } from 'expo-router';
import { Header } from '../../../components/header/header';
import { auth, firestore } from '../../../config/firebase';
import { colors } from '../../../constants/colors';

interface Plano {
  id: string;
  parte: string;
  exercicios: Array<{ nome: string; series: string }>;
}

export default function Adicionar() {
  const { dia } = useLocalSearchParams<{ dia?: string }>();

  const [planos, setPlanos] = useState<Plano[]>([]);
  const [loading, setLoading] = useState(true);

  const getDayName = (diaParam: string | undefined) => {
    if (!diaParam) return 'Seu Treino';
    return diaParam.charAt(0).toUpperCase() + diaParam.slice(1);
  }

  useFocusEffect(
    useCallback(() => {
      if (!dia) {
        setLoading(false);
        return;
      }
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        setPlanos([]);
        return;
      }
      
      setLoading(true);

      const subscriber = firestore
        .collection('planejamentos')
        .where('userId', '==', user.uid)
        .where('diaDaSemana', '==', dia)
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
          const planosData: Plano[] = [];
          querySnapshot.forEach(documentSnapshot => {
            planosData.push({ id: documentSnapshot.id, ...documentSnapshot.data() } as Plano);
          });
          setPlanos(planosData);
          setLoading(false);
        }, error => {
            console.error(error);
            Alert.alert("Erro", "Não foi possível carregar os planos.");
            setLoading(false);
        });

      return () => subscriber();
    }, [dia])
  );

  const handleDelete = (planoId: string) => {
    Alert.alert( "Excluir Plano", "Você tem certeza?", [ { text: "Cancelar" }, { text: "Excluir", onPress: async () => {} } ]);
  };

  const renderItem = ({ item }: { item: Plano }) => {
    const primeiroExercicio = item.exercicios?.[0] || { nome: 'Plano sem exercícios', series: '' };
    return (
      <View style={styles.card}>
        <TouchableOpacity style={styles.cardContent} onPress={() => handleCardPress(item.id)}>
          <Text style={styles.cardTitulo}>{item.parte}</Text>
          <Text style={styles.cardDescricao}>{primeiroExercicio.nome}</Text>
          <Text style={styles.cardRepeticoes}>{primeiroExercicio.series} Séries</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Feather name="trash-2" size={24} color={colors.vermEscuro} />
        </TouchableOpacity>
      </View>
    );
  };
  
  const handleCardPress = (id: string) => {
     router.push({
        pathname: "/planejamentos/FormEditar/[id]", 
        params: { id: id }, // O parâmetro deve ser 'id', não 'dia'.
     });
  };

  //func para passar o parametro dia
  const handleAddPress = () => {
    if (!dia) {
      Alert.alert("Erro", "Dia não identificado. Por favor, volte e tente novamente.");
      return;
    }
    router.push({
      pathname: '/planejamentos/FormAdicionar/formAdicionar',
      params: { dia: dia } 
    });
  };

  return (
    <View style={styles.container}>
      <Header
        title='Planejamento Semanal'
        text={`Gerencie seus treinos de ${getDayName(dia)}`}
      />  

      {}
      <TouchableOpacity style={styles.button} onPress={handleAddPress}>
        <Text style={styles.adicionarButton}>Adicionar</Text>
        <Feather name='plus-circle' size={30} color='#3D0000' />
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color={colors.vermEscuro} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={planos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
                      <View style={{alignItems: 'center', marginTop: 50}}>
                        <Text>Nenhum plano adicionado para este dia..</Text>
                        <Text>Clique em "Adicionar" para começar!</Text>
                      </View>
                    }
      
        />
      )}
    </View>
  );
}