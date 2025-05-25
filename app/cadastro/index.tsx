import {colors} from '../../constants/colors'
import styles from "./style"
import { View ,Image,Text, TouchableOpacity} from 'react-native';
import {Feather,Entypo} from '@expo/vector-icons';
import { router } from 'expo-router';

export default function cadastro() {
 return (
   <View style={styles.container}>
         <Image 
          source={require('../../img/logo.png')}
          style={styles.logo}
          resizeMode="cover"/>
         <Text style={styles.text}>
           CADASTRO
         </Text>

          <TouchableOpacity style={styles.buttonLeft} onPress={() => router.back()}>
            <Feather name='arrow-left' size={40} color='#fff' />
          </TouchableOpacity>
         
    </View>   
  );
} 