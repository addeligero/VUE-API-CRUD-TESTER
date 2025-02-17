<template>
  <v-container class="fill-height bg-teal-lighten-1" fluid>
    <LoginInput />
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
