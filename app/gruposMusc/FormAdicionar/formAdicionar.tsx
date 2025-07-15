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
import { ExercicieOptionsImages } from '~/constants/exerciseOptions';
import { saveTreinoGrupado } from '~/services/trainsService';
import { TreinoFormData, treinoSchema } from '~/schemas/trainMuscleSchema';
import CustomModalSucesso from '~/components/modal/modalSucesso';
import Modal from '~/components/modal/modalAlert'



export default function FormAdicionar() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSucessoModal, setShowSucessoModal] = useState(false);
  const [SucessoMessage, setSucessoMessage] = useState('');

  const { control, handleSubmit, formState: { errors } } = useForm<TreinoFormData>({
    resolver: zodResolver(treinoSchema),
    defaultValues: {
      parte: '',
      exercicios: [{ nome: '', series: '', carga: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercicios"
  });

  const handleSaveTreino = async (data: TreinoFormData) => {
    if (!selectedImage) {
      setErrorMessage('Imagem do grupo muscular não selecionada. Por favor, selecione o músculo novamente.')
      setShowErrorModal(true)
      return;
    }

    setIsLoading(true);

    // Aqui você define os diasDaSemana para salvar — vazio ou com algum valor
    const dataToSave = {
      ...data,
      diasDaSemana: [], // diasDaSemana não vem do formulário, então criamos vazio aqui
    };

    await saveTreinoGrupado(
      dataToSave,
      selectedImage,
      () => {
        setSucessoMessage('Treino salvo!')
        setShowSucessoModal(true)
        router.push('/gruposMusc');
      },
      (error) => {
        console.error("Erro ao salvar treino:", error);
        setErrorMessage('Não foi possível salvar o treino.')
        setShowErrorModal(true)
      }
    );
    router.push("/gruposMusc");
    setIsLoading(false);
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
          options={ExercicieOptionsImages}
          onSelectExtraData={(selectedItem) => {
            setSelectedImage(selectedItem.image ?? null);
          }}
        />
        {fields.map((field, index) => (
          <View key={field.id} style={{ marginBottom: 16 }}>
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

            <View style={{ marginTop: 10 }}>
              <Text style={styles.optionalLabel}>Carga:</Text>
              <Input
                name={`exercicios.${index}.carga`}
                control={control}
                placeholder="Ex: 10 kg"
                error={errors.exercicios?.[index]?.carga?.message}
                keyboardType="default"
              />
            </View>

            {index > 0 && (
              <TouchableOpacity onPress={() => remove(index)} style={styles.removeIcon}>
                <Feather name="x-circle" size={20} color={colors.vermEscuro} />
              </TouchableOpacity>
            )}
          </View>
        ))}



        { }
        <TouchableOpacity style={styles.buttonAdicionar} onPress={() => append({ nome: '', series: '', carga: ''})}>
          <Text style={styles.adicionarButton}>Adicionar Exercício</Text>
          <Feather name="plus-circle" size={20} color="#3D0000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonAdicionar, fields.length <= 1 && styles.buttonDisabled]}
          onPress={() => remove(fields.length - 1)}
          disabled={fields.length <= 1}
        >
          <Text>Remover Último Exercício</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit(handleSaveTreino)} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Salvar</Text>}
        </TouchableOpacity>
      </View>
      <Modal
        visible={showErrorModal}
        title='Erro'
        message={errorMessage}
        onClose={() => setShowErrorModal(false)}
      />
      <CustomModalSucesso
        visible={showSucessoModal}
        title='Sucesso'
        message={SucessoMessage}
        onClose={() => setShowSucessoModal(false)}
      />
    </ScrollView>
  );
}