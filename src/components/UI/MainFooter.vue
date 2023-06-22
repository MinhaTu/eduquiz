<template>
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
</template>

<script>
export default {
  data: () => ({
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
