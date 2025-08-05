import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType,Dimensions  } from 'react-native';
import { colors } from '../constants/colors';
import * as Animatable from "react-native-animatable";
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { images } from "~/constants/images";
import { routes } from "~/constants/routes";
const { height, width } = Dimensions.get("window");
export default function Index() {
  const backgroundImages: ImageSourcePropType[] = [
    images.backg1,
    images.backg2,
    images.backg3,
  ];
  

  const [backgroundImage, setBackgroundImage] = useState<ImageSourcePropType | null>(null);

  useEffect(() => {
    const randomImage = Math.floor(Math.random() * backgroundImages.length);
    setBackgroundImage(backgroundImages[randomImage]);
  }, []);

  return (
    <View style={styles.container}>
      {backgroundImage && (
        <Image source={backgroundImage} style={styles.backgroundImage} resizeMode="cover" />
      )}

      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']}
        style={styles.gradientOverlay}
      />

      <BlurView intensity={50} style={styles.blurContainer}>
        <Animatable.Image
          animation="zoomIn"
          duration={1500}
          source={images.logo}
          style={styles.logo}
          resizeMode="contain"
        />

        <Animatable.Text animation="fadeIn" delay={500} style={styles.title}>
          Sua plataforma de gerenciamento de treinos e dietas!
        </Animatable.Text>

        <TouchableOpacity style={styles.button} onPress={() => router.replace(routes.login as any)}>
          <Text style={styles.buttonText}>Acessar Co-Train</Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },

  blurContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },

  logo: {
    width: width < 400 ? 120 : 180,
    height: width < 400 ? 120 : 180,
    borderRadius: width < 400 ? 60 : 90,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  title: {
    marginTop: '50%',
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  button: {
    backgroundColor: colors.vermEscuro,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },

  buttonText: {
    fontSize: width < 400 ? 16 : 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});