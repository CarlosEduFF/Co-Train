import { View, Text,StyleSheet,TouchableOpacity,FlatList,Modal} from 'react-native'
import React from 'react'
import {Controller} from 'react-hook-form'
import {colors} from '../../constants/colors'
import { Feather } from '@expo/vector-icons'
import { useState } from 'react'

interface OptionsProps{
    label:string;
    value:string|number;
    image?: string;

}

interface selectProps{
name:string;
control:any;
placeholder?:string;
error?:string;
options:OptionsProps[];
onSelectExtraData?: (item: OptionsProps) => void;
}

export function Select({name, control, placeholder, error,options, onSelectExtraData}:selectProps) {
    const [visible, setVisible]=useState(false);

 return (
   <View style={styles.containe}>
    <Controller 
    control={control}
    name={name}
    render={({field:{onChange, onBlur, value}})=>(
        <>
        <TouchableOpacity style={styles.select} onPress={()=>setVisible (true)}>
           <Text>{value? options.find(option=>option.value ===value)?.label:placeholder}</Text>
           <Feather name="arrow-down" size={16} color={'#000'}></Feather>
        </TouchableOpacity>
        <Modal
           visible={visible}
           animationType='fade'
           transparent={true}
           onRequestClose={()=>setVisible(false)}>

            <TouchableOpacity
              style={styles.modalContainer}
              activeOpacity={1}
              onPress={()=>setVisible(false)}>
                    <TouchableOpacity style={styles.modalContent}
                      activeOpacity={1}>
                        <FlatList 
                           contentContainerStyle={{gap:4}}
                           data={options}
                           keyExtractor={(item)=> item.value.toString()}
                           renderItem={({item})=>(
                            <TouchableOpacity style={styles.option}
                               onPress={()=>{
                               onChange(item.value);
                                onSelectExtraData?.(item);
                               setVisible(false)
                              }}>
                                 <Text>{item.label}</Text>
                           </TouchableOpacity>
                         )}>
                    </FlatList>  
                </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
        </>
          )}>
    </Controller>
         {error && <Text style={styles.errorText}>{error}</Text>}

   </View>
  );
}

const styles = StyleSheet.create({
        containe:{
          marginBottom:16
      },
        input:{
          height:50,
          backgroundColor:colors.white,
          paddingHorizontal:10,
          borderRadius:4,
          borderColor: colors.Vermelho,
      }, 
        errorText:{
          color:"red"
      },
        select:{
          flexDirection: 'row',
          height: 50,
          backgroundColor: colors.white,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          borderRadius: 15,
          borderColor: colors.vermEscuro,
          borderWidth: 2,
      },
        modalContainer:{
          backgroundColor:colors.vermEscuro,
          flex:1,
          justifyContent:'center'
      },
        modalContent:{
          backgroundColor:colors.white,
          marginHorizontal:10,
          borderRadius:8,
          padding:20
      },
        option:{
          paddingVertical:14,
          backgroundColor:'rgba(208,208,208,0.40)',
          borderRadius:4,
          paddingHorizontal:8,
          
      }
})