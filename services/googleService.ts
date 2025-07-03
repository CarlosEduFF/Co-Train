import { GoogleSignin, User as GoogleUser } from '@react-native-google-signin/google-signin';
import {
  signInWithCredential,
  GoogleAuthProvider,
  User,
  UserCredential,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '~/config/firebase';
import { router } from 'expo-router';
import { routes } from '~/constants/routes';

export const onGoogleButtonPress = async (): Promise<UserCredential> => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Etapa 1: fazer login
    const signInResponse = await GoogleSignin.signIn();

    if (signInResponse.type !== 'success') {
      throw new Error('Login com Google cancelado.');
    }

    const googleUser: GoogleUser = signInResponse.data;

    // Etapa 2: obter o idToken
    const { idToken } = await GoogleSignin.getTokens();

    if (!idToken) {
      throw new Error('Token de ID do Google não encontrado.');
    }

    // Etapa 3: autenticar com Firebase
    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);

    // Etapa 4: salvar usuário no Firestore
    await createUserIfNotExists(userCredential.user);

    router.replace(routes.home);
    return userCredential;
  } catch (error: any) {
    console.error('❌ Erro ao fazer login com Google:', error);
    throw new Error(error.message || 'Erro inesperado no login com Google');
  }
};

const createUserIfNotExists = async (user: User): Promise<void> => {
  try {
    const userRef = doc(firestore, 'Usuarios', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        nome: user.displayName || '',
        email: user.email || '',
        fotoPerfil: user.photoURL || '',
        dataNascimento: '',
        sexo: '',
        altura: '',
        peso: '',
        objetivo: '',
        criadoEm: new Date().toISOString(),
      });

      console.log('✅ Usuário criado no Firestore.');
    } else {
      console.log('ℹ️ Usuário já existe no Firestore.');
    }
  } catch (error) {
    console.error('Erro ao criar usuário no Firestore:', error);
  }
};
