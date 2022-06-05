import axios from 'axios';
import React,{useContext, useState} from 'react'
import Api from '../../Api'
import {TagContext} from '../../context/tagContext'

function AdminPage() {
    const tagContext = useContext(TagContext);
    const tags = tagContext.tags.map(tag=>tag.tag)
    const [name, setName] = useState('');
    const [_id, setId] = useState('');
    const [priceSmall, setPriceSmall] = useState(0);
    const [priceBig, setPriceBig] = useState(0);
    const [image, setImage] = useState('');
    const [checkedState, setCheckedState] = useState(
      new Array(tags.length).fill(false),
    );
    const handleIdChange = (e) => setId(e.target.value);
    const handleNameChange = (e) => setName(e.target.value);
    const handlePriceSmallChange = (e) => setPriceSmall(e.target.value);
    const handlePriceBigChange = (e) => setPriceBig(e.target.value);
    // const handleImageChange = (e) => setImage(e.target.value);
    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            callback(reader.result);
        }
    }
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        getBase64(file, setImage);
    };
    const handleSubmit = () => {
        const newTags = checkedState.map((value, index) => value ? tags[index] : null).filter(tag => tag !== null);
        const pizza = {_id, name, priceSmall, priceBig, image, tags: newTags};
        console.log('image64', image);
        Api().post("/pizzas", pizza)
            .then(() => alert('Success!'))
            .catch((error) => console.log(error));
    };
    const handleCheckedChange = (position) => {
      const updatedCheckedState = checkedState.map((item, index) => 
        index === position ? !item : item
      );
      setCheckedState(updatedCheckedState);
    };
  return (
    <div id='admin'>
        <label>
            ID:
            <input type="text" name='_id' onChange={handleIdChange} />
        </label>
        <label>
            Name of pizza:
            <input type="text" name='name' onChange={handleNameChange} />
        </label>
        <label>
            Price of small pizza:
            <input type="number" name='priceSmall' onChange={handlePriceSmallChange} />
        </label>
        <label>
            Price of big pizza:
            <input type="number" name='priceBig' onChange={handlePriceBigChange} />
        </label>
        {/* <label>
                    Линк до слика:
                    <input type="text" name="image" onChange={handleImageChange} />
                </label> */}
                <label>
                    Слика:
                    <input type="file" name="file" onChange={handleImageUpload} />
                </label>
                <div id="tags"> 
                    {tags.map((tag, index) => (
                    <li key={tag}>
                        <label>
                            {tag}:
                            <input type="checkbox" value={tag} checked={checkedState[index]} onChange={() => handleCheckedChange(index)} />
                        </label>
                    </li>
                    ))}
                </div>

        <button className='add-pizza-button' onClick={handleSubmit}>Add Pizza</button>
    </div>
  )
}

export default AdminPage