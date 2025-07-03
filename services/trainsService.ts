import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  deleteField,
  arrayRemove,
  getDoc,
} from 'firebase/firestore';
import { auth, firestore } from '~/config/firebase';
import { Treino } from '~/constants/train';
import { User } from 'firebase/auth';
import { Alert } from 'react-native';
import { router } from 'expo-router';

type OnSuccess = (treinos: Treino[]) => void;
type OnError = (error: any) => void;

/**
 * Escuta os treinos grupados do usuário autenticado.
 * @param user Usuário autenticado
 * @param onSuccess Callback para sucesso
 * @param onError Callback para erro
 * @returns Função de unsubscribe
 */

export const getTreinoyId = async (planoId: string): Promise<any | null> => {
  try {
    const docRef = doc(firestore, 'treinos_grupados', planoId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.warn(`Plano com id ${planoId} não encontrado.`);
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar plano pelo id:', error);
    throw error;
  }
};
export const subscribeToTreinosGrupados = (
  user: User,
  dia: string | undefined,
  onSuccess: (treinos: Treino[]) => void,
  onError: (error: Error) => void
): (() => void) => {
  const treinosRef = collection(firestore, 'treinos_grupados');

  const q = dia
    ? query(
      treinosRef,
      where('userId', '==', user.uid),
      where('diasDaSemana', 'array-contains', dia.toLowerCase())
    )
    : query(
      treinosRef,
      where('userId', '==', user.uid)
    );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const treinos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Treino[];
      onSuccess(treinos);
    },
    (error) => {
      onError(error);
    }
  );

  return unsubscribe;
};


export interface FormData {
  parte: string;
  carga?: string;
  exercicios: { nome: string; series: string }[];
  diasDaSemana?: string[]; // opcional para salvar
}

export const saveTreinoGrupado = async (
  data: FormData,
  selectedImage: string,
  onSuccess?: () => void,
  onError?: (error: any) => void
): Promise<void> => {
  const user = auth.currentUser;

  if (!user) {
    Alert.alert("Erro", "Usuário não autenticado.");
    return;
  }

  if (!selectedImage) {
    Alert.alert("Erro", "Imagem do grupo muscular não selecionada. Por favor, selecione o músculo novamente.");
    return;
  }

  try {
    await addDoc(collection(firestore, 'treinos_grupados'), {
      userId: user.uid,
      ...data,
      imagemUrl: selectedImage,
      createdAt: new Date(),
    });

    Alert.alert("Sucesso", "Treino salvo!");
    onSuccess?.();
    router.back();
  } catch (error) {
    console.error("Erro ao salvar treino:", error);
    Alert.alert("Erro", "Não foi possível salvar o treino.");
    onError?.(error);
  }
};

export const deleteTreinoById = async (treinoId: string): Promise<void> => {
  try {
    const docRef = doc(firestore, 'treinos_grupados', treinoId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Erro ao deletar treino:', error);
    throw error;
  }
};

export const atualizarDiasDaSemanaTreino = async (
  treinoId: string,
  diasDaSemana: string[]
): Promise<void> => {
  try {
    const treinoRef = doc(firestore, 'treinos_grupados', treinoId);
    await updateDoc(treinoRef, { diasDaSemana });
  } catch (error) {
    console.error('Erro ao atualizar dias da semana do treino:', error);
    throw error;
  }
};

export const removerDiasDaSemanaTreino = async (treinoId: string): Promise<void> => {
  try {
    const treinoRef = doc(firestore, 'treinos_grupados', treinoId);
    await updateDoc(treinoRef, {
      diasDaSemana: deleteField(),
    });
  } catch (error) {
    console.error('Erro ao remover dias da semana do treino:', error);
    throw error;
  }
};

export const removerDiaEspecifico = async (
  treinoId: string,
  dia: string
): Promise<void> => {
  try {
    const treinoRef = doc(firestore, 'treinos_grupados', treinoId);
    await updateDoc(treinoRef, {
      diasDaSemana: arrayRemove(dia.toLowerCase()),
    });
  } catch (error) {
    console.error('Erro ao remover dia específico:', error);
    throw error;
  }
};

export const updateTreinoById = async (
  planoId: string,
  data: any,
  notify: boolean
): Promise<void> => {
  try {
    const planoRef = doc(firestore, "treinos_grupados", planoId);

    await updateDoc(planoRef, {
      ...data,
      notify,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Erro ao atualizar plano:", error);
    throw error;
  }
};