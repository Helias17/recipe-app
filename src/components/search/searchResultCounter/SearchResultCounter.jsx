import css from './searchResultCounter.module.css';

export const SearchResultCounter = (props) => {

  if (!props.isPreloaderVisible) {
    return (
      <div className={css.item}>
        Found <b>{props.recipesCounter}</b> {props.recipesCounter > 1 ? 'recipes' : 'recipe'}.
      </div>
    );
  } else {
    return null;
  }

}