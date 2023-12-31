/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";
import router from "@/router";
import { createStore } from "vuex";
// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

const store = createStore({
  state() {
    return {
      currentPlayer: null,
      roomPlayers: [],
      isHost: false,
      room: null,
      currentUser: null,
      creationMode: false,
      unsaved: false,
      slides: [],
    };
  },
});

const app = createApp(App);

registerPlugins(app);
app.use(router);
app.use(store);
app.mount("#app");
