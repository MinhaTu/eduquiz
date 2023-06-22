<template>
  <v-main>
    <v-card flat color="#DBDCF1">
      <v-card-title
        class="mx-auto w-75 text-h3 pa-10 font-weight-bold text-primary text-wrap no-hyphen"
      >
        Seus quizzes
      </v-card-title>
    </v-card>
    <v-container class="d-flex justify-center">
      <v-card width="300" height="300" flat color="#DBDCF1" class="rounded-xl">
        <v-card-title
          class="w-75 text-h4 pl-4 pt-4 font-weight-bold text-primary text-wrap no-hyphen"
        >
          O que é o que é
        </v-card-title>
        <v-card-subtitle class="font-weight-black text-primary">
          22/06/2023 - 14h30
        </v-card-subtitle>
        <v-sheet class="bg-grey mt-3" width="300" height="120"> </v-sheet>
        <v-card-actions>
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
    </v-container>
  </v-main>
</template>
