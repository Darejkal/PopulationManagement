import { DialogTitle, DialogContent, TextField, DialogActions, Grid, Dialog, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

function DetailDialog({ show,row }) {
  const statistic = {
    houseHold: "Adam",
    fee: "500.000 vnd",
    paymentTime: "21/12/2022",
    amount: 43,
    status: true,
  }
  const handleClose = () => {
    show(false)
  }
  return (
    <>
      <Dialog open={true} maxWidth="md" fullWidth>
        <DialogTitle variant='h4'>Thông tin thống kê</DialogTitle>
        <Divider variant='middle' color='black' />
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 5, width: '25ch' }
            }}
            flexDirection='column'
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {row?.contributionList?.map((fee)=>(
                    <TextField
                        label='Tên đóng góp'
                        variant='outlined'
                        defaultValue={fee.name}
                        InputProps={{
                          readOnly: true
                        }}
                    />
                ))
                }

              </Grid>
              <Grid item xs={6}>
                {row?.feeList?.map((fee)=>(
                    <TextField
                        label='Tên phí'
                        variant='outlined'
                        defaultValue={fee.name}
                        InputProps={{
                          readOnly: true
                        }}
                    />
                ))
                }

              </Grid>

            </Grid>


          </Box>
        </DialogContent>
        <DialogActions>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
          <Button variant='outlined' onClick={handleClose} color='error'>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DetailDialog;

