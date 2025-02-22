<template>
  <v-card class="mx-auto my-5" width="600" elevation="8">
    <v-card-title class="headline text-center font-weight-bold">
      Welcome, {{ name }}
    </v-card-title>

    <v-container class="d-flex justify-center">
      <v-img
        v-if="image"
        :src="image"
        class="border rounded-xl"
        max-width="200"
        elevation="5"
      ></v-img>
    </v-container>

    <v-container v-if="!image" class="text-center">
      <v-file-input
        label="Upload Image"
        v-model="file"
        accept="image/*"
        show-size
        prepend-icon="mdi-camera"
      ></v-file-input>
      <v-btn color="primary" @click="handleUploadImage" :loading="isLoading"
        >Upload</v-btn
      >
    </v-container>

    <v-card class="mx-4 my-4" elevation="2">
      <v-card-title class="font-weight-bold">Life Motto</v-card-title>
      <v-card-text>
        <v-text-field v-model="motto" label="Life motto"></v-text-field>
      </v-card-text>
    </v-card>

    <v-container v-if="Password" class="my-4">
      <UpdatePass />
    </v-container>

    <v-card-text v-if="quote" class="bg-surface-light pt-4">
      {{ motto }}
    </v-card-text>

    <v-row class="my-4">
      <v-col>
        <v-btn color="error" @click="logout" block>
          <v-icon left>mdi-logout</v-icon>
          Logout
        </v-btn>
      </v-col>
      <v-col class="text-right" v-if="!Password">
        <v-btn color="primary" @click="showUpdatePass" block>
          <v-icon left>mdi-lock-reset</v-icon>
          Update Password
        </v-btn>
      </v-col>
      <v-col class="text-right" v-if="Password === true">
        <v-btn color="primary" @click="showUpdatePass" block>
          <v-icon left>mdi-lock-reset</v-icon>
          Close
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import UpdatePass from "../Auth/UpdatePass.vue";
import { useCounterStore } from "@/stores/counter";

const store = useCounterStore();
const file = ref(null);
const name = ref("");
const motto = ref("");
const token = localStorage.getItem("token");
const Password = ref(false);
const quote = ref("");

const image = ref(store.image);

onMounted(async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    name.value = response.data.name;

    await store.findImage();
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});

watch(
  () => store.image,
  (newImage) => {
    image.value = newImage;
    console.log("Updated Image URL:", newImage);
  }
);

const showUpdatePass = () => {
  Password.value = !Password.value;
};

// Handle Upload Image
const handleUploadImage = async () => {
  if (!file.value) {
    alert("Please select an image.");
    return;
  }
  await store.uploadImage(file.value);
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
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
</script>
