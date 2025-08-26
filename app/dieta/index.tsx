import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from "./style";
import { router } from 'expo-router';
import { Header } from '../../components/header/headerNoButton';
import { DayKey, DIAS_SEMANA } from '~/constants/diasSemana';
import TabLayout from '~/components/Tabs';
import { ButtomSemana } from '~/components/ButtomSemana/buttonSemana';
import {useTranslation} from "react-i18next";


export default function Dieta() {
  const {t} = useTranslation();
  const handleDayPress = (day: DayKey) => {
    router.push({
      pathname: '/dieta/meals', // Corrigido para minúsculo
      params: { dia: day }
    });
  };
  const handleEditMeal = (day: DayKey) => {
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
      <Header title={t("header.dietTitle")} text={t("header.dietText")} />
      <TouchableOpacity style={styles.button} onPress={handleAddMeal}>
        <Text style={styles.adicionarButton}>{t("buttons.addDiet")}</Text>
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
          const isLastAndAlone = isLastItem && isOddLength;
          const iconsMap: Record<DayKey, keyof typeof Feather.glyphMap> = {
                segunda: "calendar", 
                terca: "clock",        
                quarta: "chevrons-up",    
                quinta: "award",    
                sexta: "activity",  
                sabado: "activity",         
                domingo: "plus"};
          return (
           <ButtomSemana
           label={t(item.label)}
           dayKey={item.key}
           isLastAndAlone={isLastAndAlone}
           onPress={handleDayPress}
           icon={iconsMap[item.key]}
           />);}}
        
        // --- FIM DA MUDANÇA ---

        contentContainerStyle={{ paddingBottom: 20 }} // Adicionei um padding para a lista não colar no final
      />
      </View>
    <TabLayout />
    </View>
  );
}
