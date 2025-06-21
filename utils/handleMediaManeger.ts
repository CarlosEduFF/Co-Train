import * as ImagePicker from 'expo-image-picker';

type PickImageResult = {
  uri: string;
} | null;

export const pickImage = async (): Promise<PickImageResult> => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [4, 4],
    });

    if (!result.canceled && result.assets?.length > 0) {
      return { uri: result.assets[0].uri };
    }

    return null;
  } catch (error) {
    console.error('Erro ao selecionar imagem:', error);
    return null;
  }
};
