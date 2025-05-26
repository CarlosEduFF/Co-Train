import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Alert,Pressable,TextInput} from 'react-native';
import { router } from 'expo-router';
import styles from './style'; 
import {Feather,Entypo,Ionicons} from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function cadastro() {

    const [hidePass, setHidePass] = useState(true);
    const [nome, setNome] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [senhaFocused, setSenhaFocused] = useState(false);
    const [nomeFocused, setNomeFocused] = useState(false);
    const [confirmarSenhaFocused, setConfirmarSenhaFocused] = useState(false);

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
             Seja bem vindo ao seu novo aplicativo!
          </Text>
        </View>

        <View style={styles.formContainer}>

        <View style={styles.inputContainer}>
            <Feather name="user" size={20} color="#3D0000" />
              <View style={{flex:1, position: 'relative'}}>
                {(nomeFocused || nome) && (
                <Animatable.Text
                  animation="fadeInUp"
                  duration={300}
                  style={styles.animation}
                >
                 <Text style={styles.labelText}>Nome</Text>
                </Animatable.Text>
              )}
                <TextInput 
                  placeholder={!nomeFocused ? "Nome" : ""}
                  placeholderTextColor="#3D0000"
                  value={nome}
                  onChangeText={setNome}
                  onFocus={() => setNomeFocused(true)}
                  onBlur={() => setNomeFocused(false)}
                  >   
                </TextInput>
         </View>
         </View>

          <View style={styles.inputContainer}>
            <Feather name="mail" size={20} color="#3D0000" />
              <View style={{flex:1, position: 'relative'}}>
                {(emailFocused || email) && (
                <Animatable.Text
                  animation="fadeInUp"
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
                  >   
                </TextInput>
         </View>
         </View>

        <View style={styles.inputContainer}>
         <Entypo name="lock" size={20} color="#3D0000"  />
          <View style={{flex:1, position: 'relative'}}>
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
            placeholder={!senhaFocused ? "Senha" : ""}
            placeholderTextColor="#3D0000"
            secureTextEntry={hidePass}
            value={senha}
            onChangeText={setSenha}
            onFocus={() => setSenhaFocused(true)}
            onBlur={() => setSenhaFocused(false)}>
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

            <View style={styles.inputContainer}>
         <Entypo name="lock" size={20} color="#3D0000"  />
          <View style={{flex:1, position: 'relative'}}>
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
            placeholder={!confirmarSenhaFocused ? "Confirmar senha" : ""}
            placeholderTextColor="#3D0000"
            secureTextEntry={hidePass}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            onFocus={() => setConfirmarSenhaFocused(true)}
            onBlur={() => setConfirmarSenhaFocused(false)}>
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
          </View>

          

          <TouchableOpacity style={styles.button} onPress={() => router.push('/Login')}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>


          <View style={styles.footerText}>
            <Text style={styles.footerAccont}>Já tem conta? </Text>
               <Pressable onPress={() => router.push('/Login')}>
                  <Text style={styles.footerCreate}>Entrar </Text>
               </Pressable>
          </View>
   </View>
  </View>
    );
}