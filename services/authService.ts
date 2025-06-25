// services/authService.ts
import { auth, firestore } from '../config/firebase';
import firebase from 'firebase/compat/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export const registerUser = async (data: RegisterData): Promise<string> => {
  const { nome, email, senha, confirmarSenha } = data;

  if (!nome || !email || !senha || !confirmarSenha) {
    throw new Error('Preencha todos os campos.');
  }

  if (senha !== confirmarSenha) {
    throw new Error('As senhas não coincidem.');
  }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, senha);
    const uid = userCredential.user?.uid;

    if (!uid) {
      throw new Error('Não foi possível obter o ID do usuário.');
    }

    await firestore.collection('Usuarios').doc(uid).set({
      nome,
      email,
      criadoEm: firebase.firestore.FieldValue.serverTimestamp(),
    });

    return uid; // sucesso
  } catch (error: any) {
    throw new Error(error.message || 'Erro inesperado ao cadastrar usuário.');
  }
};





export const loginUser = async (email: string, senha: string) => {
  if (!email || !senha) {
    throw new Error('Preencha todos os campos.');
  }

  try {
    // Autentica o user
    const userCredential = await auth.signInWithEmailAndPassword(email, senha);
    const user = userCredential.user;

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    // Busca dados adicionais do user no Firestore
    const doc = await firestore.collection('Usuarios').doc(user.uid).get();
    const userData = doc.data();

    // Salva dados no AsyncStorage
    await AsyncStorage.setItem('@userId', user.uid);
    await AsyncStorage.setItem('@userEmail', user.email || '');
    if (userData?.nome) {
      await AsyncStorage.setItem('@userNome', userData.nome);
    }

    return user.uid;
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao fazer login.');
  }
};

export const handlePasswordReset = async (email: string) => {
  try {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira seu email para redefinir a senha.');
      return;
    }

    await sendPasswordResetEmail(auth, email);
    Alert.alert('Sucesso', 'Um link de redefinição foi enviado para seu email.');
  } catch (error: any) {
    console.error('Erro ao redefinir senha:', error);
    Alert.alert('Erro', error.message || 'Não foi possível enviar o link de redefinição.');
  }
};