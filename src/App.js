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
    showRecipes();
  }, [] );

  const showRecipes = async (query) => {
    setPreloaderVisible(true);
    const recipes = await getRecipes(query);
    setRecipes(recipes.hits);
    setPreloaderVisible(false);
    console.log(recipes);
  }
  
  return (
    <div className="App">
      <header>Search over 2.3 millions recipes</header>
      <Search showRecipes={showRecipes} />
      <div className={css.recipesWrapper}>
        {!!recipes.length && recipes.map( (recipeItem, index) => <Recipe recipeDetail={recipeItem} key={index} /> )}
      </div>
      {isPreloaderVisible && <Preloader />}
    </div>
  );
}

export default App;
