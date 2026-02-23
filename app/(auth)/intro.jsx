import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./intro.styles";

export default function Intro() {
  const router = useRouter();
  const { t } = useTranslation();
  const backgroundImage = require("../../assets/images/group-friends-dining-out.jpg");

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.main}
      resizeMode="cover"
      imageStyle={{ top: -120, maxWidth: 550 }}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{t("intro.title")}</Text>
        <Text style={styles.subtitle}>{t("intro.subtitle")}</Text>

        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <LinearGradient
            end={{ x: 1, y: 0 }}
            start={{ x: 0, y: 1 }}
            style={styles.button}
            locations={[0, 0.15, 0.65, 1]}
            colors={["#6A78B8", "#84A8D8", "#B796A3", "#DD866E"]}
          >
            <Text style={styles.buttonText}>{t("intro.getStarted")}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonWhite]}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={[styles.buttonText, { color: "#eba28a" }]}>
            {t("intro.haveAccount")}
          </Text>
        </TouchableOpacity>

        <Text style={styles.link}>{t("intro.terms")}</Text>
      </View>
    </ImageBackground>
  );
}
