import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SAHBI } from "../../constants/sahbiUi";
import { styles } from "./intro.styles";

export default function Intro() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation();
  const backgroundImage = require("../../assets/images/group-friends-dining-out.jpg");

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.main}
      resizeMode="cover"
    >
      <View style={styles.imageDim} pointerEvents="none" />

      <View
        style={[styles.welcomeBlock, { top: insets.top + 16 }]}
        pointerEvents="none"
      >
        <Text style={styles.welcomeLine1}>{t("intro.welcomeLine1")}</Text>
        <Text style={styles.welcomeLine2}>{t("intro.welcomeLine2")}</Text>
      </View>

      <LinearGradient
        colors={SAHBI.gradientIntroSheet}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[
          styles.sheet,
          { paddingBottom: Math.max(insets.bottom, 12) + 28 },
        ]}
      >
        <Text style={styles.sheetTitle}>{t("intro.title")}</Text>
        <Text style={styles.sheetSubtitle}>{t("intro.subtitle")}</Text>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/register")}
          activeOpacity={0.9}
          style={styles.primaryOuter}
        >
          <LinearGradient
            colors={SAHBI.gradientCta}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.primaryBtn}
          >
            <Text style={styles.primaryBtnText}>{t("intro.getStarted")}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => router.push("/(auth)/login")}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryBtnText}>{t("intro.haveAccount")}</Text>
        </TouchableOpacity>

        <View style={styles.termsRow}>
          <Text style={styles.termsBase}>{t("intro.termsPrefix")} </Text>
          <Text style={styles.termsLink}>{t("intro.termsLink")}</Text>
          <Text style={styles.termsBase}> {t("intro.termsMid")} </Text>
          <Text style={styles.termsLink}>{t("intro.privacyLink")}</Text>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}
