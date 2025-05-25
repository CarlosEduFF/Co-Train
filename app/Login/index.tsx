import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Alert,Pressable} from 'react-native';
import { router } from 'expo-router';
import styles from './style'; 
import {Feather,Entypo,Ionicons} from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';



export default function Login() {

    const [hidePass, setHidePass] = useState(true)

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
                <TextInput 
                  placeholder="E-mail"
                  placeholderTextColor="#3D0000"
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: '#800000' } }}
                  >   
                </TextInput>
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