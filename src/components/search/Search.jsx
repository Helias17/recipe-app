import css from './search.module.scss';

export const Search = () => {

  return (
    <div className={css.item}>
      <form className="searchForm">
        <input type="text" placeholder="search recipe" className={css.item__searchInput} />
        <button type="submit" className={css.item__searchSubmit}>
          Search
        </button>
      </form>
    </div>
  )
}