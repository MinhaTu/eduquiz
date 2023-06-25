<template>
  <create-dialog ref="dialog"></create-dialog>
  <v-toolbar flat color="white" class="text-primary">
    <v-toolbar-title>
      <v-menu class="d-md-none" open-on-click>
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            class="font-weight-black text-h4"
            width="135px"
            v-bind="props"
            to="/eduquiz"
          >
            Eduquiz
          </v-btn>
        </template>
        <v-list :items="toolbarItems"></v-list>
      </v-menu>
    </v-toolbar-title>
    <div class="d-none d-md-flex ml-n5">
      <v-btn class="no-uppercase font-weight-bold" variant="text">
        sobre
      </v-btn>
      <v-btn class="no-uppercase font-weight-bold" variant="text">
        contato
      </v-btn>
      <v-btn
        class="no-uppercase font-weight-bold"
        variant="text"
        append-icon="mdi-menu-down"
        to="/eduquiz/public-rooms"
      >
        salas
      </v-btn>
      <div class="mx-16"></div>
      <v-btn
        v-if="!isLoggedIn"
        class="no-uppercase font-weight-bold"
        to="/eduquiz/login"
      >
        entrar
      </v-btn>
      <v-btn
        v-if="!isLoggedIn"
        rounded
        class="no-uppercase mx-1"
        style="background-color: #d37146; color: white"
        to="/eduquiz/register"
      >
        criar conta
      </v-btn>
      <v-btn
        v-if="isLoggedIn"
        class="no-uppercase font-weight-bold"
        variant="text"
        to="/eduquiz/my-quizzes"
      >
        meus quizzes
      </v-btn>
      <v-btn
        v-if="isLoggedIn"
        class="no-uppercase font-weight-bold"
        variant="text"
        @click="createQuiz"
      >
        criar quiz
      </v-btn>
      <v-btn
        v-if="isLoggedIn"
        rounded
        class="no-uppercase"
        style="background-color: #d37146; color: white"
      >
        perfil
      </v-btn>
      <v-btn
        v-if="isLoggedIn"
        class="no-uppercase font-weight-bold"
        @click="handleSignOut"
      >
        sair
      </v-btn>
    </div>
  </v-toolbar>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import CreateDialog from "../CreateDialog.vue";
export default {
  components: {
    CreateDialog,
  },
  provide() {
    return {
      quizCreationDialogOpen: this.quizCreationDialogOpen,
    };
  },
  props: ["isLoggedIn"],
  data() {
    return {
      toolbarItems: [
        {
          title: "sobre",
          value: 1,
        },
        {
          title: "contato",
          value: 2,
        },
        {
          title: "salas",
          value: 3,
        },
      ],
      quizCreationDialogOpen: false,
    };
  },
  methods: {
    handleSignOut() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.$router.push("/eduquiz");
      });
    },
    createQuiz() {
      this.$refs.dialog.showDialog();
      //Create a new quiz object in the database and retrieve the quizId
      //Opens a dialog, to specify the title and the description
      // quizId: {}
    },
  },
};
</script>
