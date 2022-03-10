import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Autocomplete, Button, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useHistory} from "react-router-dom";
type Vendor = {
    address: string,
    company_name: string,
    created_at: string,
    part_id: number,
    part_name: string,
    unit_price: string,
    vendor_id: number
}
const AddPurchaseOrder = () => {
    const history = useHistory();

    const [quantity, setQuantity] = useState('');
    const [vendorList, setVendorList] = useState<Array<Vendor>>([]);
    const [vendor, setVendor] = useState<Vendor | null>();

    let value = vendor ? parseInt(quantity) * parseFloat(vendor.unit_price) : 0;
    value = (!isNaN(value)) ? value : 0;

    useEffect(() => {
        async function fetch() {
            await handleGet()
        }
        fetch()
    }, [])
    const handleGet = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BASE_URL + `/part`);
            console.log(response.data)
            setVendorList(response.data)
        } catch (e){
            alert('get data failed')
        }
    };


    const handleQuantityChange = (event: any) => {
        setQuantity(event.target.value);
    };

    const handleSubmit = async () => {
        console.log(vendor, quantity);
        if (!vendor || !quantity){
            alert("input field cannot be empty");
            return
        }
        try {
            const requestBody = {
                "partId": vendor.part_id.toString(),
                "partName": vendor.part_name,
                "vendorId": vendor.vendor_id.toString(),
                "quantity": quantity,
                "unitPrice": vendor.unit_price,
                "value": value
            };
            const res = await axios.post(process.env.REACT_APP_BASE_URL + `/purchase-order`,
                requestBody);
            if (res.data.error){
                alert(res.data.error);
                await history.push('/purchase-order/add/new-purchase')
            }
            else{
                alert(`success!`);
                await history.push('/purchase-order')
            }
        } catch (e) {
            alert("Failed to add")
        }
    };
    return (

        <Box m={2}>
            <Typography variant="h5" gutterBottom component="div">
                Add Purchase Order
            </Typography>
            <Button variant="outlined" onClick={()=>history.push('/purchase-order/add/new-purchase')}>
                New Purchase
            </Button>
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
                    value={vendor}
                    onChange={(event: any, vendor: Vendor | null) => {
                        setVendor(vendor);
                    }}
                    options={vendorList}
                    autoHighlight
                    getOptionLabel={(option) => option.part_name}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {option.part_id}. {option.part_name} ({option.company_name}, unit price: {option.unit_price})
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Choose a part"
                        />
                    )}
                />
                <Box m={2}>
                    <p>unit price: {vendor ? vendor.unit_price : 0}</p>
                </Box>

                <div>
                    <TextField id="standard-basic" label="Quantity" variant="standard" style = {{width: 400}}
                               onChange={handleQuantityChange}/>
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

export default AddPurchaseOrder;
