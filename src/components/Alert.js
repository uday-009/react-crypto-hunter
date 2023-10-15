import React from 'react'
import { CryptoState } from '../CryptoContext'
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = () => {

    const {alert, setAlert} = CryptoState();

    // const handleClick = () => {
    //   setAlert({open: true});
    // };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setAlert({open: false});
    };
    console.log(alert ,'alert.js')
  return (
    <Snackbar  open={alert.open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert  
        elevation={10}
        onClose={handleClose}
        variant='filled'
        severity={alert.type} sx={{ width: '100%' }}>
          {alert.message}
        </MuiAlert >
    </Snackbar>
  )
}

export default Alert
