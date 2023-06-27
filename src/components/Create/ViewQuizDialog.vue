<template>
  <v-dialog v-model="dialog" scrollable max-height="800">
    <v-carousel class="h-100">
      <v-carousel-item
        v-for="slide in $store.state.slides"
        :key="slide.slideId"
      >
        <DefaultSlide :slide="slide"></DefaultSlide
      ></v-carousel-item>
    </v-carousel>
  </v-dialog>
</template>

<script>
import {
  addDoc,
  collection,
  serverTimestamp,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { dbFirestore } from "@/firebase";
import DefaultSlide from "./DefaultSlide.vue";
export default {
  components: {
    DefaultSlide,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    showDialog() {
      this.dialog = true;
    },
  },
};
</script>
