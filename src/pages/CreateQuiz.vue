<template>
  <v-snackbar v-model="snackbar" multi-line>
    {{ snackbarText }}

    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="snackbar = false">
        Fechar
      </v-btn>
    </template>
  </v-snackbar>
  <v-main>
    <v-sheet
      height="720"
      class="mt-n16 d-flex justify-center align-center"
      v-if="loading"
    >
      <v-progress-circular
        :size="80"
        :width="8"
        indeterminate
        model-value="20"
      ></v-progress-circular>
    </v-sheet>
    <v-layout class="mx-2 my-8" v-if="!loading">
      <v-navigation-drawer
        color="#F2F2FA"
        v-model="drawer"
        :rail="rail"
        permanent
        class="rounded-drawer"
        @click="rail = false"
      >
        <v-list-item title="Slides" nav>
          <template v-slot:prepend>
            <v-btn
              variant="text"
              size="50"
              icon="mdi-button-pointer"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>

          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-list density="compact" nav>
          <v-list-item
            v-for="(slide, index) in $store.state.slides"
            :key="slide.slideId"
            :value="slide.slideId"
            @click="handleSlideClick(slide)"
          >
            <template #title>
              <div class="d-flex justify-space-between">
                <p class="ml-2">Slide {{ index + 1 }}</p>
                <v-btn
                  size="15"
                  variant="text"
                  icon="mdi-trash-can-outline"
                  @click="deleteSlide(slide)"
                ></v-btn>
              </div>
            </template>
            <template v-if="rail" #prepend>
              <v-icon> mdi-card-outline </v-icon>
            </template>
            <v-container v-if="!rail" class="rounded-drawer">
              <v-card height="120">
                <v-card-title class="bg-primary text-center text-caption">
                  {{ slide.question }}
                </v-card-title>
                <v-row class="w-100 mt-3 px-5 my-1" no-gutters>
                  <v-col cols="6">
                    <v-card
                      class="d-flex justify-center bg-deep-purple-lighten-2"
                    >
                      <v-icon
                        class="pa-1 ma-1"
                        size="15"
                        :color="slide.rightOpt === 'optA' ? 'black' : ''"
                      >
                        mdi-cards-club
                      </v-icon>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card class="d-flex justify-center bg-teal-lighten-2">
                      <v-icon
                        class="pa-1 ma-1"
                        size="15"
                        :color="slide.rightOpt === 'optB' ? 'black' : ''"
                      >
                        mdi-cards-spade
                      </v-icon>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row class="w-100 mt-1 px-5" no-gutters>
                  <v-col cols="6">
                    <v-card
                      class="d-flex justify-center bg-deep-orange-lighten-2"
                    >
                      <v-icon
                        class="pa-1 ma-1"
                        size="15"
                        :color="slide.rightOpt === 'optC' ? null : 'white'"
                      >
                        mdi-cards-heart
                      </v-icon>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card class="d-flex justify-center bg-pink-accent-1">
                      <v-icon
                        class="pa-1 ma-1"
                        size="15"
                        :color="slide.rightOpt === 'optD' ? 'black' : ''"
                      >
                        mdi-cards-diamond
                      </v-icon>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-container>
          </v-list-item>
          <v-btn
            id="new-slide-activator"
            v-if="!rail"
            variant="tonal"
            style="background-color: #d37146; color: white"
            width="180"
            height="30"
            size="large"
            class="mt-5 ml-7 no-uppercase"
            rounded="xs"
          >
            Novo Slide

            <v-menu activator="parent">
              <v-list>
                <v-list-item
                  v-for="(item, index) in slideTypes"
                  :key="index"
                  :value="index"
                  @click="createNewSlide(item)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
        </v-list>
      </v-navigation-drawer>

      <v-navigation-drawer
        color="#F2F2FA"
        v-model="drawer"
        :rail="rail2"
        permanent
        location="right"
        class="rounded-drawer"
        @click="rail2 = false"
      >
        <v-list-item title="Configurações" nav>
          <template v-slot:prepend>
            <v-btn
              variant="text"
              size="50"
              icon="mdi-cog-outline"
              @click.stop="rail2 = !rail2"
            ></v-btn>
          </template>

          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail2 = !rail2"
            ></v-btn>
          </template>
        </v-list-item>

        <v-list density="compact" nav v-if="!rail2">
          <v-list-item>
            <v-list-item-title>Sistema de pontuação</v-list-item-title>
            <v-autocomplete
              density="compact"
              class="my-5"
              variant="solo"
              :items="['default']"
              v-model="selectedSlide.scoreSystem"
            ></v-autocomplete>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Limite de tempo em segundos</v-list-item-title>
            <v-text-field
              density="compact"
              class="my-5"
              variant="solo"
              type="number"
              v-model="selectedSlide.countdownTime"
            ></v-text-field>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <default-slide-input
          :slide="selectedSlide"
          @slide-data-updated-by-user="handleSlideUpdateByUser"
        ></default-slide-input>
      </v-main>
    </v-layout>
  </v-main>
