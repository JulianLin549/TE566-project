import React from 'react';
import {Button, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import {useHistory} from "react-router-dom";

const Settlement = () => {
    const history = useHistory();

    const handleSettle = async () => {
        try {
            await axios.get(process.env.REACT_APP_BASE_URL + `/settlement`);
            alert(`settle success!`)
            await history.push('/balance-sheet')
        } catch (e) {
            alert("Failed to settle")
        }
    };
    return (
        <Box m={2}>
            <Typography variant="h5" gutterBottom component="div">
                Settle Invoice and Purchase Order After 30 days
            </Typography>
            <Box m={5}>
                <Button variant="outlined" onClick={handleSettle}>
                    Settlement
                </Button>
            </Box>

        </Box>
    );
};

export default Settlement;
