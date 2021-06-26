import React from 'react'
import {useForm, FormProvider} from 'react-hook-form'
import {Divider, Col, Row, Space}from 'antd'
import { ElementsConsumer, CardElement,ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Inputtxt from './Inputtxt';

function AddressForm() {
   
    const { register, watch, handleSubmit, formState:{ errors},control } = useForm();
    const onSubmit = data =>console.log(data);
    return (
        <>
            
                <FormProvider>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                            <Row gutter={{ xs: 12, sm: 6, md: 24, lg: 32 }} >
                            <Space >
                                <Col className="gutter-row">
                                    <Inputtxt required name='firstName' label='First Name' control={control}/>
                                </Col>
                                <Col className="gutter-row" >
                                    <Inputtxt required name='LastName' label='Last Name' control={control}/>
                                </Col>
                                <Col className="gutter-row" >
                                    <Inputtxt required name='email' label='Email' control={control}/>
                                </Col>
                                <Col className="gutter-row" >
                                    <Inputtxt required name='City' label='City' control={control}/>
                                </Col>
                                <Col className="gutter-row" >
                                    <Inputtxt required name='address' label='Address' control={control}/>
                                </Col>
            
                                <Col className="gutter-row" >
                                <Inputtxt required name='zip' label='Zip' control={control}/>
                                </Col>
                                </Space>
                            </Row>
                            <Divider orientation="center">
                                Payment
                            </Divider>
                            <Row>
                                <Space>

                                </Space>
                            </Row>

                            <input type="submit"/>



                    </form>
              </FormProvider>
        </>
    )
}

export default AddressForm;
