{/*
  import { Feather } from '@expo/vector-icons';
import styles from "./style";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import * as Animatable from "react-native-animatable";
import { router, useRouter } from 'expo-router';
import { routes } from '~/constants/routes';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '~/config/firebase';
import { useAuth } from '~/components/AuthContext';
import TabLayout from '~/components/Tabs';

export default function Perfil() {
  const [userData, setUserData] = useState<any>(null);


  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(routes.login);
    }
  }, [loading, user]);

  // Busca os dados do usuário autenticado
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user?.uid) return;

        const userRef = doc(firestore, 'Usuarios', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData(data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        Alert.alert('Erro ao carregar dados do usuário.');
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (loading) return null;


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>

        <View style={styles.headerButton}>
          <Image
            source={{ uri: userData?.fotoCapa || 'https://default-capa-url.com/capa.jpg' }}
            style={styles.headerBackground}
          />

          <Animatable.Image
            animation="zoomIn"
            duration={1500}
            source={{ uri: userData?.fotoPerfil || 'https://default-profile-url.com/perfil.jpg' }}
            style={styles.perfilImage}
            resizeMode="contain"
          />

          <Text style={styles.name}>{userData?.nome || 'Carregando...'}</Text>
          <Text style={styles.email}>{userData?.email || ''}</Text>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.TituloSecao}>Informações de Usuário</Text>
        <View style={styles.infocaixa}>
          <Text style={styles.infoText}>Nome Completo: {userData?.nome || '-'}</Text>
          <Text style={styles.infoText}>Email: {userData?.email || '-'}</Text>
          <Text style={styles.infoText}>Data de Nascimento: {userData?.dataNascimento || '-'}</Text>
          <Text style={styles.infoText}>Sexo: {userData?.sexo || '-'}</Text>
          <Text style={styles.infoText}>Altura: {userData?.altura ? `${userData.altura} cm` : '-'}</Text>
          <Text style={styles.infoText}>Peso: {userData?.peso ? `${userData.peso} kg` : '-'}</Text>
          <Text style={styles.infoText}>Objetivo: {userData?.objetivo || '-'}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.push(routes.editProfile)}>
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>
      <TabLayout />
    </ScrollView>
  );
}
*/}