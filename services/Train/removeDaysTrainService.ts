// services/treinosService.ts
import {
  doc,
  updateDoc,
  deleteField,
} from 'firebase/firestore';
import { firestore } from '~/config/firebase';

// IMPORTE AQUI A FUNÇÃO DE UPLOAD (implemente em ~/services/uploadService)


/**
 * Remove o campo diasDaSemana por completo
 */
export const removeDaysWeekTrain = async (treinoId: string): Promise<void> => {
  try {
    const treinoRef = doc(firestore, 'treinos', treinoId);
    await updateDoc(treinoRef, { diasDaSemana: deleteField() });
  } catch (error) {
    console.error('Erro ao remover dias da semana do treino:', error);
    throw error;
  }
};