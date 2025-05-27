import {colors} from '../../constants/colors'
import styles from "./style"
import { View ,Image,Text,TouchableOpacity} from 'react-native';
import { router } from 'expo-router';

export default function planejamentos() {
 return (
  <View style={styles.container}>
           <Image 
              source={require('../../img/logo.png')}
              style={styles.logo}
              resizeMode="cover"/>
            <Text style={styles.title}>Planejamento Semanal</Text>
            <Text style={styles.subtitle}>Gerencie de segunda a domingo: seus treinos organizados</Text>

    <View style={styles.centerContent}>
      <View style={styles.rigthcontent}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
          <Text style={styles.dayText}>SEGUNDA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
          <Text style={styles.dayText}>QUARTA-FEIRA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
          <Text style={styles.dayText}>SEXTA-FEIRA</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.leftcontent}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
          <Text style={styles.dayText}>TERÇA-FEIRA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
          <Text style={styles.dayText}>QUINTA-FEIRA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
          <Text style={styles.dayText}>SÁBADO</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.bottomContent}>
      <TouchableOpacity style={styles.buttonBottom} onPress={() => router.push('/')}>
            <Text style={styles.dayText}>DOMINGO</Text>
          </TouchableOpacity>
    </View>
    </View>
    
  </View>   
  );
}