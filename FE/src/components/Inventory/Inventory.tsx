import React, {useEffect, useState} from 'react';
import {Box, Button} from "@mui/material";
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

const Inventory = () => {
    const classes = useStyles()!;
    const history = useHistory();
    const [inventory, setInventory] = useState<Array<any>>([]);
    useEffect(() => {
        async function fetch() {
            await handleGet()
        }
        fetch()
    }, [])
    const handleGet = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BASE_URL + `/inventory`);
            console.log(response.data)
            setInventory(response.data)
        } catch (e){
            alert('get data failed')
        }
    };
    return (
        <Container>
            <h1>Inventory List</h1>

            <Box m={2} className={classes.box}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>

                                <TableCell>id</TableCell>
                                <TableCell align="right">Product Name</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Unit Price</TableCell>
                                <TableCell align="right">Value</TableCell>
                                <TableCell align="right">Vendor</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {inventory && inventory.map((obj) => (
                                <TableRow
                                    key={obj.employee_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{obj.id}</TableCell>
                                    <TableCell align="right">{obj.part_name}</TableCell>
                                    <TableCell align="right">{obj.quantity}</TableCell>
                                    <TableCell align="right">{obj.unit_price}</TableCell>
                                    <TableCell align="right">{obj.value}</TableCell>
                                    <TableCell align="right">{obj.company_name}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default Inventory;
