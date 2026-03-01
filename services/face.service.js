import { Platform } from "react-native";
import { api } from "./api";

export const verifyFace = async (photoUri) => {
  const form = new FormData();

  if (Platform.OS === "web") {
    const response = await fetch(photoUri);
    const blob = await response.blob();
    const file = new File([blob], "face.jpg", { type: "image/jpeg" });
    form.append("photo", file);
  } else {
    form.append("photo", {
      uri: photoUri,
      type: "image/jpeg",
      name: "face.jpg",
    });
  }

  const { data } = await api.post("/facial/verify", form, {
    headers:
      Platform.OS === "web"
        ? {}
        : { "Content-Type": "multipart/form-data" },
  });

  return data;
};
