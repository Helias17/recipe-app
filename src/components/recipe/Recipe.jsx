import { useState, useRef } from 'react';
import { useOutsideDetector } from '../../hooks/useOutsideDetector';
import { RecipeHeader } from './recipeHeader/RecipeHeader';
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

  const [isMouseEnter, setMouseEnter] = useState(false);

  const handleMouseEnter = () => {
    setMouseEnter(true);
  }

  const handleMouseLeave = () => {
    setMouseEnter(false);
  }

  const hundredGramsRatio = props.recipeDetail.recipe.totalWeight / 100;
  const fats = Math.floor(props.recipeDetail.recipe.totalNutrients.FAT.quantity / hundredGramsRatio);
  const carbohydrates = Math.floor(props.recipeDetail.recipe.totalNutrients.CHOCDF.quantity / hundredGramsRatio);
  const proteins = Math.floor(props.recipeDetail.recipe.totalNutrients.PROCNT.quantity / hundredGramsRatio);

  return (
    <div className={css.item} ref={recipeRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
      <RecipeHeader label={props.recipeDetail.recipe.label} isFullHeader={isMouseEnter} />
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
          <p className={css.item__consistParam}>Fats:</p><p className={css.item__consistValue}>
            {fats} g
          </p>
          <p className={css.item__consistParam}>Carbohydrates:</p><p className={css.item__consistValue}>
            {carbohydrates} g
          </p>
          <p className={css.item__consistParam}>Proteins:</p><p className={css.item__consistValue}>
            {proteins} g
          </p>
          <p className={css.item__consistParam}>Calories:</p><p className={css.item__consistValue}>
            {Math.floor(props.recipeDetail.recipe.calories / hundredGramsRatio)} kcal
          </p>
        </div>
      </div>

    </div>
  );
}