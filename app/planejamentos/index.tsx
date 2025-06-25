import { colors } from '../../constants/colors';
import styles from "./style";
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Header } from '../../components/header/header';

const DIAS_SEMANA = [
  { nome: 'SEGUNDA', valor: 'segunda' },
  { nome: 'TERÇA-FEIRA', valor: 'terca' },
  { nome: 'QUARTA-FEIRA', valor: 'quarta' },
  { nome: 'QUINTA-FEIRA', valor: 'quinta' },
  { nome: 'SEXTA-FEIRA', valor: 'sexta' },
  { nome: 'SÁBADO', valor: 'sabado' },
];

export default function Planejamentos() {

  const handleDayPress = (dia: string) => {
    router.push({
      pathname: '/planejamentos/Adicionar/adicionar',
      params: { dia: dia } // envia o dia da semana
    });
  };

  return (
    <View style={styles.container}>
      <Header
        title='Planejamento Semanal'
        text='Gerencie de segunda a domingo: seus treinos organizados'
      />
      <View style={styles.centerContent}>
        <View style={styles.rigthcontent}>
          <TouchableOpacity style={styles.button} onPress={() => handleDayPress('segunda')}>
            <Text style={styles.dayText}>SEGUNDA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleDayPress('quarta')}>
            <Text style={styles.dayText}>QUARTA-FEIRA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleDayPress('sexta')}>
            <Text style={styles.dayText}>SEXTA-FEIRA</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.leftcontent}>
          <TouchableOpacity style={styles.button} onPress={() => handleDayPress('terca')}>
            <Text style={styles.dayText}>TERÇA-FEIRA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleDayPress('quinta')}>
            <Text style={styles.dayText}>QUINTA-FEIRA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleDayPress('sabado')}>
            <Text style={styles.dayText}>SÁBADO</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.bottomContent}>
          <TouchableOpacity style={styles.buttonBottom} onPress={() => handleDayPress('domingo')}>
            <Text style={styles.dayText}>DOMINGO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}