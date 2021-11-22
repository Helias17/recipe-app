import { useState, useRef, useEffect } from 'react';
import { useOutsideDetector } from '../../hooks/useOutsideDetector';
import css from './recipe.module.scss';

export const Recipe = (props) => {

  const [isIngridientsVisible, setIngridientsVisible] = useState(false);
  const [isConsistVisible, setConsistVisible] = useState(false);

  const ingridientsListClassName = isIngridientsVisible ?
    css.item__ingridientsList_visible :
    css.item__ingridientsList;

  const consistTableClassName = isConsistVisible ?
    css.item__consistTable_visible :
    css.item__consistTable;

  const showHideIngridients = () => {
    setIngridientsVisible(!isIngridientsVisible);
  }

  const hideIngridients = () => {
    const timerId = setTimeout(() => {
      setIngridientsVisible(false);
      clearTimeout(timerId);
    }, 200);
  }

  const showHideConsist = () => {
    setConsistVisible(!isConsistVisible);
  }

  const ingridientsHeaderRef = useRef(null);
  useOutsideDetector(ingridientsHeaderRef, hideIngridients);

  return (
    <div className={css.item}>
      <h2 className={css.item__header}>{props.recipeDetail.recipe.label}</h2>
      <img src={props.recipeDetail.recipe.image} alt={props.recipeDetail.recipe.label} className={css.item__image} />

      <div className={css.item__infoBox}>
        <p className={css.item__ingridientsHeader}
          ref={ingridientsHeaderRef}
          onClick={showHideIngridients}>Ingridients ({props.recipeDetail.recipe.ingredientLines.length})</p>
        <ul className={ingridientsListClassName}>
          {props.recipeDetail.recipe.ingredientLines.map(ingridient => <li className={css.item__ingridientsItem}>{ingridient}</li>)}
        </ul>
        <p className={css.item__consistHeader} onClick={showHideConsist}>Consist (per 100g)</p>
        <div className={consistTableClassName}>
          <p className={css.item__consistParam}>Fats:</p><p className={css.item__consistValue}>21 g</p>
          <p className={css.item__consistParam}>Carbohydrates:</p><p className={css.item__consistValue}>65 g</p>
          <p className={css.item__consistParam}>Proteins:</p><p className={css.item__consistValue}>18 g</p>
          <p className={css.item__consistParam}>Calories:</p><p className={css.item__consistValue}>500 kcal</p>
        </div>
      </div>

    </div>
  );
}