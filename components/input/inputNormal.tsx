import {  View, Text,StyleSheet, TextInput, KeyboardTypeOptions } from 'react-native';
import { Controller } from 'react-hook-form';
import React from 'react'
import {colors} from '../../constants/colors'

interface InputProps{
    name: string;
    control:any;
    placeholder?:string;
    error?:String;
    rules?:Object;
    keyboardType: KeyboardTypeOptions
}

export function Input({name,control,placeholder,rules,error,keyboardType}:InputProps) {
 return (
   <View style={styles.container}>
    <Controller
    control={control}
    name={name}
    rules={rules}
      render={({field:{onChange,onBlur,value}})=>(
        <TextInput
        style={styles.inputContainer}
        placeholder={placeholder}
        onBlur={onBlur}
        value={value}
        onChangeText={onChange}
        keyboardType='default'/>
         )}>
           </Controller>
             {error && <Text style={styles.errorText}>{error}</Text>}
       </View>
  );
}

const styles =StyleSheet.create({
    container:{
     marginBottom:16
    },
    inputContainer:{
    borderWidth:1,
    borderColor: colors.Vermelho,
    borderRadius:12,
    paddingHorizontal:20,
    paddingVertical:5,
    alignItems:'center',
    flexDirection:'row',
    marginTop:10,
   },

    errorText:{
      color:"red"
   } 
})