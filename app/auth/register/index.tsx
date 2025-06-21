import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Pressable, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import styles from './style';
import { Feather, Entypo, Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { images } from '~/constants/images';
import { routes } from '~/constants/routes';
import { auth } from '~/config/firebase';
import { registerUser } from '~/services/authService';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

// Completa o fluxo do WebBrowser para autenticação
WebBrowser.maybeCompleteAuthSession();

export default function Cadastro() {
  const [hidePass, setHidePass] = useState(true);
  const [nome, setNome] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [senhaFocused, setSenhaFocused] = useState(false);
  const [nomeFocused, setNomeFocused] = useState(false);
  const [confirmarSenhaFocused, setConfirmarSenhaFocused] = useState(false);
  const [userId, setUserId] = useState('');

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '620962951335-jjvgnqms3mbh3bb9p7atu3m94970l4if.apps.googleusercontent.com',
    redirectUri: makeRedirectUri(),
    scopes: ['profile', 'email'],
  });



  // Observa a resposta da autenticação
  useEffect(() => {
    if (response?.type === 'success' && response.authentication) {
      const { idToken } = response.authentication;
      if (!idToken) {
        Alert.alert('Erro', 'Token do Google não foi retornado.');
        return;
      }

      const credential = GoogleAuthProvider.credential(idToken);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          Alert.alert('Sucesso', `Bem-vindo, ${userCredential.user.displayName}`);
          router.push(routes.login);
        })
        .catch((error) => {
          Alert.alert('Erro no login Google', error.message);
        });
    }

  }, [response]);

  const handleRegister = async () => {
    try {
      const uid = await registerUser({ nome, email, senha, confirmarSenha });
      setUserId(uid);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      setNome('');
      setEmail('');
      setSenha('');
      setConfirmarSenha('');
      router.push(routes.home);
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonLeft} onPress={() => router.back()}>
        <Feather name="arrow-left" size={40} color="#fff" />
      </TouchableOpacity>

      <View style={styles.containerLogo}>
        <Image source={images.logo} style={styles.logo} resizeMode="cover" />

        <View style={styles.textContainer}>
          <Text style={styles.headingText}>
            Seja bem vindo ao seu novo aplicativo!
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Feather name="user" size={20} color="#3D0000" />
            <View style={{ flex: 1, position: 'relative' }}>
              {(nomeFocused || nome) && (
                <Animatable.Text animation="fadeInUp" duration={300} style={styles.animation}>
                  <Text style={styles.labelText}>Nome</Text>
                </Animatable.Text>
              )}
              <TextInput
                placeholder={!nomeFocused ? 'Nome' : ''}
                placeholderTextColor="#3D0000"
                value={nome}
                onChangeText={setNome}
                onFocus={() => setNomeFocused(true)}
                onBlur={() => setNomeFocused(false)}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Feather name="mail" size={20} color="#3D0000" />
            <View style={{ flex: 1, position: 'relative' }}>
              {(emailFocused || email) && (
                <Animatable.Text animation="fadeInUp" duration={300} style={styles.animation}>
                  <Text style={styles.labelText}>E-mail</Text>
                </Animatable.Text>
              )}
              <TextInput
                placeholder={!emailFocused ? 'E-mail' : ''}
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
                  animation="fadeInUp"
                  duration={300}
                  style={styles.animation}
                >
                  <Text style={styles.labelText}>Senha</Text>
                </Animatable.Text>
              )}
              <TextInput
                placeholder={!senhaFocused ? 'Senha' : ''}
                placeholderTextColor="#3D0000"
                secureTextEntry={hidePass}
                value={senha}
                onChangeText={setSenha}
                onFocus={() => setSenhaFocused(true)}
                onBlur={() => setSenhaFocused(false)}
              />
              <TouchableOpacity style={styles.icon} onPress={() => setHidePass(!hidePass)}>
                {hidePass ? (
                  <Ionicons name="eye" size={28} color="#3D0000" />
                ) : (
                  <Ionicons name="eye-off" size={28} color="#3D0000" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Entypo name="lock" size={20} color="#3D0000" />
            <View style={{ flex: 1, position: 'relative' }}>
              {(confirmarSenhaFocused || confirmarSenha) && (
                <Animatable.Text
                  animation="fadeInUp"
                  duration={300}
                  style={styles.animationConfirmarSenha}
                >
                  <Text style={styles.labelText}>Confirmar senha</Text>
                </Animatable.Text>
              )}
              <TextInput
                placeholder={!confirmarSenhaFocused ? 'Confirmar senha' : ''}
                placeholderTextColor="#3D0000"
                secureTextEntry={hidePass}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                onFocus={() => setConfirmarSenhaFocused(true)}
                onBlur={() => setConfirmarSenhaFocused(false)}
              />
              <TouchableOpacity style={styles.icon} onPress={() => setHidePass(!hidePass)}>
                {hidePass ? (
                  <Ionicons name="eye" size={28} color="#3D0000" />
                ) : (
                  <Ionicons name="eye-off" size={28} color="#3D0000" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Botão de login com Google */}
        <TouchableOpacity
          style={styles.googleButtonContaine}
          onPress={() => {
            // Inicia o fluxo de login com Google através do promptAsync
            promptAsync();
          }}
        >
          <Image source={images.google} style={styles.googleImage} />
          <Text style={styles.TextGoogle}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <View style={styles.footerText}>
          <Text style={styles.footerAccont}>Já tem conta? </Text>
          <Pressable onPress={() => router.push(routes.login)}>
            <Text style={styles.footerCreate}>Entrar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}