
import { doc, getDoc,} from 'firebase/firestore';
import { firestore } from '~/config/firebase';

// IMPORTE AQUI A FUNÇÃO DE UPLOAD (implemente em ~/services/uploadService)
import { Treino } from '~/types/train';


/**
 * Recupera um treino (qualquer modo) pelo id.
 */
export const getTrainById = async (treinoId: string): Promise<Treino | null> => {
    try {
        const docRef = doc(firestore, 'treinos', treinoId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...(docSnap.data() as any) } as Treino;
        } else {
            console.warn(`Treino com id ${treinoId} não encontrado.`);
            return null;
        }
    } catch (error) {
        console.error('Erro ao buscar treino pelo id:', error);
        throw error;
    }
};