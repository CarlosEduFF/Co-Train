// services/treinosService.ts
import {
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, firestore } from '~/config/firebase';
import { router } from 'expo-router';

// Upload externo
import { uploadToCloudinary } from '~/services/uploadService';

import type { Treino } from '~/types/train'; // <-- ajuste o caminho do seu type

/**
 * Salva um treino (cria novo). Suporta modo 'grupo' e 'plano'.
 */
export const saveTrain = async (
  data: Treino,
  selectedImage?: string | null,
  onSuccess?: () => void,
  onError?: (error: any) => void
): Promise<void> => {
  const user = auth.currentUser;

  if (!user) {
    const err = new Error('Usuário não autenticado');
    onError?.(err);
    return;
  }

  // validações mínimas
  if (!data.exercicios || data.exercicios.length === 0) {
    const err = new Error('É necessário informar ao menos um exercício');
    onError?.(err);
    return;
  }
  if (data.modo === 'grupo' && !data.parte) {
    const err = new Error('Parte do corpo não informada');
    onError?.(err);
    return;
  }
  if (data.modo === 'plano' && !data.planoTitulo) {
    const err = new Error('Título do plano não informado');
    onError?.(err);
    return;
  }

  try {
    // trata upload da imagem (se necessário)
    let imagemUrl: string | null = null;
    if (selectedImage) {
      if (!selectedImage.startsWith('https://')) {
        try {
          imagemUrl = await uploadToCloudinary(selectedImage);
        } catch (uploadErr) {
          console.error('Erro no upload da imagem:', uploadErr);
          onError?.(uploadErr);
          return;
        }
      } else {
        imagemUrl = selectedImage;
      }
    }

    // monta payload para Firestore
    const payload = {
      ...data,
      userId: user.uid,
      diasDaSemana: (data.diasDaSemana || []).map((d) => d.toLowerCase()),
      planoImagem: imagemUrl ?? data.planoImagem ?? null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await addDoc(collection(firestore, 'treinos'), payload);

    onSuccess?.();
    router.back(); // mantém comportamento anterior
  } catch (error) {
    console.error('Erro ao salvar treino:', error);
    onError?.(error);
    throw error;
  }
};
