<template>
  <v-container class="fill-height bg-teal-lighten-1" fluid>
    <v-row justify="center" align="center">
      <v-col cols="4">
        <v-card elevation="8">
          <v-card-title class="text-center">Login</v-card-title>
          <v-card-text>
            <LoginInput />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import LoginInput from "@/components/Auth/LoginInput.vue";
</script>

<style scoped>
.v-container {
  min-height: 100vh;
}
</style>
