import React from 'react';
import {Row, Col, Input} from "antd";
import {useFormContext, Controller} from "react-hook-form";
function Inputtxt({name,label,required,control}) {
    // const {control} = useFormContext();
    return (
        <>
           
                <Controller
                    as={Input}
                   
                    fullWidth
                   
                    control={control}
                    name={name}
                    placeholder={label}
                    required={required}/>
              
        </>
    )
}

export default Inputtxt