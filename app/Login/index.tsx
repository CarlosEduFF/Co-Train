import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert,Pressable } from 'react-native';
import { router } from 'expo-router';
import styles from './style'; 
import {Feather} from '@expo/vector-icons';

export default function Login() {
    return (  
     <View style={styles.container}>
         <Pressable style={styles.buttonLeft} onPress={() => router.back()}>
           <Feather name='arrow-left' size={40} color='#fff' />
         </Pressable>
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
   </View>
  </View>
    );
}