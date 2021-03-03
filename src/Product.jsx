import React from 'react'
import 'antd/dist/antd.css';
import { Card, Avatar, Typography } from 'antd';
import { SettingOutlined, EllipsisOutlined, ShoppingCartOutlined} from '@ant-design/icons';



const Product = ({product}) => {
    console.log(product.name)
    const { Meta } = Card;
    return (
        <>
        

        

            <Card 
                hoverable
                style={{ width: 300}}
                cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
                }
                actions={[
                <ShoppingCartOutlined key="" aria-label="Add to Cart"/>
                ]}
            >
                <Meta
                 avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title= {product.name}
                description={product.description}
                />
                <Typography variant ="h5">
                    {product.price}
                </Typography>
            </Card>
                        
                    </>
        )
}

export default Product
