import React, {useEffect, useState} from 'react'


import {Typography, Divider, Row,Col, Skeleton, Button, Empty, Space} from 'antd';
import CartItem from './CartItem';


const Cart = ({cart}) => { 
    const [loading, setLoading] = useState(false)
    const Title = Typography;
    
    const EmptyCart =  ()=>(<>
        <Typography variant="subtitle">You have no items in your cart. Start adding now</Typography>
        <Empty/>
        </>
    );
    const FilledCart = () =>(
        <>
        <Row justify="space-around" align="middle"gutter={{ xs: 24, sm: 24, md: 24, lg: 32 }}>
            <>

                {cart.line_items.map((item) => (
                  <Col style={{position:"relative", marginBlock:"10px",display:"flex",justifyContent:"center"}}  xs={24}sm= {16} md={12} lg={8} xl={4} span={8} className="gutter-row" span={8} key={item.id}>
                       <CartItem item={item}/>
                    </Col>
                   
                 
            ))}
              </> 
             </Row>  
                </>
    );
    if(!cart.line_items){
        
        return <Skeleton active/>
        
    }
   
    return (
            <>
            <Divider orientation="center">Cart</Divider>
            {!cart.line_items.length ? <EmptyCart/>: <FilledCart/>}

          <Space/>
            <Row gutter={{ xs:70, sm:18, md: 18, lg: 24 }}>
                <Col  span={14}><h4 level={4}>Subtotal: {cart.subtotal.formatted_with_symbol} </h4></Col>
                <Col span={5}> <Button type="primary" danger>
                    EmptyCart</Button></Col>
                <Col span={5}> <Button type="primary" primary>
                    Checkout</Button></Col>
            </Row>
            
            </>
       
    );
  
}

export default Cart;
