import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from "../FormAdicionar/style";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { colors } from '../../../constants/colors';
import { Input } from '../../../components/input/inputNormal';
import { Select } from '../../../components/input/select';
import { Header } from '../../../components/header/header';
import { router, useLocalSearchParams } from 'expo-router';
import { auth, firestore } from '../../../config/firebase';

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

 const ExercicieOptions = [
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
  ];

type FormData = z.infer<typeof schema>;

export default function FormEditar() {
  const { id } = useLocalSearchParams();
  
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercicios"
  });

  const [notify, setNotify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchPlano = async () => {
      try {
        const docSnap = await firestore.collection('planejamentos').doc(id as string).get();
        if (docSnap.exists) {
          const planoData = docSnap.data();
          reset(planoData); 
          setNotify(planoData?.notify || false);
        } else {
          router.back();
        }
      } catch (error) {
        console.error("Erro ao buscar o plano: ", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchPlano();
  }, [id, reset]);

  //atualizar os dados
  const handleUpdatePlano = async (data: FormData) => {
    setIsLoading(true);
    try {
      await firestore.collection('planejamentos').doc(id as string).update({ ...data, notify });
      Alert.alert("Sucesso!", "Seu plano foi atualizado.");
      router.back();
    } catch (error) {
      console.error("Erro ao atualizar: ", error);
      Alert.alert("Erro", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <ActivityIndicator size="large" color={colors.vermEscuro} style={{ flex: 1 }} />;
  }

  return (
    <ScrollView style={styles.container}>
          <View style={styles.container}>
            <Header title='Planejamento Semanal' text="Gerencie seus treinos" />
    
            <View style={styles.formContainer}>
              <Text style={styles.label}>Músculo:</Text>
              <Select control={control} name="parte" error={errors.parte?.message} options={ExercicieOptions} />
              
              {}
              {fields.map((field, index) => (
                <View key={field.id} style={styles.exerciseRow}>
                  <View style={styles.row}>
                    <View style={styles.inputHalf}>
                      <Text style={styles.label}>Exercício:</Text>
                      <Input
                        name={`exercicios.${index}.nome`}
                        control={control}
                        placeholder="--"
                        error={errors.exercicios?.[index]?.nome?.message}
                        keyboardType="default"
                      />
                    </View>
                    <View style={styles.inputHalf}>
                      <Text style={styles.label}>Séries:</Text>
                      <Input
                        name={`exercicios.${index}.series`}
                        control={control}
                        placeholder="--"
                        error={errors.exercicios?.[index]?.series?.message}
                        keyboardType="default"
                      />
                    </View>
                  </View>
                  {}
                  {index > 0 && (
                     <TouchableOpacity onPress={() => remove(index)} style={styles.removeIcon}>
                        <Feather name="x-circle" size={20} color={colors.vermEscuro} />
                     </TouchableOpacity>
                  )}
                </View>
              ))}
              
              {}
              <Text style={styles.label}>Hora do treino (opcional):</Text>
              <Input name="horaTreino" control={control} placeholder="Hora do treino" keyboardType="default"/>
        
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
    
              <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit(handleUpdatePlano)} disabled={isLoading}>
                <Text style={styles.buttonText}>{isLoading ? 'SALVANDO...' : 'SALVAR'}</Text>
              </TouchableOpacity>
              
              
            </View>
          </View>
        </ScrollView>
  );
}