</template>

<script>
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { dbFirestore } from "@/firebase";
import DefaultSlideInput from "../components/Create/DefaultSlideInput.vue";
import TheCountdown from "../components/UI/TheCountdown.vue";
import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, getBlob } from "firebase/storage";
export default {
  components: {
    DefaultSlideInput,
    TheCountdown,
  },
  data() {
    return {
      snackbar: false,
      snackbarText: "",
      slideTypes: [
        {
          title: "Padrão",
        },
      ],
      quizId: this.$route.params.quizId,
      drawer: true,
      rail: true,
      drawer2: true,
      rail2: true,
      selectedSlide: null,
      loading: true,
    };
  },
  methods: {
    async deleteSlide(slide) {
      if (this.$store.state.slides.length <= 1) {
        this.snackbarText = "Quiz precisa ter pelo menos um slide!";
        this.snackbar = true;
        return;
      }
      await deleteDoc(doc(dbFirestore, "slides", slide.slideId));
      const index = this.$store.state.slides.indexOf(slide);
      this.$store.state.slides.splice(index, 1);
    },

    createNewSlide(slideType) {
      debugger;
      //Unique type available
      if (slideType.title === "Padrão") {
        const newSlide = {
          slideId: uuidv4(),
          question: "",
          optA: "",
          optB: "",
          optC: "",
          optD: "",
          countdownTime: 20,
          quizId: this.quizId,
          scoreSystem: "default",
        };

        // const newSlides = JSON.parse(JSON.stringify(this.$store.state.slides));
        // newSlides.push(newSlide);
        // this.$store.state.slides.splice(0, this.$store.state.slides.length, ...newSlides);
        this.$store.state.slides.splice(
          this.$store.state.slides.length,
          0,
          newSlide
        );
        console.log("New slides array ", this.$store.state.slides);
      }
    },
    handleSlideClick(slide) {
      debugger;
      console.log("Slide selected", slide);
      this.selectedSlide = slide;
      console.log("the whole slide array, ", this.$store.state.slides);
    },
    handleSlideUpdateByUser(updatedSlide) {
      this.$store.state.unsaved = true;

      const slideIndex = this.$store.state.slides.findIndex(
        (slide) => slide.slideId === updatedSlide.slideId
      );

      if (slideIndex !== -1) {
        this.$store.state.slides.splice(slideIndex, 1, updatedSlide);
      } else {
        console.log("Slide not found");
      }
      console.log(this.$store.state.slides);
    },
    async getSlides(quizId) {},
    confirmLeave() {
      return window.confirm(
        "Do you really want to leave? you have unsaved changes!"
      );
    },

    confirmStayInDirtyForm() {
      return this.$store.state.unsaved && !this.confirmLeave();
    },
    beforeWindowUnload(e) {
      if (this.confirmStayInDirtyForm()) {
        // Cancel the event
        e.preventDefault();
        // Chrome requires returnValue to be set
        e.returnValue = "";
      }
    },
  },
  async beforeMount() {
    debugger;
    this.$store.state.creationMode = true;
    const q = query(
      collection(dbFirestore, "slides"),
      where("quizId", "==", this.quizId)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      debugger;
      this.$store.state.slides.push({ slideId: doc.id, ...doc.data() });
      this.selectedSlide = 0;
      console.log(this.$store.state.slides);
    });

    this.selectedSlide = this.$store.state.slides[0];
    console.log("SELECTED SLIDE", this.selectedSlide);
    this.loading = false;
  },
  unmounted() {
    this.$store.state.creationMode = false;
    this.$store.state.slides = [];
  },
  created() {
    window.addEventListener("beforeunload", this.beforeWindowUnload);
  },

  beforeDestroy() {
    window.removeEventListener("beforeunload", this.beforeWindowUnload);
  },
  beforeRouteLeave(to, from, next) {
    // If the form is dirty and the user did not confirm leave,
    // prevent losing unsaved changes by canceling navigation
    if (this.confirmStayInDirtyForm()) {
      next(false);
    } else {
      // Navigate to next view
      next();
    }
  },
};
</script>

<style scoped>
.rounded-drawer {
  box-shadow: none !important;
  border: 0px solid #000;
  border-radius: 15px; /* Adjust the border radius as needed */
}
</style>
