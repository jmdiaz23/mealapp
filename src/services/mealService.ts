import api from './api';

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

// Buscar comidas por nombre
export const searchMealByName = async (name: string): Promise<Meal[]> => {
  const response = await api.get(`search.php?s=${name}`);
  return response.data.meals || [];
};

// Obtener detalles de una comida por ID
export const getMealDetailsById = async (id: string): Promise<Meal | null> => {
  const response = await api.get(`lookup.php?i=${id}`);
  return response.data.meals ? response.data.meals[0] : null;
};

// Obtener una comida aleatoria
export const getRandomMeal = async (): Promise<Meal | null> => {
  const response = await api.get('random.php');
  return response.data.meals ? response.data.meals[0] : null;
};

// Obtener todas las categorías
export const getAllCategories = async (): Promise<Category[]> => {
  const response = await api.get('categories.php');
  return response.data.categories || [];
};
