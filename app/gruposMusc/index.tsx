import { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from "./style";
import { router, useFocusEffect } from 'expo-router';
import { Header } from '../../components/header/headerNoButton';
import { colors } from '../../constants/colors';
import { Treino } from '~/constants/train';
import { subscribeToTreinosGrupados } from '~/services/trainsService';
import { TreinoCard } from '~/components/trainCard/trainCardColun/trainCardColun';
import { useAuth } from '~/components/AuthContext';
import { routes } from '~/constants/routes';
import TabLayout from '~/components/Tabs';
import { Vi } from 'zod/v4/locales';

export default function GruposMusc() {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [loadingTreinos, setLoadingTreinos] = useState(true);

  const { user, loading: loadingAuth } = useAuth();

  // Redireciona se não estiver autenticado
  useEffect(() => {
    if (!loadingAuth && !user) {
      router.replace(routes.login);
    }
  }, [loadingAuth, user]);

  // Escuta os treinos agrupados
  useFocusEffect(
    useCallback(() => {
      if (!user) {
        return;
      }

      setLoadingTreinos(true);

      const unsubscribe = subscribeToTreinosGrupados(
        user,
        undefined,
        (treinosData) => {
          setTreinos(treinosData);
          setLoadingTreinos(false);
        },
        (error) => {
          console.error('Erro ao carregar treinos:', error);
          Alert.alert('Erro', 'Não foi possível carregar os treinos.');
          setTreinos([]);
          setLoadingTreinos(false);
        }
      );

      return () => unsubscribe?.();
    }, [user])
  );

  // Exibe loading geral se auth ou treinos estão carregando
  if (loadingAuth || loadingTreinos) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.vermEscuro} />
      </View>
    );
  }

  const handleCardPress = (id: string) => {
    router.push({
      pathname: '/gruposMusc/FormEditar/formEditar',
      params: { id },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Header
        title='Divisão por Grupos Musculares'
        text='Gerencie por grupos musculares seus treinos organizados'
      />
      
      <TouchableOpacity style={styles.button} onPress={() => router.push('/gruposMusc/FormAdicionar/formAdicionar')}>
        <Text style={styles.adicionarButton}>Adicionar</Text>
        <Feather name='plus-circle' size={30} color='#3D0000' />
      </TouchableOpacity>
      </View>

      {loadingTreinos ? (
        <ActivityIndicator size="large" color={colors.vermEscuro} style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={treinos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TreinoCard treino={item} onPress={handleCardPress} />
          )}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 50 }}>
              <Text>Nenhum treino adicionado.</Text>
              <Text>Clique em "Adicionar" para começar!</Text>
            </View>
          }
        />
      )}
      <TabLayout />
    </View>
  );
}