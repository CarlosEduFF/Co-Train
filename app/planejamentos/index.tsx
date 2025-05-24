import {colors} from '../../constants/colors'
import styles from "./style"
import { View ,Image} from 'react-native';

export default function perfil() {
 return (
  <View style={styles.container}>
           <Image 
            source={require('../../img/logo.png')}
            style={styles.logo}
            resizeMode="cover"/>
  
    </View>   
  );
}