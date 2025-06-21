import {colors} from '../../constants/colors'
import styles from "./style"
import { View ,Image,Text,TouchableOpacity} from 'react-native';
import { router } from 'expo-router';
import { Header } from '../../components/header/header';


export default function planejamentos() {
 return (
  <View style={styles.container}>
           <Header
                 title='Planejamento Semanal'
                  text='Gerencie de segunda a domingo: seus treinos organizados'
          />  
    <View style={styles.centerContent}>
      <View style={styles.rigthcontent}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/planejamentos/Adicionar/adicionar')}>
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