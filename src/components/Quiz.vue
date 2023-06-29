<template>
  <v-card
    width="500"
    height="400"
    flat
    color="#DBDCF1"
    class="d-flex flex-column justify-space-between rounded-xl pa-0"
  >
    <v-card-title
      style="height: 100px"
      class="text-h4 font-weight-bold text-primary text-wrap no-hyphen d-flex align-center"
    >
      <p class="d-block mx-auto">{{ quiz.title }}</p>
    </v-card-title>
    <v-card-subtitle class="font-weight-black text-primary">
      {{ formatDate(quiz.createdAt) }}
    </v-card-subtitle>
    <v-sheet class="bg-grey mt-3" width="500" height="200"> </v-sheet>
    <v-card-actions location="bottom">
      <v-btn
        width="100"
        class="mx-6 no-uppercase"
        rounded
        style="background-color: #d37146; color: white"
        @click="play"
      >
        jogar
      </v-btn>
      <v-btn
        color="primary"
        width="100"
        variant="outlined"
        rounded
        class="no-uppercase"
        :to="'/eduquiz/create-quiz/' + quiz.quizId"
      >
        editar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { dbFirestore } from "@/firebase";
export default {
  props: ["quiz"],
  methods: {
    play() {
      const auth = getAuth();
      const user = auth.currentUser;

      addDoc(collection(dbFirestore, "rooms"), {
        gameState: "created",
        quizId: this.quiz.quizId,
        hostId: user.uid,
        createdBy: user.uid,
      }).then((roomDoc) => {
        console.log("Room created successfuly. RoomId " + roomDoc.id);
        this.$router.push("/eduquiz/rooms/" + roomDoc.id);
      });
    },
    formatDate(timestamp) {
      /* new Timestamp takes the seconds and nanoseconds as input parameters */
      const timeStamp = new Timestamp(timestamp.seconds, timestamp.nanoseconds);

      const date = timeStamp.toDate();
      return date.toLocaleString();
    },
  },
};
</script>
