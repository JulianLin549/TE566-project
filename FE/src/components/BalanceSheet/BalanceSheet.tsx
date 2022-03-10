import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import Grid from '@material-ui/core/Grid'

import {Container} from "react-bootstrap";
import axios from "axios";
import {useHistory} from "react-router-dom";


const BalanceSheet = () => {
    const [bs, setBs] = useState<any>({});

    useEffect(() => {
        async function fetch() {
            await handleGet()
        }
        fetch()
    }, [])
    const handleGet = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BASE_URL + `/sheet/balance-sheet`);
            console.log(response.data)
            setBs(response.data);
        } catch (e){
            alert('get data failed')
        }
    };
    return (
        <Container>
            <h1>Balance Sheet</h1>
            <Box style={{ width: 800, margin: "24px auto" }}>
                <Grid container style={{ margin: "10px auto" }}>
                    <Grid item xs={6}>
                        <Typography variant="body1" component="div">
                            Assets
                        </Typography>
                        <hr/>
                        <Box style={{ margin: "12px auto" , height: 100}}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Cash</Typography>
                                    <Typography variant="body2">Account Receivable</Typography>
                                    <Typography variant="body2">Inventory</Typography>
                                    <Typography variant="body2">Total Current Asset</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{bs.cash}</Typography>
                                    <Typography variant="body2">{bs.receivable}</Typography>
                                    <Typography variant="body2">{bs.inventory}</Typography>
                                    <Typography variant="body2">
                                        {(parseFloat(bs.cash)+parseFloat(bs.receivable)+parseFloat(bs.inventory)).toFixed(2)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box style={{ margin: "12px auto" , height: 100}}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Building</Typography>
                                    <Typography variant="body2">Equipment</Typography>
                                    <Typography variant="body2">Total Fixed Assets</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{bs.building}</Typography>
                                    <Typography variant="body2">{bs.equipment}</Typography>
                                    <Typography variant="body2">{(parseFloat(bs.building)+parseFloat(bs.equipment)).toFixed(2)}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <hr/>
                        <Box style={{ margin: "12px auto" , height: 100}}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Total Assets</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        {(parseFloat(bs.cash)+parseFloat(bs.receivable)+parseFloat(bs.inventory)
                                            +parseFloat(bs.building)+parseFloat(bs.equipment)).toFixed(2)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" component="div">
                            Liability & Net Worth
                        </Typography>
                        <hr/>
                        <Box style={{ margin: "12px auto" , height: 100}}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Payable</Typography>
                                    <Typography variant="body2">Notes payable</Typography>
                                    <Typography variant="body2">Total Current Liability</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{bs.payable}</Typography>
                                    <Typography variant="body2">0.00</Typography>
                                    <Typography variant="body2">{(parseFloat(bs.payable)).toFixed(2)}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box style={{ margin: "12px auto" , height: 100}}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Mortgage</Typography>
                                    <Typography variant="body2">Total Long Term Debt</Typography>
                                    <hr/>
                                    <Typography variant="body2">Total Liability</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{bs.mortgage}</Typography>
                                    <Typography variant="body2">{(parseFloat(bs.mortgage)).toFixed(2)}</Typography>
                                    <hr/>
                                    <Typography variant="body2">
                                        {(parseFloat(bs.payable)+parseFloat(bs.mortgage)).toFixed(2)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <hr/>
                        <Box style={{ margin: "12px auto" , height: 100}}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Net Worth</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        {(parseFloat(bs.cash)+parseFloat(bs.receivable)+parseFloat(bs.inventory)
                                            +parseFloat(bs.building)+parseFloat(bs.equipment)
                                            -(parseFloat(bs.payable)+parseFloat(bs.mortgage))).toFixed(2)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>

            </Box>

        </Container>
    );
};

export default BalanceSheet;
