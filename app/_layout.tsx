import { Stack } from "expo-router";
import { AuthProvider } from "~/components/AuthContext";
import { LanguageProvider } from "~/context/LanguageContext";
import "../config/i18n";

export default function RootLayout() {
  return (
    <LanguageProvider>
    <AuthProvider>
      <Stack>

        {/*Auth */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login/index" options={{ headerShown: false }} />
        <Stack.Screen name="auth/register/index" options={{ headerShown: false }} />

        {/*Muscle Groups */}
        <Stack.Screen name="gruposMusc/index" options={{ headerShown: false }} />
        <Stack.Screen name="gruposMusc/FormAdicionar/formAdicionar" options={{ headerShown: false }} />
        <Stack.Screen name="gruposMusc/FormEditar/formEditar" options={{ headerShown: false }} />
        
        
        {/* Weekly Planning*/}
        <Stack.Screen name="planejamentos/index" options={{ headerShown: false }} />
        <Stack.Screen name="planejamentos/ViewScreen/ViewScreen" options={{ headerShown: false }} />
        <Stack.Screen name="planejamentos/AddScreen/AddScreen" options={{ headerShown: false }} />
        <Stack.Screen name="planejamentos/ViewTrain/ViewTrain" options={{headerShown: false}}/>
        
        <Stack.Screen name="dieta/meals/index" options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="dieta/index" options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="dieta/FormAdicionar/formAdicionar" options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="dieta/formEditar/formEditar" options={{headerShown: false}}></Stack.Screen>

        {/*Configurations */}
        <Stack.Screen name="config/index" options={{ headerShown: false }} />
        <Stack.Screen name="config/perfil/index" options={{ headerShown: false }} />
        <Stack.Screen name="config/EditarPerfil/index" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
    </LanguageProvider>
  );
}
