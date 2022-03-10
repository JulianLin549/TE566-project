import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Autocomplete, Button, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useHistory} from "react-router-dom";

type Employee = {
    address: string,
    created_at: string,
    employee_id: number,
    name: string,
    salary: string
}
const AddPayroll = () => {
    const history = useHistory();

    const [employee, setEmployee] = React.useState<Employee | null>();

    const [employees, setEmployees] = useState<Array<Employee>>([]);

    useEffect(() => {
        async function fetch() {
            await handleGet()
        }
        fetch()
    }, []);
    const handleGet = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BASE_URL + `/employee`);
            setEmployees(response.data);
            console.log(response.data)
        } catch (e){
            alert('get data failed')
        }
    };


    const handleSubmit = async () => {
        console.log(employee);
        if (!employee){
            alert("input field cannot be empty");
            return
        }

        try {
            const requestBody = {
                "employeeId": employee.employee_id,
                "amount": employee.salary,
            };
            await axios.post(process.env.REACT_APP_BASE_URL + `/payroll`,
                requestBody);
            alert(`insert success!`)
            await history.push('/payroll')
        } catch (e) {
            alert("Failed to add")
        }
    };
    return (

        <Box m={2}>
            <Typography variant="h5" gutterBottom component="div">
                Add Payroll
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
                    <Autocomplete
                        id="country-select-demo"
                        value={employee}
                        onChange={(event: any, employee: Employee | null) => {
                            setEmployee(employee);
                        }}
                        options={employees}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {option.name} ({option.salary})
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Choose a employee"
                            />
                        )}
                    />
                </div>
                <Box m={2}>
                    {employee && <p>Payment ${employee?.salary} to {employee.name}</p>}
                </Box>

                <Box m={2}>
                    <Button variant="outlined" onClick={handleSubmit}>
                        Pay
                    </Button>
                </Box>
            </Box>
        </Box>




    );
};

export default AddPayroll;
