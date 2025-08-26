import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, Switch } from 'react-native';
import * as Animatable from "react-native-animatable";
import { Feather } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '~/config/firebase';
import { useAuth } from '~/components/AuthContext';
import { router, useRouter } from 'expo-router';
import { routes } from '~/constants/routes';
import styles from "./styles";
import TabLayout from '~/components/Tabs';
import ModalSair from '~/components/modal/modalSair';
import {useTranslation} from "react-i18next";
import {useLanguage} from "../../context/LanguageContext"

export default function config() {
  const {t} = useTranslation();
  const { language, toggleLanguage} = useLanguage();

  const [userData, setUserData] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);
 const [selectTab, setSelectTab] = useState('Perfil');
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

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
        Alert.alert(t('errors.userLoad'));
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user,t]);

  if (loading) return null;

  const handleLogout = async () => {
  try {
    setLogoutModalVisible(false);
    router.replace(routes.login); 
  } catch (error) {
    console.error("Erro ao sair:", error);
    Alert.alert(t("errors.logoutFail"));
  }
};

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <View style={styles.bunttonLeftContainer}>
          <TouchableOpacity style={styles.buttonLeft} onPress={() => router.back()}>
           <Feather name='arrow-left' size={40} color='#fff' />
          </TouchableOpacity>
          <Text style={styles.TituloSecao}>{t("settings.title")}</Text>
         </View>
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
          <Text style={styles.name}>{userData?.nome || t("common.loading")}</Text>
          <Text style={styles.email}>{userData?.email || ''}</Text>
        </View>
      
      <View style={styles.tabcontainer}>
            {['Perfil', 'Config'].map((tab)=>(
              <TouchableOpacity
              key={tab}
              onPress={()=> setSelectTab(tab)}
              style={[styles.tabButton, selectTab===tab && styles.tabButtonActive]}>
                <Text style={[styles.tabText, selectTab ===tab && styles.tabTextActive]}> {t(`settings.${tab}`)}</Text>
              </TouchableOpacity>
            ))}
      </View>
       {selectTab === 'Perfil' &&(
        <>
        <View style={styles.container}>
                <Text style={styles.TituloSecao}>{t("settings.userInfo")}</Text>
                <View style={styles.infocaixa}>
                  <Text style={styles.infoText}>{t("settings.name")}: {userData?.nome || '-'}</Text>
                  <Text style={styles.infoText}>{t("settings.email")}: {userData?.email || '-'}</Text>
                  <Text style={styles.infoText}>{t("settings.dateNasc")}: {userData?.dataNascimento || '-'}</Text>
                  <Text style={styles.infoText}>{t("settings.sex")}: {userData?.sexo || '-'}</Text>
                  <Text style={styles.infoText}>{t("settings.height")}: {userData?.altura ? `${userData.altura} cm` : '-'}</Text>
                  <Text style={styles.infoText}>{t("settings.weight")}: {userData?.peso ? `${userData.peso} kg` : '-'}</Text>
                  <Text style={styles.infoText}>{t("settings.objective")}: {userData?.objetivo || '-'}</Text>
                </View>
        
                <TouchableOpacity style={styles.button} onPress={() => router.push(routes.editProfile)}>
                  <Text style={styles.buttonText}>{t("settings.editProfile")}</Text>
                </TouchableOpacity>
              </View>
        </>
       )}
       {selectTab=== 'Config'&&(
        <>
        <View style={styles.optionsContainer}>
          <Text style={styles.TituloSecao}>{t("settings.mySettings")}</Text>
             {/* <View style={styles.optionCard}>
                <Feather name="moon" size={24} color="#950101" />
                   <Text style={styles.optionText}>{t("settings.darkMode")}</Text>
               <Switch
                  value={darkMode}
                  onValueChange={() => setDarkMode(!darkMode)}
                  thumbColor={darkMode ? '#950101' : '#ccc'}
                />
                
             </View>*/}
             <TouchableOpacity style={styles.optionCard} onPress={() =>toggleLanguage()}>
                 <Feather name="globe" size={24} color="#950101" />
                 <Text style={styles.optionText}>{t("settings.language")} ({language.toUpperCase()})</Text>
              </TouchableOpacity>

              <TouchableOpacity
               style={[styles.optionCard, { borderColor: '#950101' }]}
               onPress={() => setLogoutModalVisible(true)}>
                    <Feather name="log-out" size={24} color="#950101" />
                    <Text style={[styles.optionText, { color: '#950101' }]}>{t("settings.logout")}</Text>
             </TouchableOpacity>
          </View>
        </>
       )}

    </View>
    
    <ModalSair
            visible={logoutModalVisible}
            title={t("modals.removeTrain.title")}
            message={t("modals.removeTrain.message")}
             onCancel={() => setLogoutModalVisible(false)}
             onConfirm={handleLogout}
          />
          <TabLayout />
    </ScrollView>
    
  );
}
          

