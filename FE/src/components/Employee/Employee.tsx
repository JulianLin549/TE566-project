import React, {ReactNode, useEffect, useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Container} from "react-bootstrap";
import axios from "axios";
import {makeStyles} from "@mui/styles";
import {useHistory} from "react-router-dom";
const useStyles = makeStyles({
    box: {
        margin: 20,
        verticalAlign: "middle",
        height: 300,
    }
});

const Employee = () => {
    const classes = useStyles()!;
    const history = useHistory();
    const [customerList, setCustomerList] = useState<Array<any>>([]);
    useEffect(() => {
        async function fetch() {
            await handleGet()
        }
        fetch()
    }, [])
    const handleGet = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BASE_URL + `/employee`);
            setCustomerList(response.data)
        } catch (e){
            alert('get data failed')
        }
    };
    return (
        <Container>
            <h1>Employee List</h1>
            <Box m={2}>
                <Button variant="outlined" onClick={()=>history.push('/employee/add')}>
                    Add Employee
                </Button>

            </Box>

            <Box m={2} className={classes.box}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Address</TableCell>
                                <TableCell align="right">Salary</TableCell>
                                <TableCell align="right">Created At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customerList && customerList.map((obj) => (
                                <TableRow
                                    key={obj.employee_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{obj.employee_id}</TableCell>
                                    <TableCell align="right">{obj.name}</TableCell>
                                    <TableCell align="right">{obj.address}</TableCell>
                                    <TableCell align="right">{obj.salary}</TableCell>
                                    <TableCell align="right">{obj.created_at}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default Employee;
