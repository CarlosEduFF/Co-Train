import { Feather } from '@expo/vector-icons';
import styles from "./styles";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import * as Animatable from "react-native-animatable";
import { router, useRouter } from 'expo-router';
import { routes } from '~/constants/routes';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '~/config/firebase';
import { useAuth } from '~/components/AuthContext';
import TabLayout from '~/components/Tabs';

export default function config() {
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
        <Text style={styles.TituloSecao}>Configurações</Text>
        <View style={styles.infocaixa}>
          <TouchableOpacity style={styles.button} onPress={() => router.push(routes.viewProfile)}>
            <Text style={styles.buttonText}>Meu Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.push(routes.editProfile)}>
            <Text style={styles.buttonText}>Modo Dark</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.push(routes.editProfile)}>
            <Text style={styles.buttonText}>Idioma</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.push(routes.editProfile)}>
            <Text style={styles.buttonText}>Modo Dark</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.push(routes.editProfile)}>
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
        </View>


      </View>
      <TabLayout />
    </ScrollView>
  );
}
