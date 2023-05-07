<template>
    <a href="" class="btn btn-block btn-google" @click.prevent="handleSignInGoogle">
        <font-awesome-icon icon="fa-brands fa-google" />
        <slot></slot>
    </a>
</template>

<script>
import firebaseConfig from '../firebaseConfig.js';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import toasts from '@/modules/toasts'
import axios from 'axios';

firebaseConfig

const provider = new GoogleAuthProvider();
const auth = getAuth();

export default {

    methods: {
        handleSignInGoogle() {
            signInWithPopup(auth, provider)
                .then((result) => {

                    const oauthAccessToken = result._tokenResponse.oauthAccessToken;

                    axios.defaults.headers.common["Authorization"] = ""
                    localStorage.removeItem("token")

                    const formData = {
                        access_token: oauthAccessToken
                    }

                    axios
                        .post("/dj-rest-auth/google/", formData)
                        .then((response) => {


                            const token = response.data.key
                            this.$store.commit('setToken', token)
                            axios.defaults.headers.common["Authorization"] = "Token " + token
                            localStorage.setItem("token", token)


                            axios.get("/get-userid/")
                                .then(response => {
                                    const userId = response.data.user_id;
                                    // store userId in state management
                                    this.$store.commit('setId', userId)
                                    localStorage.setItem("Id", userId)
                                })
                                .catch(error => {
                                    console.error(error);
                                });

                            toasts.toastSuccess('Login Successful!')
                            this.$router.push('/')
                        })
                        .catch(error => {
                            if (error.response && error.response.status === 400) {
                                // extract error messages from response
                                const flattenedErrors = toasts.flattenErrors(error)
                                // Loop over errors
                                flattenedErrors.forEach((error) => {
                                    toasts.toastError(error)
                                })

                            } else {
                                console.error(error)
                            }
                        })
                }).catch((error) => {
                    console.log(error);
                });
        }
    }
}
</script>
  

<style scoped>

.btn-google {
    background-color: var(--color-primary);
    border: 1px solid #ddd;
    color: #fff;
}

.btn-google:hover {
    background-color: #eee;
}

.btn-google:focus,
.btn-google:active {
    background-color: #ddd;
}
</style>