<template>
  <v-card
    class="mx-auto"
    prepend-icon="$vuetify"
    subtitle="The #1 Vue UI Library"
    width="400"
    elevation="8"
  >
    <template v-slot:title v-if="!image">
      <span class="font-weight-black">Welcome {{ name }} </span>
      <v-file-input
        label="Upload Image"
        v-model="file"
        accept="image/*"
        show-size
        prepend-icon="mdi-camera"
      ></v-file-input>

      <v-btn color="primary" @click="uploadImage">Upload</v-btn>
    </template>

    <v-container class="d-flex justify-center w-25">
      <v-img v-if="image" :src="image" class="border rounded-xl"></v-img>
    </v-container>

    <v-card-text class="bg-surface-light pt-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione
      debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat
      totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
    </v-card-text>
    <v-btn @click="logout"> Logout </v-btn>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const file = ref(null);
const name = ref("");
const image = ref("");
const token = localStorage.getItem("token");

onMounted(async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    name.value = response.data.name;
    console.log(response.data);
    image.value = `http://127.0.0.1:8000/storage/${response.data.image}`;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});

// Upload Image
const uploadImage = async () => {
  if (!file.value) {
    alert("Please select an image.");
    return;
  }

  let formData = new FormData();
  formData.append("image", file.value);

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Upload successful:", response.data);
    alert("Image uploaded successfully!");
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Image upload failed!");
  }
};

// Logout function
const logout = async () => {
  try {
    await axios.post(
      "http://127.0.0.1:8000/api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.removeItem("token");
    window.location.href = "/login";
    image.value = response.data.image;
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
</script>
