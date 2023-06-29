<template>
  <v-main>
    <v-card flat color="#DBDCF1">
      <v-card-title
        class="mx-auto w-75 text-h3 pa-10 font-weight-bold text-primary text-wrap no-hyphen"
      >
        Seus quizzes
      </v-card-title>
    </v-card>
    <v-container
      class="d-flex justify-space-evenly flex-wrap py-10"
      style="gap: 50px"
    >
      <Quiz v-for="quiz in quizzes" :quiz="quiz"> </Quiz>
    </v-container>
  </v-main>
</template>

<script>
import Quiz from "@/components/Quiz.vue";
import { collection, query, where, getDocs } from "firebase/firestore";
import { dbFirestore } from "@/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  components: {
    Quiz,
  },
  data() {
    return { quizzes: [] };
  },
  async mounted() {
    let auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(dbFirestore, "quizzes"),
          where("createdBy", "==", this.$store.state.userId)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.quizzes.push({ quizId: doc.id, ...doc.data() });
        });

        console.log(this.quizzes);
      } else {
        console.log("No logged in");
      }
    });
  },
};
</script>
