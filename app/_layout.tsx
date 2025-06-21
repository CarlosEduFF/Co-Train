import { Stack } from "expo-router";

export default function RootLayout() {
  return(
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="auth/login/index" options={{ headerShown: false}}/>
    <Stack.Screen name="home/index" options={{ headerShown: false}}/>
    <Stack.Screen name="gruposMusc/index" options={{ headerShown: false}}/>
    <Stack.Screen name="gruposMusc/FormAdicionar/formAdicionar" options={{ headerShown: false}}/>
    <Stack.Screen name="gruposMusc/FormEditar/formEditar" options={{ headerShown: false}}/>
    <Stack.Screen name="auth/register/index" options={{ headerShown: false}}/>
    <Stack.Screen name="profile/perfil/index" options={{ headerShown: false}}/>
    <Stack.Screen name="profile/EditarPerfil/index" options={{ headerShown: false}}/>
    <Stack.Screen name="planejamentos/index" options={{ headerShown: false}}/>
    <Stack.Screen name="planejamentos/Adicionar/adicionar" options={{ headerShown: false}}/>
    <Stack.Screen name="planejamentos/FormAdicionar/formAdicionar" options={{ headerShown: false}}/>
    <Stack.Screen name="planejamentos/FormEditar/formEditar" options={{ headerShown: false}}/>
    <Stack.Screen name="nutricional/index" options={{ headerShown: false}}/>
     
    

  </Stack>
  );
}
