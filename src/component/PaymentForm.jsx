import React from 'react';
import {Button, Divider} from 'antd';
import {commerce} from'../lib/commerce';
import { ElementsConsumer, CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function PaymentForm({setStateCount, shippingData, checkoutTokenf}) {
    console.log(shippingData)

    const stripePromise =loadStripe(process.env.STRIPE_KEY)

    const handleSubmit = async (event,elements, stripe)=>{
        event.preventDefault();
        if(!stripe || !elements) return;


        const cardElements = elements.getElement(CardElement);

        const {error,paymentMethod} = await stripe.createPaymentMethod({type:'card', card:cardElements});

        if(error){
            console.log(error)
        }
        else{
            const orderData = {
                line_items: checkoutTokenf.line_items,
                customer:{firstName: shippingData.firstName, lastname:shippingData.lastName, email: shippingData.email},
                shipping: {name:'Primary', street:shippingData.address, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code:shippingData.zip, country:shippingData.setShippingCountry},
                fulfillment: {shipping_method: shippingData.shippingOption},
                payment:{
                    gateway: 'Stripe',
                    stripe:{
                        payment_method_id:paymentMethod.id
                    }
                }
            }
        }
    }

    
    return (
        <>
         <Divider>
                Payment Options
            </Divider>
            <Elements stripe={stripePromise}>
                    <ElementsConsumer>
                        {({elements, stripe})=>(
                            <form  onSubmit={(e)=>handleSubmit(e, elements,stripe)}>
                                    <div style={{ alignItems:'center'}}>
                                    <CardElement/> 
                                    <br/><br/>

                                    </div>
                                <div style={{ display:'flex',justifyContent:'space-around'}}>
                                
                                    {checkoutTokenf &&<Button type ="submit" variant="contained" disbled={!stripe} color="primary">Pay: {checkoutTokenf.subtotal.formatted_with_symbol}</Button>
                                    }
                                    </div>
                        </form>   
                        )}
                    </ElementsConsumer>
                </Elements> 
        </>
    )
}

export default PaymentForm
