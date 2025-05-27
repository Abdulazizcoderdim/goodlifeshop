import axios from "axios";
import { useState } from "react";

export function useImageUploader() {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_PRESET_NAME;

  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = res.data;

      if (data.secure_url) {
        setImageUrl(data.secure_url);
        return data.secure_url;
      } else {
        setError("Rasm yuklashda xatolik yuz berdi.");
        return null;
      }
    } catch (err) {
      console.error(err);
      setError("Tarmoqda xatolik yuz berdi.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadImage,
    uploading,
    imageUrl,
    error,
  };
}
