import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import styles from './style';
import { firestore, auth, FirebaseFirestore } from '../../../config/firebase';

type DayKey = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo';

interface FoodItem {
  name: string;
  quantity: number;
}

interface MealPlan {
  id: string;
  mealName: string;
  mealTime: string;
  foods: FoodItem[];
  days: DayKey[];
  notify: boolean;
}

export default function FormEditar() {
  const { dia } = useLocalSearchParams();
  const [meals, setMeals] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const user = auth.currentUser;
        if (!user || typeof dia !== 'string') return;

        const snapshot = await firestore
          .collection('plano_alimentar')
          .where('userId', '==', user.uid)
          .get();

        const filtered = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() } as MealPlan))
          .filter(meal => meal.days.includes(dia as DayKey));

        setMeals(filtered);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as refeições.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [dia]);

  const handleRemoveFood = (mealIndex: number, foodIndex: number) => {
    const updated = [...meals];
    updated[mealIndex].foods.splice(foodIndex, 1);
    setMeals(updated);
  };

  const handleUpdateMeal = async (meal: MealPlan) => {
    try {
      await firestore.collection('plano_alimentar').doc(meal.id).update({
        mealName: meal.mealName,
        mealTime: meal.mealTime,
        foods: meal.foods,
        days: meal.days,
        notify: meal.notify,
        updatedAt: FirebaseFirestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Sucesso', 'Refeição atualizada com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar.');
      console.error(error);
    }
  };

  const handleDeleteMeal = async (id: string) => {
    Alert.alert('Tem certeza?', 'Deseja realmente deletar essa refeição?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Deletar',
        style: 'destructive',
        onPress: async () => {
          try {
            await firestore.collection('plano_alimentar').doc(id).delete();
            setMeals(prev => prev.filter(meal => meal.id !== id));
            Alert.alert('Deletado', 'Refeição excluída com sucesso!');
          } catch (error) {
            Alert.alert('Erro', 'Falha ao deletar.');
            console.error(error);
          }
        }
      }
    ]);
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#A14545" />;

  return (
    <ScrollView style={styles.container} >
      <Text >Refeições de {String(dia).toUpperCase()}</Text>

      {meals.map((meal, mealIndex) => (
        <View key={meal.id} style={styles.mealCard}>
          <TextInput
           
            placeholder="Nome da Refeição"
            value={meal.mealName}
            onChangeText={text => {
              const updated = [...meals];
              updated[mealIndex].mealName = text;
              setMeals(updated);
            }}
          />

          <TextInput
           
            placeholder="Hora da Refeição (opcional)"
            value={meal.mealTime}
            onChangeText={text => {
              const updated = [...meals];
              updated[mealIndex].mealTime = text;
              setMeals(updated);
            }}
          />

          <Text style={styles.label}>Alimentos:</Text>
          {meal.foods.map((food, foodIndex) => (
            <View key={foodIndex} style={styles.foodItemRow}>
              <Text>{food.name} - {food.quantity}g</Text>
              <TouchableOpacity onPress={() => handleRemoveFood(mealIndex, foodIndex)}>
                <Feather name="trash-2" size={18} color="red" />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={styles.saveButton} onPress={() => handleUpdateMeal(meal)}>
            <Text style={styles.saveButtonText}>SALVAR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteMeal(meal.id)}>
            <Text style={styles.deleteButtonText}>DELETAR</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
