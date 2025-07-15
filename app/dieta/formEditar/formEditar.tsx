import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import styles from './style';
import { MealPlan } from '~/constants/mealPlan';
import { DayKey } from '~/constants/diasSemana';
import { deleteMealPlanById, getMealById, getMealsByDay, updateMealPlanById } from '~/services/dietService';
import CustomModalSucesso from '~/components/modal/modalSucesso';
import Modal from '~/components/modal/modalAlert'
import ModalDelete from '~/components/modal/ModalDelete'
import { Header } from '~/components/header/header';



export default function FormEditar() {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [mealToDeleteId, setMealToDeleteId] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSucessoModal, setShowSucessoModal] = useState(false);
  const [SucessoMessage, setSucessoMessage] = useState('');
  const { dia } = useLocalSearchParams<{ dia?: string | string[] }>();
  const [meals, setMeals] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const { mealId } = useLocalSearchParams<{ mealId?: string }>();
  const [meal, setMeal] = useState<MealPlan | null>(null);

  useEffect(() => {
    const fetchMeal = async () => {
      if (!mealId) return;
      try {
        const data = await getMealById(mealId); // <- precisa existir
        setMeal(data);
      } catch (err) {
        setErrorMessage("Erro ao carregar a refeição.");
        setShowErrorModal(true);
      }
    };
    fetchMeal();
  }, [mealId]);



  const handleRemoveFood = (mealIndex: number, foodIndex: number) => {
    const updated = [...meals];
    updated[mealIndex].foods.splice(foodIndex, 1);
    setMeals(updated);
  };

  const handleUpdateMeal = async (meal: MealPlan) => {
    try {
      await updateMealPlanById(meal);
      setSucessoMessage("Refeição atualizada!");
      setShowSucessoModal(true);
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro ao salvar.");
      setShowErrorModal(true);
    }
  };

  const handleDeleteMeal = async (id: string) => {
    setMealToDeleteId(id);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!mealToDeleteId) return;

    try {
      await deleteMealPlanById(mealToDeleteId);
      setMeals(prev => prev.filter(meal => meal.id !== mealToDeleteId));
    } catch (error) {
      console.error('Erro ao deletar refeição:', error);
    } finally {
      setDeleteModalVisible(false);
      setMealToDeleteId(null);
    }
  };

  const handleFoodChange = (
    mealIndex: number,
    foodIndex: number,
    field: 'name' | 'quantity',
    value: string
  ) => {
    const updated = [...meals];
    if (field === 'name') {
      updated[mealIndex].foods[foodIndex].name = value;
    } else {
      // força número, ou mantém zero se vier vazio
      updated[mealIndex].foods[foodIndex].quantity = value ? Number(value) : 0;
    }
    setMeals(updated);
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#A14545" />;

  return (
    <ScrollView style={styles.container} >
      <Header title='Plano Alimentar' text="Acompanhe sua alimentação diária" />
      <Text style={styles.title} >Refeições de {String(dia).toUpperCase()}</Text>

      {meal && (
        <View style={styles.mealCard}>
          <Text style={styles.label}>Nome da Refeição:</Text>
          <TextInput
            placeholder="Nome da Refeição"
            value={meal.mealName}
            style={styles.input}
            onChangeText={text => setMeal({ ...meal, mealName: text })}
          />

          <Text style={styles.label}>Hora da Refeição:</Text>
          <TextInput
            placeholder="Hora da Refeição (opcional)"
            value={meal.mealTime}
            style={styles.input}
            onChangeText={text => setMeal({ ...meal, mealTime: text })}
          />

          <Text style={styles.label}>Alimentos:</Text>
          {meal.foods.map((food, foodIndex) => (
            <View key={foodIndex} style={styles.foodItemRow}>
              <TextInput
                placeholder="Nome do alimento"
                value={food.name}
                style={[styles.input, { flex: 2 }]}
                onChangeText={text => {
                  const updatedFoods = [...meal.foods];
                  updatedFoods[foodIndex].name = text;
                  setMeal({ ...meal, foods: updatedFoods });
                }}
              />
              <TextInput
                placeholder="Qtd (g)"
                value={food.quantity?.toString() ?? ''}
                style={[styles.input, { flex: 1, marginHorizontal: 8 }]}
                keyboardType="numeric"
                onChangeText={text => {
                  const updatedFoods = [...meal.foods];
                  updatedFoods[foodIndex].quantity = text ? Number(text) : 0;
                  setMeal({ ...meal, foods: updatedFoods });
                }}
              />
              <TouchableOpacity onPress={() => {
                const updatedFoods = meal.foods.filter((_, i) => i !== foodIndex);
                setMeal({ ...meal, foods: updatedFoods });
              }}>
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
      )}
      <Modal
        visible={showErrorModal}
        title='Erro'
        message={errorMessage}
        onClose={() => {
          setShowErrorModal(false);
          router.back();
        }}
      />
      <CustomModalSucesso
        visible={showSucessoModal}
        title='Sucesso'
        message={SucessoMessage}
        onClose={() => {
          setShowSucessoModal(false);
          router.replace('/dieta');
        }}
      />
      <ModalDelete
        visible={deleteModalVisible}
        title="Remover Alimento"
        message="Deseja remover este alimento de seu planejamento?"
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={confirmDelete}
      />
    </ScrollView>
  );
}
