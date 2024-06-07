
import Layout from "../../components/Layout";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import FeeList from "../../Components/FeeList";
import ContributionList from "../../Components/ContributionList";

const FeeAndContributionList = () => {
    const content = (
        <Grid container spacing={3}>
            {/* Chart */}
            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                    <FeeList/>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                    <ContributionList/>
                </Paper>
            </Grid>
        </Grid>
    )
    return (
        content
    )
}
export default FeeAndContributionList;