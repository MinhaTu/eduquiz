<template>
  <v-container class="py-0">
    <v-card
      flat
      color="#F2F2FA"
      height="800px"
      class="w-100 rounded-drawer d-flex flex-column justify-space-between"
    >
      <v-card-title
        class="bg-primary text-center text-wrap d-flex align-center"
      >
        <span class="ml-16 flex-grow-1">{{ slide.question }}</span>
        <div v-if="isHost" class="ml-auto">
          <v-btn
            color="secondary"
            height="50"
            rounded="xs"
            :disabled="counter > 0"
            class="no-uppercase"
            @click="fireNextState"
            >{{ buttonLabel }}</v-btn
          >
          <p class="text-center" v-if="buttonLabel !== 'resultados'">
            {{ room.results }}
          </p>
        </div>
      </v-card-title>

      <v-card
        color="#DBDCF1"
        height="300"
        class="d-none d-md-block w-50 mx-auto elevation-3 text-center"
        v-if="!slide.image"
      >
        <v-container>
          <v-img height="340" src="/imgs/ed_kit_6.png"></v-img>
        </v-container>
      </v-card>
      <div class="d-none d-md-block container">
        <TheCountdownVue
          :countdownTime="(counter / 1000).toFixed(0)"
          class="example"
        ></TheCountdownVue>
      </div>
      <TheCountdownVue
        :countdownTime="(counter / 1000).toFixed(0)"
        class="mx-auto d-md-none"
      ></TheCountdownVue>
      <v-card-actions class="d-flex flex-column justify-end">
        <v-spacer> </v-spacer>
        <v-row class="w-100">
          <v-col cols="12" md="6">
            <v-btn
              block
              height="150"
              variant="outlined"
              rounded="xl"
              size="large"
              :disabled="buttonsDisabled || isHost"
              @click="sendAnswer('optA')"
              class="bg-deep-purple-lighten-2 d-flex justify-start no-uppercase"
            >
              <v-icon class="ml-6" size="50" color="white"
                >mdi-cards-club</v-icon
              >
              <div class="pa-6 text-wrap">{{ slide.optA }}</div>
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn
              block
              height="150"
              variant="outlined"
              rounded="xl"
              size="large"
              :disabled="buttonsDisabled || isHost"
              @click="sendAnswer('optB')"
              class="bg-teal-lighten-2 d-flex justify-start no-uppercase"
            >
              <v-icon class="ml-6" size="50" color="white"
                >mdi-cards-spade</v-icon
              >
              <div class="pa-6 text-center text-wrap">
                {{ slide.optB }}
              </div>
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="w-100">
          <v-col cols="12" md="6">
            <v-btn
              block
              height="150"
              variant="outlined"
              rounded="xl"
              size="large"
              :disabled="buttonsDisabled || isHost"
              @click="sendAnswer('optC')"
              class="bg-deep-orange-lighten-2 d-flex justify-start no-uppercase"
              style="border: 0px solid #000"
            >
              <v-icon class="ml-6" size="50" color="white"
                >mdi-cards-heart</v-icon
              >
              <div class="pa-6 text-center text-wrap text-white">
                {{ slide.optC }}
              </div>
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn
              block
              height="150"
              variant="outlined"
              rounded="xl"
              size="large"
              :disabled="buttonsDisabled || isHost"
              @click="sendAnswer('optD')"
              class="bg-pink-accent-1 d-flex justify-start no-uppercase"
            >
              <v-icon class="mr-auto ml-6" size="50" color="white"
                >mdi-cards-diamond</v-icon
              >
              <div class="pa-6 text-center text-wrap">
                {{ slide.optD }}
              </div>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {
  push,
  ref,
  onValue,
  serverTimestamp,
  query,
  orderByChild,
} from "firebase/database";
import { doc, setDoc, updateDoc, collection, getDoc } from "firebase/firestore";
import { trace } from "firebase/performance";
import { dbFirestore, dbRtdb, perf } from "@/firebase";
import TheCountdownVue from "../UI/TheCountdown.vue";
export default {
  components: {
    TheCountdownVue,
  },
  props: {
    slide: {
      type: Object,
      required: true,
    },
    room: {
      type: Object,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    isHost: {
      type: Boolean,
    },
    roomId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      counter: 0,
      isAnswerCreated: false,
      isAnswerSubmited: false,
      buttonsDisabled: true,
      buttonLabel: "resultados",
      hostButtonDisabled: true,
    };
  },
  computed: {
    slide() {
      const slide = this.room.currentSlide;
      return slide;
    },
  },
  watch: {
    slide() {
      this.setTimer();
      this.buttonsDisabled = false;
    },
  },
  methods: {
    async fireNextState() {
      const t = trace(perf, "CUSTOM_FIRE_NEXT_STATE");
      t.start();
      if (this.buttonLabel === "resultados") {
        const docRef = doc(dbFirestore, "rooms", this.roomId);
        await updateDoc(docRef, {
          gameState: "result",
        });

        if (this.room.currentSlidePos + 1 >= this.room.numberOfSlides) {
          this.buttonLabel = "recomeçar";
        } else {
          this.buttonLabel = "continuar";
        }
      } else if (this.buttonLabel === "continuar") {
        const docRef = doc(dbFirestore, "rooms", this.roomId);
        await updateDoc(docRef, {
          gameState: "next",
        });

        this.buttonLabel = "resultados";
      } else if (this.buttonLabel === "recomeçar") {
        const docRef = doc(dbFirestore, "rooms", this.roomId);
        await updateDoc(docRef, {
          gameState: "created",
          currentSlidePos: 0,
        });
        this.buttonLabel = "resultados";
      }
      t.stop();
    },
    async sendAnswer(option) {
      debugger;
      const docRef = doc(dbFirestore, "answers", this.room.currentSlideId);
      if (this.isAnswerCreated) {
        await updateDoc(
          docRef,
          {
            [this.nickname]: {
              answer: option,
            },
          },
          { merge: true }
        );
      } else {
        await setDoc(
          docRef,
          {
            [this.nickname]: {
              answer: option,
            },
          },
          { merge: true }
        );
      }
      this.buttonsDisabled = true;
    },
    // async verifyAnswerSubmission() {
    //   const docRef = doc(dbFirestore, "answers", this.room.currentSlideId);
    //   const docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     debugger;
    //     const answers = docSnap.data();
    //     if (answers[this.nickname]) {
    //       console.log("Answer already provided");
    //       this.buttonsDisabled = true;
    //     }
    //   }
    // },
    setTimer() {
      let serverTimeOffset = 0;

      const offsetRef = ref(dbRtdb, ".info/serverTimeOffset");
      onValue(offsetRef, (snap) => {
        serverTimeOffset = snap.val();
      });

      const timersRef = ref(dbRtdb, "timers/" + this.room.currentSlideId);
      const q = query(timersRef, orderByChild("startAt"));
      onValue(q, (snapshot) => {
        let timers = [];
        const data = snapshot.val();
        for (const id in data) {
          timers.push({
            id: id,
            seconds: data[id].seconds,
            startAt: data[id].startAt,
          });
        }

        const seconds = data.seconds;
        const startAt = data.startAt;
        const interval = setInterval(() => {
          this.counter =
            seconds * 1000 - (Date.now() - startAt - serverTimeOffset);
          if (this.counter < 0) {
            clearInterval(interval);
            this.counter = 0;
          }
        }, 100);
      });
    },
  },
};
</script>

<style scoped>
.rounded-drawer {
  box-shadow: none !important;
  border: 0px solid #000;
  border-radius: 15px; /* Adjust the border radius as needed */
}
.container {
  position: relative;
  width: 300;
  height: 300;
}

.example {
  position: absolute;
  left: 150px;
  top: -100px;
  z-index: 10;
}
</style>
