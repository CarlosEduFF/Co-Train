import { Stack } from "expo-router";

export default function RootLayout() {
  return(
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="Login/index" options={{ headerShown: false}}/>
    <Stack.Screen name="home/index" options={{ headerShown: false}}/>
    <Stack.Screen name="gruposMusc/index" options={{ headerShown: false}}/>
    <Stack.Screen name="cadastro/index" options={{ headerShown: false}}/>
    <Stack.Screen name="perfil/index" options={{ headerShown: false}}/>
    <Stack.Screen name="planejamentos/index" options={{ headerShown: false}}/>
    <Stack.Screen name="nutricional/index" options={{ headerShown: false}}/>
  </Stack>
  );
}
