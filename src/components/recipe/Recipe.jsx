import { useState, useRef } from 'react';
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

  const showHideConsist = () => {
    setConsistVisible(!isConsistVisible);
  }

  const hideIngridients = () => {
    const timerId = setTimeout(() => {
      setIngridientsVisible(false);
      clearTimeout(timerId);
    }, 200);
  }

  const hideConsist = () => {
    const timerId = setTimeout(() => {
      setConsistVisible(false);
      clearTimeout(timerId);
    }, 200);
  }

  const recipeRef = useRef(null);
  useOutsideDetector(recipeRef, hideIngridients);
  useOutsideDetector(recipeRef, hideConsist);

  return (
    <div className={css.item} ref={recipeRef}>
      <h2 className={css.item__header}>{props.recipeDetail.recipe.label}</h2>
      <img src={props.recipeDetail.recipe.image} alt={props.recipeDetail.recipe.label} className={css.item__image} />

      <div className={css.item__infoBox}>
        <p className={css.item__ingridientsHeader} onClick={showHideIngridients}>Ingridients ({props.recipeDetail.recipe.ingredientLines.length})</p>
        <ul className={ingridientsListClassName}>
          {props.recipeDetail.recipe.ingredientLines.map((ingridient, index) => (
            <li key={index} className={css.item__ingridientsItem}>{ingridient}</li>
          ))}
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