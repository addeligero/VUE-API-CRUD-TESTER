import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  const image = ref(null);
  const isLoading = ref(false);
  const token = localStorage.getItem("token");

  function increment() {
    count.value++;
  }

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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Upload successful:", response.data);
      alert("Image uploaded successfully!");

      image.value = `http://127.0.0.1:8000/storage/${response.data.path}`;
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed!");
    } finally {
      isLoading.value = false;
    }
  }

  return { count, doubleCount, increment, image, isLoading, uploadImage };
});
