<template>
  <header class="page-header gradient">
    <div class="container pt-3">
      <div class="row align-items-center justify-content-center">
        <div class="col-md-5">
          <p>
            Discover your next favorite meal with our recipe manager. Share your favorite recipes with friends, and let
            our chef assistant guide you through the cooking process. Start cooking and sharing today.
          </p>
          <router-link to="/login" class="nav-link" v-if="!this.$store.state.isAuthenticated"> <button type="button"
              class="btn btn-outline-warning btn-dark">
              Get Started
            </button></router-link>
        </div>
        <div class="col-md-5 image-container">
          <img src="../assets/croissant.svg" alt="Header image" />
        </div>
      </div>
    </div>
  </header>

  <section id="why-us" class="why-us section-bg">
    <div class="container">

      <div class="row gy-4">

        <div class="col-lg-4">
          <div class="why-box">
            <h3>Why Choose Recipe?</h3>
            <p>
              You can easily upload and download recipes, share your favorite meals with friends and family, and get
              assistance from our AI-powered chef assistant. Whether you're looking to expand your culinary horizons, find
              inspiration for new meals, or simply organize your favorite recipes in one place. With user-friendly
              interfaces and intuitive design, our platform makes cooking easier
              and more enjoyable than ever before.
            </p>
          </div>
        </div><!-- End Why Box -->

        <div class="col-lg-8 d-flex align-items-center">
          <div class="row gy-4">

            <div class="col-xl-4">
              <div class="icon-box d-flex flex-column justify-content-center align-items-center">
                <i class="bi bi-clipboard-data"></i>
                <h4>Share Recipes with Others</h4>
                <p>
                  Share your favorite recipes with friends and family via email or social media, or create your own recipe
                  groups.
                </p>
              </div>
            </div><!-- End Icon Box -->

            <div class="col-xl-4">
              <div class="icon-box d-flex flex-column justify-content-center align-items-center">
                <i class="bi bi-gem"></i>
                <h4>AI-powered Chef Assistant</h4>
                <p>
                  Get new recipe suggestions on demand, with our new AI-powered assistant ChefGPT!

                </p>
              </div>
            </div><!-- End Icon Box -->

            <div class="col-xl-4">
              <div class="icon-box d-flex flex-column justify-content-center align-items-center">
                <i class="bi bi-inboxes"></i>
                <h4>Simple Recipe Storage</h4>
                <p>
                  Store all your favorite recipes in one place and access them whenever you need them.</p>
              </div>
            </div><!-- End Icon Box -->

          </div>
        </div>

      </div>

    </div>
  </section>

  <section id="stats-counter" class="stats-counter">
    <div class="container">

      <div class="row gy-4 d-flex align-items-center justify-content-between">

        <div class="col-lg-3 col-md-6 animate-me">
          <div class="stats-item text-center w-100 h-100">
            <span>
              <number class="bold transition" ref="number1" :from="0" animationPaused :delay="0.5"
                :to="statisticsRecipes.user_count" :duration="2" easing="Power1.easeOut" />
            </span>
            <p>Users</p>
          </div>
        </div><!-- End Stats Item -->

        <div class="col-lg-3 col-md-6 animate-me">
          <div class="stats-item text-center w-100 h-100">
            <span>
              <number class="bold transition" ref="number2" :from="0" animationPaused :delay="0.5"
                :to="statisticsRecipes.recipe_count" :duration="2" easing="Power1.easeOut" />
            </span>
            <p>Recipes</p>
          </div>
        </div><!-- End Stats Item -->

        <div class="col-lg-3 col-md-6 animate-me">
          <div class="stats-item text-center w-100 h-100">
            <span>
              <number class="bold transition" ref="number3" :from="0" animationPaused :delay="0.5"
                :to="statisticsRecipes.ingredient_count" :duration="2" easing="Power1.easeOut" />
            </span>
            <p>Ingredients</p>
          </div>
        </div><!-- End Stats Item -->
      </div>
    </div>
  </section>
</template>



<script>

import axios from 'axios'

export default {

  data() {
    return {
      statisticsRecipes: []
    }
  },
  methods: {
    async getRecipeStatistics() {

      await axios
        .get('/api/recipes-statistics/')
        .then(response => {
          this.statisticsRecipes = response.data
        })
        .catch(error => {
          console.log(error)
        })

    }
  },
  mounted() {
    this.getRecipeStatistics()
  },
  updated() {

    const options = {
      rootMargin: '0px',
      threshold: 0.5 // trigger when div is 50% in view
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$refs.number1.play()
        this.$refs.number2.play()
        this.$refs.number3.play()
        observer.unobserve(entry.target);
      }
    }, options);

    const animatedDivs = document.querySelector('.animate-me');
    observer.observe(animatedDivs)
  }
}
</script>

<style scoped>
section {
  overflow: hidden;
  padding: 80px 0;
}

.section-bg {
  background-color: #eee;
}

/*--------------------------------------------------------------
# Why Us Section
--------------------------------------------------------------*/
.why-us .why-box {
  padding: 30px;
  background: var(--color-primary);
  color: #fff;
  transition: all ease-in-out 0.4s;
}

.why-us .why-box h3 {
  font-weight: 700;
  font-size: 34px;
  margin-bottom: 30px;
}

.why-us .why-box p {
  margin-bottom: 30px;
}

.why-us .icon-box {
  text-align: center;
  background: #fff;
  padding: 40px 30px;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(55, 55, 63, 0.1);
  transition: 0.3s;
}

.why-us .icon-box i {
  color: var(--color-primary);
  margin-bottom: 30px;
  font-size: 32px;
  margin-bottom: 30px;
  background: rgba(206, 18, 18, 0.1);
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
}

.why-us .icon-box h4 {
  font-size: 20px;
  font-weight: 400;
  margin: 0 0 30px 0;
}

.why-us .icon-box p {
  font-size: 15px;
  color: #6c757d;
}

@media (min-width: 1200px) {
  .why-us .icon-box:hover,.why-box:hover {
    transform: scale(1.1);
  }
}

/*--------------------------------------------------------------
# Stats Counter Section
--------------------------------------------------------------*/
.stats-counter {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../assets/stats-bg.jpg") center center;
  background-size: cover;
  padding: 100px 0;
}

@media (min-width: 1365px) {
  .stats-counter {
    background-attachment: fixed;
  }
}

.stats-counter .stats-item {
  padding: 30px;
  width: 100%;
}

.stats-counter .stats-item span {
  font-size: 48px;
  display: block;
  color: #fff;
  font-weight: 700;
}

.stats-counter .stats-item p {
  padding: 0;
  margin: 0;
  font-family: var(--font-secondary);
  font-size: 16px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.6);
}

.gradient {
  background: rgb(220, 220, 222);
  background: linear-gradient(90deg, rgba(220, 220, 222, 1) 0%, rgba(214, 205, 68, 1) 43%, rgba(240, 162, 6, 1) 100%);
}

.page-header {
  font-size: 1.7rem;
  color: #000000;
}


img {
  width: 80%;
}

.image-container {
  margin-left: 70px;
}

.col-md-5 {
  text-align: center;
}

.btn:hover {

background-color: var(--bs-btn-bg);
color: var(--bs-btn-color);
box-shadow: 0 0 10px #000000;

}
</style>