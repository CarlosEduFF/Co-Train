// dieta/FormAdicionar/formAdicionar.tsx

import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from "./style";
import { Header } from '../../../components/header/header';
import { router } from 'expo-router';
import { DayKey, DIAS_SEMANA } from '~/constants/diasSemana';
import { useAuth } from '~/components/AuthContext';
import { routes } from '~/constants/routes';
import { savePlanoAlimentar } from '~/services/dietService';
import { FoodItem } from '~/constants/foodItem';



export default function MealPlanForm() {
  const [mealName, setMealName] = useState('');
  const [mealTime, setMealTime] = useState('');
  const [notify, setNotify] = useState(false);

  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [currentFood, setCurrentFood] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState('');
  const { user, loading: loadingAuth } = useAuth();

  // Redireciona se não estiver autenticado
  useEffect(() => {
    if (!loadingAuth && !user) {
      router.replace(routes.login);
    }
  }, [loadingAuth, user]);

  const [selectedDays, setSelectedDays] = useState<Record<DayKey, boolean>>({
    segunda: false, terca: false, quarta: false, quinta: false, sexta: false, sabado: false, domingo: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  //funcao add alimento a lista da refeicao
  const handleAddFood = () => {
    if (!currentFood.trim() || !currentQuantity.trim()) {
      Alert.alert('Atenção', 'Preencha o nome e a quantidade do alimento.');
      return;
    }
    const quantityNum = parseInt(currentQuantity, 10);
    if (isNaN(quantityNum) || quantityNum <= 0) {
      Alert.alert('Atenção', 'A quantidade deve ser um número válido.');
      return;
    }

    setFoods([...foods, { name: currentFood, quantity: quantityNum }]);
    setCurrentFood('');
    setCurrentQuantity('');
  };

  const handleRemoveFood = (indexToRemove: number) => {
    setFoods(prevFoods => prevFoods.filter((_, index) => index !== indexToRemove));
  };


  //func alternar a selecao dos dias da semana
  const toggleDay = (day: DayKey) => {
    setSelectedDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const handleSavePlan = async () => {
    if (!mealName.trim()) {
      Alert.alert('Erro de Validação', 'Por favor, informe o nome da refeição.');
      return;
    }
    if (foods.length === 0) {
      Alert.alert('Erro de Validação', 'Adicione pelo menos um alimento à refeição.');
      return;
    }
    const activeDays = Object.keys(selectedDays).filter(day => selectedDays[day as DayKey]);
    if (activeDays.length === 0) {
      Alert.alert('Erro de Validação', 'Selecione pelo menos um dia para esta refeição.');
      return;
    }

    setIsLoading(true);

    try {
      await savePlanoAlimentar({
        mealName: mealName.trim(),
        foods,
        mealTime: mealTime.trim(),
        notify,
        days: activeDays,
      });

      Alert.alert('Sucesso!', 'Seu plano alimentar foi salvo.');

      // Resetar campos após salvar
      setMealName('');
      setMealTime('');
      setNotify(false);
      setFoods([]);
      setSelectedDays({
        segunda: false,
        terca: false,
        quarta: false,
        quinta: false,
        sexta: false,
        sabado: false,
        domingo: false,
      });

      router.back();

    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um problema ao salvar seu plano. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Header title='Plano Alimentar' text="Acompanhe sua alimentação diária de forma organizada" />

      <Text style={styles.label}>Refeição</Text>
      <TextInput
        style={styles.input}
        placeholder="-- Ex: Café da Manhã"
        value={mealName}
        onChangeText={setMealName}
        placeholderTextColor="#999"
      />

      {foods.map((food, index) => (
        <View key={index} style={styles.addedFoodItem}>
          <Text style={styles.addedFoodText}>{food.name} - {food.quantity}g</Text>
          <TouchableOpacity onPress={() => handleRemoveFood(index)}>
            <Feather name="trash-2" size={20} color="red" />
          </TouchableOpacity>
        </View>
      ))}


      <View style={styles.foodInputContainer}>
        <View style={{ flex: 2, marginRight: 8 }}>
          <Text style={styles.label}>Alimento:</Text>
          <TextInput
            style={styles.input}
            placeholder="--"
            value={currentFood}
            onChangeText={setCurrentFood}
            placeholderTextColor="#999"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Quantidade: (g)</Text>
          <TextInput
            style={styles.input}
            placeholder="--"
            value={currentQuantity}
            onChangeText={setCurrentQuantity}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddFood}>
        <Text style={styles.addButtonText}>Adicionar Alimento</Text>
        <View style={styles.plusIcon}><Text style={styles.plusIconText}>+</Text></View>
      </TouchableOpacity>

      <Text style={styles.label}>Hora da Refeição: (opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="-- Ex: 08:00"
        value={mealTime}
        onChangeText={setMealTime}
        placeholderTextColor="#999"
      />

      <Text style={styles.sectionTitle}>Dias que tenho essa refeição:</Text>
      <View style={styles.daysContainer}>
        {DIAS_SEMANA.map(({ key, label }) => (
          <TouchableOpacity key={key} style={styles.dayItem} onPress={() => toggleDay(key)}>
            <View style={[styles.checkbox, selectedDays[key] && styles.checkboxChecked]} />
            <Text style={styles.checkboxLabel}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSavePlan} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#A14545" />
        ) : (
          <Text style={styles.saveButtonText}>SALVAR</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};