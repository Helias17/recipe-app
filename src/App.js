import { useEffect, useState } from 'react';
import { Search } from './components/search/Search';
import { Recipe } from './components/recipe/Recipe';
import { Preloader } from './components/preloader/Preloader';
import { getRecipes, getMoreRecipes } from './api/api';
import { SearchResultCounter } from './components/search/searchResultCounter/SearchResultCounter';
import { RecipeShowMoreButton } from './components/recipe/recipeShowMoreButton/RecipeShowMoreButton';
import css from './app.module.css';

const App = () => {

  const [recipes, setRecipes] = useState([]);
  const [recipesCount, setRecipesCount] = useState(0);
  const [recipesMoreUrl, setRecipesMoreUrl] = useState(null);
  const [isPreloaderVisible, setPreloaderVisible] = useState(false);

  useEffect( () => {
    showRecipes();
  }, [] );

  const showRecipes = async (query) => {
    setPreloaderVisible(true);
    const recipes = await getRecipes(query);
    setRecipes(recipes.hits);
    if ('next' in recipes._links) {
      setRecipesMoreUrl(recipes._links.next.href);
    } else {
      setRecipesMoreUrl(null);
    }
    setPreloaderVisible(false);
    setRecipesCount(recipes.count);
    console.log(recipes);
  }

  const showMoreRecipes = async (url) => {
    setPreloaderVisible(true);
    const moreRecipes = await getMoreRecipes(url);
    setRecipes([...recipes, ...moreRecipes.hits]);
    if ('next' in moreRecipes._links) {
      setRecipesMoreUrl(moreRecipes._links.next.href);
    } else {
      setRecipesMoreUrl(null);
    }
    setPreloaderVisible(false);
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
      <RecipeShowMoreButton 
        recipesMoreUrl={recipesMoreUrl} 
        showMoreRecipes={showMoreRecipes}
      />
      {isPreloaderVisible && <Preloader />}
    </div>
  );
}

export default App;
