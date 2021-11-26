import { useState, useEffect } from 'react';
import css from '../search.module.scss';

export const SearchButton = () => {

  const [isButtonDisabled, setButtonState] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isCountdownActive, setCountdown] = useState(false);

  const handleClick = () => {
    // setTimeout(() => setButtonState(true), 100);
    setCounter(6);
  }

  useEffect(() => {
    setTimeout(() => {
      if (counter > 0) {
        setCounter(counter - 1);
      }
    }, 1000);
  }, [counter])

  return (
    <button type="submit" disabled={isButtonDisabled} className={css.item__searchSubmit} onClick={handleClick}>
      Search
      <span className={css.item__countdown}>{counter > 0 ? counter : ''}</span>
    </button>
  )
}