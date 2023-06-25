<template>
  <v-dialog v-model="dialog" persistent width="1024">
    <v-card flat color="#DBDCF1" class="mx-auto rounded-lg">
      <v-card-title class="text-secondary font-weight-bold my-4">
        Digite as informações básicas do seu quiz
      </v-card-title>
      <v-form @submit.prevent="createQuiz">
        <p class="mx-4 text-secondary font-weight-bold my-4">Título</p>
        <v-text-field
          class="mx-4"
          variant="outlined"
          v-model="title"
          type="text"
          label="Informe o título"
        ></v-text-field>
        <p class="mx-4 text-secondary font-weight-bold my-4">Descrição</p>
        <v-textarea
          class="mx-4"
          variant="outlined"
          repend-inner-icon="mdi-comment"
          label="Informe a descrição"
          v-model="description"
        >
        </v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" variant="outlined" color="secondary">
            fechar
          </v-btn>
          <v-btn
            style="background-color: #d37146; color: white"
            variant="tonal"
            rounded="xs"
            type="submit"
          >
            Criar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { dbFirestore } from "@/firebase";
export default {
  data() {
    return { dialog: false, title: "", description: "" };
  },
  methods: {
    showDialog() {
      this.dialog = true;
    },
    createQuiz() {
      const auth = getAuth();
      const user = auth.currentUser;
      addDoc(collection(dbFirestore, "quizzes"), {
        title: this.title,
        description: this.description,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      }).then((quizDoc) => {
        console.log("quiz doc id , ", quizDoc.id);
        this.dialog = false;
        this.$router.push("/eduquiz/create-quiz/" + quizDoc.id);
      });
    },
  },
};
</script>
