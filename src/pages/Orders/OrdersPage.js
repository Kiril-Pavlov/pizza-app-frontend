import React, { useEffect, useState } from 'react'
import Api from '../../Api'

function OrdersPage() {
  const [orders,setOrders] = useState([]);
  const [hideConfirmed,setHideConfirmed] = useState(true);
  useEffect(() => {
    Api().get('/orders')
    .then(response => setOrders(response.data))
    .catch(console.error);
  },[])

const deleteOrder = (orderId) => {
    //eslint-disable-next-line no-restricted-globals
    const confirmationAnswer = confirm('Are you sure that you want to delelete order? ' +orderId);
    if(!confirmationAnswer) return;
    Api().delete(`/orders/${orderId}`)
        .then((response)=>{
            console.log(response);
            const {data} = response;
            if (data.deletedCount === 1){
                const newOrders = orders.filter(order=>order._id !== orderId);
                setOrders(newOrders);
            }else{
                alert('Something went wrong!')
            }
        })
        .catch(console.error);
}
    const confirmOrder = (orderId) =>{
        Api().put(`/orders/${orderId}`,{
            confirmed: true,
        }).then(response => {
            console.log('response',response);
            const {data} = response;
            if(data && data.ok===1){
                const newOrders = orders.map(order=>{
                    if(order._id === orderId){
                        return {...order,confirmed:true};
                    }
                    return order;
                })
                setOrders(newOrders);
            }
        }).catch(console.error);
    }
    const handleHideConfirmedCheckbox = (e) => setHideConfirmed(e.target.checked)
  return (
    <div className="orders-container">
        <label>
            Hide confirmed:
            <input type="checkbox" checked={hideConfirmed} onChange={handleHideConfirmedCheckbox}/>
        </label>
        {
            orders.filter(order => hideConfirmed ? !order.confirmed : true).map((order) => (
                <div className={'order-item'+ (order.confirmed ? ' order-item-confirmed' : '')} key={order._id}>
                    {order.confirmed ? 'CONFIRMED' :''}
                    <button className='delete-order-button' onClick={()=>deleteOrder(order._id)} >X</button>
                    <h5>Order id:{order._id}</h5>
                    <h5>Order mail:{order.email}</h5>
                    <h5>Order address:{order.address}</h5>
                    <ol>
                        {
                            order.cartItems.map(item => (
                                <li>{item.name}, {item.selectedPizzaSize}, X{item.quantity} </li>
                            ))
                        }
                    </ol>
                    <button onClick={()=>confirmOrder(order._id)}>Confirm order</button>
                </div>
            ))
        }
    </div>
)
}

export default OrdersPage