import React from 'react'
import {
    Box, Drawer, Button, List, Divider,
    ListItem, ListItemButton,
    ListItemIcon, ListItemText, Avatar, Container
} from '@mui/material/';
import { CryptoState } from '../../CryptoContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { numberWithCommas } from '../CoinsTable';
import {AiFillDelete} from 'react-icons/ai';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function UserSidebar() {
    const [state, setState] = React.useState({
        right: false,
    });

    const { user, setAlert, watchlist, coins, symbol } = CryptoState();

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const removeFromWatchlist = async (coin) => {
        const coinref = doc(db, 'watchlist', user.uid);
    
        try {
          await setDoc(coinref,
            { coins: watchlist.filter((watch) => watch !== coin?.id) },
            {merge: true}
          );
          setAlert({
            open: true,
            message: `${coin.name} Removed From the Watchlist !`,
            type: 'success'
    
          });
    
        } catch (error) {
    
          setAlert({
            open: true,
            message: error.message,
            type: 'error'
    
          });
    
        }
    
      }

    const logOut = () => {
        signOut(auth);
        setAlert({
            open: true,
            message: 'Logout successful!',
            type: 'success'
        });
        toggleDrawer();
    }





    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar onClick={toggleDrawer(anchor, true)}
                        sx={{
                            height: '38px',
                            width: '38px',
                            cursor: 'pointer',
                            backgroundColor: '#eebc1d'
                        }}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <Container
                            sx={{
                                width: '350px',
                                padding: '25px',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                fontFamily: 'monospace'
                            }}
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "20px",
                                    height: "92%",
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 200,
                                        height: 200,
                                        cursor: "pointer",
                                        backgroundColor: "#EEBC1D",
                                        objectFit: "contain",
                                    }}
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                />
                                <span
                                    sx={{
                                        width: '100%',
                                        fontSize: '25px',
                                        textAlign: 'center',
                                        fontWeight: 'bolder',
                                        wordWrap: 'break-word'
                                    }}
                                >
                                    {user.displayName || user.email}
                                </span>
                                <Box className='watchlist'
                                    sx={{
                                        flex: 1,
                                        width: "100%",
                                        backgroundColor: "grey",
                                        borderRadius: '10px',
                                        padding: '15px',
                                        paddingTop: '10px',
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: '12px',
                                        overflowY: "scroll",
                                    }}
                                >
                                    <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                                        Watchlist
                                    </span>

                                    {
                                        coins.map(coin => {
                                            
                                            if (watchlist.includes(coin.id))
                                                return (
                                                    <Box
                                                        sx={{
                                                            padding: '10px',
                                                            borderRadius: '5px',
                                                            color: "black",
                                                            width: "100%",
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            backgroundColor: "#EEBC1D",
                                                            boxShadow: "0 0 3px black",
                                                        }}
                                                    >
                                                        <span> {coin.name} </span>
                                                        <span style={{ display: 'flex', gap: '8px' }}>
                                                            {symbol}
                                                            {numberWithCommas(coin.current_price.toFixed(2))}
                                                            <AiFillDelete
                                                                style={{ cursor: 'pointer' }}
                                                                fontSize='16'
                                                                onClick={() => removeFromWatchlist(coin)}
                                                            />
                                                        </span>
                                                    </Box>

                                                )
                                        })
                                    }

                                </Box>
                            </Box>
                            <Button
                                variant='filled'
                                onClick={logOut}
                                sx={{
                                    height: "8%",
                                    width: "100%",
                                    backgroundColor: "#EEBC1D",
                                    marginTop: '20px',
                                }}
                            >
                                Log Out
                            </Button>

                        </Container>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}