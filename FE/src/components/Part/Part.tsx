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

const Part = () => {
    const classes = useStyles()!;
    const history = useHistory();
    const [partList, setPartList] = useState<Array<any>>([]);
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
            setPartList(response.data)
        } catch (e){
            alert('get data failed')
        }
    };
    return (
        <Container>
            <h1>Part List</h1>
            <Box m={2}>
                <Button variant="outlined" onClick={()=>history.push('/part/add')}>
                    Add Part
                </Button>
            </Box>
            <Box m={2} className={classes.box}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Part Id</TableCell>
                                <TableCell align="right">Part Name</TableCell>
                                <TableCell align="right">Unit Price</TableCell>
                                <TableCell align="right">Vendor</TableCell>
                                <TableCell align="right">Created At</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {partList && partList.map((obj) => (
                                <TableRow
                                    key={obj.part_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{obj.part_id}</TableCell>
                                    <TableCell align="right">{obj.part_name}</TableCell>
                                    <TableCell align="right">{obj.unit_price}</TableCell>
                                    <TableCell align="right">{obj.company_name}</TableCell>
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

export default Part;
