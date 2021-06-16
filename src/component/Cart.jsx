import React, {useEffect, useState} from 'react'


import {Typography, Divider, Row,Col, Skeleton, Button} from 'antd';

const Cart = ({cart}) => { 
    const [loading, setLoading] = useState(false)
    const Title = Typography;
    
    const EmptyCart =  ()=>(
        <Typography variant="subtitle">You have no items in your cart. Start adding now</Typography>
    );
    const FilledCart = () =>(
        <>
            {cart.line_items.map((item) => (
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={6} key={item.id}>
                        <div >{item.name}</div>
                    </Col>
                </Row>    
            ))}
                </>
    );
    if(!cart.line_items){
        
        return <Skeleton active/>
        
    }
   
    return (
            <>
            <Divider orientation="center">Cart</Divider>
            {!cart.line_items.length ? <EmptyCart/>: <FilledCart/>}
          
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
