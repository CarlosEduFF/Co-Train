import React, { useState, useEffect  } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from "./style";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { colors } from '../../../constants/colors';
import { Input } from '../../../components/input/inputNormal';
import { Select } from '../../../components/input/select';
import { Header } from '../../../components/header/header';
import { router, useLocalSearchParams  } from 'expo-router';
import { auth, firestore } from '../../../config/firebase';

const schema = z.object({
  parte: z.string().min(1, { message: "Informe o grupo muscular" }),
  horaTreino: z.string().optional(),
  exercicios: z.array(
    z.object({
      nome: z.string().min(1, { message: "Informe o exercício" }),
      series: z.string().min(1, { message: "Informe as séries" }),
    })
  ).min(1, { message: "Adicione pelo menos um exercício." }) // Garante que nao esteja vazio
});

type FormData = z.infer<typeof schema>;

export default function FormAdicionar() {
  const { dia } = useLocalSearchParams<{ dia: string }>();
    useEffect(() => {
    console.log("DIA RECEBIDO NO FORMULÁRIO DE ADIÇÃO:", dia);
    if (!dia) {
      Alert.alert(
        "Erro Crítico",
        "Nenhum dia da semana foi especificado. Por favor, volte e tente novamente.",
        [{ text: "OK", onPress: () => router.back() }]
      );
    }
  }, [dia]);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      parte: '',
      horaTreino: '',
      exercicios: [{ nome: '', series: '' }]
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercicios"
  });

  const [notify, setNotify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  
  //salvar
  const handleSavePlano = async (data: FormData) => {
    const user = auth.currentUser;

    //verificacao
    if (!user || !dia) {
      Alert.alert("Erro", "Dia da semana não especificado ou usuário não logado. Não é possível salvar.");
      return;
    }

    setIsLoading(true);

    try {
      await firestore.collection('planejamentos').add({
        userId: user.uid,
        diaDaSemana: dia,
        ...data,
        notify: notify,
        createdAt: new Date(),
      });

      Alert.alert("Sucesso!", "Seu plano foi salvo.");
      router.back();

    } catch (error) {
      console.error("Erro ao salvar: ", error);
      Alert.alert("Erro ao Salvar", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

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

          <View style={styles.checkboxContainer}>
            <Switch value={notify} onValueChange={setNotify} trackColor={{ false: '#ccc', true: colors.vermEscuro }} thumbColor={'#fff'} />
            <Text style={styles.optionalLabel}>Me notificar</Text>
          </View>

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

          <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit(handleSavePlano)} disabled={isLoading}>
            <Text style={styles.buttonText}>{isLoading ? 'SALVANDO...' : 'SALVAR'}</Text>
          </TouchableOpacity>
          
          
        </View>
      </View>
    </ScrollView>
  );
}

