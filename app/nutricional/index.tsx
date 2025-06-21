import { images } from '~/constants/images';
import styles from "./style"
import { View ,Image} from 'react-native';

export default function nutricional() {
 return (
   <View style={styles.container}>
         <Image 
          source={images.logo}
          style={styles.logo}
          resizeMode="cover"/>

    </View>   
  );
}
