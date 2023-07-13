<template>
  <v-app>
    <div class="mx-auto w-100 w-md-75" style="max-width: 1100px">
      <MainHeader :isLoggedIn="isLoggedIn"></MainHeader>
    </div>
    <router-view></router-view>
    <MainFooter></MainFooter>
  </v-app>
</template>

<script>
import MainHeader from "./components/UI/MainHeader.vue";
import MainFooter from "./components/UI/MainFooter.vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
export default {
  components: {
    MainHeader,
    MainFooter,
  },
  data() {
    return { isLoggedIn: true };
  },
  created() {
    let auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.state.userId = user.uid;
        this.isLoggedIn = true;
      } else {
        this.$store.state.userId = null;
        this.isLoggedIn = false;
      }
    });
  },
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

  .text-h2,
  .text-h3,
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
