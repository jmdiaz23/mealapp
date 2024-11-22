<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Busca tu Receta</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content class="home-content">
    <!-- Título principal -->
    <div class="hero">
      <h1>¡Descubre recetas deliciosas!</h1>
      <p>Busca por nombre y encuentra tu platillo favorito.</p>
    </div>

    <!-- Barra de búsqueda -->
    <ion-searchbar 
      v-model="searchQuery" 
      @ionInput="searchMeals" 
      placeholder="Ejemplo: Pizza, Sushi..."
      class="custom-searchbar"
    ></ion-searchbar>

    <!-- Lista de tarjetas de comidas -->
    <ion-list class="meal-list">
      <ion-card v-for="meal in meals" :key="meal.idMeal" class="meal-card">
        <ion-img :src="meal.strMealThumb" alt="Meal Image"></ion-img>
        <ion-card-header>
          <ion-card-title>{{ meal.strMeal }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-button expand="block" @click="viewMeal(meal.idMeal)">
            Ver Detalles
          </ion-button>
        </ion-card-content>
      </ion-card>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { searchMealByName, Meal } from '@/services/mealService';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonButton,
} from '@ionic/vue';

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg,
    IonButton,
  },
  setup() {
    const searchQuery = ref('');
    const meals = ref<Meal[]>([]);

    const searchMeals = async () => {
      if (searchQuery.value.trim() === '') return;
      meals.value = await searchMealByName(searchQuery.value);
    };

    const viewMeal = (id: string) => {
      console.log(`Ver detalles de la comida con ID: ${id}`);
    };

    return { searchQuery, meals, searchMeals, viewMeal };
  },
});
</script>

<style scoped>
/* Fondo del contenido principal */
.home-content {
  --ion-background-color: #f9f9f9; /* Color de fondo */
  padding: 16px; /* Espaciado alrededor del contenido */
}

/* Hero section */
.hero {
  text-align: center;
  margin-bottom: 16px;
}

.hero h1 {
  font-size: 1.8rem;
  color: var(--ion-color-primary);
  margin-bottom: 8px;
}

.hero p {
  font-size: 1rem;
  color: var(--ion-color-medium);
}

/* Barra de búsqueda personalizada */
.custom-searchbar {
  margin: 16px 0;
  --background: #ffffff; /* Fondo blanco */
  --placeholder-color: var(--ion-color-medium); /* Color del texto placeholder */
  --color: #000000; /* Color del texto */
}

/* Lista de comidas */
.meal-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Diseño de cuadrícula */
  gap: 16px;
}

/* Tarjeta de comida */
.meal-card {
  border-radius: 12px; /* Esquinas redondeadas */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombra */
}

.meal-card ion-img {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  object-fit: cover; /* Ajusta la imagen al tamaño de la tarjeta */
  height: 150px; /* Altura de la imagen */
}

.meal-card ion-card-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--ion-color-dark);
  text-align: center;
}

.meal-card ion-card-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
}
</style>
