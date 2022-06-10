import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Api from '../../Api';
import { CartContext } from '../../context/cartContext';
import { TagContext } from '../../context/tagContext';

function EditPizza() {
    const { id } = useParams();
    const [pizza, setPizza] = useState({});
    const tagContext = useContext(TagContext);
    const { pizzaProducts, setPizzaProducts} = useContext(CartContext)
    const tags = tagContext.tags.map(t=>t.tag)
    const [checkedState,setCheckedState] = useState(
        new Array(tags.length).fill(false),
    );

    const handleCheckedState = (position) => {
        const updatedCheckedState = checkedState.map((item,index) =>
            index === position ? !item :item
        );
        setCheckedState(updatedCheckedState);
        console.log(updatedCheckedState)
        const newTags = updatedCheckedState.map((value,index)=>{
            return value ? tags[index] : null;
        }).filter(tag => tag !== null);
        console.log('newTags',newTags)
        setPizza({...pizza, tags: newTags});
    }

    useEffect(function () {
        Api().get(`/pizzas/${id}`).then(response => {
            setPizza(response.data);
            
        })
    }, [])

    const savePizza = async () => {
        console.log('Saving Pizza')
        const response = await Api().put(`/pizzas/${id}`,pizza);
        const {data} = response;
        if(data.ok === 1){
            const newPizzas = pizzaProducts.map(_pizza => _pizza.id === id ? pizza : _pizza);
            setPizzaProducts(newPizzas);
            alert('Success editing pizza')
        }
    }

    const handleFormChange = (e, key) => {
        const newPizza = {...pizza};
        newPizza[key] = e.target.value;
        setPizza(newPizza)
    }

    const getCheckBoxes = (value) => {
        return (
            <div>
                {
                    tags.map((tag,index)=>{
                        if(value.includes(tag)){
                            handleCheckedState(index);
                        }
                        return ( <label> 
                            <input type="checkbox" 
                                checked={checkedState[index]}
                                onChange={() => handleCheckedState(index)}
                            /> {tag} </label> )
                    })
                }
            </div>
        )
    }

    const createInput = (key,value) => {
        let inputType;
        if(typeof value === 'string'){
            inputType = 'text';
        }else if(typeof value === 'number'){
            inputType = 'number';
        }else if(typeof value === 'object'){
            return getCheckBoxes(value);
        }

        return <input type={inputType}
        key={key}
        value={value} 
        onChange={(e) => handleFormChange(e,key)}/>
    }

    return (
        <div className='edit-pizzas-container'>
            Editing pizzas here {id}
            {JSON.stringify(pizza)}
            <div className='edit-form'>
                {
                    Object.keys(pizza).join(', ')
                }
                {
                    Object.keys(pizza).map(key => createInput(key, pizza[key]))
                }
                <input type="text" />

                <button onClick={savePizza} value={pizza.name} onChange={handleFormChange}>Save</button>
            </div>
        </div>
    )
}

export default EditPizza