// components/TreinoCard.tsx
import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Treino } from '~/constants/train';
import styles from './styles';
import { colors } from '~/constants/colors';

type Props = {
  treino: Treino;
  onPress: (id: string) => void;
  onDelete?: (id: string) => void;
  isSelected?: boolean; // <<< nova prop
};

export const TreinoCard: React.FC<Props> = ({ treino, onPress, onDelete, isSelected }) => {
  return (
    <View style={[styles.card, isSelected && styles.selectedBorder]}>
      <TouchableOpacity style={styles.containerCard} onPress={() => onPress(treino.id)}>
        <Image
          source={{ uri: treino.imagemUrl || 'https://via.placeholder.com/150' }}
          style={styles.MuscImage}
          resizeMode="cover"
        />
        <Text style={styles.cardTitulo}>{treino.parte}</Text>
      </TouchableOpacity>

      {onDelete && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(treino.id)}
        >
          <Feather name="trash-2" size={25} color={colors.vermEscuro} />
        </TouchableOpacity>
        
      )}
      
    </View>
  );
};
