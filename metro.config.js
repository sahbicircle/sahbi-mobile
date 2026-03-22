const { getDefaultConfig } = require("@expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add SASS/SCSS support for React Native (Expo's default only supports CSS on web)
// Use spread to preserve _expoRelativeProjectRoot and other Expo transformer props (required for EAS Build)
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-sass-transformer"),
};
if (!config.resolver.sourceExts.includes("scss")) {
  config.resolver.sourceExts.push("scss", "sass");
}

module.exports = config;
