import { useEffect, useState } from 'react';
import { Search } from './components/search/Search';
import { Recipe } from './components/recipe/Recipe';
import { Preloader } from './components/preloader/Preloader';
import css from './app.module.css';

const App = () => {

  const APP_ID = '2a78c8d0';
  const APP_KEY = '971dadb5aa39f928622f72c64518dfa7';

  const REQUEST = `https://api.edamam.com/api/recipes/v2?type=public&q=Pepperoni&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const [recipes, setRecipes] = useState([]);
  const [isPreloaderVisible, setPreloaderVisible] = useState(false);

  useEffect( () => {
    getRecipes(setPreloaderVisible);
  }, [] );

  const getRecipes = async (setPreloaderVisible) => {
    setPreloaderVisible(true);
    const response = await fetch(REQUEST);
    const recipes = await response.json();
    setRecipes(recipes.hits);
    setPreloaderVisible(false);
    console.log(recipes);
  }

  
  return (
    <div className="App">
      <header>Search over 2.3 millions recipes</header>
      <Search />
      <div className={css.recipesWrapper}>
        {!!recipes.length && recipes.map( (recipeItem, index) => <Recipe recipeDetail={recipeItem} key={index} /> )}
      </div>
      {isPreloaderVisible && <Preloader />}
    </div>
  );
}

export default App;
