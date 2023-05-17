<template>
    <article class="postcard light red" :class="{ 'expanded': isExpanded }">
        <a class="postcard__img_link" href="#">
            <img class="postcard__img" :src='"https://cuisines.fra1.cdn.digitaloceanspaces.com/" + recipe.cuisine + ".jpg"'
                alt="Image thumbnail" />
        </a>
        <div class="postcard__text text-dark">
            <div class="d-flex align-items-center justify-content-between">
                <h2><a>{{ recipe.title }}</a></h2>
                <h1 v-if="tag === 'generate'" class="bi bi-shuffle card-btn" @click="handleButton"> Chef AI-Assitant Recipe
                    Generation </h1>
                <div v-else class="d-flex align-items-center justify-content-between">
                    <h1 href="#" class="bi bi-plus-circle-fill card-btn" data-bs-toggle="modal"
                        :data-bs-target="'#id-' + recipe.id"> Edit </h1>
                    <h1 v-if="tag === 'edit' && recipe.id" href="#" @click="incrementClickCount"
                        @dblclick="deleteRecipe(recipe)" class="bi bi-trash ms-4 card-btn"
                        :class="{ 'delete-one-count': clickCount == 1 }">Delete
                    </h1>
                </div>
                <ModalPop :recipe="recipe" :id="recipe.id"> Edit Your Recipe!
                </ModalPop>
            </div>
            <div class="postcard__subtitle small">
                <time>
                    <i><font-awesome-icon icon="fas fa-calendar" /></i>{{ recipe.updated_at
                    }}
                </time>
            </div>
            <div class="postcard__bar"></div>
            <div class="postcard__preview-txt">{{ truncatedText }}
                <a v-if="shouldShowReadMoreButton" href="#" id="read-more-link" @click.prevent="toggleExpansion">
                    {{ isExpanded ? 'Read Less' : 'Read More' }}
                </a>
            </div>
            <ul class="postcard__tagbox">
                <li class="tag__item"><i><font-awesome-icon icon="fas fa-tag" /></i> {{
                    recipe.cuisine }}</li>
                <li v-if="recipe.ai_generated" class="tag__item"><i><font-awesome-icon icon="fas fa-utensils" /></i>ChefGPT
                </li>
            </ul>
        </div>
    </article>
</template>

<script>
import ModalPop from '../components/ModalPop.vue';
import axios from 'axios';
import toasts from '@/modules/toasts'
import endpoint from '@/main.js'

export default {

    data() {
        return {
            clickCount: 0,
            isExpanded: false,
            endpoint: endpoint,
        };
    },
    components: {
        ModalPop,
    },
    methods: {
        toggleExpansion() {
            this.isExpanded = !this.isExpanded;
        },
        handleButton() {
            this.$emit('actionClick');
        },
        deleteRecipe(recipe) {
            axios
                .delete(`/api/delete-recipe/${recipe.id}`)
                .then(() => {
                    this.$router.go(0)
                    // toasts.toastSuccess("Recipe Deleted!")
                })
                .catch(() => {
                    toasts.toastError("Whoops, something went wrong, try again later!")
                })

        },
        incrementClickCount() {
            this.clickCount++;
            if (this.clickCount === 2) {
                this.clickCount = 0;
                this.deleteRecipe(this.recipe);
            }
        }
    },
    props: {
        recipe: {
            type: Object,
            required: true
        },
        tag: {
            type: String
        }
    },
    computed: {
        truncatedText() {
            if (this.recipe.description.length > 350 & !this.isExpanded) {
                return this.recipe.description.slice(0, 350) + '...';
            }
            return this.recipe.description;
        },
        shouldShowReadMoreButton() {
            return this.recipe.description.length > 350;
        },
        recipeTitle() {
            return `#${this.recipe.title}`;
        }
    }
}

</script>



<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Baloo+2&display=swap");
$main-red: #bd150b !default;
$main-red-rgb-015: rgba(187, 127, 15, 0.589) !default;


#read-more-link {
    color: rgba(13, 13, 218, 0.795);
    text-decoration: underline;
}

