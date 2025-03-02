<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
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
        <v-btn
          color="primary"
          @click="handleUploadImage"
          :loading="store.isLoading"
          >Upload</v-btn
        >
      </v-container>

      <v-card
        v-if="showMottoForm || wantUpdate"
        class="mx-4 my-4"
        elevation="2"
      >
        <v-card-title class="font-weight-bold">Life Motto</v-card-title>
        <v-card-text>
          <v-text-field v-model="motto" label="Life motto"></v-text-field>
          <v-btn @click="handleUpdateMotto">Submit</v-btn>
        </v-card-text>
      </v-card>

      <v-container v-if="Password" class="my-4">
        <UpdatePass />
      </v-container>

      <v-card-text
        v-if="!showMottoForm && motto"
        class="bg-surface-light pt-4 text-center font-weight-bold font-italic"
      >
        {{ motto }}
      </v-card-text>
      <v-btn @click="update" block>Update motto</v-btn>

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
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import UpdatePass from "../components/Auth/UpdatePass.vue";
import { useCounterStore } from "@/stores/counter";

const store = useCounterStore();
const file = ref(null);
const name = ref("");
const motto = ref(store.motto);
const token = localStorage.getItem("token");
const Password = ref(false);
const showMottoForm = ref(true);
const wantUpdate = ref(false);

const image = ref(store.image);

onMounted(async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    name.value = response.data.name;

    await store.findInfo();
    motto.value = store.motto;
    showMottoForm.value = !store.motto;
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

watch(
  () => store.motto,
  (newMotto) => {
    motto.value = newMotto;
    console.log("Updated Motto:", newMotto);
  }
);

const showUpdatePass = () => {
  Password.value = !Password.value;
};

const update = () => {
  wantUpdate.value = !wantUpdate.value;
};
// Handle Upload Image
const handleUploadImage = async () => {
  if (!file.value) {
    alert("Please select an image.");
    return;
  }
  await store.uploadImage(file.value);
};

// Handle Update Motto
const handleUpdateMotto = async () => {
  if (!motto.value) {
    alert("Please enter a motto.");
    return;
  }
  console.log("Updating motto:", motto.value);
  await store.updateMotto(motto.value);
  showMottoForm.value = false;
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
