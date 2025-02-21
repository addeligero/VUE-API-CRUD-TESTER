import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useCounterStore = defineStore("counter", () => {
  const image = ref("");
  const isLoading = ref(false);
  const token = ref(localStorage.getItem("token"));

  async function uploadImage(file) {
    if (!file) {
      alert("Please select an image.");
      return;
    }

    let formData = new FormData();
    formData.append("image", file);

    isLoading.value = true;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );

      console.log("Upload successful:", response.data);
      alert("Image uploaded successfully!");

      await findImage();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed!");
    } finally {
      isLoading.value = false;
    }
  }

  const findImage = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/check-user-image",
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );

      if (response.data.has_image) {
        image.value = `http://127.0.0.1:8000/storage/${response.data.image}`;
        console.log("Updated Image URL:", image.value);
      }
    } catch (error) {
      console.error("Failed to find image:", error);
    }
  };

  return { image, isLoading, uploadImage, findImage };
});
