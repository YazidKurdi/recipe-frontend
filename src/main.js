import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebookF,faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from 'axios'
import VueNumber from 'vue-number-animation'
/* import specific icons */
import {faEnvelope,faUser,faPhone,faBuilding,faLock,faCalendar,faTag,faUtensils,faShuffle} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faEnvelope,faUser,faPhone,faBuilding,faLock,faFacebookF,faTwitter,faGoogle,faCalendar,faTag,faUtensils,faShuffle)


const endpoint = process.env.VUE_APP_NODE_ENV === 'dev'
  ? process.env.VUE_APP_DEV_BACKEND
  : process.env.VUE_APP_PROD_BACKEND

axios.defaults.baseURL = endpoint

const app = createApp(App)
app.use(router)
app.use(store)
app.use(VueNumber)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

export default endpoint;

