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
        height: 300
    }
});

const Payroll = () => {
    const classes = useStyles()!;
    const history = useHistory();
    const [payrollList, setPayrollList] = useState<Array<any>>([]);
    useEffect(() => {
        async function fetch() {
            await handleGet()
        }
        fetch()
    }, [])
    const handleGet = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BASE_URL + `/payroll`);
            console.log(response.data)
            setPayrollList(response.data)
        } catch (e){
            alert('get data failed')
        }
    };
    return (
        <Container>
            <h1>Payroll List</h1>
            <Box m={2}>
                <Button variant="outlined" onClick={()=>history.push('/payroll/add')}>
                    Add Payroll
                </Button>
            </Box>

            <Box m={2} className={classes.box}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell align="right">Employee Id</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">Created At</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {payrollList && payrollList.map((obj) => (
                                <TableRow
                                    key={obj.payroll_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{obj.payroll_id}</TableCell>
                                    <TableCell align="right">{obj.employee_id}</TableCell>
                                    <TableCell align="right">{obj.name}</TableCell>
                                    <TableCell align="right">{obj.amount}</TableCell>
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

export default Payroll;
