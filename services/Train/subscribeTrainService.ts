// services/treinosService.ts
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { firestore } from '~/config/firebase';
import type { User } from 'firebase/auth';

import { Treino } from '~/types/train';

type OnSuccessTreinos = (treinos: Treino[]) => void;
type OnError = (error: any) => void;

/**
 * Converte um documento do Firestore para o tipo Treino
 */
const mapDocToTreino = (doc: QueryDocumentSnapshot<DocumentData>): Treino => {
  const data = doc.data();

  return {
    id: doc.id,
    modo: data.modo,
    parte: data.parte,
    exercicios: data.exercicios ?? [],
    planoTitulo: data.planoTitulo,
    planoImagem: data.planoImagem ?? '',
    diasDaSemana: data.diasDaSemana ?? [],
  };
};

/**
 * Subscrição genérica para treinos do usuário.
 * - user: usuário autenticado
 * - options.dia?: filtra por dia (array-contains)
 * - options.modo?: filtra por modo ('grupo' | 'plano')
 * Retorna a função unsubscribe
 */
export const subscribeToTrains = (
  user: User,
  options: { dia?: string; modo?: Treino['modo'] } = {},
  onSuccess: OnSuccessTreinos,
  onError: OnError
): (() => void) => {
  const treinosRef = collection(firestore, 'treinos');

  const constraints: any[] = [where('userId', '==', user.uid)];

  if (options.modo) {
    constraints.push(where('modo', '==', options.modo));
  }

  if (options.dia) {
    constraints.push(
      where('diasDaSemana', 'array-contains', options.dia.toLowerCase())
    );
  }

  // ordenar por criação (mais novo primeiro)
  const q = query(treinosRef, ...constraints, orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const treinos: Treino[] = snapshot.docs.map(mapDocToTreino);
      onSuccess(treinos);
    },
    (error) => {
      onError(error);
    }
  );

  return unsubscribe;
};
