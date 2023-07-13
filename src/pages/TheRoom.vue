<template>
  <v-container class="py-0" v-if="gameState === 'created'">
    <v-card
      v-if="playerLoggedIn || isHost"
      flat
      color="#F2F2FA"
      height="800px"
      class="w-100 rounded-drawer"
    >
      <v-card-title class="bg-secondary text-center text-wrap text-subtitle-2">
        <span>Link da sala: {{ $route.fullPath }}</span>
      </v-card-title>
      <v-card-title class="bg-primary text-center text-wrap">
        <span class="wave-animation">Waiting for Players</span>
      </v-card-title>

      <v-card-actions class="my-5" v-if="isHost">
        <v-btn
          variant="tonal"
          height="50"
          style="background-color: #d37146; color: white"
          rounded="xs"
          class="mx-auto"
          @click="startGame"
        >
          Começar game
        </v-btn>
      </v-card-actions>

      <v-container class="d-flex justify-space-evenly flex-wrap">
        <v-card class="ma-10 pa-5" v-for="player in roomPlayers">
          <v-card-text> {{ player }}</v-card-text>
        </v-card>
      </v-container>
    </v-card>
    <v-card
      v-else
      flat
      color="#F2F2FA"
      height="800px"
      class="rounded-drawer d-flex flex-column justify-center align-center text-wrap"
    >
      <v-card flat color="white">
        <v-card-title class="bg-primary text-center text-md-left">
          Digite seu nome para entrar na sala
        </v-card-title>
        <v-card-text class="w-50 w-md-100 mx-auto">
          <v-text-field
            variant="underlined"
            label="nickname"
            v-model="nickname"
          ></v-text-field>
          <v-checkbox
            v-if="!roomHasHost"
            label="Ser host?"
            v-model="beHost"
          ></v-checkbox>
        </v-card-text>

        <v-card-title class="mt-n8 text-secondary">
          Link da sala: eduquiz/rooms/2fP4aZfwVaVHnEsH638M</v-card-title
        >
        <v-card-actions>
          <v-btn
            variant="tonal"
            height="50"
            style="background-color: #d37146; color: white"
            rounded="xs"
            class="mx-auto"
            @click="redirect"
          >
            Entrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-container>

  <div v-else>
    <DefaultSlide
      :slide="room.currentSlide"
      :room="room"
      :nickname="nickname"
      :isHost="isHost"
      :roomId="roomId"
    ></DefaultSlide>
  </div>
</template>

<script>
import {
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  arrayUnion,
} from "firebase/firestore";
import {
  ref,
  onValue,
  set,
  serverTimestamp,
  onDisconnect,
} from "firebase/database";
import { dbFirestore, dbRtdb } from "@/firebase";
import DefaultSlide from "@/components/Create/DefaultSlideRoom.vue";
import { getAuth } from "firebase/auth";
export default {
  components: {
    DefaultSlide,
  },
  data() {
    return {
      roomHasHost: false,
      beHost: false,
      nickname: null,
      playerLoggedIn: false,
      isHost: false,
      roomId: this.$route.params.roomId,
      roomPlayers: [],
      room: null,
    };
  },
  computed: {
    gameState() {
      return this.room.gameState;
    },
  },
  methods: {
    async startGame() {
      const docRef = doc(dbFirestore, "rooms", this.roomId);
      await updateDoc(docRef, {
        gameState: "start",
      });
    },
    amIOnline() {
      var uid = this.nickname;

      var userStatusDatabaseRef = ref(dbRtdb, "/status/" + uid);

      var isOfflineForDatabase = {
        state: "offline",
        roomId: this.roomId,
        last_changed: serverTimestamp(),
      };

      var isOnlineForDatabase = {
        state: "online",
        roomId: this.roomId,
        last_changed: serverTimestamp(),
      };
      var userStatusDatabaseRef = ref(dbRtdb, "/status/" + uid);
      onValue(ref(dbRtdb, ".info/connected"), (snapshot) => {
        if (snapshot.val() == false) {
          return;
        }

        onDisconnect(userStatusDatabaseRef)
          .set(isOfflineForDatabase)
          .then(() => {
            set(userStatusDatabaseRef, isOnlineForDatabase);
          });
      });
    },
    verifyRoomHost() {
      const docRef = doc(dbFirestore, "rooms", this.roomId);
      const unsub = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          this.roomHasHost = doc.data().hostId ? true : false;
          if (this.roomHasHost) {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
              if (doc.data().hostId === user.uid) {
                this.isHost = true;
              }
            }
          }
          console.log(this.roomHasHost);
          console.log("Document data:", doc.data());

          this.roomPlayers = doc.data().roomPlayers
            ? doc.data().roomPlayers
            : null;

          this.room = doc.data();

          console.log("roomPlayers:", this.roomPlayers);
        } else {
          console.log("Document not found");
        }
      });
    },
    async updateRoomHost() {
      const docRef = doc(dbFirestore, "rooms", this.roomId);
      await updateDoc(docRef, {
        hostId: this.nickname,
      });
      this.isHost = true;
    },
    addRoomPlayer() {
      const docRef = doc(dbFirestore, "rooms", this.roomId);
      updateDoc(docRef, {
        roomPlayers: arrayUnion(this.nickname),
      });
    },
    redirect() {
      this.verifyRoomHost();
      if (this.beHost) {
        this.updateRoomHost();
      }
      this.addRoomPlayer();
      this.amIOnline();
      this.playerLoggedIn = true;
    },
  },
  beforeMount() {
    this.verifyRoomHost();
  },
};
</script>

<style>
.wave-animation {
  display: inline-block;
  animation: wave 2s linear infinite;
}

@keyframes wave {
  0% {
    text-shadow: none;
  }
  25% {
    text-shadow: 0.2em 0 0 #000;
  }
  50% {
    text-shadow: none;
  }
  75% {
    text-shadow: -0.2em 0 0 #000;
  }
  100% {
    text-shadow: none;
  }
}
</style>
