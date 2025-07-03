// services/authService.ts
import { auth, firestore } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

/**
 * Registra um novo usuário com Firebase Auth + Firestore
 */
export const registerUser = async (data: RegisterData): Promise<string> => {
  const { nome, email, senha, confirmarSenha } = data;

  if (!nome || !email || !senha || !confirmarSenha) {
    throw new Error('Preencha todos os campos.');
  }

  if (senha !== confirmarSenha) {
    throw new Error('As senhas não coincidem.');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const uid = userCredential.user?.uid;

    if (!uid) {
      throw new Error('Não foi possível obter o ID do usuário.');
    }

    const userRef = doc(firestore, 'Usuarios', uid);
    await setDoc(userRef, {
      nome,
      email,
      criadoEm: serverTimestamp(),
    });

    return uid;
  } catch (error: any) {
    throw new Error(error.message || 'Erro inesperado ao cadastrar usuário.');
  }
};

/**
 * Realiza login do usuário com email/senha e salva dados no AsyncStorage
 */
export const loginUser = async (email: string, senha: string) => {
  if (!email || !senha) {
    throw new Error('Preencha todos os campos.');
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const userDocRef = doc(firestore, 'Usuarios', user.uid);
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data();

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

/**
 * Envia email de redefinição de senha
 */
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
