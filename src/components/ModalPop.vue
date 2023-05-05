<template>
  <div class="modal fade" :id="'id-' + id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <header class="modal-header" id="modalTitle">
          <slot>Add your favorite Recipe!</slot>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close modal"></button>
        </header>
        <section class="modal-body" id="modalDescription">
          <RecipeForm :recipe="recipe"></RecipeForm>
        </section>
      </div>
    </div>
  </div>
</template>
  
<script>
import RecipeForm from "../components/RecipeForm.vue";

export default {


  components: {
    RecipeForm,
  },
  props: {
    recipe: {
      type: Object,
      default: () => ({ name: "", description: "", cuisine: "", ingredients: [{ id: '', name: '', unit: '', amount: '' }] }),
      isDefault: true
    },
    id: {
      type: Number,
      default: () => (1),
    }
  },
  mounted() {
    const modalEl = this.$refs.modal;
    modalEl.addEventListener('hidden.bs.modal', () => {
      if (this.id === 1) {
        location.reload(true);
      }
    })
  },
  beforeUnmount() {
    document.removeEventListener("hidden.bs.modal", this.keydownListener);
  },
};
</script>

<style scoped>
.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #a76213;
  justify-content: space-between;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  padding: 15px;
  display: flex;
  color: #a76213
}

.modal-dialog {
  max-width: 600px;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
  text-align: center;
}

.btn-close {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  font-size: 15px;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
}
</style>