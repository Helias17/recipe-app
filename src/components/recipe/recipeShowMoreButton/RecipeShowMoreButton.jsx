import css from './recipeShowMoreButton.module.scss';

export const RecipeShowMoreButton = (props) => {

  const handleClick = () => {
    props.showMoreRecipes(props.recipesMoreUrl);
  }

  if (props.recipesMoreUrl) {
    return (
      <div className={css.item}>
        <button className={css.item__button} onClick={handleClick}>
          Show more recipes
        </button>
      </div>
    );
  }

  return null;
}