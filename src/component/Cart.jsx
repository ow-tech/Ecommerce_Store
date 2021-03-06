import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import {Typography,Drawer, Divider, Row,Col, Skeleton, Button, Empty, Space, Steps} from 'antd';
import CartItem from './CartItem';
import AddressForm from'./AddressForm';
// import PaymentForm from './Inputtxt';
import {commerce} from'../lib/commerce';

// import { ElementsConsumer, CardElement, Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';


const Cart = ({cart, handleEmptyCart,
    handleCartQtyUpadate,handleRemoveFromCart,loading,order,onCaptureCheckout
}) => { 


  
    // const [checkout, setCheckout]= useState('');
    const [shippingData, setShippingData]=useState('');
    const [stateCount, setStateCount] =useState(0);
    const [visible, setVisible]= useState(false)
    const [checkoutToken,setCheckoutToken]= useState(null)
    const [checkoutTokenf,setCheckoutTokenf]=useState(null)

   
    const showDrawer = ()=>setVisible(true)
    const onClose = ()=>setVisible(false)
    const obtainStateFromChild = shippingData =>setShippingData(shippingData)
   console.log(shippingData)

   const handleState = ()=>{setStateCount(stateCount-1)}
    
    const EmptyCart =  ()=>(<>
        <Typography variant="subtitle">You have no items onCaptureCheckoutin your cart. Start adding now</Typography>
        <Link to="/">Go Back and ADD Items</Link>
        <Empty/>
        </>
    );
    const FilledCart = () =>(
        <>
        <Row justify="space-around" align="middle"gutter={{ xs: 24, sm: 24, md: 24, lg: 32 }}>
            <>
                {cart.line_items.map((item) => (
                  <Col style={{position:"relative", marginBlock:"10px",display:"flex",justifyContent:"center"}}  xs={24}sm= {16} md={12} lg={8} xl={8} span={8} className="gutter-row" span={8} key={item.id}>
                       <CartItem item={item} onCartQtyUpdate={handleCartQtyUpadate} onRemoveFromCart={handleRemoveFromCart} loading={loading}/>
                    </Col>
            ))}
              </> 
             </Row>  
             <Space/>
                <Row gutter={{ xs:70, sm:18, md: 18, lg: 24 }}>
                    <Col  span={14}><h4 level={4}>Subtotal: {cart.subtotal.formatted_with_symbol} </h4></Col>
                    <Col span={5}> <Button type="primary" danger onClick={handleEmptyCart}>
                        EmptyCart</Button></Col>
                    <Col span={5}> <Button onClick={showDrawer}type="primary" primary>
                        Checkout</Button></Col>
                </Row>
                {/* Drawer */}
               
                <Drawer
                
                    title="CHECKOUT"
                    width={500}
                    placement="left"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    getContainer={false}
                    style={{ position: 'absolute' }}
                    >
                        {stateCount == 0?<AddressForm checkoutToken={checkoutToken} checkoutTokenf={checkoutTokenf} setStateCount={setStateCount}cart={cart} obtainStateFromChild={obtainStateFromChild} />:<PaymentForm handleState={handleState} checkoutTokenf={checkoutTokenf} shippingData={shippingData} checkoutToken={checkoutToken}onCaptureCheckout={onCaptureCheckout}/> }
                        
                        
                </Drawer>
                
                </>
                
    );

    useEffect(() => {
        let abortController = new AbortController();
        const generateToken = async ()=>{
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                // console.log(token)
                // console.log("ama above")
                setCheckoutToken(token.id)
                setCheckoutTokenf(token.live)
                // console.log(token)
                // console.log(checkoutTokenf)
            }
            catch(err){

            }
        }
        generateToken();
        abortController.abort();
        
        // handleCallBack(checkoutToken)
    }, [cart]);
    if(!cart.line_items){
        
        return <Skeleton active/>
        
    }
   
    return (
            <>
            <Divider orientation="center">Cart</Divider>
            {!cart.line_items.length ? <EmptyCart/>: <FilledCart/>
            }

          
            
            </>
       
    );
  
}

export default Cart;
