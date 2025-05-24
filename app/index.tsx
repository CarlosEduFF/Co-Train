import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, ImageSourcePropType } from 'react-native';
import { colors } from '../constants/colors';
import * as Animatable from "react-native-animatable";
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function Index() {
 const backgroundImages: ImageSourcePropType[] = [
    require('../img/background2.jpeg'),
    require('../img/background2.jpeg'),
    require('../img/background3.jpeg'),
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
          source={require('../img/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Animatable.Text animation="fadeIn" delay={500} style={styles.title}>
          Sua plataforma de gerenciamento de treinos e dietas!
        </Animatable.Text>

        <Link href="/Login" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Acessar Co-Train</Text>
          </TouchableOpacity>
        </Link>
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
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },

  logo: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  title: {
    marginTop:'50%',
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
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});