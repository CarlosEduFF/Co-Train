import { Feather } from '@expo/vector-icons';
import styles from "./style"
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '~/components/input/inputNormal'
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as Animatable from "react-native-animatable";
import { useForm } from 'react-hook-form'
import { useRouter } from 'expo-router';
import { images } from '~/constants/images';
import { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Controller } from 'react-hook-form';
import { Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { routes } from '~/constants/routes';
import { pickImage } from '~/utils/handleMediaManeger';
import { getUserData, updateUserData } from '~/services/userService';
import { UserFormData, userSchema } from '~/schemas/userSchema';
import { useAuth } from '~/components/AuthContext';
import { firestore } from '~/config/firebase';
import CustomModalSucesso from '~/components/modal/modalSucesso';
import Modal from '~/components/modal/modalAlert'
import {useTranslation} from "react-i18next";

export default function EditarPerfil() {
  const [logoUri, setLogoUri] = useState(images.logo);
  const [sexoSelecionado, setSexoSelecionado] = useState('');
  const [objetivoSelecionado, setObjetivoSelecionado] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [showErrorModal, setShowErrorModal]= useState(false);
  const [errorMessage,setErrorMessage] = useState('');
  const [showSucessoModal, setShowSucessoModal]= useState(false);
  const [SucessoMessage,setSucessoMessage] = useState('');
  const {t} = useTranslation();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('Auth state:', { loading, user });

    if (!loading && !user) {
      router.replace(routes.login);
    }
  }, [loading, user]);


  useEffect(() => {
    if (!loading && !user) {
      router.replace(routes.login);
    }
  }, [loading, user]);

  if (loading) return null;

  const { control, handleSubmit, reset, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.uid) return;

      const userData = await getUserData(firestore, user.uid);
      if (userData) {
        reset({
          nome: userData.nome || '',
          email: userData.email || '',
          dataNascimento: userData.dataNascimento || '',
          sexo: userData.sexo || '',
          altura: userData.altura?.toString() || '',
          peso: userData.peso?.toString() || '',
          objetivo: userData.objetivo || '',
        });

        setSexoSelecionado(userData.sexo || '');
        setObjetivoSelecionado(userData.objetivo || '');

        if (userData.fotoPerfil) {
          setLogoUri({ uri: userData.fotoPerfil });
        }
      }
    };

    if (!loading && user) {
      fetchData();
    }
  }, [loading, user]);

  const onSubmit = async (form: UserFormData) => {
    if (!user?.uid) {
      setErrorMessage(t("errors.UserNoAuth"));
      setShowErrorModal(true);
      return;
    }

    const success = await updateUserData(
      firestore,
      user.uid,
      {
        nome: form.nome,
        email: form.email,
        dataNascimento: form.dataNascimento,
        sexo: form.sexo,
        altura: Number(form.altura),
        peso: Number(form.peso),
        objetivo: form.objetivo,
      },
      logoUri?.uri
    );

    if (success) {
      setSucessoMessage(t("success.userUpdate"));
      setShowSucessoModal(true);
      
    }
  };

  const handlePickImage = async () => {
    const image = await pickImage();
    if (image) {
      setLogoUri(image);
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.buttonLeft} onPress={() => router.push(routes.config)}>
          <Feather name='arrow-left' size={40} color='#fff' />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Animatable.Image
            animation="zoomIn"
            duration={1500}
            source={logoUri}
            style={styles.perfilImage}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={handlePickImage} style={styles.editButton}>
            <Feather name="edit" size={20} color="#fff" />
            <Text style={styles.editButtonText}>{t("settings.editPhot")}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>{t("settings.nameComp")}</Text>
          <Input name='nome'
            control={control} placeholder='Nome'
            error={errors.nome?.message}
            keyboardType='default'
          />


          <Text style={styles.label}>{t("settings.email")}</Text>
          <Input
            name='email'
            control={control}
            placeholder='Email'
            error={errors.email?.message}
            keyboardType='email-address'
          />

          <Text style={styles.label}>{t("settings.datNasc")}</Text>
          <Controller
            control={control}
            name="dataNascimento"
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity
                  style={[styles.input, { justifyContent: 'center' }]}
                  onPress={() => setShowPicker(true)}
                >
                  <Text style={{ color: value ? '#000' : '#888' }}>
                    {value ? value : 'dd/mm/aaaa'}
                  </Text>
                </TouchableOpacity>

                {showPicker && (
                  <DateTimePicker
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    value={value ? new Date(value) : new Date()}
                    maximumDate={new Date()}
                    onChange={(event, selectedDate) => {
                      setShowPicker(Platform.OS === 'ios'); // fica aberto no iOS
                      if (selectedDate) {
                        const formatted = selectedDate.toLocaleDateString('pt-BR');
                        onChange(formatted);
                        setSelectedDate(selectedDate);
                      }
                    }}
                  />
                )}
              </>
            )}
          />
          {errors.dataNascimento && <Text style={styles.errorText}>{errors.dataNascimento.message}</Text>}


          <Text style={styles.label}>{t("settings.sex")}</Text>
          <Controller
            control={control}
            name="sexo"
            render={({ field: { onChange, value } }) => (
              <View style={styles.radioContainer}>
                {['Masculino', 'Feminino', 'Outro'].map((sexo) => (
                  <TouchableOpacity
                    key={sexo}
                    style={[
                      styles.radioButton,
                      value === sexo && styles.radioButtonSelected,
                    ]}
                    onPress={() => onChange(sexo)}
                  >
                    <Text style={[styles.radioText, value ===sexo ? styles.radioTextSelected:styles.radioTextUnselected]}>{t(`settings.${sexo}`)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          />
          {errors.sexo && <Text style={styles.errorText}>{errors.sexo.message}</Text>}


          <Text style={styles.label}>{t("settings.height")}</Text>
          <Input
            name='altura'
            control={control}
            placeholder='Ex: 180'
            error={errors.altura?.message}
            keyboardType='numeric'
          />

          <Text style={styles.label}>{t("settings.weight")}</Text>
          <Input
            name='peso'
            control={control}
            placeholder='Ex: 75.9'
            error={errors.peso?.message}
            keyboardType='numeric'
          />

          <Text style={styles.label}>{t("settings.objective")}</Text>
          <Controller
            control={control}
            name="objetivo"
            render={({ field: { onChange, value } }) => (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Selecione o objetivo" value="" enabled={false} />
                  <Picker.Item label="Hipertrofia" value="Hipertrofia" />
                  <Picker.Item label="Emagrecimento" value="Emagrecimento" />
                  <Picker.Item label="Manutenção" value="Manutenção" />
                  <Picker.Item label="Outro" value="Outro" />
                </Picker>
              </View>
            )}
          />
          {errors.objetivo && <Text style={styles.errorText}>{errors.objetivo.message}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>{t("settings.saveUser")}</Text>
          </TouchableOpacity>
        </View>

        <Modal
                visible={showErrorModal}
                title={t("common.error")}
                message={errorMessage}
                 onClose={() => setShowErrorModal(false)}
              />
              <CustomModalSucesso
                visible={showSucessoModal}
                title={t("common.success")}
                message={SucessoMessage}
                onClose={() => {
                 setShowSucessoModal(false);
                  router.push(routes.config);
                  }}

                 
              />
      </ScrollView>
    </View>
  );
}