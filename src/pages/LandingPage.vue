<template>
  <v-main class="my-10 mx-auto w-100 w-md-75" style="max-width: 1100px">
    <v-card flat class="text-primary">
      <v-row no-gutters>
        <v-col cols="12" md="5" class="d-flex flex-column">
          <v-card-title
            class="px-0 pl-3 my-7 font-weight-bold text-wrap no-hyphen"
            style="font-size: min(4vw, 70px)"
            ><p class="line-height">Aprender nunca foi tão divertido.</p>
          </v-card-title>
          <v-card-subtitle
            class="myFont px-0 pl-3 text-wrap font-weight-black text-h6"
          >
            Teste seus conhecimentos e acumule pontos com as respostas corretas.
          </v-card-subtitle>
          <v-card-actions class="px-0 pl-3 mt-auto">
            <v-row class="w-100" no-gutters>
              <v-col cols="6" class="pr-1">
                <v-btn
                  variant="tonal"
                  height="50"
                  style="background-color: #d37146; color: white"
                  class="w-100"
                  rounded="xs"
                  to="/eduquiz/register"
                >
                  começar agora
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  variant="outlined"
                  color="secondary"
                  class="w-100"
                  height="50"
                  rounded="xs"
                  href="https://github.com/MinhaTu/eduquiz"
                  target="_blank"
                  >saiba mais</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-col>
        <v-col cols="12" md="7">
          <v-container class="pa-0">
            <v-img cover class="mt-auto" src="/imgs/ed_kit_3.png"></v-img>
          </v-container>
        </v-col>
      </v-row>
    </v-card>

    <v-container class="my-16"></v-container>
    <v-card flat class="text-primary mt-16">
      <v-row>
        <v-col cols="12" md="6">
          <v-container class="pa-0">
            <v-img cover src="/imgs/ed_kit_9.png"></v-img>
          </v-container>
        </v-col>
        <v-col cols="12" md="5" class="d-flex flex-column">
          <p class="ml-3 text-secondary font-weight-bold">RESPONSIVO</p>
          <v-card-title
            class="px-0 pl-3 font-weight-bold text-wrap no-hyphen"
            style="font-size: min(3vw, 40px)"
            ><p class="line-height">
              Responda às perguntas diretamente do seu dispositivo móvel.
            </p>
          </v-card-title>
          <v-card-subtitle
            class="myFont mt-auto px-0 pl-3 text-wrap font-weight-black text-h6"
          >
            Site responsivo para usar no celular.
          </v-card-subtitle>
          <v-card-actions class="px-0 pl-3 mt-auto">
            <v-row class="w-100" no-gutters>
              <v-col cols="8" class="pr-1">
                <v-btn
                  variant="tonal"
                  height="50"
                  style="background-color: #d37146; color: white"
                  class="w-100"
                  rounded="xs"
                  to="/eduquiz/register"
                >
                  começar agora
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>

    <v-container class="my-16"></v-container>

    <v-card flat>
      <p class="ml-3 text-secondary font-weight-bold text-center">
        FÁCIL DE COMEÇAR
      </p>
      <v-card-title
        class="px-0 pl-3 font-weight-bold text-primary text-wrap no-hyphen"
        style="font-size: min(3vw, 40px)"
        ><p class="line-height text-center">Aprenda como jogar</p>
      </v-card-title>
      <v-container class="d-flex flex-column flex-md-row">
        <v-container class="mt-16">
          <v-card
            class="overflow-visible ma-auto rounded-lg"
            flat
            color="#DBDCF1"
          >
            <v-container align="center">
              <v-avatar
                class="mt-n16"
                size="100"
                image="/imgs/profile_pic_1.jpg"
              >
              </v-avatar>
              <v-card-title class="text-secondary font-weight-bold">
                ARTHUR
              </v-card-title>
              <v-card-text class="text-primary"
                >"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.”</v-card-text
              >
            </v-container>
          </v-card>
        </v-container>
        <v-container class="mt-16">
          <v-card
            class="overflow-visible ma-auto rounded-lg"
            flat
            color="#DBDCF1"
          >
            <v-container align="center">
              <v-avatar
                class="mt-n16"
                size="100"
                image="/imgs/profile_pic_1.jpg"
              >
              </v-avatar>
              <v-card-title class="text-secondary font-weight-bold">
                ARTHUR
              </v-card-title>
              <v-card-text class="text-primary"
                >"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.”</v-card-text
              >
            </v-container>
          </v-card>
        </v-container>
        <v-container class="mt-16">
          <v-card
            class="overflow-visible ma-auto rounded-lg"
            flat
            color="#DBDCF1"
          >
            <v-container align="center">
              <v-avatar
                class="mt-n16"
                size="100"
                image="/imgs/profile_pic_1.jpg"
              >
              </v-avatar>
              <v-card-title class="text-secondary font-weight-bold">
                ARTHUR
              </v-card-title>
              <v-card-text class="text-primary"
                >"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.”</v-card-text
              >
            </v-container>
          </v-card>
        </v-container>
      </v-container>
    </v-card>

    <v-container class="my-3"></v-container>
    <v-divider length="1800" thickness="2"></v-divider>
    <v-card flat color="#DBDCF1" class="mx-8 mt-16 rounded-lg">
      <p class="ml-3 my-16 text-secondary font-weight-bold text-center">
        PREPARADO?
      </p>
      <v-card-title
        class="px-16 font-weight-bold text-primary text-wrap no-hyphen"
        style="font-size: min(3vw, 50px)"
        ><p class="line-height text-center">
          Comece a explorar seus conhecimentos agora mesmo
        </p>
      </v-card-title>
      <v-card-actions class="my-16 justify-center">
        <v-btn
          variant="tonal"
          height="50"
          style="background-color: #d37146; color: white"
          rounded="xs"
          to="/eduquiz/register"
        >
          Iniciar Quiz
        </v-btn>
      </v-card-actions>
    </v-card>

    <div class="d-none d-md-flex parent">
      <img class="image2" width="450" src="/imgs/ed_kit_4.png" />
      <img class="image3" width="450" src="/imgs/ed_kit_7.png" />
    </div>
  </v-main>
</template>

<script>
import MainHeader from "../components/UI/MainHeader.vue";
export default {
  components: { MainHeader },
};
</script>
