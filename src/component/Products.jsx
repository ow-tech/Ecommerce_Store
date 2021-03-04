import React from 'react';
// import './App.less';

import { Row, Col, Divider } from 'antd';
import Product from './Product';

// const style = { background: '#0092ff', padding: '8px 0' };



const Products = ({products})=>{

    return(
        <>
       
        <Divider orientation="left">Products</Divider>
        <Row justify="space-around" align="middle">
        {products.map((product)=>(
            <Col  style={{position:"relative", marginBlock:"10px",display:"flex",justifyContent:"center"}} xs={16}sm= {16} md={24} lg={32} xl={8} span={8} key={product.id}>
                < Product product={product}/>
            </Col>
            
            ))}
        </Row>
        </>
    )

}

export default Products;
