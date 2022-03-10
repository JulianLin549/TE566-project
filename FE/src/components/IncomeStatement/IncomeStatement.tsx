import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import Grid from '@material-ui/core/Grid'

import {Container} from "react-bootstrap";
import axios from "axios";
import {useHistory} from "react-router-dom";


const IncomeStatement = () => {
    const history = useHistory();
    const [is, setIs] = useState<any>({});
    useEffect(() => {
        async function fetch() {
            await handleGet()
        }
        fetch()
    }, [])
    const handleGet = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BASE_URL + `/sheet/income-statement`);
            console.log(response.data)
            setIs(response.data)
        } catch (e){
            alert('get data failed')
        }
    };
    let sales = parseFloat(is.sales);
    let cogs = parseFloat(is.cogs);
    let grossProfit = sales - cogs;
    let payroll = parseFloat(is.payroll);
    let bills = parseFloat(is.bills);
    let incomeBeforeTax = (sales-cogs-payroll-bills);
    let incomeTax = 0
    if (incomeBeforeTax > 0){
        incomeTax = incomeBeforeTax * 0.2
    }
    let netIncome = incomeBeforeTax - incomeTax;
    return (
        <Container>
            <h1>Income Statement</h1>
            <Box style={{ width: 600, margin: "24px auto" }}>
                <Typography variant="h5" component="div">
                    Sales
                </Typography>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="body2">Sales</Typography>
                        <Typography variant="body2">COGS</Typography>
                        <hr/>
                        <Typography variant="body1">Gross Profit</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">{sales}</Typography>
                        <Typography variant="body2">{cogs}</Typography>
                        <hr/>
                        <Typography variant="body1">{grossProfit}</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box style={{ width: 600, margin: "24px auto" }}>
                <Typography variant="h5" >
                        Expenses
                </Typography>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="body2">Payroll</Typography>
                        <Typography variant="body2">Bills</Typography>
                        <Typography variant="body2">Annual Expense</Typography>
                        <hr/>
                        <Typography variant="body1">Total Expense</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">{payroll}</Typography>
                        <Typography variant="body2">{bills}</Typography>
                        <Typography variant="body2">0</Typography>
                        <hr/>
                        <Typography variant="body1">{payroll+bills}</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box style={{ width: 600, margin: "36px auto" }}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="body2">Other Income</Typography>
                        <Typography variant="body2">Income Taxes (20%)</Typography>
                        <hr/>
                        <Typography variant="body1">Net Income</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">0</Typography>
                        <Typography variant="body2">{incomeBeforeTax}</Typography>
                        <hr/>
                        <Typography variant="body1">{netIncome}</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default IncomeStatement;
