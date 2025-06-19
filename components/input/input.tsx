import { View, Text, StyleSheet,TextInput,KeyboardTypeOptions } from 'react-native';
import React, { useState } from 'react';
import { Controller, RegisterOptions } from 'react-hook-form';
import * as Animatable from 'react-native-animatable';
import {colors} from '../../constants/colors'

interface InputProps{
    name:string;
    control:any;
    placeholder?:string;
    rules?:object;
    error?: string;
    keyboardType:KeyboardTypeOptions;
    labelText: string;
}

export  function Input({name, control,placeholder,rules,error,keyboardType,labelText}:InputProps) {
    const [isFocused, setIsFocused] = useState(false);
 return (

          <View style={styles.inputContainer}>
             <Controller
                control={control}
                name={name}
                rules={rules}
                    // onChange é eu trocar o valor que está dentro do campo
                    //onBlur
                    //value valor que tem dentro dele
               render={({field:{onChange, onBlur, value}})=>(
                      <View style={{flex:1, position: 'relative'}}>
                          {(isFocused ||value)&&(
                            <Animatable.Text
                            animation='slideInUp'
                            duration={300}
                            style={styles.animation}
                          >
                            
                          <Text style={styles.labelText}>{labelText}</Text>
                          </Animatable.Text>
                          )}
                          <TextInput 
                             placeholder={placeholder}
                             placeholderTextColor="#3D0000"
                             value={value}
                             onChangeText={onChange}
                             onFocus={() => setIsFocused(true)}
                             onBlur={() => {
                             setIsFocused(false);
                             onBlur();
                            }}
                             keyboardType={keyboardType}
                            />  
                        </View>
                    )}>
               </Controller>
           </View>
    
  );
}

const styles = StyleSheet.create({
formContainer:{
     width:'100%',
   },

   inputContainer:{
    borderWidth:1,
    borderColor: colors.Vermelho,
    borderRadius:15,
    paddingHorizontal:20,
    paddingVertical:5,
    alignItems:'center',
    flexDirection:'row',
    marginTop:35,
   },

    animation:{
     height:30,
     width:65,
     borderRadius:15,
     backgroundColor: colors.white,
     position: 'absolute',
     top: -20, 
     fontSize: 16, 
     color: '#3D0000',
    },
    labelText:{ 
     color: '#3D0000',
     textAlign: 'center',
    }
})