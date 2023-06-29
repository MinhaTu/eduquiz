<template>
  <v-main>
    <v-divider class="mt-16" length="1800" thickness="2"></v-divider>
    <v-card
      flat
      max-width="500"
      color="#DBDCF1"
      class="mx-auto my-8 rounded-lg"
    >
      <p class="text-h5 ml-3 my-16 text-secondary font-weight-bold text-center">
        Registre-se para criar seus quizzes
      </p>
      <v-form @submit.prevent="register">
        <v-text-field
          class="mx-16 my-8 px-8"
          variant="outlined"
          v-model="userFirstName"
          type="text"
          prepend-inner-icon="mdi-account"
          label="Primeiro Nome"
        ></v-text-field>
        <v-text-field
          class="mx-16 my-8 px-8"
          variant="outlined"
          v-model="userLastName"
          type="text"
          prepend-inner-icon="mdi-account-details"
          label="Segundo nome"
        ></v-text-field>
        <v-text-field
          class="mx-16 my-8 px-8"
          variant="outlined"
          v-model="userEmail"
          type="text"
          prepend-inner-icon="mdi-email-outline"
          label="Email"
        ></v-text-field>
        <v-text-field
          class="mx-16 my-2 px-8"
          variant="outlined"
          v-model="userPassword"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
          label="Senha"
        ></v-text-field>
        <v-card-actions class="mb-16 justify-center">
          <v-btn
            variant="tonal"
            height="50"
            style="background-color: #d37146; color: white"
            rounded="xs"
            type="submit"
          >
            Registrar-se
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-divider class="my-16" length="1800" thickness="2"></v-divider>
  </v-main>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { appFirebase } from "@/firebase";
export default {
  data() {
    return {
      userEmail: "",
      userPassword: "",
      visible: false,
    };
  },
  methods: {
    register() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.userEmail, this.userPassword)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Registration sucessful", user);
          this.$router.push("/eduquiz/");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          // ..
        });
    },
  },
};
</script>
