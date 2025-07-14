import { Stack } from "expo-router";
import { AuthProvider } from "~/components/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login/index" options={{ headerShown: false }} />
        <Stack.Screen name="gruposMusc/index" options={{ headerShown: false }} />
        <Stack.Screen name="gruposMusc/FormAdicionar/formAdicionar" options={{ headerShown: false }} />
        <Stack.Screen name="gruposMusc/FormEditar/formEditar" options={{ headerShown: false }} />
        <Stack.Screen name="auth/register/index" options={{ headerShown: false }} />
        <Stack.Screen name="profile/perfil/index" options={{ headerShown: false }} />
        <Stack.Screen name="profile/EditarPerfil/index" options={{ headerShown: false }} />
        <Stack.Screen name="planejamentos/index" options={{ headerShown: false }} />
        <Stack.Screen name="planejamentos/Adicionar/adicionar" options={{ headerShown: false }} />
        <Stack.Screen name="planejamentos/FormAdicionar/formAdicionar" options={{ headerShown: false }} />
        <Stack.Screen name="dieta/meals/index" options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="planejamentos/FormEditar/[id]" options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="dieta/index" options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="dieta/FormAdicionar/formAdicionar" options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="dieta/formEditar/formEditar" options={{headerShown: false}}></Stack.Screen>
      </Stack>
    </AuthProvider>
  );
}
