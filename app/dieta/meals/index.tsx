import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import styles from './styles';
import { MealPlan } from '~/constants/mealPlan';
import { DayKey } from '~/constants/diasSemana';
import { deleteMealPlanById, getMealsByDay, updateMealPlanById } from '~/services/dietService';
import CustomModalSucesso from '~/components/modal/modalSucesso';
import Modal from '~/components/modal/modalAlert'
import ModalDelete from '~/components/modal/ModalDelete'
import { Header } from '~/components/header/header';



export default function Meals() {
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [mealToDeleteId, setMealToDeleteId] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showSucessoModal, setShowSucessoModal] = useState(false);
    const [SucessoMessage, setSucessoMessage] = useState('');
    const { dia } = useLocalSearchParams<{ dia?: string | string[] }>();
    const validDia = !Array.isArray(dia) && dia ? (dia as DayKey) : undefined;
    const [meals, setMeals] = useState<MealPlan[]>([]);
    const [loading, setLoading] = useState(false);

    const handleEditMeal = (mealId: string, day: DayKey) => {
        router.push({
            pathname: '/dieta/formEditar/formEditar',
            params: { mealId, dia: day },
        });
    };

    useEffect(() => {
        const fetchMeals = async () => {
            if (!dia || Array.isArray(dia)) return;
            const validDia = dia as DayKey;
            const data = await getMealsByDay(validDia);
            setMeals(data);
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

            {meals.map((meal, mealIndex) => (
                <View key={meal.id} style={styles.mealCard}>
                    <Text style={styles.label}>Nome da Refeição:</Text>
                    <Text>
                        {meal.mealName}
                    </Text>

                    <Text style={styles.label}>Hora da Refeição:</Text>
                    <Text>
                        {meal.mealTime}
                    </Text>

                    <Text style={styles.label}>Alimentos:</Text>
                    {meal.foods.map((food, foodIndex) => (
                        <View key={foodIndex} style={styles.foodItemRow}>
                            <Text>{food.name} - {food.quantity}g</Text>
                        </View>
                    ))}

                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => validDia && handleEditMeal(meal.id, validDia)}
                    >
                        <Text style={styles.saveButtonText}>Editar</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteMeal(meal.id)}>
                        <Text style={styles.deleteButtonText}>Deletar</Text>
                    </TouchableOpacity>
                </View >
            ))
            }
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
                    router.back();
                }}
            />
            <ModalDelete
                visible={deleteModalVisible}
                title="Remover Alimento"
                message="Deseja remover este alimento de seu planejamento?"
                onCancel={() => setDeleteModalVisible(false)}
                onConfirm={confirmDelete}
            />
        </ScrollView >
    );
}
