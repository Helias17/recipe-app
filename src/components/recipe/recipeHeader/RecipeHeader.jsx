import css from '../recipe.module.scss';

export const RecipeHeader = (props) => {

  let recipeName = '';
  const labelArr = props.label.split(' ');

  if (labelArr.length > 5) {
    labelArr.splice(5, 1000);
    labelArr.push('...');
    recipeName = labelArr.join(' ');
  } else {
    recipeName = props.label;
  }

  return (
    <h2 className={css.item__header}>{props.isFullHeader ? props.label : recipeName}</h2>
  );
}