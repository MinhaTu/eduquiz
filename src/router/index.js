import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Home.vue";
import Room from "../pages/Room.vue";
import TheRoom from "../pages/TheRoom.vue";
import Game from "../pages/Game.vue";
import LandingPage from "../pages/LandingPage.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import PublicRooms from "../pages/PublicRooms.vue";
import CreateQuiz from "../pages/CreateQuiz.vue";
import YourQuizzes from "../pages/YourQuizzes.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/eduquiz/", component: LandingPage },
    { path: "/eduquiz/room", component: Room },
    { path: "/eduquiz/game", component: Game },
    { path: "/eduquiz/home", component: Home },
    { path: "/eduquiz/login", component: Login },
    { path: "/eduquiz/register", component: Register },
    { path: "/eduquiz/my-quizzes", component: YourQuizzes },
    { path: "/eduquiz/create-quiz/:quizId", component: CreateQuiz },
    { path: "/eduquiz/public-rooms", component: PublicRooms },
    { path: "/eduquiz/rooms/:roomId", component: TheRoom },
  ],
});

export default router;
