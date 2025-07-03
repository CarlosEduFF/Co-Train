import { router } from 'expo-router';
import { Alert } from 'react-native';

export const navigateToEditPlano = (id: string) => {
  router.push(`/planejamentos/FormEditar/${id}`);
};

export const navigateToAddPlano = (dia?: string) => {
  if (!dia) {
    Alert.alert("Erro", "Dia não identificado. Por favor, volte e tente novamente.");
    return;
  }
  router.push(`/planejamentos/FormAdicionar/formAdicionar?dia=${encodeURIComponent(dia)}`);
};