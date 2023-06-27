<template>
  <v-container class="py-0">
    <v-card
      flat
      color="#F2F2FA"
      height="800px"
      class="w-100 rounded-drawer d-flex flex-column justify-space-between"
    >
      <v-card-title class="bg-primary text-center text-wrap">
        {{ slide.question }}
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
          :countdownTime="slide.countdownTime"
          class="example"
        ></TheCountdownVue>
      </div>
      <TheCountdownVue
        :countdownTime="slide.countdownTime"
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
  },
  methods: {
    emitSlideChangeByUser() {
      this.$emit("slide-data-updated-by-user", this.slide);
    },
  },
  watch: {
    slide: {
      deep: true,
      handler() {
        this.emitSlideChangeByUser();
      },
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
