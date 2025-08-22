// services/treinosService.ts
import {
  doc,
  updateDoc,
} from 'firebase/firestore';
import { firestore } from '~/config/firebase';

// IMPORTE AQUI A FUNÇÃO DE UPLOAD (implemente em ~/services/uploadService)
/**
 * Atualiza diasDaSemana (substitui completamente)
 */
export const updateDaysWeekTrain = async (
  treinoId: string,
  diasDaSemana: string[]
): Promise<void> => {
  try {
    const treinoRef = doc(firestore, 'treinos', treinoId);
    await updateDoc(treinoRef, { diasDaSemana: diasDaSemana.map((d) => d.toLowerCase()) });
  } catch (error) {
    console.error('Erro ao atualizar dias da semana do treino:', error);
    throw error;
  }
};