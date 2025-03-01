<template>
  <v-card class="mx-auto" width="400" elevation="8">
    <v-card-title class="headline text-center font-weight-bold"
      >Login</v-card-title
    >
    <v-card-text>
      <v-form fast-fail @submit.prevent="login">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email"
          type="email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          type="password"
        ></v-text-field>

        <v-btn
          class="mt-2"
          type="submit"
          block
          :disabled="!email || !password || isSubmitting"
        >
          {{ isSubmitting ? "Logging in..." : "Submit" }}
        </v-btn>
        <router-link to="/" class="text-decoration-none">
          <v-btn color="primary" class="mt-2" block> Register </v-btn>
        </router-link>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const email = ref("");
const password = ref("");
const isSubmitting = ref(false);

const emailRules = [
  (value) => !!value || "Email is required.",
  (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Enter a valid email address.",
];

const passwordRules = [
  (value) => !!value || "Password is required.",
  (value) => value.length >= 6 || "Password must be at least 6 characters.",
];

const login = async () => {
  isSubmitting.value = true;

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/login", {
      email: email.value,
      password: password.value,
    });

    if (!response.data.access_token) {
      throw new Error("Invalid credentials");
    }

    localStorage.setItem("token", response.data.access_token);
    alert("Login successful!");
    router.push("/home");
  } catch (error) {
    console.error("Login failed:", error);
    alert(error.response?.data?.message || "Invalid login credentials.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>
