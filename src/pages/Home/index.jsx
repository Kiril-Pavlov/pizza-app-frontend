import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import Api from '../../Api';
import { CartContext } from '../../context/cartContext'

const HomePage = () => {
  const { setPizzaProducts, pizzaProducts, addToCart, cartItems } = useContext(CartContext)
  console.log(cartItems);
  const [search, setSearch] = useState('');
  const tags = ['discount', 'vege'];
  const [checkedState, setCheckedState] = useState(
    new Array(tags.length).fill(false),
  );
  const [page, setPage] = useState(1);
  const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
    const handleGetPage =(pageNumber) =>{
      setPage(pageNumber);
      searchPizzas(checkedState, pageNumber);
    }


  const handleCheckedChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    searchPizzas(updatedCheckedState);
  };
  const handleKeyDown = (e) => e.key === 'Enter' ? searchPizzas(checkedState) : null;
  const handleSearchChange = (e) => setSearch(e.target.value);
  const searchPizzas = (_checkedState, page=1) => {
    // fetches pizzas with filter
    const newTags = _checkedState.map((value, index) => value ? tags[index] : null).filter(tag => tag !== null);
    Api().get(`/pizzas?search=${search}&tags=${JSON.stringify(newTags)}&page=${page}`).then(response => setPizzaProducts(response.data));
  };


  return (
    <div>
      <div className='search-filter-container'>
        <div className='search-container'>Search: <input type="text" onChange={handleSearchChange} onKeyDown={handleKeyDown} /></div>
        <div className='tags-container'>
          {tags.map((tag, index) => (
            <div className='tag-item' key={tag}>
              <label>
                <input type="checkbox" value={tag} checked={checkedState[index]} onChange={() => handleCheckedChange(index)} />
                {tag}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div id="pagination" className='pagination'>
        {
          pageNumbers.map(_page => (
            <button onClick={() => handleGetPage(_page)}>{_page === page ? (<b>{_page}</b>) : _page}</button>
          ))
        }
      </div>
      <div className="pizzas-container">
        {pizzaProducts.map(pizza => (
          <div className="pizza-item" key={pizza._id}>
            <div className='prices'>
              <div className='small-price'>{pizza.priceSmall} ден.</div>-
              <div className='big-price'>{pizza.priceBig} ден.</div>
            </div>
            <Link to={pizza.name}>
              <img src={pizza.image} alt={pizza.name} />
            </Link>
            <h2 className='pizza-name'>{pizza.name}</h2>
            <p className='pizza-ingredients'>{pizza.ingredients}</p>
            <Link to={pizza.name}>
              <button className='buy-button'>Buy Pizza</button>
            </Link>
          </div>
        ))}


      </div>
    </div>
  )
}

export default HomePage