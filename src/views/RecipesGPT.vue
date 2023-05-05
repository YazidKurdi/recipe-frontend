<template>
    <header class="page-header gradient pb-3">
        <div class="container p-3">
            <div class="col align-items-center justify-content-center">
                <div class="row mt-3">
                    <p>
                        Ready to take your recipes to the next level? Click on one of your favorite recipes now to unlock
                        the power of our AI assistant! With just a few clicks, you can create exciting new twists on your
                        tried-and-true dishes and save them for future deliciousness. Don't miss out on the chance to
                        elevate your cooking game – click now to get started!
                    </p>

                    <!-- <p> Available credits for today: {{  gptCounter }}</p> -->
                </div>
            </div>
        </div>

        <SliderBox :recipes="UserRecipes" @selected="displayRecipe"></SliderBox>

    </header>

    <div v-if="selectedRecipe.id" class="container">
        <h1 class="text-center text-dark">Original Recipe</h1>
        <RecipeCard :recipe="selectedRecipe" tag="generate" @actionClick="sendRecipe" />

        <h1 v-if="responseRecipe" class="text-center text-dark">ChefGPT Recipe</h1>
        <transition name="fade">
            <RecipeCard v-if="responseRecipe" :recipe="responseRecipe" tag="save" />
        </transition>
    </div>
</template>

<script>
import SliderBox from '@/components/SliderBox.vue'
import axios from 'axios';
import toasts from '@/modules/toasts'
import RecipeCard from '@/components/RecipeCard.vue'

export default {

    data() {
        return {
            UserRecipes: [],
            selectedRecipe: [],
            responseRecipe: null
        }
    },
    components: {
        SliderBox,
        RecipeCard
    },
    methods: {
        displayRecipe(recipe) {
            this.selectedRecipe = recipe
        },
        async sendRecipe() {

            this.$store.commit('setIsLoading', true)

            await axios
                .post(`/api/gpt-recipe/`, this.selectedRecipe)
                .then((response) => {
                    this.responseRecipe = { ...this.selectedRecipe }
                    this.responseRecipe['id'] = null
                    this.responseRecipe['ai_generated'] = true

                    const data = JSON.parse(response.data);
                    this.responseRecipe['description'] = data['description']
                    this.responseRecipe['ingredients'] = data['ingredients']

                })
                .catch((error) => {
                    if (error.response && error.response.status === 429) {
                        toasts.toastError("Exceeded limit for the day!");
                    } else {
                        toasts.toastError("Whoops, ChefGPT is busy preparing another meal, try again later!");
                    }
                })

            this.$store.commit('setIsLoading', false)
        }
    },
    mounted() {

        axios
            .get(`/api/user-recipes/`)
            .then(response => {
                this.UserRecipes = response.data
            })
            .catch(error => {
                console.log(error)
            })
    }

}

</script>

<style scoped>
.gradient {
    background: rgb(220, 220, 222);
    background: linear-gradient(90deg, rgba(220, 220, 222, 1) 0%, rgba(214, 205, 68, 1) 43%, rgba(240, 162, 6, 1) 100%);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

p {
    text-align: center;
}
</style>