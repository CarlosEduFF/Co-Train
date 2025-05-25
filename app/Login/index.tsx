import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Alert,Pressable,TextInput} from 'react-native';
import { router } from 'expo-router';
import styles from './style'; 
import {Feather,Entypo,Ionicons} from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';




export default function Login() {

    const [hidePass, setHidePass] = useState(true);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [senhaFocused, setsenhaFocused] = useState(false);


    return (  
    <View style={styles.container}>
         <TouchableOpacity style={styles.buttonLeft} onPress={() => router.back()}>
           <Feather name='arrow-left' size={40} color='#fff' />
         </TouchableOpacity>

      <View style={styles.containerLogo}>
       <Image 
        source={require('../../img/logo.png')}
        style={styles.logo}
        resizeMode="cover"/>
        
        <View style={styles.textContainer}>
          <Text style={styles.headingText}>
             Seja bem vindo de volta!
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Feather name="mail" size={20} color="#3D0000" />
              <View style={{flex:1}}>
                {(emailFocused || email) && (
                <Animatable.Text
                  animation="fadeInUp"
                  duration={300}
                  style={{ fontSize: 16, color: '#3D0000', marginLeft: 5, }}
                >
                  E-mail
                </Animatable.Text>
              )}
                <TextInput 
                  placeholder={!emailFocused ? "E-mail" : ""}
                  placeholderTextColor="#3D0000"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  >   
                </TextInput>
         </View>
         </View>

        <View style={styles.inputContainer}>
         <Entypo name="lock" size={20} color="#3D0000"  />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#3D0000"
            secureTextEntry={hidePass}>
          </TextInput> 
          <TouchableOpacity style={styles.icon} onPress={()=>setHidePass(!hidePass)}>
            {hidePass?
          <Ionicons name="eye" size={28} color="#3D0000" />
          :
          <Ionicons name="eye-off" size={28} color="#3D0000" />
        }
          </TouchableOpacity>
          </View>

          </View>
            <Pressable style={styles.headingText} onPress={() => router.push('/')}>
              <Text style={styles.passwordText}>Esqueci minha senha</Text>
            </Pressable>

          <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleButtonContaine} onPress={() => router.push('/')}>
            <Image source={require("../../img/google.png")} style={styles.googleImage}></Image>
            <Text style={styles.TextGoogle}>Google</Text>
          </TouchableOpacity>

          <View style={styles.footerText}>
            <Text style={styles.footerAccont}>Você nâo possui uma conta? </Text>
               <Pressable onPress={() => router.push('/cadastro')}>
                  <Text style={styles.footerCreate}>Crie uma! </Text>
               </Pressable>
          </View>
   </View>
  </View>
    );
}