import {React,useState,useEffect} from 'react'
import {commerce} from'../lib/commerce';
import {useForm, FormProvider} from 'react-hook-form'
import {Divider, Col, Row, Space}from 'antd'
import { ElementsConsumer, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Inputtxt from './Inputtxt';


function AddressForm({cart, checkoutToken}) {
  

    // const [shipingCountries, setShippingCountries] = useState([shipingCountriesData[shipingSubdivisionsData[0]]]);
    // const [shipingSubdivisions, setShippingSubdivisions] = useState([]);
    // const [shipingOptions, setShippingOptions] = useState([])


   
    


   
   

   
    const fetchshipingCountries = async(checkoutTokenId) =>{
        const {countries} = await commerce.services.localListShippingCountries(checkoutTokenId)
        console.log(countries)
    }
   
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

                            {/* <Row>
                                <Col>
                                    <Select defaultValue={provinceData[0]} style={{ width: 120 }} onChange={handleProvinceChange}>
                                    {provinceData.map(province => (
                                    <Option key={province}>{province}</Option>
                                    ))}
                                    </Select>
                                </Col>
                                    
                                <Col>
                                    <Select style={{ width: 120 }} value={secondCity} onChange={onSecondCityChange}>
                                        {cities.map(city => (
                                        <Option key={city}>{city}</Option>
                                        ))}
                                    </Select>
                                </Col>
                                <Col>
                                    <Select style={{ width: 120 }} value={secondCity} onChange={onSecondCityChange}>
                                    {cities.map(city => (
                                    <Option key={city}>{city}</Option>
                                    ))}
                                    </Select>
                                </Col>
                            </Row> */}
                            <Divider orientation="center">
                                Payment
                            </Divider>
                            <Row>
                            
                            </Row>

                            <input type="submit"/>



                    </form>
              </FormProvider>
        </>
    )
}

export default AddressForm;
