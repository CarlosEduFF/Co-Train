import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Treino } from '~/types/train';
import styles from './styles';
import { colors } from '~/constants/colors';
import { DayKey, DIAS_SEMANA } from '~/constants/diasSemana';
import {useTranslation} from "react-i18next";
import {useLanguage} from "../../../context/LanguageContext"



type Props = {
  treino: Treino;
  onPress: (id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onPurpose?: 'View' | 'Edit';
  isSelected?: boolean;
  onDaysChange?: (id: string, dias: DayKey[]) => void;
};

export const TreinoCard: React.FC<Props> = ({
  treino,
  onPress,
  onDelete,
  onEdit,
  onPurpose,
  isSelected,
  onDaysChange,
}) => {
const {t} = useTranslation();
 const { language, toggleLanguage} = useLanguage();
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

  const getImageSource = () => {
    if (typeof treino.planoImagem !== "string" || !treino.planoImagem) {
      return { uri: "https://via.placeholder.com/150" };
    }
    return { uri: treino.planoImagem };
  };






  return (
    
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPurpose === 'Edit' ? undefined : () => onPress(treino.id)}
      style={[ onPurpose === 'Edit' ? styles.cardEditContainer : styles.card, isSelected && styles.selectedBorder]}
    >
      {/* Conteúdo do card */}
      <View style={onPurpose === 'Edit' ? styles.containerImageEdit: styles.containerImage}>
        {typeof treino.planoImagem === "string" && treino.planoImagem.trim() !== "" ? (
          <Image
            source={getImageSource()}
            style={[onPurpose === 'Edit' ? styles.MuscImagEdit: styles.MuscImage]}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.MuscImage, { justifyContent: "center", alignItems: "center" }]}>
            <Text>{t("components.noImage")}</Text>
          </View>
        )}
        { onPurpose === 'Edit' &&(<Text style={styles.cardTitulo}>{treino.parte}{treino.planoTitulo}</Text>)}
       
      </View>
      { onPurpose != 'Edit' &&(<Text style={styles.cardTitulo}>{treino.parte}{treino.planoTitulo}</Text>)}

      {/* Lista de dias (apenas no modo Edit) */}
      {onPurpose === 'Edit' && (
        <View style={styles.editContent}>
          <Text style={styles.sectionTitle}>{t("components.daysIHave")}:</Text>
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
                <Text style={styles.checkboxLabel}>{t(label)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      

      )}

      {/* Botões Edit e Delete lado a lado */}
      {(onEdit || onDelete) && (
        <View style={styles.actionButtonsContainer} pointerEvents="box-none">
          {onEdit && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#EEF' }]}
              onPress={() => onEdit(treino.id)}
            >
              <Feather name="edit-2" size={25} color={colors.vermEscuro} />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#FEE' }]}
              onPress={() => onDelete(treino.id)}
            >
              <Feather name="trash-2" size={25} color={colors.vermEscuro} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};
