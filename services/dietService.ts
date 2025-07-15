import {
  collection,
  addDoc,
  serverTimestamp,
  where,
  query,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import { Alert } from 'react-native';
import { auth, firestore } from '~/config/firebase';
import { DayKey } from '~/constants/diasSemana';
import { FoodItem } from '~/constants/foodItem';
import { MealPlan } from '~/constants/mealPlan';

/**
 * Salva um plano alimentar no Firestore.
 */
export const savePlanoAlimentar = async (plano: {
  mealName: string;
  foods: FoodItem[];
  mealTime?: string;
  notify: boolean;
  days: string[];
}): Promise<void> => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('Usuário não autenticado.');
  }

  try {
    await addDoc(collection(firestore, 'plano_alimentar'), {
      mealName: plano.mealName,
      foods: plano.foods, // Agora pode ser array de objetos
      mealTime: plano.mealTime || '',
      notify: plano.notify,
      days: plano.days,
      userId: user.uid,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Erro ao salvar plano alimentar:", error);
    throw error;
  }
};

export const getMealsByDay = async (dia: DayKey): Promise<MealPlan[]> => {
  const user = auth.currentUser;
  if (!user) {

    return [];
  }

  if (typeof dia !== 'string') {

    return [];
  }

  try {
    const planoAlimentarRef = collection(firestore, 'plano_alimentar');
    const q = query(planoAlimentarRef, where('userId', '==', user.uid));
    const snapshot = await getDocs(q);

    const filtered = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as MealPlan))
      .filter(meal => meal.days.includes(dia));

    return filtered;
  } catch (error) {

    console.error(error);
    return [];
  }
};

/**
 * Atualiza uma refeição no plano alimentar
 * @param meal Refeição com os dados atualizados
 */
export const updateMealPlanById = async (meal: MealPlan): Promise<void> => {
  try {
    const mealRef = doc(firestore, 'plano_alimentar', meal.id);

    await updateDoc(mealRef, {
      mealName: meal.mealName,
      mealTime: meal.mealTime,
      foods: meal.foods,
      days: meal.days,
      notify: meal.notify,
      updatedAt: serverTimestamp(),
    });


  } catch (error) {
    console.error('Erro ao atualizar refeição:', error);

    throw error;
  }
};

/**
 * Exclui uma refeição do plano alimentar pelo ID.
 * @param id ID da refeição a ser deletada.
 */
export const deleteMealPlanById = async (id: string): Promise<void> => {
  try {
    const mealRef = doc(firestore, 'plano_alimentar', id);
    await deleteDoc(mealRef);
  } catch (error) {
    console.error('Erro ao deletar refeição:', error);
    throw error;
  }
};

export const getMealById = async (mealId: string): Promise<MealPlan | null> => {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    const mealRef = doc(firestore, 'plano_alimentar', mealId);
    const snapshot = await getDoc(mealRef);

    if (!snapshot.exists()) return null;

    const data = snapshot.data();

    // Confere se a refeição pertence ao usuário logado
    if (data.userId !== user.uid) return null;

    return {
      id: snapshot.id,
      ...data
    } as MealPlan;
  } catch (error) {
    console.error('Erro ao buscar refeição por ID:', error);
    return null;
  }
};