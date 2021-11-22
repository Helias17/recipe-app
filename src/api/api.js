const APP_ID = '2a78c8d0';
const APP_KEY = '971dadb5aa39f928622f72c64518dfa7';

export const getRecipes = async (query = 'pepperoni') => {
  try {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const recipes = await response.json();
    return recipes;
  }
  catch(error) {
    console.log('Error while getting recipes :', error);
    alert('Error while getting recipes!');
  }
}