import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  ScrollView,
  Pressable
} from 'react-native';
import { router } from 'expo-router';
import styles from './style';
import { Feather, Entypo, Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { images } from '~/constants/images';
import { routes } from '~/constants/routes';
import { handlePasswordReset, loginUser } from '~/services/authService';
import 'expo-dev-client';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { onAuthStateChanged, signInWithCredential, GoogleAuthProvider, User } from 'firebase/auth';
import { auth } from '~/config/firebase'; // do firebase SDK web
import { onGoogleButtonPress } from '~/services/googleService';
import Modal from '~/components/modal/modalAlert';
import CustomModalSucesso from '~/components/modal/modalSucesso';

export default function Login() {
  const [hidePass, setHidePass] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [emailFocused, setEmailFocused] = useState<boolean>(false);
  const [senhaFocused, setSenhaFocused] = useState<boolean>(false);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSucessoModal, setShowSucessoModal] = useState(false);
  const [SucessoMessage, setSucessoMessage] = useState('');


  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '620962951335-jjvgnqms3mbh3bb9p7atu3m94970l4if.apps.googleusercontent.com',
    });

    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);
    return unsubscribe;
  }, []);

  function handleAuthStateChanged(currentUser: User | null): void {
    setUser(currentUser);
    if (initializing) setInitializing(false);
  }

  if (initializing) return null;

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await onGoogleButtonPress(); // já retorna credencial e faz signIn
      router.replace('/planejamentos');
    } catch (error: any) {
      setErrorMessage('Erro no login com Google');
      setShowErrorModal(true);
    }
  };

  const handleLogin = async () => {
    try {
      await loginUser(email, senha); // função que chama signInWithEmailAndPassword
      router.replace('/planejamentos');
    } catch (error: any) {
      setErrorMessage('E-mail ou senha inválidos');
      setShowErrorModal(true);
    }
  };

  const handleResetPassword = async () => {
  try {
    const message = await handlePasswordReset(email);
    setSucessoMessage(message);
    setShowSucessoModal(true);
  } catch (error: any) {
    setErrorMessage(error.message);
    setShowErrorModal(true);
  }
};

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.buttonLeft} onPress={() => router.push('/')}>
          <Feather name='arrow-left' size={40} color='#fff' />
        </TouchableOpacity>

        <View style={styles.containerLogo}>
          <Image
            source={images.logo}
            style={styles.logo}
            resizeMode="cover"
          />

          <View style={styles.textContainer}>
            <Text style={styles.headingText}>
              Seja bem vindo de volta!
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Feather name="mail" size={20} color="#3D0000" />
              <View style={{ flex: 1, position: 'relative' }}>
                {(emailFocused || email) && (
                  <Animatable.Text
                    animation="slideInUp"
                    duration={300}
                    style={styles.animation}
                  >
                    <Text style={styles.labelText}>E-mail</Text>
                  </Animatable.Text>
                )}
                <TextInput
                  placeholder={!emailFocused ? "E-mail" : ""}
                  placeholderTextColor="#3D0000"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Entypo name="lock" size={20} color="#3D0000" />
              <View style={{ flex: 1, position: 'relative' }}>
                {(senhaFocused || senha) && (
                  <Animatable.Text
                    animation="slideInUp"
                    duration={300}
                    style={styles.animation}
                  >
                    <Text style={styles.labelText}>Senha</Text>
                  </Animatable.Text>
                )}
                <TextInput
                  placeholder={!senhaFocused ? "Senha" : ""}
                  placeholderTextColor="#3D0000"
                  secureTextEntry={hidePass}
                  value={senha}
                  onChangeText={setSenha}
                  onFocus={() => setSenhaFocused(true)}
                  onBlur={() => setSenhaFocused(false)}
                />
                <TouchableOpacity style={styles.icon} onPress={() => setHidePass(!hidePass)}>
                  {hidePass ?
                    <Ionicons name="eye" size={28} color="#3D0000" />
                    :
                    <Ionicons name="eye-off" size={28} color="#3D0000" />
                  }
                </TouchableOpacity>
              </View>
            </View>

          </View>
          <Pressable style={styles.headingText} onPress={handleResetPassword}>
            <Text style={styles.passwordText}>Esqueci minha senha</Text>
          </Pressable>

          <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.googleButtonContaine}
            onPress={() => handleGoogleLogin()}

          >
            <Image source={images.google} style={styles.googleImage} />
            <Text style={styles.TextGoogle}>Google</Text>
          </TouchableOpacity>

          <View style={styles.footerText}>
            <Text style={styles.footerAccont}>Você não possui uma conta? </Text>
            <Pressable onPress={() => router.push(routes.register as any)}>
              <Text style={styles.footerCreate}>Crie uma! </Text>
            </Pressable>
          </View>
        </View>
        <Modal
        visible={showErrorModal}
        title="Error no login"
        message={errorMessage}
        onClose={() => setShowErrorModal(false)}
        />
        <CustomModalSucesso
          visible={showSucessoModal}
          title="Sucesso"
          message={SucessoMessage}
         onClose={() => setShowSucessoModal(false)}
        />
      </ScrollView>
    </View>
  );
}
