import React from 'react'
import 'antd/dist/antd.css';
import { Card, Avatar, Typography } from 'antd';
import {  ShoppingCartOutlined} from '@ant-design/icons';



const Product = ({product, onAddToCart}) => {
    // console.log(product)
    const { Meta } = Card;
   
    return (
        <div>
            <Card 
                hoverable
                style={{ width: 300}}
                cover={
                <img
                    alt="example"
                    src={product.media.source}
                />
                }
                actions={[
                <ShoppingCartOutlined key="" aria-label="Add to Cart" onClick={()=>onAddToCart(product.id, 1)}/>
                ]}
            >
                <Meta
                 avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title= {product.name}
                description={product.description}
                />
                <Typography variant ="h5">
                    {product.price.formatted_with_symbol}
                </Typography>
            </Card>
                        
                    </div>
        )
}

export default Product
