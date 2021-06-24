import React from 'react'
import {Typography,Button, Card, Avatar,Skeleton, Row, Space} from 'antd'
import {  PlusOutlined,MinusOutlined} from '@ant-design/icons';

function CartItem({item,onCartQtyUpdate, onRemoveFromCart, loading}) {
    const { Meta } = Card;
    if(!item) return <Skeleton active/>
    return (
        <>
         <Card 
                hoverable
                style={{ width: 300}}
                cover={
                <img
                    alt="example"
                    src={item.media.source}
                />
                }
                // actions={[
                // <ShoppingCartOutlined key="" aria-label="Add to Cart" onClick={()=>onAddToCart(product.id, 1)}/>
                // ]}
            >
                <Meta
                title= {item.name}
                
                />
                <Typography variant ="h5">
                    {item.line_total.formatted_with_symbol}
                </Typography>
                <div>
                    <Row justify="center">  
                    <Space>
                        <Button offset={12}type="button"value="small" onClick={()=>onCartQtyUpdate(item.id, item.quantity-1)}><MinusOutlined /></Button>
                       
                    <Typography span={5}variant="h5"level={5}>{item.quantity}</Typography>
                    <Button span={5} type="button" value="small" onClick={()=>onCartQtyUpdate(item.id, item.quantity+1)}><PlusOutlined /></Button>
                    </Space>
                    </Row>
                   
                </div>
                <Row justify="center" span={5}>
                <Button align="center" type="text" danger onClick={()=>onRemoveFromCart(item.id)}>Remove Item</Button>
                </Row>
            </Card>

            
        </>
    )
}

export default CartItem
