import styles from "./style"
import { View, Image } from 'react-native';
import { Input } from '../../components/input/input';
import { useForm } from 'react-hook-form'
import { images } from "~/constants/images";

export default function gruposMusc() {

  const { control, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      teste: '',
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={images.logo}
        style={styles.logo}
        resizeMode="cover" />

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


