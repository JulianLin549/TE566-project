import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Autocomplete, Button, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useHistory} from "react-router-dom";
type Customer = {
    customer_id: string,
    company_name: string,
    name: string,
    address: string,
    created_at: string
}

const AddInvoice = () => {
    const history = useHistory();

    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');

    const [customerList, setCustomerList] = useState<Array<Customer>>([]);
    const [customer, setCustomer] = useState<Customer | null>();

    const handleQuantityChange = (event: any) => {
        setQuantity(event.target.value);
    };
    const handleUnitPriceChange = (event: any) => {
        setUnitPrice(event.target.value);
    };
    useEffect(() => {
        async function fetch() {
            await handleGet()
        }
        fetch()
    }, [])
    const handleGet = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BASE_URL + `/customer`);
            console.log(response.data)
            setCustomerList(response.data)
        } catch (e){
            alert('get data failed')
        }
    };

    let value = parseInt(quantity) * parseFloat(unitPrice);
    value = (!isNaN(value)) ? value : 0;


    const handleSubmit = async () => {
        console.log(customer, unitPrice, quantity)
        if (!customer || !quantity || !unitPrice){
            alert("input field cannot be empty");
            return
        }
        try {
            const requestBody = {
                "customerId": customer.customer_id,
                "quantity": quantity,
                "unitPrice": unitPrice,
                "value": value
            };
            const res = await axios.post(process.env.REACT_APP_BASE_URL + `/invoice`,
                requestBody);
            if (res.data.error){
                alert(res.data.error);
                await history.push('/invoice/add')
            }
            else{
                alert(`success!`);
                await history.push('/invoice')
            }
        } catch (e) {
            alert("Failed to add")
        }
    };
    return (

        <Box m={2}>
            <Typography variant="h5" gutterBottom component="div">
                Add Invoice
            </Typography>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <Autocomplete
                    id="country-select-demo"
                    value={customer}
                    onChange={(event: any, customer: Customer | null) => {
                        setCustomer(customer);
                    }}
                    options={customerList}
                    autoHighlight
                    getOptionLabel={(option) => option.company_name}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {option.company_name}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Choose a Customer"
                        />
                    )}
                />
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

export default AddInvoice;
