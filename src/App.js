import { useEffect, useState } from 'react';
import { Search } from './components/search/Search';
import { Recipe } from './components/recipe/Recipe';
import css from './app.module.css';

const App = () => {

  const APP_ID = '2a78c8d0';
  const APP_KEY = '971dadb5aa39f928622f72c64518dfa7';

  const REQUEST = `https://api.edamam.com/api/recipes/v2?type=public&q=Pepperoni&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const [recipes, setRecipes] = useState([]);

  useEffect( () => {
    getRecipes();
  }, [] );

  const getRecipes = async () => {
    const response = await fetch(REQUEST);
    const recipes = await response.json();
    setRecipes(recipes.hits);
    console.log(recipes);
  }

  
  return (
    <div className="App">
      <header>Search over 2.3 millions recipes</header>
      <Search />
      <div className={css.recipesWrapper}>
        {!!recipes.length && recipes.map( (recipeItem, index) => <Recipe recipeDetail={recipeItem} key={index} /> )}
      </div>
    </div>
  );
}

export default App;
