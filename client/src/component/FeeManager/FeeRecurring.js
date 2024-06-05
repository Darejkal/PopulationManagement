import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@mui/material";
import TableFeeRecurring from "./TableFeeRecurring";
import { feeService } from "../../redux/service/feeService";

const FeeRecurring=() => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    if (isLoading) {
      fetchData();
      setIsLoading(false);
    }
  }, [isLoading]);

  const fetchData = async () => {
    const fetch = await feeService.getAllFees();
    setData(fetch);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          {data ? (
            <TableFeeRecurring
              data={data}
              handleLoading={() => {
                setIsLoading(true);
              }}
            />
          ) : null}
        </Paper>
      </Grid>
    </Grid>
  );
}
export default FeeRecurring;
