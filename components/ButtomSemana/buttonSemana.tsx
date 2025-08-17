import { TouchableOpacity,Text, StyleSheet, View } from 'react-native';
import { DayKey } from '~/constants/diasSemana';

import { colors } from '../../constants/colors'
import { Feather } from '@expo/vector-icons';

type Props ={
    label:string;
    dayKey:DayKey;
    isLastAndAlone?:boolean;
    onPress:(day:DayKey)=>void;
    icon?: keyof typeof Feather.glyphMap;
}

export function ButtomSemana({label,dayKey, isLastAndAlone,onPress,icon}:Props) {
 return (
<TouchableOpacity style={[styles.card, isLastAndAlone && styles.lastCard]}
   onPress={()=>onPress(dayKey)}  activeOpacity={0.8}>
      <View style={styles.content}>
        {icon && <Feather name={icon} size={20} color="#950101" style={styles.icon} />}
        <Text style={styles.cardTitulo}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
 card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderColor:colors.Vermelho,
    borderWidth:2,
  },

  lastCard: {
    width: '95%',
    alignSelf: 'center',
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    marginRight: 8,
  },

  cardTitulo: {
    fontSize: 18,
    color: colors.Vermelho,
    textAlign: 'center',
    fontWeight: '600',
  },
});