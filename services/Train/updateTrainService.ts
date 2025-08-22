// services/treinosService.ts
import {
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { firestore } from '~/config/firebase';

// IMPORTE AQUI A FUNÇÃO DE UPLOAD (implemente em ~/services/uploadService)
import { uploadToCloudinary } from '~/services/uploadService';
import { Treino } from '~/types/train';
/**
 * Atualiza um treino por id. 
 * - data pode conter campos parciais (ex: planoTitulo, parte, exercicios, diasDaSemana, notify)
 * - localImageUri (opcional): se passado e for URI local, será feito upload e incluído imagemUrl no payload.
 */
export const updateTrainById = async (
  treinoId: string,
  data: Partial<Treino>,
  localImageUri?: string | null
): Promise<void> => {
  try {
    const treinoRef = doc(firestore, 'treinos', treinoId);

    // se o caller passou uma imagem local para atualizar
    let imagemUrl: string | null = null;
    if (localImageUri) {
      if (!localImageUri.startsWith('https://')) {
        try {
          imagemUrl = await uploadToCloudinary(localImageUri);
        } catch (uploadErr) {
          console.error('Erro no upload da imagem:', uploadErr);
          throw uploadErr;
        }
      } else {
        imagemUrl = localImageUri;
      }
    }

    const payload: any = { ...data, updatedAt: serverTimestamp() };
    if (payload.diasDaSemana && Array.isArray(payload.diasDaSemana)) {
      payload.diasDaSemana = payload.diasDaSemana.map((d: string) => d.toLowerCase());
    }
    if (imagemUrl) {
      payload.imagemUrl = imagemUrl;
    }

    await updateDoc(treinoRef, payload);
  } catch (error) {
    console.error('Erro ao atualizar treino:', error);
    throw error;
  }
};