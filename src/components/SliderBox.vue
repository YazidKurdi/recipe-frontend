<template>
    <div class="container">
        <Carousel :wrap-around="true" :breakpoints="breakpoints">
            <Slide v-for="slide in recipes" :key="slide.id">
                <div :class="['carousel__item', { selected: slide.id === selectedSlideId }]" @click="handleClick(slide)">
                    <div class="card">
                        <img :src="endpoint + slide.thumbnail" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h6 class="card-title"> {{ slide.title }}</h6>
                        </div>
                    </div>
                </div>
            </Slide>

            <template #addons>
                <Navigation />
            </template>
        </Carousel>
    </div>
</template>
  
<script>
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import endpoint from '@/main.js'
import 'vue3-carousel/dist/carousel.css'

export default ({

    data: () => ({
        endpoint: endpoint,
        selectedSlideId: null,
        // carousel settings
        settings: {
            itemsToShow: 4,
            snapAlign: 'center',
        },
        // breakpoints are mobile first
        // any settings not specified will fallback to the carousel settings
        breakpoints: {
            // 700px and up
            700: {
                itemsToShow: 4,
                snapAlign: 'center',
            },
            // 1024 and up
            1024: {
                itemsToShow: 4,
                snapAlign: 'start',
            },
        },
    }),
    components: {
        Carousel,
        Slide,
        Navigation
    },
    methods: {
        handleClick(recipe) {
            // perform desired action on the selected recipe
            this.selectedSlideId = recipe.id
            this.$emit('selected', recipe)
        },
    },
    props: {
        recipes: Array
    },


})
</script>
  

<style scoped>
.carousel__item {
    height: max-content;
    overflow: hidden;
    width: 100%;
    /* background-color: var(--vc-clr-primary); */
    /* color: var(--vc-clr-white); */
    font-size: 20px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 6px #a76213;
}

.carousel__item.selected {
    border: 2px solid #007bff;
    /* highlight selected slide with a blue border */
}


.carousel__slide {
    padding: 10px;
}

.carousel__prev,
.carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
}


img {
    width: 100%;
    height: 250px;
}

.container{
    padding-left: calc(var(--bs-gutter-x) * 4.8);
    padding-right: calc(var(--bs-gutter-x) * 4.8);
}
</style>
  