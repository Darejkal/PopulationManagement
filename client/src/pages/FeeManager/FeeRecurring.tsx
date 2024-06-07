import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Grid, Paper } from "@mui/material";
import TableFeeRecurring from "./TableFeeRecurring";
import { feeService } from "../../redux/services/feeService";

export default function FeeRecurring() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IFee[]>([]);

  useEffect(() => {
    if (isLoading) {
      fetchData();
      setIsLoading(false);
    }
  }, [isLoading]);

  const fetchData = async () => {
    const result = await feeService.getAllFee();
    setData(result);
  };

  const content = (
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

  return content;
}
