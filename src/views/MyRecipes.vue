<template>
    <header class="page-header gradient">
        <div class="container p-3">
            <div class="col align-items-center justify-content-center">
                <div class="row mt-3">
                    <p>
                        Ready to share your culinary genius with the world? Click the 'Create Recipe' button and start
                        crafting your masterpiece. You can easily add ingredients,
                        steps, and photos to bring your recipe to life.
                    </p>
                </div>
                <div class="btn1">
                    <button type="button" class="btn btn-outline-warning btn-dark" :class="{ 'blink': !UserRecipes.length }"
                        data-bs-toggle="modal" data-bs-target="#id-1">
                        Create Recipe!
                    </button>
                    <ModalPop />
                    <button type="button" class="btn btn-outline-warning btn-dark" @click="getAllUserRecipes">
                        Download My Recipes!
                    </button>
                </div>
            </div>
        </div>
    </header>
    <div class="container grid">
        <div class="row row-cols-1">
            <section v-if="this.$store.state.isAuthenticated" class="light">
                <div class="container py-2">
                    <div class="h1 text-center text-dark" id="pageHeaderTitle">My Recipes</div>
                    <RecipeCard v-for="recipe of UserRecipes" :key="recipe.id" :recipe="recipe" tag="edit" />
                </div>
            </section>
        </div>
        <div class="d-flex justify-content-center">
            <paginate v-if="UserRecipes.length" v-model="currentPage" :clickHandler="getUserRecipes" :page-count="pageCount"
                :margin-pages="2" :page-range="3" :container-class="'ui pagination menu mb-4'" :page-link-class="'item'"
                :prev-link-class="'item'" :next-link-class="'item'" :break-view-link-class="'break-view-link'"
                :no-li-surround="true"></paginate>
        </div>
    </div>
</template>

  
<script>

import ModalPop from '../components/ModalPop.vue';
import RecipeCard from '../components/RecipeCard.vue';
import Paginate from 'vuejs-paginate-next';
import axios from 'axios'


export default {

    data() {
        return {
            UserRecipes: [],
            currentPage: 1,
            pageCount: 0,
            pageSize: 3
        }
    },
    components: {
        ModalPop,
        RecipeCard,
        Paginate
    },
    methods: {
        async getUserRecipes(page) {
            this.$store.commit('setIsLoading', true)

            await axios
                .get(`/api/user-recipes/?page=${page}&page_size=${this.pageSize}`)
                .then(response => {
                    this.pageCount = Math.ceil(response.data.count / this.pageSize);
                    this.UserRecipes = response.data.results;
                    this.currentPage = page;
                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)

        },
        async getAllUserRecipes() {
            this.$store.commit('setIsLoading', true)

            await axios
                .get(`/api/all-user-recipes/`, {
                    responseType: 'blob'
                })
                .then(response => {
                    const url = URL.createObjectURL(new Blob([response.data], {
                        type: 'application/json'
                    }));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'user-recipes.json');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)


        }
    },
    mounted() {
        this.getUserRecipes(this.currentPage)

    }
}
</script>


  
<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.10/components/menu.min.css");

.blink {
    animation: blinker 1s linear infinite;
    border: 2px solid var(--bs-btn-color);
    ;
    /* Replace #f00 with your desired color */
}

@keyframes blinker {
    50% {
        border-color: transparent;
    }
}

label {
    font-weight: bold;
}

textarea {
    height: 100px;
}

button {
    margin-top: 20px;
}

.recipe-cards {
    margin-top: 50px;
}

.recipe-card {
    margin-bottom: 20px;
}

.gradient {
    background: rgb(220, 220, 222);
    background: linear-gradient(90deg, rgba(220, 220, 222, 1) 0%, rgba(214, 205, 68, 1) 43%, rgba(240, 162, 6, 1) 100%);
}

img {
    width: 40%;
}

.btn1 {
    margin-top: -1rem;
}

.btn:hover {

    background-color: var(--bs-btn-bg);
    color: var(--bs-btn-color);
    box-shadow: 0 0 10px #000000;

}

#pageHeaderTitle {
    margin: 1rem 0;
    text-align: center;
    font-size: 2.5rem;
}
</style>  