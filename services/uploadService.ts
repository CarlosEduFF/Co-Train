export const uploadToCloudinary = async (localUri: string): Promise<string | null> => {
  const data = new FormData();

  data.append("file", {
    uri: localUri,
    type: "image/jpeg",
    name: "upload.jpg",
  } as any);

  data.append("upload_preset", "co_upload");
  data.append("cloud_name", "dpwlhesro");

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/dpwlhesro/image/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    return result.secure_url;
  } catch (error) {
    console.error("Erro ao enviar imagem:", error);
    return null;
  }
};