.expanded {
    height: max-content;
}

.card-btn {
    cursor: pointer;
    font-size: 18px;
}

i {
    margin-right: 5px;
}

/* Cards */
.postcard {
    flex-wrap: wrap;
    display: flex;

    box-shadow: 0 4px 21px -12px rgba(0, 0, 0, 0.66);
    border-radius: 10px;
    margin: 0 0 2rem 0;
    overflow: hidden;
    position: relative;
    color: #ffffff;

    &.light {
        background-color: #e1e5ea;
    }

    a {
        color: inherit;
    }

    h1 {
        margin-bottom: 0.5rem;
        font-weight: 3;
        line-height: 1.2;
        margin-right: 5px;
    }

    .small {
        font-size: 80%;
    }

    .postcard__img {
        max-height: 180px;
        width: 100%;
        object-fit: cover;
        position: relative;
    }

    .postcard__img_link {
        display: contents;
    }

    .postcard__bar {
        width: 50px;
        height: 10px;
        margin: 10px 0;
        border-radius: 5px;
        background-color: #424242;
        transition: width 0.2s ease;
    }

    .postcard__text {
        padding: 1.5rem;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .postcard__preview-txt {
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: justify;
        height: 100%;
    }

    .postcard__tagbox {
        display: flex;
        flex-flow: row wrap;
        font-size: 14px;
        margin: 5px 0 0 0;
        padding: 5px 0 0 0;
        justify-content: center;

        .tag__item {
            display: inline-block;
            background: rgba(83, 83, 83, 0.4);
            border-radius: 3px;
            padding: 2.5px 10px;
            margin: 0 5px 5px 0;
            cursor: default;
            user-select: none;
            transition: background-color 0.3s;

            &:hover {
                background: rgba(83, 83, 83, 0.8);
            }
        }
    }

    &:before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 1;
        border-radius: 10px;
    }

    &:hover .postcard__bar {
        width: 100px;
    }
}

.delete-one-count {
    color: $main-red;
}

@media screen and (min-width: 769px) {

    article {
        font-size: 0.85em;
        height: 250px;
    }

    .postcard {
        flex-wrap: inherit;


        .postcard__tagbox {
            justify-content: start;
        }

        .postcard__img {
            max-width: 300px;
            max-height: 100%;
            transition: transform 0.3s ease;
        }

        .postcard__text {
            padding: 1.5rem 3rem;
            width: 100%;
        }


        &:hover .postcard__img {
            transform: scale(1.1);
        }

        &:nth-child(2n+1) {
            flex-direction: row;
        }

        &:nth-child(2n+0) {
            flex-direction: row-reverse;
        }

        &:nth-child(2n+1) .postcard__text::before {
            left: -12px !important;
            transform: rotate(4deg);
        }

        &:nth-child(2n+0) .postcard__text::before {
            right: -12px !important;
            transform: rotate(-4deg);
        }
    }
}

@media screen and (min-width: 1024px) {
    .postcard__text {
        padding: 2rem 3.5rem;
    }

    .postcard__text:before {
        content: "";
        position: absolute;
        display: block;

        top: -20%;
        height: 130%;
        width: 55px;
    }

    .postcard.light {
        .postcard__text:before {
            background: #e1e5ea;
        }
    }
}

/* COLORS */
.postcard .postcard__tagbox .red.play:hover {
    background: $main-red;
}

.red:hover .card-btn:hover {
    color: $main-red;
}

.red .postcard__bar {
    background-color: $main-red;
}

.red::before {
    background-image: linear-gradient(-30deg, $main-red-rgb-015, transparent 50%);
}

.red:nth-child(2n)::before {
    background-image: linear-gradient(30deg, $main-red-rgb-015, transparent 50%);
}




@media screen and (min-width: 769px) {

    .red::before {
        background-image: linear-gradient(-80deg, $main-red-rgb-015, transparent 50%);
    }

    .red:nth-child(2n)::before {
        background-image: linear-gradient(80deg, $main-red-rgb-015, transparent 50%);
    }
}
</style>