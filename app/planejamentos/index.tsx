import styles from "./style";
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Header } from '../../components/header/headerNoButton';
import TabLayout from '~/components/Tabs';
import { Feather } from "@expo/vector-icons";

export default function Planejamentos() {

  const handleDayPress = (dia: string) => {
    router.push({
      pathname: '/planejamentos/ViewScreen/ViewScreen',
      params: { dia: dia }
    });
  };

  const AddDayPress = () => {
    router.push({
      pathname: '/planejamentos/AddScreen/AddScreen',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Header
          title='Planejamento Semanal'
          text='Gerencie de segunda a domingo: seus treinos organizados'
        />

        <TouchableOpacity style={styles.addbutton} onPress={AddDayPress}>
          <Text style={styles.TextadicionarButton}>Adicionar Refeição</Text>
          <Feather name='plus-circle' size={24} color='#3D0000' />
        </TouchableOpacity>
      </View>
      <View style={styles.centerContent}>
        <View style={styles.rigthcontent}>
          <TouchableOpacity style={styles.button} onPress={() => handleDayPress('segunda')}>
            <Text style={styles.dayText}>Segunda-Feira</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleDayPress('quarta')}>
            <Text style={styles.dayText}>Quarta-Feira</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleDayPress('sexta')}>
            <Text style={styles.dayText}>Sexta-Feira</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.leftcontent}>
          <TouchableOpacity style={styles.button} onPress={() => handleDayPress('terca')}>
            <Text style={styles.dayText}>Terça-Feira</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleDayPress('quinta')}>
            <Text style={styles.dayText}>Quinta-Feira</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleDayPress('sabado')}>
            <Text style={styles.dayText}>Sábado</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContent}>
          <TouchableOpacity style={styles.buttonBottom} onPress={() => handleDayPress('domingo')}>
            <Text style={styles.dayText}>Domingo</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TabLayout />
    </View>
  );
}