import { useEffect, useState } from 'react';
import { Search } from './components/search/Search';
import { Recipe } from './components/recipe/Recipe';
import { Preloader } from './components/preloader/Preloader';
import { getRecipes } from './api/api';
import css from './app.module.css';

const App = () => {

  const [recipes, setRecipes] = useState([]);
  const [isPreloaderVisible, setPreloaderVisible] = useState(false);

  useEffect( () => {
    showRecipes(setPreloaderVisible);
  }, [] );

  const showRecipes = async (setPreloaderVisible) => {
    setPreloaderVisible(true);
    const recipes = await getRecipes('spaghetti');
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
