import React, {useState} from 'react';
import axios from "axios";
import {Button, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useHistory} from "react-router-dom";
const AddVendor = () => {
    const history = useHistory();

    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');

    const handleCompanyNameChange = (event: any) => {
        setCompanyName(event.target.value);
    };
    const handleAddressChange = (event: any) => {
        setAddress(event.target.value);
    };
    const handleSubmit = async () => {
        if (!companyName || !address){
            alert("input field cannot be empty");
            return
        }
        try {
            const requestBody = {
                "companyName": companyName,
                "address": address
            };
            await axios.post(process.env.REACT_APP_BASE_URL + `/vendor`,
                requestBody);
            alert(`insert success!`)
            await history.push('/vendor')
        } catch (e) {
            alert("Failed to add")
        }
    };
    return (

        <Box m={2}>
            <Typography variant="h5" gutterBottom component="div">
                Add Vendor
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
                    <TextField id="standard-basic" label="Company Name" style = {{width: 400}} variant="standard"
                               onChange={handleCompanyNameChange}/>
                </div>

                <div>
                    <TextField id="standard-basic" label="Address" variant="standard" style = {{width: 400}}
                               onChange={handleAddressChange}/>
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

export default AddVendor;
