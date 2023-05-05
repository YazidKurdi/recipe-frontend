<template>
    <div class="container mt-5">
        <div class="card bg-light">
            <article class="card-body mx-auto" style="max-width: 450px;">
                <h4 class="card-title mt-3 text-center">Get started with your free account</h4>
                <div class="container social">
                    <!-- <a href="" class="btn btn-block btn-twitter"> <font-awesome-icon icon="fa-brands fa-twitter" /> Login
                        via Twitter</a>
                    <a href="" class="btn btn-block btn-facebook"> <font-awesome-icon icon="fa-brands fa-facebook-f" />
                        Login via Facebook</a> -->
                    <GoogleLogin>Sign up with Google</GoogleLogin>
                </div>
                <p class="divider-text">
                    <span class="bg-light">OR</span>
                </p>
                <form>
                    <div class="form-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i><font-awesome-icon icon="fa-solid fa-user" /></i></span>
                        </div>
                        <input name="" class="form-control" placeholder="Full name" type="text" v-model="username">
                    </div> <!-- form-group// -->
                    <div class="form-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i><font-awesome-icon icon="fa-solid fa-envelope" /></i>
                            </span>
                        </div>
                        <input name="" class="form-control" placeholder="Email address" type="email" v-model="email">
                    </div> <!-- form-group// -->
                    <div class="form-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i><font-awesome-icon icon="fa-solid fa-lock" /></i> </span>
                        </div>
                        <input class="form-control" placeholder="Create password" type="password" v-model="password1">
                    </div> <!-- form-group// -->
                    <div class="form-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i><font-awesome-icon icon="fa-solid fa-lock" /></i> </span>
                        </div>
                        <input class="form-control" placeholder="Repeat password" type="password" v-model="password2">
                    </div> <!-- form-group// -->
                    <div class="form-group">
                        <button type="submit" class="btn btn-recipe" @click="submitForm"> Create Account
                        </button>
                    </div> <!-- form-group// -->
                    <p class="text-center">Already registered? <router-link to="/login">Log In!</router-link></p>
                </form>
            </article>
        </div> <!-- card.// -->

    </div>
</template>

<script>

import axios from 'axios'
import toasts from '@/modules/toasts'
import GoogleLogin from '@/components/GoogleLogin.vue'


export default {

    data() {
        return {
            username: '',
            email: '',
            password1: '',
            password2: '',
        }
    },
    components: {
        GoogleLogin
    },
    methods: {
        async submitForm() {
            const formData = {
                username: this.username,
                email: this.email,
                password1: this.password1,
                password2: this.password2

            }

            this.$store.commit('setIsLoading', true)

            await axios
                .post("/dj-rest-auth/registration/", formData)
                .then(() => {

                    toasts.toastSuccess('Account created, please log in!')
                    this.$router.push('/login')
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

            this.$store.commit('setIsLoading', false)
        }
    },
    mounted() {

        document.title = 'Sign Up | Recipes'
    }
}

</script>

<style scoped>
a {
    width: 100%;
    margin-bottom: 10px;
}


[class*="container social"] {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.form-group {
    margin-bottom: 10px;
    text-align: center;
}

.divider-text {
    position: relative;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
}

.divider-text span {
    padding: 7px;
    font-size: 12px;
    position: relative;
    z-index: 2;
}

.divider-text:after {
    content: "";
    position: absolute;
    width: 100%;
    border-bottom: 1px solid #ddd;
    top: 55%;
    left: 0;
    z-index: 1;
}

.btn-recipe {
    background-color: var(--color-primary);
    border: 1px solid #ddd;
    color: #fff;
}

.btn-recipe:hover {
    background-color: #eee;
}

.btn-recipe:focus,
.btn-recipe:active {
    background-color: #ddd;
}
</style>