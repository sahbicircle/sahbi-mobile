import { api } from "./api";

export const verifyFace = async (photoUri) => {
  const form = new FormData();
  form.append("photo", {
    uri: photoUri,
    type: "image/jpeg",
    name: "face.jpg",
  });

  const { data } = await api.post("/facial/verify", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};
