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



axios.defaults.baseURL = 'http://127.0.0.1:8000/'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(VueNumber)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')




