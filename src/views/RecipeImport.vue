<template>
    <header class="page-header gradient">
        <div class="container p-3">
            <div class="col align-items-center justify-content-center">
                <div class="row mt-3">
                    <p>
                        With just a simple copy and paste of your favorite recipe's website link, you can now import your
                        desired recipe
                        in seconds. Save time and effort while enjoying your favorite dishes by trying out this feature
                        today.
                    </p>
                </div>
                <div class="input-group mt-2">
                    <input v-model="url" type="text" placeholder="https://..."
                        class="form-control form-control-lg form-control-borderless form-control-search form-control"
                        id="__BVID__11" @keyup="importRecipe">

                    <button type="button" class="btn btn-outline-warning btn-dark"
                        @click="importRecipe"><i><font-awesome-icon icon="fas fa-search fa-fw" /></i></button>
                </div>
            </div>
        </div>
    </header>

    <transition name="fade">
        <RecipeForm v-if="generated" :recipe="importedRecipe" view="import-view container text-center"></RecipeForm>
    </transition>
</template>

<script>
import axios from 'axios';
import RecipeForm from '@/components/RecipeForm.vue';
import toasts from '@/modules/toasts'

export default {

    data() {
        return {
            url: '',
            generated: false,
            importedRecipe: {}
        };
    },
    components: {
        RecipeForm
    },
    methods: {
        async importRecipe() {
            const form = {
                url: this.url
            }
            this.generated = false

            this.$store.commit('setIsLoading', true)

            await axios.post(`/api/recipe-import/`, form)
                .then((response) => {
                    this.importedRecipe = JSON.parse(response.data)
                    this.generated = true
                })
                .catch(() => {
                    toasts.toastError("Whoops, something went wrong, try again later!")
                })
            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>

<style scoped>
.gradient {
    background: rgb(220, 220, 222);
    background: linear-gradient(90deg, rgba(220, 220, 222, 1) 0%, rgba(214, 205, 68, 1) 43%, rgba(240, 162, 6, 1) 100%);
}

.page-header {
    margin-bottom: 20px;
}

.btn:hover {

    background-color: var(--bs-btn-bg);
    color: var(--bs-btn-color);
    box-shadow: 0 0 10px #000000;

}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>