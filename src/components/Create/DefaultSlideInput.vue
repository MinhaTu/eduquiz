<template>
  <v-container class="py-0">
    <v-card
      flat
      color="#F2F2FA"
      height="800px"
      class="w-100 rounded-drawer d-flex flex-column justify-space-between"
    >
      <v-card-title class="bg-primary text-center text-wrap">
        <!-- O que é o que é, uma coisa que eu falo lorem iposon uon dor ail
              oalenxadre ai Ilson ale exta ahs aialson alexand aislson alenxadj
              aialson ahdahjd ailson asdsad asasdasd asdasd -->
        <v-textarea
          label="Insira a pergunta"
          variant="underlined"
          clearable
          no-resize
          rows="2"
          v-model="slide.question"
        ></v-textarea>
      </v-card-title>

      <v-card
        color="#DBDCF1"
        height="300"
        class="w-50 mx-auto elevation-3 text-center"
        v-if="!imagePreview"
      >
        <v-card-title class="mt-16">
          Encontre e insira uma imagem
        </v-card-title>
        <v-card-subtitle> Ou arraste para enviar</v-card-subtitle>
        <v-container class="w-50">
          <v-file-input
            class="mt-16"
            variant="underlined"
            @change="onFileInputChange"
          >
          </v-file-input>
        </v-container>
      </v-card>

      <v-card
        color="#DBDCF1"
        height="300"
        class="w-50 mx-auto elevation-3 text-center"
        v-if="imagePreview"
      >
        <v-btn
          rounded
          size="30"
          color="secondary"
          class="no-uppercase btn-out"
          icon="mdi-close-circle-outline"
          @click="imagePreview = false"
        >
        </v-btn>
        <v-img :src="imagePreview" v-if="imagePreview" cover></v-img>
      </v-card>

      <v-card-actions class="d-flex flex-column justify-end">
        <v-spacer> </v-spacer>
        <v-row class="w-100">
          <v-col cols="12" md="6">
            <v-card
              flat
              height="150"
              rounded="xl"
              class="bg-deep-purple-lighten-2 d-flex align-center"
            >
              <v-icon size="50" color="white" class="mr-auto ml-8"
                >mdi-cards-club</v-icon
              >
              <div class="w-100 pa-6 text-wrap text-white">
                <v-text-field
                  variant="underlined"
                  label="Insira uma resposta aqui"
                  v-model="slide.optA"
                >
                </v-text-field>
              </div>
              <v-radio-group v-model="slide.rightOpt">
                <v-radio class="mr-8" value="optA" color="white"> </v-radio>
              </v-radio-group>
            </v-card>
            <!-- <v-btn
                    block
                    height="150"
                    variant="outlined"
                    rounded="xl"
                    size="large"
                    class="bg-deep-purple-lighten-2 d-block no-uppercase"
                  >
                    <v-icon class="mr-auto ml-6" size="50" color="white"
                      >mdi-cards-club</v-icon
                    >
                    <div class="pa-6 text-center text-wrap">
                      asdfasfdasfadsfas asas adss ddfdf
                    </div>
                    <v-radio value="1"> </v-radio>
                  </v-btn> -->
          </v-col>
          <v-col cols="12" md="6">
            <v-card
              flat
              height="150"
              rounded="xl"
              class="bg-teal-lighten-2 d-flex align-center"
            >
              <v-icon size="50" color="white" class="mr-auto ml-8"
                >mdi-cards-spade</v-icon
              >
              <div class="w-100 pa-6 text-wrap text-white">
                <v-text-field
                  variant="underlined"
                  label="Insira uma resposta aqui"
                  v-model="slide.optB"
                >
                </v-text-field>
              </div>
              <v-radio-group v-model="slide.rightOpt">
                <v-radio class="mr-8" value="optB" color="white"> </v-radio>
              </v-radio-group>
            </v-card>
            <!-- <v-btn
                    block
                    height="150"
                    variant="outlined"
                    rounded="xl"
                    size="large"
                    class="bg-teal-lighten-2 d-block no-uppercase"
                  >
                    <v-icon class="mr-auto ml-6" size="50" color="white"
                      >mdi-cards-spade</v-icon
                    >
                    <div class="pa-6 text-center text-wrap">
                      asdfasfdasfadsfas asas adss ddfdf
                    </div>
                    <v-radio value="1"> </v-radio>
                  </v-btn> -->
          </v-col>
        </v-row>
        <v-row class="w-100">
          <v-col cols="12" md="6">
            <v-card
              flat
              height="150"
              rounded="xl"
              class="bg-deep-orange-lighten-2 d-flex align-center"
            >
              <v-icon size="50" color="white" class="mr-auto ml-8"
                >mdi-cards-heart</v-icon
              >
              <div class="w-100 pa-6 text-wrap text-white">
                <v-text-field
                  variant="underlined"
                  label="Insira uma resposta aqui"
                  v-model="slide.optC"
                >
                </v-text-field>
              </div>
              <v-radio-group v-model="slide.rightOpt">
                <v-radio class="mr-8" value="optC" color="white"> </v-radio>
              </v-radio-group>
            </v-card>
            <!-- <v-btn SAVE IT FOR THE ACTUAL GAME TEMPLATE
                    block
                    height="150"
                    variant="outlined"
                    rounded="xl"
                    size="large"
                    class="bg-deep-orange-lighten-2 d-block no-uppercase"
                    style="border: 0px solid #000"
                  >
                    <v-icon class="mr-auto ml-6" size="50" color="white"
                      >mdi-cards-heart</v-icon
                    >
                    <div class="pa-6 text-center text-wrap text-white">
                      asdfasfdasfadsfas asas adss ddfdf
                    </div>
                    <v-radio value="1" color="white"> </v-radio>
                  </v-btn> -->
          </v-col>
          <v-col cols="12" md="6">
            <v-card
              flat
              height="150"
              rounded="xl"
              class="bg-pink-accent-1 d-flex align-center"
            >
              <v-icon size="50" color="white" class="mr-auto ml-8"
                >mdi-cards-diamond</v-icon
              >
              <div class="w-100 pa-6 text-wrap text-white">
                <v-text-field
                  variant="underlined"
                  label="Insira uma resposta aqui"
                  v-model="slide.optD"
                >
                </v-text-field>
              </div>
              <v-radio-group v-model="slide.rightOpt">
                <v-radio class="mr-8" value="optD" color="white"> </v-radio>
              </v-radio-group>
            </v-card>
            <!-- <v-btn
                    block
                    height="150"
                    variant="outlined"
                    rounded="xl"
                    size="large"
                    class="bg-pink-accent-1 d-block no-uppercase"
                  >
                    <v-icon class="mr-auto ml-6" size="50" color="white"
                      >mdi-cards-diamond</v-icon
                    >
                    <div class="pa-6 text-center text-wrap">
                      asdfasfdasfadsfas asas adss asdasdas das asdas dasd ddfdf
                    </div>
                    <v-radio value="1"> </v-radio>
                  </v-btn> -->
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    slide: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { imagePreview: null };
  },
  methods: {
    onFileInputChange(event) {
      debugger;
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          this.imagePreview = reader.result;
        };

        reader.readAsDataURL(file);
      }
      this.slide.image = file;
    },
    emitSlideChangeByUser() {
      this.$emit("slide-data-updated-by-user", this.slide);
    },
  },
  watch: {
    slide: {
      deep: true,
      handler() {
        debugger;
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

.btn-out {
  position: absolute;
  top: -5px;
  right: -5px;
  z-index: 10;
  padding: 0px;
}
</style>
