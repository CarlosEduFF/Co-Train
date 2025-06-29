import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity,Switch } from 'react-native'; 
import { Feather } from '@expo/vector-icons'; 
import styles from "./style";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { colors } from '../../../constants/colors';
import { Input } from '../../../components/input/inputNormal';
import {Select} from '../../../components/input/select';
import {Header} from '../../../components/header/header'

const schema = z.object({
   parte: z.string().min(1, { message: "Informe a parte muscular de treino" }),
   exercicio: z.string().min(1, { message: "Informe um exercício" }),
   series: z.string().min(1, { message: "Informe as séries" }),
   horaTreino: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type Exercise = {
  parte: string;
  exercicio: string;
  series: string;
  weight: string;
  isChecked: boolean;
};

export default function FormEditar() {
 const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

const [notify, setNotify] = useState(false);
const ExercicieOptions =[
    { label: 'Peito', value: 'Peito' },
    { label: 'Costas', value: 'Costas' },
    { label: 'Ombros', value: 'Ombros' },
    { label: 'Bíceps', value: 'Bíceps' },
    { label: 'Tríceps', value: 'Tríceps' },
    { label: 'Abdômen', value: 'Abdômen' },
    { label: 'Posterior de Coxa', value: 'Posterior de Coxa'},
    { label: 'Quadríceps', value: 'Quadríceps'},
    { label: 'Glúteo', value: 'Glúteo'},
    { label: 'Panturrilha', value: 'Panturrilha'},
    { label: 'Antebraço', value: 'Antebraço'},
]

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
             <Header
                 title='Planejamento Semanal'
                text="Gerencie seus treinos de >dia<"
        />

        <View style={styles.formContainer}>
          <Text style={styles.label}>Músculo:</Text>
          <Select
            control={control}
            name="parte"
            placeholder="Selecione o grupo muscular"
            error={errors.parte?.message}
            options={ExercicieOptions}
          />
          
          <View style={styles.row}>
            <View style={styles.inputHalf}>
              <Text style={styles.label}>Exercício:</Text>
              <Input
                name="exercicio"
                control={control}
                placeholder="--"
                error={errors.exercicio?.message}
                keyboardType="default"
              />
            </View>
          
            <View style={styles.inputHalf}>
              <Text style={styles.label}>Séries:</Text>
              <Input
                name="series"
                control={control}
                placeholder="--"
                error={errors.series?.message}
                keyboardType="default"
              />
            </View>
          </View>

          <Text style={styles.label}>Hora do treino (opcional):</Text>
          <Input
            name="horaTreino"
            control={control}
            placeholder="Hora do treino"
            keyboardType="default"
          />

          <TouchableOpacity style={styles.buttonAdicionar}>
            <Text style={styles.adicionarButton}>Adicionar</Text>
            <Feather name="plus-circle" size={20} color="#3D0000" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.buttonSave} >
            <Text style={styles.buttonText}>REMOVER ÚLTIMO EXERCÍCIO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSave} >
            <Text style={styles.buttonText}>SALVAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}