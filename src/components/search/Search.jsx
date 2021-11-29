import { useState } from 'react';
import { SearchButton } from './searchButton/SearchButton';
import css from './search.module.scss';

export const Search = (props) => {

  const INPUT_ERROR_1 = 'Search query mast be at least 3 symbols';

  const [inputValue, setInputValue] = useState('');
  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length < 5) {
      setFormErrors([...formErrors, INPUT_ERROR_1]);
    } else {
      props.showRecipes(inputValue);
    }

  }

  const handleInput = (e) => {
    setInputValue(e.target.value);
    setFormErrors([]);
  }

  return (
    <div className={css.item}>
      <form onSubmit={handleSubmit}>
        <div className={css.item__box}>
          <div className={css.item__boxItem1}>
            <input
              autoFocus
              type="text"
              placeholder="recipe name"
              className={css.item__searchInput}
              value={inputValue}
              onChange={handleInput}
            />
            {!!formErrors.length && (
              <p className={css.item__error}>
                {formErrors.map((error, index) => <span className={css.item__errorText} key={index}>{error}</span>)}
              </p>
            )}
          </div>
          <div>
            <SearchButton />
          </div>
        </div>
      </form>
    </div>
  )
}