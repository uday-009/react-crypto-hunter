import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Login from './Login';
import SignUp from './SignUp';
import GoogleButton from 'react-google-button'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { CryptoState } from '../../CryptoContext';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '10px'
};

const AuthModal = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState(0)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event, newValue) => setValue(newValue)
  const { setAlert } = CryptoState();
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then(res => {
      setAlert({
        open: true,
        message: `Sign In Successful. Welcome ${res.user.email}`,
        type: 'success'
      });
      handleClose();
    })
  }

  return (
    <div>
      <Button onClick={handleOpen}
        variant='contained'
        style={{
          width: '85px',
          height: '40px',
          backgroundColor: '#eebc1d'
        }}
      >Login</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} style={{ borderRadius: '10px' }} onChange={handleChange} aria-label="user forms" variant='fullWidth'>
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </Box>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <SignUp handleClose={handleClose} />}

            <Box
              sx={{
                padding: '24px',
                paddingTop: 0,
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                gap: '20px',
                fontSize: '20px',
                color: '#fff'
              }}>
              <span>OR</span>
              <GoogleButton
                style={{ width: '100%', outline: 'none' }}
                onClick={signInWithGoogle}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default AuthModal;


