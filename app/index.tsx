import React, { useState, useEffect } from "react";
import{View, Text, StyleSheet,Image, Touchable, TouchableOpacity, Platform,ImageSourcePropType} from 'react-native'
import {colors} from '../constants/colors'
import * as Animatable from "react-native-animatable";
import {Link} from 'expo-router'

export default function Index() {
 const backgroudImages : ImageSourcePropType[] =[
      require('../img/background2.jpeg'),
      require('../img/background2.jpeg'),
      require('../img/background3.jpeg'),
    ]
    const [backgroudImage, setBackgroundImage] = useState<ImageSourcePropType | null>(null);
      useEffect(() => {
        const randomImage = Math.floor(Math.random() *backgroudImages.length)
        setBackgroundImage(backgroudImages[randomImage])},[]);

    return(
     <View style={styles.container}>
       {backgroudImages&&(
         <Image 
           source={backgroudImage}
           style={styles.backgroundImage}
           resizeMode="cover"
            />)} 

         <View style={styles.containerLogo}>
            </View>
            <Animatable.View  animation="fadeInUp"
            style={styles.containerForm}>
             <Animatable.Image 
                animation="fadeInLeft"
                source={require('../img/logo.png')}
                style={styles.logo}
                resizeMode="cover"/>

                <Text style={styles.title}>
                    Uma plataforma de gerenciamento de treinos e dietas!
                </Text>
               
                <Link href="/Login" asChild>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Acessar Co-Train</Text>
                </TouchableOpacity>
                </Link>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    containerLogo:{
        flex:2
    },

    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: Platform.OS === 'ios' ? -100 : 0,
   },

    logo:{
        width: 200,  
        height: 100,  
        alignSelf: 'flex-start',  
        marginLeft: 20, 
        marginTop: 20,  
    },

    containerForm: {
       flex:1,
       padding: 40,
       backgroundColor:colors.white,
       borderTopLeftRadius: 50,
       borderTopRightRadius:50,
       paddingStart:'5%',
       paddingEnd:'5%'
    },

    title: {
       fontSize:20,
       margin:Platform.OS === 'ios'? 25 : 0, 
       fontWeight:'bold',
       marginTop: 14,
       marginBottom:10,
    }, 

    button:{
       position:'absolute',
       backgroundColor:colors.vermEscuro,
       borderRadius:50,
       paddingVertical:8,
       width: Platform.OS ==='ios'?'70%' : '60%',
       height: Platform.OS ==='ios'? '18%' : '21%',
       alignSelf:'center',
       bottom: Platform.OS ==='ios'? '20%' : '20%',
       alignItems:'center',
       justifyContent: 'center', 
    },

    buttonText:{
       fontSize:18,
       color:'#fff',
       fontWeight:'bold',
    }
});