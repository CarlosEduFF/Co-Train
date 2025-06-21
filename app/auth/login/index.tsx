import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, Pressable, TextInput, ScrollView } from 'react-native';
import { router } from 'expo-router';
import styles from './style';
import { Feather, Entypo, Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { images } from '~/constants/images';
import { routes } from '~/constants/routes';
import { handlePasswordReset, loginUser } from '~/services/authService';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [senhaFocused, setSenhaFocused] = useState(false);
  /*
    // Configuração do login Google
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
      clientId: '620962951335-jjvgnqms3mbh3bb9p7atu3m94970l4if.apps.googleusercontent.com',
      redirectUri: makeRedirectUri(),
      scopes: ['profile', 'email'],
    });
  
  
    useEffect(() => {
      if (response?.type === 'success') {
        const { id_token } = response.params;
        handleGoogleLogin(id_token);
      } else if (response?.type === 'error') {
        Alert.alert('Erro no login Google');
      }
    }, [response]);
  */
  /*
  // Função para fazer login com Google (exemplo usando Firebase)
  async function handleGoogleLogin(idToken: string) {
    try {
      // Aqui você precisa implementar o login via Firebase ou seu backend
      // Exemplo com Firebase Authentication:
      // import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
      // const credential = GoogleAuthProvider.credential(idToken);
      // await signInWithCredential(auth, credential);

      // Para exemplo, só vamos alertar e redirecionar
      Alert.alert('Login Google bem-sucedido');
      router.replace(routes.home);
    } catch (error: any) {
      Alert.alert('Erro no login Google', error.message);
    }
  }*/

  const handleLogin = async () => {
    try {
      const uid = await loginUser(email, senha);
      router.replace(routes.home);
    } catch (error: any) {
      Alert.alert('Erro no login', error.message);
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
          <Pressable style={styles.headingText} onPress={() => handlePasswordReset(email)}>
            <Text style={styles.passwordText}>Esqueci minha senha</Text>
          </Pressable>

          <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.googleButtonContaine}
          /*onPress={() => promptAsync()}
          disabled={!request}*/
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
      </ScrollView>
    </View>
  );
}
