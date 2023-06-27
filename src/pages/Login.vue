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
        Entre na sua conta
      </p>
      <v-form @submit.prevent="login">
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
        <p class="text-red mt-0 text-center" v-if="errorMsg">{{ errorMsg }}</p>
        <v-card-actions class="mb-16 justify-center">
          <v-btn
            variant="tonal"
            height="50"
            style="background-color: #d37146; color: white"
            rounded="xs"
            type="submit"
          >
            Entrar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-divider class="my-16" length="1800" thickness="2"></v-divider>
  </v-main>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { appFirebase } from "@/firebase";
export default {
  data() {
    return {
      userEmail: "",
      userPassword: "",
      errorMsg: "",
      visible: false,
    };
  },
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.userEmail, this.userPassword)
        .then((userCredential) => {
          // Signed in
          debugger;
          const user = userCredential.user;
          console.log("Registration sucessful", user);
          this.$router.push("/eduquiz/");
          // ...
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              this.errorMsg = "E-mail inválido";
              break;
            case "auth/user-not-found":
              this.errorMsg = "Nenhuma conta encontrada com esse e-mail";
              break;
            case "auth/wrong-password":
              this.errorMsg = "Senha incorreta";
              break;
            default:
              this.errorMsg = "E-mail ou senha inválidos";
          }
        });
    },
  },
};
</script>
