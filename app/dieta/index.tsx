import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from "./style";
import { router } from 'expo-router';
import { Header } from '../../components/header/header';
import { DayKey, DIAS_SEMANA } from '~/constants/diasSemana';
import TabLayout from '~/components/Tabs';



export default function Dieta() {
  const handleDayPress = (day: DayKey) => {
    router.push({
      pathname: '/dieta/formEditar/formEditar', // Corrigido para minúsculo
      params: { dia: day }
    });
  };

  const handleAddMeal = () => {
    router.push('/dieta/FormAdicionar/formAdicionar');
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
      <Header title='Plano Alimentar' text='Escolha um dia da semana para ver ou editar sua alimentação' />
      <TouchableOpacity style={styles.button} onPress={handleAddMeal}>
        <Text style={styles.adicionarButton}>Adicionar Refeição</Text>
        <Feather name='plus-circle' size={24} color='#3D0000' />
      </TouchableOpacity>

      <FlatList
        data={DIAS_SEMANA}
        keyExtractor={(item) => item.key}
        numColumns={2}
        columnWrapperStyle={styles.row}

        // --- MUDANÇA PRINCIPAL AQUI ---
        renderItem={({ item, index }) => {
          // Verifica se é o último item e se a lista tem um número ímpar de itens
          const isLastItem = index === DIAS_SEMANA.length - 1;
          const isOddLength = DIAS_SEMANA.length % 2 !== 0;

          return (
            <TouchableOpacity
              // Aplica o estilo do card e, se for o caso, o estilo especial para o último item
              style={[
                styles.card,
                isLastItem && isOddLength && styles.lastCard
              ]}
              onPress={() => handleDayPress(item.key)}
            >
              <Text style={styles.cardTitulo}>{item.label}</Text>
            </TouchableOpacity>
          );
        }}
        // --- FIM DA MUDANÇA ---

        contentContainerStyle={{ paddingBottom: 20 }} // Adicionei um padding para a lista não colar no final
      />
      </View>
    <TabLayout />
    </View>
  );
}
