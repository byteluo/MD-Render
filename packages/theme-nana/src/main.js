import { createApp } from "vue";
import "./assets/style/global.less";
import App from "./App.vue";
import router from "./router/router";
import VueAnimateOnScroll from "vue3-animate-onscroll";
import animated from "animate.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { getAboutInfo } from "vector-core";

getAboutInfo()

import {
  faUser,
  faAngleLeft,
  faEdit,
  faSun,
  faMessage,
  faMoon,
  faFileWord,
  faSearch,
  faCheck,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

[
  faFileWord,
  faSearch,
  faEdit,
  faCheck,
  faTag,
  faUser,
  faAngleLeft,
  faMoon,
  faSun,
  faMessage,
].forEach((el) => {
  library.add(el);
});

const app = createApp(App);

app.component("icon", FontAwesomeIcon);
app.use(animated);
app.use(VueAnimateOnScroll);
app.use(router);
app.mount("#app");
