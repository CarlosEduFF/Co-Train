import { Feather } from '@expo/vector-icons';
import {colors} from '../../constants/colors'
import styles from "./style"
import {z} from 'zod'
import {zodResolver} from'@hookform/resolvers/zod'
import {Input } from '../../components/input/inputNormal'
import {View, Text, TouchableOpacity, Image, Alert,Pressable,TextInput,ScrollView} from 'react-native';
import * as Animatable from "react-native-animatable";
import {useForm} from 'react-hook-form'
import { router } from 'expo-router';

const schema = z.object({
name:z.string().min(1,{message:"O nome é obrigatório"}),
email:z.string().min(1,{message:"O email é obrigatório"}),
senha:z.string().min(1,{message:"A senha é obrigatório"}),
confirSenha:z.string().min(1,{message:"O sua senha precisa ser confirmada"})
})

type FormData = z.infer<typeof schema>

export default function editarPerfil() {
  const {control, handleSubmit, formState:{errors, isValid}}= useForm<FormData>({
  resolver:zodResolver(schema)
})

const onSubmit = (data:FormData)=>{

}


 return ( 
  <View style={styles.container}>
      <TouchableOpacity style={styles.buttonLeft} onPress={() => router.back()}>
        <Feather name='arrow-left' size={40} color='#fff' />
      </TouchableOpacity>

    <View style={styles.logoContainer}>
      <Image 
        source={require('../../img/logo.png')}
        style={styles.logo}
        resizeMode="cover"
      />
     </View>

   <View style={styles.logoContainer}>
       <Animatable.Image 
             animation="zoomIn"
             duration={1500}
             source={{ uri:  'https://via.placeholder.com/150' }} 
             style={styles.perfilImage}
             resizeMode="contain"
       />
       </View>
<View style={styles.formContainer}>
    <Text style={styles.label}>Nome:</Text>
    <Input
      name='name'
      control={control}
      placeholder='Nome:'
      error={errors.name?.message}
      keyboardType='default' 
    />

    <Text style={styles.label}>Email:</Text>
    <Input
      name='email'
      control={control}
      placeholder='Email:'
      error={errors.email?.message}
      keyboardType='default' 
    />

    <Text style={styles.label}>Senha:</Text>
    <Input
      name='senha'
      control={control}
      placeholder='Senha:'
      error={errors.senha?.message}
      keyboardType='default' 
    />

    <Text style={styles.label}>Confirmar Senha:</Text>
    <Input
      name='confirSenha'
      control={control}
      placeholder='Confirmar Senha:'
      error={errors.confirSenha?.message}
      keyboardType='default' 
    />

    <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
      <Text style={styles.buttonText}>Editar</Text>
    </TouchableOpacity>
    </View>
   
  </View>
);
}
