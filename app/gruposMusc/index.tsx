// telas/GruposMusc/index.tsx
import { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from "./style";
import { router, useFocusEffect } from 'expo-router';
import { Header } from '../../components/header/headerNoButton';
import { colors } from '../../constants/colors';

import { TreinoCard } from '~/components/trainCard/TrainCardMod/trainCard';
import { useAuth } from '~/components/AuthContext';
import { routes } from '~/constants/routes';
import TabLayout from '~/components/Tabs';
import ModalDelete from '~/components/modal/ModalDelete';
import CustomModalSucesso from '~/components/modal/modalSucesso';
import { Treino } from '~/types/train';
import { deleteTrainById, subscribeToTrains } from '~/services/Train';


type FilterMode = 'todos' | 'grupo' | 'plano';

export default function GruposMusc() {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [loadingTreinos, setLoadingTreinos] = useState(true);
  const { user, loading: loadingAuth } = useAuth();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [SucessoMessage, setSucessoMessage] = useState('');
  const [showSucessoModal, setShowSucessoModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [treinoIdSelecionado, setTreinoIdSelecionado] = useState<string | null>(null);

  // filtro: 'todos' | 'grupo' | 'plano'
  const [filterMode, setFilterMode] = useState<FilterMode>('grupo');

  // Redireciona se não estiver autenticado
  useEffect(() => {
    if (!loadingAuth && !user) {
      router.replace(routes.login);
    }
  }, [loadingAuth, user]);

  // Subscrição que re-executa quando o usuário ou o filtro mudam
  useFocusEffect(
    useCallback(() => {
      if (!user) return;

      setLoadingTreinos(true);

      const modo = filterMode === 'todos' ? undefined : (filterMode as 'grupo' | 'plano');

      const unsubscribe = subscribeToTrains(
        user,
        { dia: undefined, modo },
        (treinosData) => {
          setTreinos(treinosData);
          setLoadingTreinos(false);
        },
        (error: any) => {
          console.error('Erro ao carregar treinos:', error);
          Alert.alert('Erro', 'Não foi possível carregar os treinos.');
          setTreinos([]);
          setLoadingTreinos(false);
        }
      );

      return () => {
        try {
          unsubscribe?.();
        } catch (e) {
          // ignore
        }
      };
    }, [user, filterMode])
  );

  // Exibe loading geral se auth ou treinos estão carregando
  if (loadingAuth || loadingTreinos) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.vermEscuro} />
      </View>
    );
  }

  const handleDeleteTreino = async (id?: string, confirm?: boolean) => {
    if (!confirm) {
      if (id) setTreinoIdSelecionado(id);
      setDeleteModalVisible(true);
      return;
    }

    if (!treinoIdSelecionado) return;
    setDeleteModalVisible(false);
    try {
      await deleteTrainById(treinoIdSelecionado);
      setSucessoMessage('Treino excluído com sucesso!');
      setShowSucessoModal(true);
    } catch (error) {
      console.error('Erro ao excluir treino:', error);
      setErrorMessage('Erro ao excluir treino.');
      setShowErrorModal(true);
    } finally {
      setTreinoIdSelecionado(null);
    }
  };

  const handleCardPress = (id: string) => {
    router.push({
      pathname: '/planejamentos/ViewTrain/ViewTrain',
      params: { id: id }
    });
  };
  const handleCardEdit = (id: string) => {
    router.push({
      pathname: '/gruposMusc/FormEditar/formEditar',
      params: { id },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Header
          title="Divisão por Grupos Musculares"
          text="Gerencie por grupos musculares seus treinos organizados"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/gruposMusc/FormAdicionar/formAdicionar")}
        >
          <Text style={styles.adicionarButton}>Adicionar</Text>
          <Feather name="plus-circle" size={30} color="#3D0000" />
        </TouchableOpacity>
      </View>

      {/* --- Segmented control --- */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 12,
        }}
      >
        <TouchableOpacity
          onPress={() => setFilterMode("todos")}
          style={[
            {
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 8,
              marginHorizontal: 6,
            },
            filterMode === "todos"
              ? { backgroundColor: colors.vermEscuro }
              : { borderWidth: 1, borderColor: "#ddd" },
          ]}
        >
          <Text style={filterMode === "todos" ? { color: "#fff" } : { color: "#333" }}>
            Todos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilterMode("grupo")}
          style={[
            {
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 8,
              marginHorizontal: 6,
            },
            filterMode === "grupo"
              ? { backgroundColor: colors.vermEscuro }
              : { borderWidth: 1, borderColor: "#ddd" },
          ]}
        >
          <Text style={filterMode === "grupo" ? { color: "#fff" } : { color: "#333" }}>
            Grupos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilterMode("plano")}
          style={[
            {
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 8,
              marginHorizontal: 6,
            },
            filterMode === "plano"
              ? { backgroundColor: colors.vermEscuro }
              : { borderWidth: 1, borderColor: "#ddd" },
          ]}
        >
          <Text style={filterMode === "plano" ? { color: "#fff" } : { color: "#333" }}>
            Planos
          </Text>
        </TouchableOpacity>
      </View>

      {loadingTreinos ? (
        <ActivityIndicator
          size="large"
          color={colors.vermEscuro}
          style={{ flex: 1 }}
        />
      ) : (
        <FlatList
          // 🔹 aplica o filtro antes de renderizar
          data={treinos.filter(
            (t) => filterMode === "todos" || t.modo === filterMode
          )}
          keyExtractor={(item, index) => item.id ?? index.toString()}
          renderItem={({ item }) => (
            <TreinoCard
              treino={item}
              onPress={handleCardPress}
              onEdit={handleCardEdit}
              onDelete={() => handleDeleteTreino(item.id)}
              onPurpose="View" // ou "Edit", dependendo da tela
            />

          )}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={{ alignItems: "center", marginTop: 50 }}>
              <Text>Nenhum treino encontrado para o filtro selecionado.</Text>
              <Text>Clique em "Adicionar" para começar!</Text>
            </View>
          }
        />
      )}

      <TabLayout />

      <CustomModalSucesso
        visible={showSucessoModal}
        title="Sucesso"
        message={SucessoMessage}
        onClose={() => {
          setShowSucessoModal(false);
        }}
      />

      <ModalDelete
        visible={deleteModalVisible}
        title="Remover Treino"
        message="Deseja remover este treino do planejamento semanal?"
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={() => handleDeleteTreino(undefined, true)} // 2ª etapa
      />
    </View>
  );
}
