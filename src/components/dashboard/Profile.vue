<template>
  <v-card
    class="mx-auto"
    prepend-icon="$vuetify"
    subtitle="The #1 Vue UI Library"
    width="400"
    elevation="8"
  >
    <template v-slot:title>
      <span class="font-weight-black">Welcome {{ name }} </span>
    </template>

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

const name = ref("");
const token = localStorage.getItem("token");
onMounted(async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    name.value = response.data.name;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});
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
