<template>
  <create-dialog ref="createDialog"></create-dialog>
  <view-quiz-dialog ref="viewDialog"></view-quiz-dialog>
  <v-toolbar flat color="white" class="text-primary">
    <v-toolbar-title>
      <v-menu class="d-md-none" open-on-click>
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            class="font-weight-black text-h4"
            width="135px"
            v-bind="props"
            to="/eduquiz/"
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
        v-if="isLoggedIn && !$store.state.creationMode"
        class="no-uppercase font-weight-bold"
        variant="text"
        to="/eduquiz/my-quizzes"
      >
        meus quizzes
      </v-btn>
      <v-icon
        class="unsaved-icon"
        v-if="$store.state.unsaved && $store.state.creationMode"
        color="red"
      >
        mdi-alert-octagram-outline
      </v-icon>
      <v-btn
        v-if="isLoggedIn && $store.state.creationMode"
        rounded
        class="mx-1 no-uppercase"
        style="background-color: #d37146; color: white"
        @click="saveSlides"
      >
        salvar
      </v-btn>

      <v-btn
        v-if="isLoggedIn && $store.state.creationMode"
        rounded
        variant="outlined"
        class="ml-1 mr-16 no-uppercase"
        @click="openPresentation"
      >
        visualizar
      </v-btn>
      <v-btn
        v-if="isLoggedIn && !$store.state.creationMode"
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
  <v-snackbar v-model="snackbar" multi-line>
    {{ snackbarText }}

    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="snackbar = false">
        Fechar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { dbFirestore } from "@/firebase";
import CreateDialog from "../CreateDialog.vue";
import ViewQuizDialog from "../Create/ViewQuizDialog.vue";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default {
  components: {
    CreateDialog,
    ViewQuizDialog,
  },
  provide() {
    return {
      quizCreationDialogOpen: this.quizCreationDialogOpen,
    };
  },
  props: ["isLoggedIn"],
  data() {
    return {
      snackbar: false,
      snackbarText: "",
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
      this.$refs.createDialog.showDialog();
      //Create a new quiz object in the database and retrieve the quizId
      //Opens a dialog, to specify the title and the description
      // quizId: {}
    },
    openPresentation() {
      this.$refs.viewDialog.showDialog();
    },
    async saveSlides() {
      debugger;
      const slides = this.$store.state.slides;
      const slideIds = [];
      await this.saveImages(slides);
      for (const slide of slides) {
        if (!this.validateSlide(slide)) {
          return;
        }

        let slideDoc = doc(dbFirestore, "slides", slide.slideId);
        await setDoc(slideDoc, slide, { merge: true });
        slideIds.push(slide.slideId);
      }

      const quizDoc = doc(dbFirestore, "quizzes", slides[0].quizId);
      await updateDoc(
        quizDoc,
        {
          slides: arrayUnion(...slideIds),
        },
        { merge: true }
      );
      this.$store.state.unsaved = false;
    },
    async saveImages() {
      const storage = getStorage();
      for (const slide of this.$store.state.slides) {
        const storageRef = ref(storage, "images/" + slide.slideId);

        // 'file' comes from the Blob or File API
        await uploadBytes(storageRef, slide.image).then((snapshot) => {
          debugger;
          console.log("Uploaded a blob or file!");
          console.log(snapshot);
        });
      }
    },
    validateSlide(slide) {
      if (slide.scoreSystem === undefined || slide.scoreSystem === "") {
        this.snackbarText =
          "Por favor, verifique os slides. O sistema de pontuação está ausente.";
      } else if (slide.rightOpt === undefined || slide.rightOpt === "") {
        this.snackbarText =
          "Por favor, verifique os slides. A resposta correta está ausente.";
      } else if (slide.question === undefined || slide.question === "") {
        this.snackbarText =
          "Por favor, verifique os slides. A pergunta está ausente.";
      } else if (slide.slideId === undefined || slide.slideId === "") {
        this.snackbarText =
          "Por favor, verifique os slides. O ID do slide está ausente.";
      } else if (slide.quizId === undefined || slide.quizId === "") {
        this.snackbarText =
          "Por favor, verifique os slides. O ID do quiz está ausente.";
      } else {
        return true;
      }

      this.snackbar = true;
      return false;
    },
  },
};
</script>
<style>
.unsaved-icon {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
