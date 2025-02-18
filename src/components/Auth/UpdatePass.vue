<template>
  <v-card class="mx-auto" width="400" elevation="8">
    <v-card-title class="headline text-center font-weight-bold">
      Update Password
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="updatePassword">
        <v-text-field
          v-model="old_password"
          :rules="passwordRules"
          label="Old Password"
          type="password"
        ></v-text-field>

        <v-text-field
          v-model="new_password"
          :rules="passwordRules"
          label="New Password"
          type="password"
        ></v-text-field>

        <v-text-field
          v-model="confirm_password"
          :rules="passwordRules"
          label="Confirm New Password"
          type="password"
        ></v-text-field>

        <v-btn
          class="mt-2"
          type="submit"
          block
          :disabled="
            !old_password || !new_password || !confirm_password || isSubmitting
          "
        >
          {{ isSubmitting ? "Updating..." : "Update Password" }}
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const old_password = ref("");
const new_password = ref("");
const confirm_password = ref("");
const isSubmitting = ref(false);
const token = localStorage.getItem("token");

const passwordRules = [
  (value) => !!value || "Password is required.",
  (value) => value.length >= 6 || "Password must be at least 6 characters.",
];

const updatePassword = async () => {
  isSubmitting.value = true;

  try {
    const response = await axios.put(
      "http://127.0.0.1:8000/api/passwords",
      {
        old_password: old_password.value,
        new_password: new_password.value,
        new_password_confirmation: confirm_password.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Password updated successfully:", response.data);
    alert("Password updated successfully!");
  } catch (error) {
    console.error("Error updating password:", error);
    alert(error.response?.data?.message || "Error updating password.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>
