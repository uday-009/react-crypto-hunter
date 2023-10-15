import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/api';
import axios from 'axios';
import CoinInfo from '../components/CoinInfo';
import { Box, Button, ButtonGroup, Grid, LinearProgress, Typography } from '@mui/material';
import { numberWithCommas } from '../components/CoinsTable';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { TotpMultiFactorGenerator } from 'firebase/auth';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, watchlist, setAlert } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data)
  }


  useEffect(() => {
    fetchCoin()
  }, []);

  const heading = {
    fontWeight: "bold",
    fontFamily: 'Montserrat',
    mb: '20px'
  }

  const addToWatchlist = async () => {
    const coinref = doc(db, 'watchlist', user.uid);

    try {
      await setDoc(coinref,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] }
      );
      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
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

  const removeFromWatchlist = async () => {
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

  const inWatchlist = watchlist.includes(coin?.id);

  if (!coin) return <LinearProgress style={{ backgroundColor: 'gold' }} />

  return (
    <Grid container sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: { xs: 'column', md: 'row' },

    }}>
      <Grid item sx={{
        width: { xs: '100%', md: '30%' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '25px',
        borderRight: '2px solid grey',
        textAlign: 'center',

      }}>
        <Box
          component={'img'}
          src={coin?.image?.large}
          alt={coin?.name}
          height='200px'
          sx={{ mb: '20px' }}
        />

        <Typography variant='h3'
          sx={heading}>
          {coin?.name}
        </Typography>
        <Typography variant='subtitle1'
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: '25px',
            paddingBottom: '15px',
            paddingTop: 0,
            textAlign: "justify",
          }}>
          {coin?.description.en.split(".")[0]}.
        </Typography>

        <Box sx={{
          alignSelf: "start",
          padding: '25px',
          paddingTop: '10px',
          width: "100%",
          display: { sm: 'flex' },
          justifyContent: { sm: 'space-around' },
          alignItems: { xs: 'start', sm: 'center', },
          flexDirection: { sm: 'column', },

        }}>
          <span style={{ display: 'flex' }}>

            <Typography
              variant='h5'
              style={heading}
            >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>

            <Typography
              variant='h5'
              style={heading}
            >
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {symbol}{""}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>

            <Typography
              variant='h5'
              style={heading}
            >
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {symbol}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              {'M'}
            </Typography>
          </span>

          {
            user && (
              <Button
                variant='outlined'
                sx={{
                  width: '100%',
                  height: '40px',
                  backgroundColor: inWatchlist ? '#ff0000' : '#eebc1d',
                  color: inWatchlist ? '#fff' : '#000',
                  marginTop: '10px',
                  border: 0
                }}
                onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
              >
                {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </Button>
            )
          }
        </Box>

      </Grid>
      <Grid item sx={{
        width: { xs: '100%', md: '70%' },
      }}>
        <CoinInfo coin={coin} />
      </Grid>
    </Grid>
  )
}

export default CoinPage
