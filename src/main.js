import { createApp } from "vue";

import App from "./App.vue";
import "./assets/main.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import router from "./router/router.js";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faList, faMinus, faPlus, faShield, faStar, faTableCellsLarge, faTruck, faUser, faUserSecret } from '@fortawesome/free-solid-svg-icons'


library.add(faUserSecret, faUser, faList, faTableCellsLarge, faStar,faTruck,faShield, faMinus, faPlus, faBars)




createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.mount("#app");
