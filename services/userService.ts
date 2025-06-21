import { Alert } from 'react-native';
import { auth, firestore } from '~/config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '~/services/uploadService';

export const getUserData = async () => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) return null;

    const userRef = doc(firestore, 'Usuarios', userId);
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

export const updateUserData = async (data: any, localImageUri?: string) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert('Erro', 'Usuário não autenticado');
      return;
    }

    let imageUrl = null;

    if (localImageUri && !localImageUri.startsWith('https://')) {
      imageUrl = await uploadToCloudinary(localImageUri);
    }

    const userRef = doc(firestore, 'Usuarios', userId);

    await updateDoc(userRef, {
      ...data,
      ...(imageUrl && { fotoPerfil: imageUrl }),
    });

    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    return true;
  } catch (error: any) {
    console.error('Erro ao atualizar:', error);
    Alert.alert('Erro ao atualizar perfil', error.message || 'Erro inesperado');
    return false;
  }
};
