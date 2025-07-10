import { Alert } from 'react-native';
import {
  doc,
  getDoc,
  updateDoc,
  Firestore,
} from 'firebase/firestore';
import { uploadToCloudinary } from '~/services/uploadService';

/**
 * Obtém os dados do usuário no Firestore com base no UID
 * @param uid UID do usuário autenticado
 */
export const getUserData = async (firestore: Firestore, uid: string) => {
  try {
    const userRef = doc(firestore, 'Usuarios', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    }

    return null;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    Alert.alert('Erro', 'Erro ao carregar dados do usuário.');
    return null;
  }
};

/**
 * Atualiza os dados do usuário no Firestore
 * @param firestore Instância do Firestore
 * @param uid UID do usuário autenticado
 * @param data Objeto com os dados atualizados
 * @param localImageUri Caminho da nova imagem (opcional)
 */
export const updateUserData = async (
  firestore: Firestore,
  uid: string,
  data: any,
  localImageUri?: string
) => {
  try {
    if (!uid) {
      
      return;
    }

    let imageUrl = null;

    if (localImageUri && !localImageUri.startsWith('https://')) {
      imageUrl = await uploadToCloudinary(localImageUri);
    }

    const userRef = doc(firestore, 'Usuarios', uid);

    await updateDoc(userRef, {
      ...data,
      ...(imageUrl && { fotoPerfil: imageUrl }),
    });

    return true;
  } catch (error: any) {
    console.error('Erro ao atualizar:', error);
    return false;
  }
};
