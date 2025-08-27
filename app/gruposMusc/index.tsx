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
import {useTranslation} from "react-i18next";

type FilterMode = 'todos' | 'grupo' | 'plano';

export default function GruposMusc() {
  const {t} = useTranslation();
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
          Alert.alert(t("errors.erroTrain"));
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
      setSucessoMessage(t("errors.deleteSuccess"));
      setShowSucessoModal(true);
    } catch (error) {
      console.error('Erro ao excluir treino:', error);
      setErrorMessage(t("errors.deleteError"));
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
          title={t("header.grupsMuscTitle")}
          text={t("header.grupsMuscText")}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/gruposMusc/FormAdicionar/formAdicionar")}
        >
          <Text style={styles.adicionarButton}>{t("grupsMusc.buttonAdd")}</Text>
          <Feather name="plus-circle" size={30} color="#3D0000" />
        </TouchableOpacity>
      </View>

      {/* --- Segmented control --- */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#ccc',
          borderRadius: 20,
          marginStart:40,
          marginEnd:40,
          padding:3
        }}
      >
        <TouchableOpacity
          onPress={() => setFilterMode("todos")}
          style={[
            {
            paddingVertical:13,
            paddingHorizontal: 28,
            borderRadius: 20,
            backgroundColor: 'transparent',
            },
            filterMode === "todos"
              ? { backgroundColor: colors.vermEscuro }
              : { },
          ]}
        >
          <Text style={filterMode === "todos" ? { color: "#fff" } : { color: "#8d8d8dff" }}>
            {t("grupsMusc.tabs.all")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilterMode("grupo")}
          style={[
            {
              paddingVertical:13,
              paddingHorizontal: 28,
              borderRadius: 20,
              backgroundColor: 'transparent',
            },
            filterMode === "grupo"
              ? { backgroundColor: colors.vermEscuro }
              : { },
          ]}
        >
          <Text style={filterMode === "grupo" ? { color: "#fff" } : { color: "#8d8d8dff" }}>
            {t("grupsMusc.tabs.grups")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilterMode("plano")}
          style={[
            {
              paddingVertical:13,
              paddingHorizontal: 28,
            borderRadius: 20,
              backgroundColor: 'transparent',
            },
            filterMode === "plano"
              ? { backgroundColor: colors.vermEscuro }
              : { },
          ]}
        >
          <Text style={filterMode === "plano" ? { color: "#fff" } : { color: "#8d8d8dff" }}>
            {t("grupsMusc.tabs.planning")}
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
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={{ alignItems: "center", marginTop: 50 }}>
              <Text>{t("grupsMusc.filterSelect")}</Text>
              <Text>{t("grupsMusc.clickAdd")}</Text>
            </View>
          }
        />
      )}

      <TabLayout />

      <CustomModalSucesso
        visible={showSucessoModal}
        title={t("modals.modalSuccessTitle")}
        message={SucessoMessage}
        onClose={() => {
          setShowSucessoModal(false);
        }}
      />

      <ModalDelete
        visible={deleteModalVisible}
        title={t("modals.removeTrain.title")}
        message={t("modals.removeTrain.message")}
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={() => handleDeleteTreino(undefined, true)} // 2ª etapa
      />
    </View>
  );
}
