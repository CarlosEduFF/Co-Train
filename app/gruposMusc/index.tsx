import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, TouchableOpacity, ScrollView,FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import styles from "./style";
import { router } from 'expo-router';
import {Header} from '../../components/header/header'

const planoTreino =[
  {
    id:"1",
    titulo: 'Ombro',
    descricao: 'Elevação Lateral',
    repeticoes: '3x12',
  },
  {
    id: '2',
    titulo: 'Peito',
    descricao: 'Supino Reto',
    repeticoes: '4x10',
  },
  {
    id: '3',
    titulo: 'Peito',
    descricao: 'Supino Reto',
    repeticoes: '4x10',
  },
  {
    id:"4",
    titulo: 'Ombro',
    descricao: 'Elevação Lateral',
    repeticoes: '3x12',
  },
  {
    id: '5',
    titulo: 'Peito',
    descricao: 'Supino Reto',
    repeticoes: '4x10',
  },
  {
    id: '6',
    titulo: 'Peito',
    descricao: 'Supino Reto',
    repeticoes: '4x10',
  },
]

const userData = {
    imageUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=150&q=80',
  };
 

export default function gruposMusc() {

 const renderItem = ({ item }: any) => (
  <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item.id)}>
    <View style={styles.containerCard}>
    <Text style={styles.cardTitulo}>{item.titulo}</Text>
            <Image
              source={{ uri: userData.imageUrl }}
              style={styles.MuscImage}
              resizeMode="contain"
            />
    </View>
  </TouchableOpacity>
);
  
const handleCardPress = (id: string) => {
  router.push('/gruposMusc/FormEditar/formEditar');
};

return(
    
     <View style={styles.container}>
        <Header
            title='Divisão por Grupos Musculares'
            text='Gerencie por grupos muscular seus treinos organizados'
        />  

    <TouchableOpacity style={styles.button} onPress={() => router.push('/gruposMusc/FormAdicionar/formAdicionar')}>
        <Text style={styles.adicionarButton}>Adicionar</Text>
        <Feather name='plus-circle' size={30} color='#fff' />
    </TouchableOpacity>

      <FlatList
        data={planoTreino}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        numColumns={3}
      />
    </View>
   
  );
}