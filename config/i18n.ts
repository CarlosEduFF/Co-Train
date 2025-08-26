import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import pt from "../locales/pt.json";
import en from "../locales/en.json";

const resources = { pt: {translation:pt}, en: {translation:en}};
const STORAGE_KEY ="appLanguage";

export async function initI18n(){
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    const deviceLang = Localization.getLocales()[0]?.languageCode || "pt";
    const initial = saved || (deviceLang === "pt" ? "pt" : "en");

    if(!i18n.isInitialized){
        await i18n.use(initReactI18next).init({
            resources,
            lng: initial,
            fallbackLng: "en",
            interpolation: { escapeValue: false },
        });
    }else{
        i18n.changeLanguage(initial);
    }
    return i18n;
}

export async function setAppLanguage(lang: "pt" | "en") {
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem(STORAGE_KEY, lang);
}

export default i18n;