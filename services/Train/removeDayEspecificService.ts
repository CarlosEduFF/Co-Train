// services/treinosService.ts
import {
  doc,
  updateDoc,
  arrayRemove,
} from 'firebase/firestore';
import { firestore } from '~/config/firebase';

// IMPORTE AQUI A FUNÇÃO DE UPLOAD (implemente em ~/services/uploadService)
/**
 * Remove um dia específico (arrayRemove)
 */
export const removeDayEspecific = async (treinoId: string, dia: string): Promise<void> => {
  try {
    const treinoRef = doc(firestore, 'treinos', treinoId);
    await updateDoc(treinoRef, { diasDaSemana: arrayRemove(dia.toLowerCase()) });
  } catch (error) {
    console.error('Erro ao remover dia específico:', error);
    throw error;
  }
};