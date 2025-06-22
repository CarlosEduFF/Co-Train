// gruposMusc/FormAdicionar/formAdicionar.tsx

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from "./style";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { colors } from '../../../constants/colors';
import { Input } from '../../../components/input/inputNormal';
import { Select } from '../../../components/input/select';
import { Header } from '../../../components/header/header';
import { router } from 'expo-router';
import { auth, firestore } from '../../../config/firebase'; // Verifique o caminho

// 1. Schema atualizado para um array de exercícios
const schema = z.object({
  parte: z.string().min(1, { message: "Informe o grupo muscular" }),
  horaTreino: z.string().optional(),
  exercicios: z.array(
    z.object({
      nome: z.string().min(1, { message: "Informe o exercício" }),
      series: z.string().min(1, { message: "Informe as séries" }),
    })
  ).min(1, { message: "Adicione pelo menos um exercício." })
});

type FormData = z.infer<typeof schema>;

// Opções de treino
const ExercicieOptions = [
  { label: 'Peito', value: 'Peito', image: 'https://res.cloudinary.com/dpwlhesro/image/upload/v1750568950/peito_r9l5l0.png' },
  { label: 'Costas', value: 'Costas', image: 'https://res.cloudinary.com/dpwlhesro/image/upload/v1750570186/costas_enbi72.png' },
  { label: 'Ombro', value: 'Ombro', image: 'https://res.cloudinary.com/dpwlhesro/image/upload/v1750568950/ombro_ym2v3h.png' },
  { label: 'Bíceps', value: 'Bíceps', image: 'https://res.cloudinary.com/dpwlhesro/image/upload/v1750568949/biceps_dg4pok.png' },
  { label: 'Tríceps', value: 'Tríceps', image: 'https://res.cloudinary.com/dpwlhesro/image/upload/v1750568949/triceps_eazddq.png' },
  { label: 'Abdômen', value: 'Abdômen', image: 'https://res.cloudinary.com/dpwlhesro/image/upload/v1750568948/abdomen_fjdrm8.png' },
  { label: 'Posterior de Coxa', value: 'Posterior de Coxa', image: 'https://res.cloudinary.com/dpwlhesro/image/upload/v1750569423/posterior_coxa_ukpwfh.png' },
  { label: 'Quadríceps', value: 'Quadríceps', image: 'https://res.cloudinary.com/dpwlhesro/image/upload/v1750569425/quadriceps_pu2dha.png' },
  { label: 'Glúteo', value: 'Glúteo', image: 'https://res.cloudinary.com/dpwlhesro/image/upload/v1750569424/gluteo_wd0gbq.png' },
  { label: 'Panturrilha', value: 'Panturrilha', image: 'https://res.cloudinary.com/dpwlhesro/image/upload/v1750569424/panturrilha_omd4ek.png' },
  { label: 'Antebraço', value: 'Antebraço', image: 'https://res.cloudinary.com/dpwlhesro/image/upload/v1750568949/antebraco_zmxg5p.png' },
];

export default function FormAdicionar() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      parte: '',
      horaTreino: '',
      exercicios: [{ nome: '', series: '' }] // Começa com um campo de exercício
    }
  });

  // 2. Hook para gerenciar campos dinâmicos
  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercicios"
  });

  const handleSaveTreino = async (data: FormData) => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }
    if (!selectedImage) {
        Alert.alert("Erro", "Imagem do grupo muscular não selecionada. Por favor, selecione o músculo novamente.");
        return;
    }

    setIsLoading(true);
    try {
      await firestore.collection('treinos_grupados').add({
        userId: user.uid,
        ...data,
        imagemUrl: selectedImage, // Salva a URL da imagem
        createdAt: new Date(),
      });
      Alert.alert("Sucesso", "Treino salvo!");
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar o treino.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header
        title='Adicionar Novo Treino'
        text='Preencha os dados abaixo'
      />
      <View style={styles.formContainer}>
        <Text style={styles.label}>Músculo:</Text>
        <Select
          control={control}
          name="parte"
          placeholder="Selecione o grupo muscular"
          error={errors.parte?.message}
          options={ExercicieOptions}
           onSelectExtraData={(selectedItem) => {
    setSelectedImage(selectedItem.image ?? null);
  }}
        />

        {/* 3. Mapeia os campos de exercício */}
        {fields.map((field, index) => (
          <View key={field.id} >
            <View style={styles.row}>
              <View style={styles.inputHalf}>
                <Text style={styles.label}>Exercício {index + 1}:</Text>
                <Input
                  name={`exercicios.${index}.nome`}
                  control={control}
                  placeholder="Ex: Supino Reto"
                  error={errors.exercicios?.[index]?.nome?.message}
                  keyboardType="default"
                />
              </View>
              <View style={styles.inputHalf}>
                <Text style={styles.label}>Séries:</Text>
                <Input
                  name={`exercicios.${index}.series`}
                  control={control}
                  placeholder="Ex: 4x10"
                  error={errors.exercicios?.[index]?.series?.message}
                  keyboardType="default"
                />
              </View>
            </View>
          </View>
        ))}
        
        <Text style={styles.label}>Hora do treino (opcional):</Text>
        <Input name="horaTreino" control={control} placeholder="Ex: 18:00" keyboardType="default"/>
        
        {/* 4. Botões funcionais */}
        <TouchableOpacity style={styles.buttonAdicionar} onPress={() => append({ nome: '', series: '' })}>
          <Text style={styles.adicionarButton}>Adicionar Exercício</Text>
          <Feather name="plus-circle" size={20} color="#3D0000" />
        </TouchableOpacity>

        <TouchableOpacity 
                        style={[styles.buttonAdicionar, fields.length <= 1 && styles.buttonDisabled]} 
                        onPress={() => remove(fields.length - 1)}
                        disabled={fields.length <= 1}
                      >
                        <Text>REMOVER ÚLTIMO EXERCÍCIO</Text>
                      </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit(handleSaveTreino)} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>SALVAR</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}