// gruposMusc/FormEditar/formEditar.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
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
import { firestore } from '../../../config/firebase';

const schema = z.object({
  parte: z.string().min(1, { message: "Informe o grupo muscular" }),
  horaTreino: z.string().optional(),
  exercicios: z.array(z.object({
    nome: z.string().min(1, { message: "Informe o exercício" }),
    series: z.string().min(1, { message: "Informe as séries" }),
  })).min(1, { message: "Adicione pelo menos um exercício." })
});

type FormData = z.infer<typeof schema>;

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

export default function FormEditar() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });


  const { fields, append, remove } = useFieldArray({ control, name: "exercicios" });

  useEffect(() => {
    if (!id) {
      Alert.alert("Erro", "ID do treino não fornecido.");
      router.back();
      return;
    }

    const docRef = firestore.collection('treinos_grupados').doc(id);
    docRef.get().then(doc => {
      if (doc.exists) {
        const data = doc.data() as FormData & { imagemUrl: string };
        reset(data);
        setSelectedImage(data.imagemUrl);
      } else {
        Alert.alert("Erro", "Treino não encontrado.");
        router.back();
      }
    }).catch(error => {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os dados do treino.");
    }).finally(() => {
      setIsFetching(false);
    });
  }, [id, reset]);

  const handleUpdateTreino = async (data: FormData) => {
    if (!id) return;
    setIsLoading(true);
    try {
      await firestore.collection('treinos_grupados').doc(id).update({
        ...data,
        imagemUrl: selectedImage,
      });
      Alert.alert("Sucesso", "Treino atualizado!");
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível atualizar o treino.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTreino = () => {
    if (!id) return;
    Alert.alert(
      "Excluir Treino",
      "Você tem certeza que deseja excluir este treino?",
      [
        { text: "Cancelar", style: 'cancel' },
        {
          text: "Excluir", style: 'destructive', onPress: async () => {
            setIsLoading(true);
            try {
              await firestore.collection('treinos_grupados').doc(id).delete();
              Alert.alert("Sucesso", "Treino excluído.");
              router.back();
            } catch (error) {
              console.error(error);
              Alert.alert("Erro", "Não foi possível excluir o treino.");
              setIsLoading(false);
            }
          }
        }
      ]
    );
  };
  
  if (isFetching) {
    return <ActivityIndicator size="large" color={colors.vermEscuro} style={{flex: 1}}/>
  }

  return (
    <ScrollView style={styles.container}>
      <Header title='Editar Treino' text='Ajuste ou remova seu treino' />
      <View style={styles.formContainer}>
        {}
        <Text style={styles.label}>Músculo:</Text>
        <Select
          control={control}
          name="parte"
          error={errors.parte?.message}
          options={ExercicieOptions}
          onSelectExtraData={(selectedItem) => {
    setSelectedImage(selectedItem.image ?? null);
  }}
        />

      
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
        <Input name="horaTreino" control={control} placeholder="Ex: 18:00" keyboardType="default" />
        
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

        <TouchableOpacity style={styles.buttonAdicionar} onPress={handleDeleteTreino} disabled={isLoading}>
          <Text >DELETAR TREINO</Text>
        </TouchableOpacity>

        {}
        <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit(handleUpdateTreino)} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>SALVAR ALTERAÇÕES</Text>}
        </TouchableOpacity>

       
      </View>
    </ScrollView>
  );
}