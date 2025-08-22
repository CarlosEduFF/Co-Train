import {
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { firestore } from '~/config/firebase';

// IMPORTE AQUI A FUNÇÃO DE UPLOAD (implemente em ~/services/uploadService)

/**
 * Deleta treino por id
 */
export const deleteTrainById = async (treinoId: string): Promise<void> => {
  try {
    const docRef = doc(firestore, 'treinos', treinoId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Erro ao deletar treino:', error);
    throw error;
  }
};