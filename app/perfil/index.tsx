import { Feather } from '@expo/vector-icons';
import {colors} from '../../constants/colors'
import styles from "./style"
import {z} from 'zod'
import {zodResolver} from'@hookform/resolvers/zod'
import {Input } from '../../components/input/inputNormal'
import {View, Text, TouchableOpacity, Image, Alert,Pressable,TextInput,ScrollView} from 'react-native';
import * as Animatable from "react-native-animatable";
import {useForm} from 'react-hook-form'
import { router } from 'expo-router';



export default function perfil() {
 const userData = {
    imageProfile: 'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=150&q=80',
    name: 'Danilo',
    email: 'contato@empresaexemplo.com',
    endereco: 'São Paulo - SP',
  
  };

 return ( 
  <ScrollView contentContainerStyle={styles.scrollContainer}>
          
      <View style={styles.header}>
        
          <TouchableOpacity style={styles.buttonLeft} onPress={() => router.back()}>
             <Feather name='arrow-left' size={40} color='#fff' />
          </TouchableOpacity>
       
       <View style={styles.headerButton}>
        <Image
          source={{ uri: userData.imageProfile }}
          style={styles.headerBackground}
        />

        <Animatable.Image
          animation="zoomIn"
          duration={1500}
          source={{ uri: userData.imageUrl }}
          style={styles.perfilImage}
          resizeMode="contain"
        />

        <Text style={styles.nome}>{userData.name}</Text>
        <Text style={styles.email}>{userData.email}</Text>
      </View>
</View>
      <View style={styles.container}>
        <Text style={styles.TituloSecao}>Informações de Usuário</Text>
        <View style={styles.infocaixa}>
          <Text style={styles.infoText}>Nome Completo: {userData.name}</Text>
          <Text style={styles.infoText}>Email: {userData.email}</Text>
          <Text style={styles.infoText}>Endereço: {userData.endereco}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/EditarPerfil')}>
                    <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
    
  );
}
