import './';
import React, {useState, useEffect} from 'react';
import{BrowserRouter as Router,Switch, Route, Link, useLocation}from 'react-router-dom';
import {commerce}from './lib/commerce';
import Products from './component/Products';
import Cart from './component/Cart'
import { Layout, Menu, Breadcrumb, Badge, Spin, Skeleton } from 'antd';
import {ShoppingCartOutlined } from '@ant-design/icons';




const { Header, Content, Footer } = Layout;


const shoppingCart = <ShoppingCartOutlined style={{ fontSize: '35px', color: '#08c', }}/>

function App() {
    const css = {
        "margin": "20px 0",
        "margin-bottom": "20px",
        "padding": "30px 50px",
        "text-align": "center",
        "background": "rgba(0, 0, 0, 0.05)",
        "border-radius": "4px"
      }
      
    const [loading, setLoading] = useState(true)
    const [products, setProducts ] = useState([])
    const [cart, setCart] = useState({});
    const fetchProducts = async ()=> {
        setLoading(true);
        const {data}= await commerce.products.list();
        setProducts(data);
        setLoading(false);
        
    };

    const fetchCart = async () =>{
        setLoading(true)
        setCart(await commerce.cart.retrieve());
        setLoading(false);
       
    };

    const handleAddToCart = async(productId, quantity)=>{
        setLoading(true)
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
        setLoading(false)
    }
    const handleRemoveFromCart = async(productId, quantity)=>{
        setLoading(true)
        const {cart} = await commerce.cart.remove(productId, quantity);
        setCart(cart)
        setLoading(false)
    }
    const handleCartQtyUpadate = async(productId, quantity )=>{
        setLoading(true)
        const {cart}= await commerce.cart.update(productId, {quantity});
        setCart(cart)
        setLoading(false)
    } 
    const handleEmptyCart = async()=>{
        setLoading(true);
        const {cart} = await commerce.cart.empty();
        setCart(cart);
        setLoading(false);
    }

    useEffect(()=>{
        fetchCart();
            fetchProducts();    
            
    }, []);
    console.log(cart);
    return (
        <>
            <Router>
         <Layout>
             {loading?<Skeleton active></Skeleton>:( <>
                 <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                 <div className="logo" />
                 <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    
                         <Menu.Item key="1">
                         <Link to="/">
                             Home</Link>
                         </Menu.Item>
                     
                     
                     <Menu.Item key="2">nav 2</Menu.Item>
                     <Menu.Item key="3">nav 3</Menu.Item>
                     <Menu.Item alignSelf="flex-end">
                     <div>
                         <Link to="/cart">
                         <Badge  count={cart.total_items} spin="true">
                         <Spin indicator={shoppingCart}/>
                         </Badge></Link>
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
                 
                    
                         <Switch>
                             <Route exact path='/'>
                                 < Products products={products} onAddToCart={handleAddToCart}/>  
     
                             </Route >
                             {/* <Spin active  size="large" className={css} style={{position:"absolute", top:"50",left:"50", transform: "translate(-50%, -50%)"}}/> */}
                             <Route eaxact path='/cart'>
                             <Cart cart={cart } loading={loading}
                                 handleEmptyCart={handleEmptyCart}
                                 handleCartQtyUpadate={handleCartQtyUpadate}
                                 handleRemoveFromCart ={handleRemoveFromCart}
                                 
                             /> 
     
                             </Route>
                            
                       
                         </Switch>
                 </div>
                 
                 </Content>
                 </>

             )}   
        </Layout>
       
    </Router>
    

<Footer style={{ textAlign: 'center' }}>Ecom ©2021 Created by Ow_tech</Footer>
</>
        )};
           
            
            

export default App;