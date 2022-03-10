
import React, {useState} from 'react';
import axios from "axios";
import {Button, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useHistory} from "react-router-dom";
type Vendor = {
    address: string
    created_at: string
    employee_id: number
    name: string
    salary: string
}
const NewPurchaseOrder = () => {
    const history = useHistory();

    const [partName, setPartName] = useState('');
    const [vendorId, setVendorId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    let value = parseInt(quantity) * parseFloat(unitPrice);
    value = (!isNaN(value)) ? value : 0;


    const handlePartNameChange = (event: any) => {
        setPartName(event.target.value);
    };
    const handleVendorIdChange = (event: any) => {
        setVendorId(event.target.value);
    };
    const handleQuantityChange = (event: any) => {
        setQuantity(event.target.value);
    };
    const handleUnitPriceChange = (event: any) => {
        setUnitPrice(event.target.value);
    };
    const handleSubmit = async () => {
        if (!partName || !quantity || !unitPrice || !vendorId){
            alert("input field cannot be empty");
            return
        }
        try {
            const requestBody = {
                "partName": partName,
                "vendorId": vendorId,
                "quantity": quantity,
                "unitPrice": unitPrice,
                "value": value
            };
            await axios.post(process.env.REACT_APP_BASE_URL + `/purchase-order/new`,
                requestBody);
            alert(`success!`)
            await history.push('/purchase-order')
        } catch (e) {
            alert("Failed to add")
        }
    };
    return (

        <Box m={2}>
            <Typography variant="h5" gutterBottom component="div">
                Add Purchase Order
            </Typography>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField id="standard-basic" label="Part Name" variant="standard" style = {{width: 400}}
                               onChange={handlePartNameChange}/>
                </div>
                <div>
                    <TextField id="standard-basic" label="Vendor Id" variant="standard" style = {{width: 400}}
                               onChange={handleVendorIdChange}/>
                </div>
                <div>
                    <TextField id="standard-basic" label="Quantity" variant="standard" style = {{width: 400}}
                               onChange={handleQuantityChange}/>
                </div>
                <div>
                    <TextField id="standard-basic" label="Unit Price" style = {{width: 400}} variant="standard"
                               onChange={handleUnitPriceChange}/>
                </div>

                <Box m={2}>
                    <Typography variant="body1" gutterBottom component="div">
                        {`value: ${value} `}
                    </Typography>
                </Box>

                <Box m={2}>
                    <Button variant="outlined" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Box>

    );
};

export default NewPurchaseOrder;
