import { Stack } from "expo-router";

export default function RootLayout() {
  return(
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="auth/login/index" options={{ headerShown: false}}/>
    <Stack.Screen name="home/index" options={{ headerShown: false}}/>
    <Stack.Screen name="gruposMusc/index" options={{ headerShown: false}}/>
    <Stack.Screen name="auth/register/index" options={{ headerShown: false}}/>
    <Stack.Screen name="profile/perfil/index" options={{ headerShown: false}}/>
    <Stack.Screen name="profile/EditarPerfil/index" options={{ headerShown: false}}/>
    <Stack.Screen name="planejamentos/index" options={{ headerShown: false}}/>
    <Stack.Screen name="planejamentos/adicionar" options={{ headerShown: false}}/>
    <Stack.Screen name="nutricional/index" options={{ headerShown: false}}/>
     
    

  </Stack>
  );
}
