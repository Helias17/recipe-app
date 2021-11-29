import { useEffect, useState } from 'react';
import { Search } from './components/search/Search';
import { Recipe } from './components/recipe/Recipe';
import { Preloader } from './components/preloader/Preloader';
import { getRecipes } from './api/api';
import { SearchResultCounter } from './components/search/searchResultCounter/SearchResultCounter';
import css from './app.module.css';

const App = () => {

  const [recipes, setRecipes] = useState([]);
  const [recipesCount, setRecipesCount] = useState(0);
  const [isPreloaderVisible, setPreloaderVisible] = useState(false);

  useEffect( () => {
    showRecipes();
  }, [] );

  const showRecipes = async (query) => {
    setPreloaderVisible(true);
    const recipes = await getRecipes(query);
    setRecipes(recipes.hits);
    setPreloaderVisible(false);
    setRecipesCount(recipes.count);
    console.log(recipes);
  }
  
  return (
    <div className="App">
      <header className={css.pageHeader}>
        <div className={css.pageName}>
          Search over 2.3 millions recipes
        </div>
        <div>
          <Search showRecipes={showRecipes} />
        </div>
      </header>
      <main className={css.pageMain}>
        <SearchResultCounter recipesCounter={recipesCount} isPreloaderVisible={isPreloaderVisible} />
      </main>
      <div className={css.recipesWrapper}>
        {!!recipes.length && recipes.map( (recipeItem, index) => <Recipe recipeDetail={recipeItem} key={index} /> )}
      </div>
      {isPreloaderVisible && <Preloader />}
    </div>
  );
}

export default App;
