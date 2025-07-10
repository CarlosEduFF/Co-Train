import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../constants/colors';


interface CustomAlertModal{
    visible:boolean;
    title?: string;
    message:string;
    onClose: ()=> void;
}


export default function CustomModal({visible,title = 'Alerta',message,onClose}:CustomAlertModal) {
 return (
   <Modal
    visible={visible}
    animationType="fade"
    transparent={true}
    onRequestClose={onClose}>
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={onClose}>
            <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                     <TouchableOpacity onPress={onClose}>
                       <Feather name="x" size={20} color={colors.vermEscuro} />
                     </TouchableOpacity>
                </View>
                <Text style={styles.message}>{message}</Text>
                 <TouchableOpacity style={styles.button} onPress={onClose}>
                    <Text style={styles.buttonText}>Ok</Text>
                 </TouchableOpacity>
            </TouchableOpacity>
        </TouchableOpacity>
    </Modal>

  );
}

const styles = StyleSheet.create({
    modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent:{
    backgroundColor:colors.white,
    borderColor:colors.vermEscuro,
    borderRadius:10,
    padding:20,
    width:'90%',
    elevation:10,
    borderWidth:2,
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:10,
  },

  title:{
    fontSize: 20,
    fontWeight: 'bold',
    color:colors.vermEscuro
  },
  message:{
    fontSize:15,
    marginBottom:10,
    color:colors.VermClaro,
  },
  button:{
    backgroundColor:colors.vermEscuro,
    alignItems:'center',
    borderRadius:5,
    paddingVertical:10
},
  buttonText:{
    color:colors.white
  }
})