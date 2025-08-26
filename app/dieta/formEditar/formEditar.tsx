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
import {useTranslation} from "react-i18next";


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
  const {t} = useTranslation();
  useEffect(() => {
    
    const fetchMeal = async () => {
      if (!mealId) return;
      try {
        const data = await getMealById(mealId); // <- precisa existir
        setMeal(data);
      } catch (err) {
        setErrorMessage(t("errors.erroLoad"))
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
      setSucessoMessage(t("diet.foofUpdate"));
      setShowSucessoModal(true);
    } catch (error) {
      console.error(error);
      setErrorMessage(t("errors.erroSave"));
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
      <Header title={t("header.dietTitle")} text={t("header.dietTextEdit")} />
      <Text style={styles.title} >{t("diet.meal")}{String(dia).toUpperCase()}</Text>

      {meal && (
        <View style={styles.mealCard}>
          <Text style={styles.label}>{t("diet.nameMeal")}</Text>
          <TextInput
            placeholder="Nome da Refeição"
            value={meal.mealName}
            style={styles.input}
            onChangeText={text => setMeal({ ...meal, mealName: text })}
          />

          <Text style={styles.label}>{t("diet.hourMeal")}</Text>
          <TextInput
            placeholder="Hora da Refeição (opcional)"
            value={meal.mealTime}
            style={styles.input}
            onChangeText={text => setMeal({ ...meal, mealTime: text })}
          />

          <Text style={styles.label}>{t("diet.food")}</Text>
          {meal.foods.map((food, foodIndex) => (
            <><View key={foodIndex } style={styles.foodItemRow}>
              <TextInput
                placeholder="Nome do alimento"
                value={food.name}
                style={styles.inputAliments}
                onChangeText={text => {
                  const updatedFoods = [...meal.foods];
                  updatedFoods[foodIndex].name = text;
                  setMeal({ ...meal, foods: updatedFoods });
                } } />
              <TextInput
                placeholder="Qtd (g)"
                value={food.quantity?.toString() ?? ''}
                style={[styles.inputAliments, { marginLeft: 10 }]}
                keyboardType="numeric"
                onChangeText={text => {
                  const updatedFoods = [...meal.foods];
                  updatedFoods[foodIndex].quantity = text ? Number(text) : 0;
                  setMeal({ ...meal, foods: updatedFoods });
                } } />
            </View>
            <View style={styles.containerButtonLixeira}>
               <TouchableOpacity style={styles.ButtonLixeira} onPress={() => {
                 const updatedFoods = meal.foods.filter((_, i) => i !== foodIndex);
                  setMeal({ ...meal, foods: updatedFoods });
               } }>
                <Feather name="trash-2" size={18} color="red" />
              </TouchableOpacity>
              </View>
              </>
            
          ))}

          <TouchableOpacity style={styles.saveButton} onPress={() => handleUpdateMeal(meal)}>
            <Text style={styles.saveButtonText}>{t("buttons.saveButton")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteMeal(meal.id)}>
            <Text style={styles.deleteButtonText}>{t("buttons.delet")}</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        visible={showErrorModal}
        title={t("common.error")}
        message={errorMessage}
        onClose={() => {
          setShowErrorModal(false);
          router.back();
        }}
      />
      <CustomModalSucesso
        visible={showSucessoModal}
        title={t("common.success")}
        message={SucessoMessage}
        onClose={() => {
          setShowSucessoModal(false);
          router.replace('/dieta');
        }}
      />
      <ModalDelete
        visible={deleteModalVisible}
        title={t("modals.modalRemoverFood")}
        message={t("modals.planningFood")}
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={confirmDelete}
      />
    </ScrollView>
  );
}
