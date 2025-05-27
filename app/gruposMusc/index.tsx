import {colors} from '../../constants/colors'
import styles from "./style"
import { View ,Image} from 'react-native';
import { Input } from '../../components/input/input'; 
import {useForm} from 'react-hook-form'

export default function gruposMusc() {

const {control, handleSubmit, formState:{errors, isValid}} =useForm({
    defaultValues: {
      teste: '',
    },
  });

 return (
   <View style={styles.container}>
         <Image 
          source={require('../../img/logo.png')}
          style={styles.logo}
          resizeMode="cover"/>

          <View style={styles.formContainer}>
          <Input
             name='teste'
             placeholder='Digite teste'
             keyboardType='default'
             control={control}
             error={errors?.teste?.message}
             labelText='Teste'
          >
          </Input>

          </View>

    </View>   
  );
}


