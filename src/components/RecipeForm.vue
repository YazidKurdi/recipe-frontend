<template>
    <div class="my-recipes">
        <p v-if="!this.recipe.id">Enter your favorite recipes below to save them for later.</p>
        <form class="px-5">
            <div class="form">
                <div class="form-group col">
                    <label for="inputRecipe">Recipe Name</label>
                    <input v-model="recipeTitle" type="text" class="form-control" id="inputRecipe" placeholder="Recipe">
                </div>
                <div class="form-group col">
                    <label for="inputDescription">Recipe Description</label>
                    <textarea v-model="recipeDescription" class="form-control" id="inputDescription"
                        placeholder="Description" rows="5"></textarea>
                </div>
                <div class="form-group d-flex">
                    <label for="cuisine" style="margin-right: 1rem;  line-height: 2.5;">Cuisine</label>
                    <select class="form-control" id="cuisine" v-model="recipeCuisine" required>
                        <option value="" disabled>Select cuisine</option>
                        <option v-for="cuisine in cuisinesList" :key="cuisine.id" :value="cuisine.name">
                            {{ cuisine.name }}
                        </option>
                    </select>
                </div>
                <div class="form-group container text-center">
                    <label for="inputIngredients">Recipe Ingredients</label>
                    <div class="form row mt-2" v-for="item, index in ingredients" :key="index">
                        <div class="form-group col-3">
                            <input v-model="item.name" type="text" class="form-control ing" id="inputName"
                                name="ingredientsName" placeholder="Name" multiple>
                        </div>
                        <div class="form-group col-3">
                            <input v-model="item.unit" type="text" class="form-control ing" id="inputUnit" name="unit"
                                placeholder="Scale" multiple>
                        </div>
                        <div class="form-group col-3">
                            <input v-model="item.amount" type="text" class="form-control ing" id="inputAmount" name="Amount"
                                placeholder="Amount" multiple>
                        </div>
                        <div class="form-group col-3 d-flex justify-content-between">
                            <button type="button" class="btn bi bi-patch-plus-fill btn-sm btn-success"
                                @click="addIngredient"></button>
                            <button type="button" class="btn bi bi-trash btn-sm btn-danger"
                                @click="removeIngredient(index)"></button>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-recipe mt-5" @click.prevent="submitRecipe">Submit Recipe!</button>
            </div>
        </form>
    </div>
</template>
  

<script>
import { reactive } from 'vue'
import axios from 'axios'
import toasts from '@/modules/toasts'

export default {

    data() {
        return {
            cuisinesList: [],
            ingredients: this.recipe.ingredients,
            recipeTitle: this.recipe.title,
            recipeDescription: this.recipe.description,
            recipeCuisine: this.recipe.cuisine
        };
    },
    methods: {
        submitRecipe() {
            const formData = {
                title: this.recipeTitle,
                description: this.recipeDescription,
                ingredients: this.recipe.ingredients,
                author: this.$store.state.id,
                cuisine: this.recipeCuisine
            }
            if (!this.createUpdateRecipe) {
                this.createRecipe(formData)
            } else {
                this.updateRecipe(formData)
            }
        },
        createRecipe(formData) {
            axios
                .post("/api/create-recipe/", formData)
                .then(() => {
                    this.recipeTitle = ''
                    this.recipeDescription = ''
                    this.ingredients = reactive([{ id: '', name: '', unit: '', amount: '' }])
                    this.recipeCuisine = ""
                    toasts.toastSuccess("Recipe Created!")
                })
                .catch(() => {
                    toasts.toastError("Whoops, something went wrong, try again later!")
                })

        },
        updateRecipe(formData) {
            axios
                .put(`/api/update-recipe/${this.recipe.id}/`, formData)
                .then(() => {
                    toasts.toastSuccess("Recipe Updated!")
                })
                .catch(() => {
                    toasts.toastError("Whoops, something went wrong, try again later!")
                })
        },
        addIngredient() {

            this.ingredients.push({ name: '', unit: '', amount: '' })
        },
        removeIngredient(index) {

            if (this.ingredients.length > 1) {
                this.ingredients.splice(index, 1)

            }
        }
    },
    props: {
        recipe: {
            type: Object,
            default: () => {
                return {
                    id: '',
                    title: '',
                    description: '',
                    ingredients: [{ id: '', name: '', unit: '', amount: '' }],
                }
            }
        }
    },
    computed: {
        createUpdateRecipe() {
            return this.recipe.id
        }
    },
    mounted() {
        axios
            .get('/api/list-cuisines/')
            .then((response) => {
                this.cuisinesList = response.data
            })
            .catch((error)=>{
                console.log(error)
            })
    }
}
</script>
  
<style scoped>
.form-group {
    margin-top: 20px;
}

.bi.bi {
    font-size: 1.1rem;
    color: rgb(0, 0, 0)
}

.px-5 {
    margin-left: 30px !important;
    margin-right: 40px !important;
}

#inputName,
#inputAmount,
#inputUnit {
    font-size: 11px;
    text-align: center;
    line-height: 2;
}

.btn-success,
.btn-danger {
    width: auto
}

.btn-danger {
    background-color: #e02f10e0;
}

.btn-success {
    background-color: rgb(41, 136, 41);
}

.col-3 button {
    flex: 1;
    margin: 0 5px;
}

.btn:hover {

    background-color: var(--bs-btn-bg);
    color: var(--bs-btn-color);
    box-shadow: 0 0 10px #000000;

}

.btn-recipe {
    --bs-btn-color: #fff;
    --bs-btn-bg: var(--color-primary);
    --bs-btn-border-color: var(--color-primary);
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: var(--color-primary);
    --bs-btn-hover-border-color: var(--color-primary);
    --bs-btn-focus-shadow-rgb: 49, 132, 253;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: var(--color-primary);
    --bs-btn-active-border-color: var(--color-primary);
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #fff;
    --bs-btn-disabled-bg: var(--color-primary);
    --bs-btn-disabled-border-color: var(--color-primary);
}
</style>