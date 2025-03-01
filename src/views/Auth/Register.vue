<template>
  <v-container fluid>
    <v-row class="justify-center mt-12">
      <v-card width="500px" elevation="8">
        <v-card-title class="text-center font-weight-bold"
          >Register Here!</v-card-title
        >

        <form @submit.prevent="register">
          <v-text-field
            v-model="state.name"
            :counter="10"
            :error-messages="v$.name.$errors.map((e) => e.$message)"
            label="Name"
            required
            @blur="v$.name.$touch"
            @input="v$.name.$touch"
          ></v-text-field>

          <v-text-field
            v-model="state.email"
            :error-messages="v$.email.$errors.map((e) => e.$message)"
            label="E-mail"
            required
            @blur="v$.email.$touch"
            @input="v$.email.$touch"
          ></v-text-field>

          <v-text-field
            v-model="state.password"
            :error-messages="v$.password.$errors.map((e) => e.$message)"
            label="Password"
            required
            @blur="v$.password.$touch"
            @input="v$.password.$touch"
          ></v-text-field>

          <v-text-field
            v-model="state.passwordconfirm"
            :error-messages="v$.passwordconfirm.$errors.map((e) => e.$message)"
            label="Password confirmation"
            required
            @blur="v$.passwordconfirm.$touch"
            @input="v$.passwordconfirm.$touch"
          ></v-text-field>

          <v-btn type="submit" color="primary" class="mt-2" block>
            Submit
          </v-btn>
          <router-link to="/login" class="text-decoration-none">
            <v-btn color="teal-darken-3" class="mt-2" block> Login </v-btn>
          </router-link>
          <v-btn @click="clear" class="mt-2" block> clear </v-btn>
        </form>
      </v-card>
    </v-row>
  </v-container>
</template>
<script setup>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  password: null,
  checkbox: null,
  passwordconfirm: null,
};

const state = reactive({
  ...initialState,
});

const rules = {
  name: { required },
  email: { required, email },
  password: { required },
  passwordconfirm: { required },
  checkbox: { required },
};

const v$ = useVuelidate(rules, state);

//functions

const register = async () => {
  try {
    const response = axios.post("http://127.0.0.1:8000/api/register", {
      name: state.name,
      email: state.email,
      password: state.password,
      password_confirmation: state.passwordconfirm,
    });

    console.log("sucksis");
  } catch (error) {
    alert("Registration failed: " + error.response.data.error || error.message);
  }
};
function clear() {
  v$.value.$reset();

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
}
</script>
