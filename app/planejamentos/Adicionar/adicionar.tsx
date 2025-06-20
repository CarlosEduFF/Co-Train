import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, TouchableOpacity, ScrollView,FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import styles from "./style";
import { router } from 'expo-router';
import {Header} from '../../../components/header/header'

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
]
 


export default function Adicionar() {

const renderItem = ({ item }: any) => (
  <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item.id)}>
    <Text style={styles.cardTitulo}>{item.titulo}</Text>
    <Text style={styles.cardDescricao}>{item.descricao}</Text>
    <Text style={styles.cardRepeticoes}>{item.repeticoes}</Text>
  </TouchableOpacity>
);
  
const handleCardPress = (id: string) => {
  router.push('/planejamentos/FormEditar/formEditar');
};

return(
    
     <View style={styles.container}>
        <Header
            title='Planejamento Semanal'
            text='Gerencie seus treinos'
        />  

    <TouchableOpacity style={styles.button} onPress={() => router.push('/planejamentos/FormAdicionar/formAdicionar')}>
        <Text style={styles.adicionarButton}>Adicionar</Text>
        <Feather name='plus-circle' size={30} color='#fff' />
    </TouchableOpacity>

      <FlatList
        data={planoTreino}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
   
  );
}