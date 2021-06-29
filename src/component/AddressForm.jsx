import {React,useState,useEffect} from 'react'
import {commerce} from'../lib/commerce';
import {useForm, FormProvider} from 'react-hook-form'
import {Divider, Col, Row, Space, Select, Typography, Button, Input, Drawer}from 'antd'
import Inputtxt from './Inputtxt';



function AddressForm({cart, checkoutToken, checkoutTokenf, setStateCount, obtainStateFromChild}) {

  
    const { Option } = Select;
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const [shippingData, setShippingData] = useState({});
 
    
// Fetching countries.subdivisions and shippingOptions to  populate select fields
   
    const fetchshipingCountries = async(checkoutToken) =>{
        const {countries} = await commerce.services.localeListShippingCountries(checkoutToken);
        // console.log(countries)
        // console.log("am countries")
            
            setShippingCountries(countries);
            setShippingCountry(Object.keys(countries)[0]);
            // setObjOfCountries(countries)
            // console.log(objOfCountries)
            // setCountryCode(getKeyByValue(countries, shippingCountry))
        
    }
    const fetchSubdivisons= async (countryCode)=> {
        const { subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
            setShippingSubdivisions(subdivisions);
            setShippingSubdivision(Object.keys(subdivisions)[0])
    }
    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
    
        setShippingOptions(options);
        setShippingOption(options[0].id);
      };

    const { register, watch, handleSubmit, formState:{ errors},control } = useForm();
    const onSubmit = data =>{
        setShippingData({...data, shippingCountry, shippingSubdivision, shippingOption})
        setStateCount(+1)
       obtainStateFromChild(shippingData)
       console.log(shippingData)
        
    };

   
// Handling dynamic rendering of select fields after making a choice
    useEffect(() =>{
        fetchshipingCountries(checkoutToken);
        // setObjOfCountries(fetchshipingCountries(checkoutToken))

    }, []);

    useEffect(() =>{
       if(shippingCountry) {
           
           fetchSubdivisons(shippingCountry)}
        //    console.log( shippingCountry)
        //    console.log(countryCode)
      

    },[shippingCountry]);
    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken, shippingCountry, shippingSubdivision);
      }, [shippingSubdivision]);

    //   Handling value change change on select fields
    const handleShippingCountry = value =>{
        setShippingCountry(value)
        
    }
    const handleShippingDivision = value =>{
        setShippingSubdivision(value)
        
    }
    const handleShippingOption = value =>{
        setShippingOption(value)
    }

    return (
        <>
            
                <FormProvider>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Fileds for personal details */}
                            <Row >
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
                                </Space>
                                </Row>

                               <Divider/>
                                <Row>
                                    <Space>
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
                           
                            <Divider/>
                            <Row>
{/* select fields for shipping countries, options and subdivision */}
                            {shippingCountries && 
                                <Space>
                                <Col>
                                <Typography level={3}>Shipping Country</Typography>
                                    <Select defaultValue={shippingCountries[0]} style={{ width: 200 }} onChange={handleShippingCountry}>
                                    {Object.entries(shippingCountries).map(([code,name])=> ({id:code, label: name}
                                    )).map((item)=>(
                                        <Option key={item.id} >{item.label}</Option>
                                    ))}
                                    </Select>
                                </Col>
                                    
                                <Col>
                                <Typography level={3}>Local Area</Typography>
                                {shippingSubdivisions && 
                                  <Select style={{ width: 200}} label="Subdivisions"  onChange={handleShippingDivision}>
                                  {Object.entries(shippingSubdivisions).map(([code,name]) => ({id:code,label: name})).map((item)=>(
                                       <Option key={item.id}>{item.label}</Option>
                                  )
                                  )}
                              </Select>
                                }
                                  
                                </Col>
                                </Space>}
                                </Row>
                               
                                <Row>
                                    <Space>
                                <Col>
                                <Typography level={3}>Shipping Options</Typography>
                                    <Select label="ShippingO"style={{ width: 300 }} onChange={handleShippingOption}>
                                    {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item)=>(
                                    <Option key={item.id} >{item.label}</Option>
                                    )
                                    )}
                                    </Select>
                                </Col>
                                    </Space>
                            </Row>
                         
                            <Divider/>
                            <Input type="submit" value='Next'  /> 
                    </form>
              </FormProvider>
        </>
    )
}

export default AddressForm;
