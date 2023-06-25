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
      <p class="d-block mx-auto">{{ title }}</p>
    </v-card-title>
    <v-card-subtitle class="font-weight-black text-primary">
      {{ formatDate(createdAt) }}
    </v-card-subtitle>
    <v-sheet class="bg-grey mt-3" width="500" height="200"> </v-sheet>
    <v-card-actions location="bottom">
      <v-btn
        width="100"
        class="mx-6 no-uppercase"
        rounded
        style="background-color: #d37146; color: white"
        to="/eduquiz/home"
      >
        jogar
      </v-btn>
      <v-btn
        color="primary"
        width="100"
        variant="outlined"
        rounded
        class="no-uppercase"
      >
        editar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Timestamp } from "firebase/firestore";
export default {
  props: ["title", "createdAt"],
  methods: {
    formatDate(timestamp) {
      /* new Timestamp takes the seconds and nanoseconds as input parameters */
      const timeStamp = new Timestamp(timestamp.seconds, timestamp.nanoseconds);

      const date = timeStamp.toDate();
      return date.toLocaleString();
    },
  },
};
</script>
