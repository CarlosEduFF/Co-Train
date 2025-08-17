
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Treino } from '~/constants/train';
import styles from './styles';
import { colors } from '~/constants/colors';
import { DayKey, DIAS_SEMANA } from '~/constants/diasSemana';

type Props = {
  treino: Treino;
  onPress: (id: string) => void;
  onDelete?: (id: string) => void;
  onPurpose?: 'View' | 'Edit';
  isSelected?: boolean;
  onDaysChange?: (id: string, dias: DayKey[]) => void; // <<< novo
};

export const TreinoCard: React.FC<Props> = ({
  treino,
  onPress,
  onDelete,
  onPurpose,
  isSelected,
  onDaysChange,
}) => {
  const [selectedDays, setSelectedDays] = useState<Record<DayKey, boolean>>({
    segunda: false,
    terca: false,
    quarta: false,
    quinta: false,
    sexta: false,
    sabado: false,
    domingo: false,
  });

  useEffect(() => {
    if (treino.diasDaSemana && treino.diasDaSemana.length > 0) {
      const diasMap: Record<DayKey, boolean> = { ...selectedDays };
      treino.diasDaSemana.forEach((dia) => {
        diasMap[dia as DayKey] = true;
      });
      setSelectedDays(diasMap);
    }
  }, [treino]);

  const toggleDay = (day: DayKey) => {
    const updatedDays = { ...selectedDays, [day]: !selectedDays[day] };
    setSelectedDays(updatedDays);

    const diasSelecionados = Object.keys(updatedDays)
      .filter((key) => updatedDays[key as DayKey])
      .map((key) => key as DayKey);

    onDaysChange?.(treino.id, diasSelecionados);

    if (diasSelecionados.length > 0 && !isSelected) {
      onPress(treino.id);
    }
    if (diasSelecionados.length === 0 && isSelected) {
      onPress(treino.id);
    }
  };

  // Escolhe o container correto: TouchableOpacity no modo "View" ou View normal no "Edit"
  const Container: React.FC<{ children: React.ReactNode }> =
    onPurpose === 'View'
      ? ({ children }) => (
          <TouchableOpacity
            onPress={() => onPress(treino.id)}
            style={[styles.card, isSelected && styles.selectedBorder]}
          >
            {children}
          </TouchableOpacity>
        )
      : ({ children }) => (
          <View style={[styles.card, isSelected && styles.selectedBorder]}>
            {children}
          </View>
        );

  return (
    <Container>
      <View style={styles.containerImage}>
          <Image
            source={{ uri: treino.imagemUrl || 'https://via.placeholder.com/150' }}
            style={styles.MuscImage}
            resizeMode="cover"
          />
          <Text style={styles.cardTitulo}>{treino.parte}</Text>
     </View> 

      {onPurpose === 'Edit' && (
        <View style={styles.editContent}>
          <Text style={styles.sectionTitle}>Dias que tenho esse treino:</Text>
          <View style={styles.daysContainer}>
            {DIAS_SEMANA.map(({ key, label }) => (
              <TouchableOpacity
                key={key}
                style={styles.dayItem}
                onPress={() => toggleDay(key)}
              >
                <View
                  style={[styles.checkbox, selectedDays[key] && styles.checkboxChecked]}
                />
                <Text style={styles.checkboxLabel}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </Container>
  );
};
