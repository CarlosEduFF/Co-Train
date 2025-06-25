// gruposMusc/index.tsx

import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import styles from "./style";
import { router, useFocusEffect } from 'expo-router';
import { Header } from '../../components/header/header';
import { auth, firestore } from '../../config/firebase';
import { colors } from '../../constants/colors';

interface Treino {
  id: string;
  parte: string; // Grupo muscular
  imagemUrl: string; // URL da imagem do grupo
  exercicios: Array<{ nome: string; series: string }>;
}

export default function GruposMusc() {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Erro", "Você precisa estar logado para ver seus treinos.");
        setLoading(false);
        return;
      }

      setLoading(true);
      const collectionRef = firestore.collection('treinos_grupados');

      const subscriber = collectionRef
        .where('userId', '==', user.uid)
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
          const treinosData: Treino[] = [];
          querySnapshot.forEach(doc => {
            treinosData.push({
              id: doc.id,
              ...doc.data()
            } as Treino);
          });
          setTreinos(treinosData);
          setLoading(false);
        }, error => {
          console.error("Erro ao buscar treinos: ", error);
          Alert.alert("Erro", "Não foi possível carregar os treinos.");
          setLoading(false);
        });

      return () => subscriber();
    }, [])
  );

  const renderItem = ({ item }: { item: Treino }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item.id)}>
      <View style={styles.containerCard}>
       
        <Image
          source={{ uri: item.imagemUrl || 'https://via.placeholder.com/150' }} // Usa a imagem salva ou um placeholder
          style={styles.MuscImage}
          resizeMode="cover"
        />
         <Text style={styles.cardTitulo}>{item.parte}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleCardPress = (id: string) => {
    // Passa o ID do treino para a tela de edição
    router.push({
      pathname: '/gruposMusc/FormEditar/formEditar',
      params: { id: id }
    });
  };

  return (
    <View style={styles.container}>
      <Header
        title='Divisão por Grupos Musculares'
        text='Gerencie por grupos musculares seus treinos organizados'
      />
      <TouchableOpacity style={styles.button} onPress={() => router.push('/gruposMusc/FormAdicionar/formAdicionar')}>
        <Text style={styles.adicionarButton}>Adicionar</Text>
        <Feather name='plus-circle' size={30} color='#3D0000' />
      </TouchableOpacity>
      
      {loading ? (
        <ActivityIndicator size="large" color={colors.vermEscuro} style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={treinos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          
          ListEmptyComponent={
            <View style={{alignItems: 'center', marginTop: 50}}>
              <Text>Nenhum treino adicionado.</Text>
              <Text>Clique em "Adicionar" para começar!</Text>
            </View>
          }
        />
      )}
    </View>
  );
}