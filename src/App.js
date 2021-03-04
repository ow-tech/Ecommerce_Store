import './';
import React, {useState, useEffect} from 'react';
import {commerce}from './lib/commerce';
import Products from './component/Products'
import { Layout, Menu, Breadcrumb, Badge, Spin } from 'antd';
import {ShoppingCartOutlined } from '@ant-design/icons';



const { Header, Content, Footer } = Layout;


const shoppingCart = <ShoppingCartOutlined style={{ fontSize: '35px', color: '#08c', }}/>

function App() {

    const [products, setProducts ] = useState([])
    const [cart, setCart] = useState({});
    const fetchProducts = async ()=> {
        const {data}= await commerce.products.list();
        setProducts(data)
    }

    const fetchCart = async () =>{
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async(productId, quantity)=>{
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    }

    useEffect(()=>{
        fetchProducts();
        fetchCart();
    }, []);
    console.log(cart);
    return (
         <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
                <Menu.Item alignSelf="flex-end">
                <div>
                    <Badge count={cart.total_items} spin="true">
                    <Spin indicator={shoppingCart}/>
                    </Badge>
                </div>
                </Menu.Item>
               
            </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            <Products products={products} onAddToCart={handleAddToCart}/>
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ecom ©2021 Created by Ow_tech</Footer>
        </Layout>

           
            

            
            
    );
}

export default App;