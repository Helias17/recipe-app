import css from './preloader.module.scss';
import preloaderImage from '../../images/loading-buffering.gif';

export const Preloader = () => {

  return (
    <img src={preloaderImage} alt="" className={css.item} />
  );
}