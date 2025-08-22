// components/form/ExercisesFields.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { Control, FieldErrors } from 'react-hook-form';
import { Input } from '~/components/input/inputNormal';
import { colors } from '~/constants/colors';

// Tipagem simples do exercício
export type Exercise = {
  nome: string;
  series: string;
  carga: string;
};

// Props do componente
interface ExercisesFieldsProps {
  fields: { id: string }[]; // fields retornados por useFieldArray
  control: Control<any>; // control do useForm
  errors: FieldErrors<any>;
  append: (item: Exercise) => void;
  remove: (index: number) => void;
  styles: any;
  minItems?: number;
}

const ExercisesFields: React.FC<ExercisesFieldsProps> = ({
  fields,
  control,
  errors,
  append,
  remove,
  styles,
  minItems = 1,
}) => {
  // helper seguro para pegar a mensagem de erro (localiza o "any" apenas aqui)
  const getErrorMessage = (index: number, key: 'nome' | 'series' | 'carga') => {
    // cast localizado para acessar a estrutura dinamicamente
    const e = (errors as any)?.exercicios?.[index]?.[key];
    return e?.message as string | undefined;
  };

  return (
    <>
      {fields.map((field, index) => (
        <View key={field.id} style={{ marginBottom: 16 }}>
          <View style={styles.row}>
            <View style={styles.inputHalf}>
              <Text style={styles.label}>Exercício {index + 1}:</Text>
              <Input
                name={`exercicios.${index}.nome`}
                control={control}
                placeholder="Ex: Supino Reto"
                error={getErrorMessage(index, 'nome')}
                keyboardType={'default'}
              />
            </View>

            <View style={styles.inputHalf}>
              <Text style={styles.label}>Séries:</Text>
              <Input
                name={`exercicios.${index}.series`}
                control={control}
                placeholder="Ex: 4x10"
                error={getErrorMessage(index, 'series')}
                keyboardType={'default'}
              />
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.optionalLabel}>Carga:</Text>
            <Input
              name={`exercicios.${index}.carga`}
              control={control}
              placeholder="Ex: 10 kg"
              error={getErrorMessage(index, 'carga')}
              keyboardType={'default'}
            />
          </View>

          {index >= minItems && (
            <TouchableOpacity onPress={() => remove(index)} style={styles.removeIcon}>
              <Feather name="x-circle" size={20} color={colors.vermEscuro} />
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.buttonAdicionar} onPress={() => append({ nome: '', series: '', carga: '' })}>
        <Text style={styles.adicionarButton}>Adicionar Exercício</Text>
        <Feather name="plus-circle" size={20} color="#3D0000" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonAdicionar, fields.length <= minItems && styles.buttonDisabled]}
        onPress={() => remove(fields.length - 1)}
        disabled={fields.length <= minItems}
      >
        <Text>Remover Último Exercício</Text>
      </TouchableOpacity>
    </>
  );
};

export default ExercisesFields;
