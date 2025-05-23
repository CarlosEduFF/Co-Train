import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './style'; 

export default function Login() {
    return (  
     <View style={styles.container}>
       <Image 
        source={require('../../img/logo.png')}
        style={styles.logo}
        resizeMode="cover"/>

      <Text>
         Teste
      </Text>
  </View>
    );
}