import styles from "./style"
import { View ,Image,TouchableOpacity,Text,ScrollView} from 'react-native';
import { router, useRouter } from 'expo-router';
import { images } from '~/constants/images';
import { routes } from "~/constants/routes";
import { useAuth } from "~/components/AuthContext";
import { useEffect } from "react";
import TabLayout from '~/components/Tabs';

export default function home() {

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(routes.login);
    }
  }, [loading, user]);


 return (
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Image 
          source={images.logo}
          style={styles.logo}
          resizeMode="cover"/>
          
            <TouchableOpacity style={styles.paineis} onPress={() => router.push('/planejamentos')}>
              <Image source={images.plan} style={styles.Image}></Image>
              <Text style={styles.titulos}>
                Planejamento Semanal
              </Text>
              <Text style={styles.textos}>
                Acompanhe o seu treino em cada dia da semana.
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.paineis} onPress={() => router.push('/gruposMusc')}>
               <Image source={images.muscle} style={styles.Image}></Image>
              <Text style={styles.titulos}>
                Divisão por Grupos Musculares
              </Text>
              <Text style={styles.textos}>
                Acompanhe o seu treino de cada grupo muscular.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paineis} onPress={() => router.push('/dieta')}>
               <Image source={images.dieta} style={styles.Image}></Image>
              <Text style={styles.titulos}>
                Plano Alimentar
              </Text>
              <Text style={styles.textos}>
                Acompanhe a sua alimentação diária de forma organizada.
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={[styles.paineis]} onPress={() => router.push('/profile/perfil')}>
              <Image source={require("../../assets/Icons/Perfil.png")} style={styles.Image}></Image>
              <Text style={styles.titulos}>
                Meu Perfil
              </Text>
              <Text style={styles.textos}>
                Acompanhe e gerencie seu perfil de usuário.
              </Text>
            </TouchableOpacity>

         </View>
    </ScrollView>
  );
}
