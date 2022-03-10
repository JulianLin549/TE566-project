import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Autocomplete, Button, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useHistory} from "react-router-dom";

type Vendor = {
    address: string,
    created_at: string,
    company_name: string,
    vendor_id: number
}
const AddPart = () => {
    const history = useHistory();

    const [vendor, setVendor] = React.useState<Vendor | null>();
    const [unitPrice, setUnitPrice] = useState('');
    const [partName, setPartName] = useState('');

    const [vendorList, setVendorList] = useState<Array<Vendor>>([]);

    useEffect(() => {
        async function fetch() {
            await handleGet()
        }
        fetch()
    }, []);
    const handleGet = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BASE_URL + `/vendor`);
            setVendorList(response.data);
            console.log(response.data)
        } catch (e){
            alert('get data failed')
        }
    };

    const handleUnitPriceChange = (event: any) => {
        setUnitPrice(event.target.value);
    };
    const handlePartNameChange = (event: any) => {
        setPartName(event.target.value);
    };
    const handleSubmit = async () => {
        console.log(vendor);
        if (!vendor || !unitPrice || !partName){
            alert("input field cannot be empty");
            return
        }

        try {
            const requestBody = {
                "vendorId": vendor.vendor_id,
                "partName": partName,
                "unitPrice": unitPrice
            };
            await axios.post(process.env.REACT_APP_BASE_URL + `/part`,
                requestBody);
            alert(`insert success!`)
            await history.push('/part')
        } catch (e) {
            alert("Failed to add")
        }
    };
    return (

        <Box m={2}>
            <Typography variant="h5" gutterBottom component="div">
                Add New Part
            </Typography>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <Autocomplete
                        id="country-select-demo"
                        value={vendor}
                        onChange={(event: any, employee: Vendor | null) => {
                            setVendor(employee);
                        }}
                        options={vendorList}
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
                                label="Choose a vendor"
                            />
                        )}
                    />
                </div>
                <div>
                    <TextField id="standard-basic" label="Part Name" variant="standard" style = {{width: 400}}
                               onChange={handlePartNameChange}/>
                </div>
                <div>
                    <TextField id="standard-basic" label="Unit Price" variant="standard" style = {{width: 400}}
                               onChange={handleUnitPriceChange}/>
                </div>


                <Box m={2}>
                    <Button variant="outlined" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Box>




    );
};

export default AddPart;
