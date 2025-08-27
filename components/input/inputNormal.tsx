import {  View, Text,StyleSheet, TextInput, KeyboardTypeOptions , Dimensions } from 'react-native';
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
const { width } = Dimensions.get("window");
const scale = (size: number) => Math.min((width / 375) * size, size * 1.2);

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
    container: {
    marginBottom: scale(16),
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.Vermelho,
    borderRadius: scale(12),
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    fontSize: scale(16),
    marginTop: scale(10),
  },
  errorText: {
    color: "red",
    fontSize: scale(14),
    marginTop: scale(4),
  },
});