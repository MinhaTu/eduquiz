<template>
  <v-app>
    <div class="mx-auto w-75" style="max-width: 1100px">
      <v-toolbar flat color="white" class="text-primary">
        <v-toolbar-title>
          <v-menu class="d-md-none" open-on-click>
            <template v-slot:activator="{ props }">
              <v-btn
                color="primary"
                class="font-weight-black text-h4"
                v-bind="props"
              >
                <p></p>
                Eduquiz
              </v-btn>
            </template>

            <v-list :items="toolbarItems"></v-list>
          </v-menu>
        </v-toolbar-title>
        <div class="d-none d-md-flex ml-n5">
          <v-btn class="no-uppercase font-weight-bold" variant="text">
            sobre
          </v-btn>
          <v-btn class="no-uppercase font-weight-bold" variant="text">
            contato
          </v-btn>
          <v-btn
            class="no-uppercase font-weight-bold"
            variant="text"
            append-icon="mdi-menu-down"
          >
            salas
          </v-btn>
          <div class="mx-16"></div>
          <v-btn class="no-uppercase font-weight-bold"> entrar </v-btn>
          <v-btn
            rounded
            class="no-uppercase"
            style="background-color: #d37146; color: white"
          >
            criar conta
          </v-btn>
        </div>
      </v-toolbar>
      <v-main class="my-10">
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
                Teste seus conhecimentos e acumule pontos com as respostas
                corretas.
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
                      >saiba mais</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-col>
            <v-col cols="12" md="7">
              <v-container class="pa-0">
                <v-img
                  cover
                  class="mt-auto"
                  src="/imgs/ed_kit_3.png"
                ></v-img>
              </v-container>
            </v-col>
          </v-row>
        </v-card>

        <v-container class="my-16"></v-container>
        <v-card flat class="text-primary mt-16">
          <v-row>
            <v-col cols="12" md="6">
              <v-container class="pa-0">
                <v-img
                  cover
                  src="/imgs/ed_kit_9.png"
                ></v-img>
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
                    >"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
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
                    >"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
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
                    >"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
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
              class="w-25"
              rounded="xs"
            >
              Iniciar Quiz
            </v-btn>
          </v-card-actions>
        </v-card>

        <div class="d-none d-md-flex parent">
          <img
            class="image2"
            width="450"
            src="/imgs/ed_kit_4.png"
          />
          <img
            class="image3"
            width="450"
            src="/imgs/ed_kit_7.png"
          />
        </div>
      </v-main>
    </div>
    <v-footer class="d-block pa-16" color="primary">
      <div class="mx-auto w-75" style="max-width: 1100px">
        <v-row>
          <v-col cols="12" md="3">
            <v-toolbar-title class="font-weight-black text-h4"
              >Eduquiz</v-toolbar-title
            >
          </v-col>
          <v-col cols="12" md="3">
            <v-list bg-color="primary" :items="items"></v-list>
          </v-col>
          <v-col cols="12" md="3">
            <v-list bg-color="primary" :items="items"></v-list>
          </v-col>
          <v-col cols="12" md="3">
            <div class="my-4">
              <p class="font-weight-bold">receba nossa newsletter</p>
            </div>
            <div>
              <v-text-field
                class="d-inline"
                label="E-mail"
                append-inner-icon="mdi-send"
                variant="outlined"
              ></v-text-field>
            </div>
          </v-col>
        </v-row>
        <div>
          <p class="mt-16 text-center font-weight-black">
            Feito com ❤️ por Alexandre Morais
          </p>
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    toolbarItems: [
      {
        title: "sobre",
        value: 1,
      },
      {
        title: "contato",
        value: 2,
      },
      {
        title: "salas",
        value: 3,
      },
    ],
    items: [
      {
        title: "início",
        value: 1,
      },
      {
        title: "sobre",
        value: 2,
      },
      {
        title: "criar conta",
        value: 3,
      },
    ],
  }),
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap");

body {
  font-family: "Outfit", sans-serif;
}

$body-font-family: "Outfit";
$title-font: "Outfit";

.v-application,
.v-overlay-container {
  font-family: $body-font-family, sans-serif !important;

  .text-h4,
  .text-h5,
  .text- .subheading,
  .title {
    // To pin point specific classes of some components
    font-family: $title-font, sans-serif !important;
  }
}

.my-input.v-input .v-input__slot {
  border-radius: 100px;
}

.no-uppercase {
  text-transform: unset !important;
}
.no-hyphen {
  hyphens: none !important;
}

.line-height {
  line-height: 1.1em;
}

.girl-img {
  position: fixed !important;
  top: 0px;
  left: 0px;
}

.parent {
  position: relative;
  top: 0;
  left: 0;
}
.image1 {
  position: relative;
  top: 0;
  left: 0;
  border: 1px solid #000000;
}
.image2 {
  position: absolute;
  top: -279px;
  left: -170px;
}

.image3 {
  position: absolute;
  top: -679px;
  left: 600px;
}
</style>
