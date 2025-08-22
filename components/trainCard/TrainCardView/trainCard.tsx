// components/TreinoCard.tsx
import React from 'react';
import { TouchableOpacity, View, Text, Image,Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '~/constants/colors';
import { Treino } from '~/types/train';

type Props = {
  treino: Treino;
  onPress: (id: string) => void;
  onDelete?: (id: string) => void;
  onPurpose?: 'View' | 'Edit';
  isSelected?: boolean; // <<< nova prop
};

export const TreinoCard: React.FC<Props> = ({ treino, onPress, onDelete, isSelected,onPurpose, }) => {
  
  return (
    <View style={[styles.card, isSelected && styles.selectedBorder]}>
      <TouchableOpacity style={styles.containerCard} onPress={() => onPress(treino.id)}>
        <View style={styles.containerImage}>
        <Image
          source={{ uri: treino.planoImagem || 'https://via.placeholder.com/150' }}
          style={styles.MuscImage}
          resizeMode="cover"
        />
        <Text style={styles.cardTitulo}>{treino.parte}{treino.planoTitulo}</Text>
        </View>
      

      {onDelete && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(treino.id)}
        >
          <Feather name="trash-2" size={25} color={colors.vermEscuro} />
        </TouchableOpacity>
        
      )}
      </TouchableOpacity>
    </View>
  );
};