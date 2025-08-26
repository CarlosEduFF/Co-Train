import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import {useTranslation} from "react-i18next";

interface CustomAlertModal{
    visible:boolean;
    title?: string;
    message:string;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function ModalSair({visible,title = 'Remover',message,onCancel,
  onConfirm,}:CustomAlertModal) {
    const {t} = useTranslation();
 return (
 
   <Modal
    visible={visible}
    animationType="fade"
    transparent={true}
    onRequestClose={onCancel}>
        <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onCancel}>
              <Feather name="x" size={20} color={colors.vermEscuro} />
            </TouchableOpacity>
          </View>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.buttonText}>
                 {t("modals.cancel")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.buttonText}>{t("modals.getOut")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  cancelButton: {
    backgroundColor: colors.VermClaro,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: colors.vermEscuro,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.white,
  },
})