import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text } from "react-native";
import { styles } from "./splash.styles";

export default function Splash() {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/(auth)/intro");
    }, 1500);
  }, []);

  return (
    <LinearGradient
      end={{ x: 0, y: 1 }}
      start={{ x: 1, y: -0.2 }}
      style={styles.container}
      locations={[0, 0.15, 0.65, 1]}
      colors={["#6A78B8", "#84A8D8", "#B796A3", "#DD866E"]}
    >
      <Text style={styles.title} />
      <Image
        source={require("../../assets/logo/logo-white.png")}
        style={styles.logo}
      />
      <Text style={styles.description}>{t("splash.subtitle")}</Text>
    </LinearGradient>
  );
}
