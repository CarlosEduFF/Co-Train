import {colors} from '../../constants/colors'
import styles from "./style"
import { View ,Image,TouchableOpacity,Text,ScrollView} from 'react-native';
import {Feather,Entypo} from '@expo/vector-icons';
import { router } from 'expo-router';

export default function home() {
 return (
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Image 
          source={require('../../img/logo.png')}
          style={styles.logo}
          resizeMode="cover"/>
          
            <TouchableOpacity style={styles.paineis} onPress={() => router.push('/planejamentos')}>
              <Image source={require("../../img/Planejamento.png")} style={styles.Image}></Image>
              <Text style={styles.titulos}>
                Planejamento Semanal
              </Text>
              <Text style={styles.textos}>
                Acompanhe o seu treino em cada dia da semana
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.paineis} onPress={() => router.push('/gruposMusc')}>
               <Image source={require("../../img/Muscle.png")} style={styles.Image}></Image>
              <Text style={styles.titulos}>
                Divisão por Grupos Musculares
              </Text>
              <Text style={styles.textos}>
                Acompanhe o seu treino de cada grupo muscular
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.paineis} onPress={() => router.push('/')}>
              <Image source={require("../../img/Nutricion.png")} style={styles.Image}></Image>
              <Text style={styles.titulos}>
                Plano Alimentar
              </Text>
              <Text style={styles.textos}>
                Acompannhe sua alimentação diária de forma prática e organizada
              </Text>
            </TouchableOpacity>
         </View>  
    </ScrollView>
  );
}
