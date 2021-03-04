import React from 'react';
import './App.less';

import { Row, Col, Divider } from 'antd';
import Product from './Product';

// const style = { background: '#0092ff', padding: '8px 0' };




const fetchedProducts = [
    {id: 1, name: "Shoe", description: "Running shoes", price:"$19"},
    {id: 2, name: "Mackbook", description: "Apple Macbookhdf", price:"$100"},
    {id: 3, name: "Shoeiui", description: "Running shoesdr", price:"$19"},
    {id: 4, name: "Mackbookoiy", description: "Apple Macbooklh", price:"$100"},
    {id: 5, name: "Shoeuuy", description: "Running shoesyu", price:"$19"},
    {id: 6, name: "Mackbookgh", description: "Apple Macbookgr", price:"$100"},
]


const Products = ()=>{

    return(
        <>
       
        <Divider orientation="left">Products</Divider>
        <Row justify="space-around" align="middle">
        {fetchedProducts.map((product)=>(
            <Col  style={{position:"relative", marginBlock:"10px",display:"flex",justifyContent:"center"}} xs={16}sm= {16} md={24} lg={32} xl={8} span={8} key={product.id}>
                < Product product={product}/>
            </Col>
            
            ))}
        </Row>
        </>
    )

}

export default Products;
