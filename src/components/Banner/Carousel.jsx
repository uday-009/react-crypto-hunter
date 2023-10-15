import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../../CryptoContext'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom'


const Carousel = () => {
     function numberWithCommas(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    const [trending, setTrending] = useState([]);
    const {currency, symbol} = CryptoState();
    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data);
        console.log(trending,'trending')
    }

    useEffect(() => {
        fetchTrendingCoins();
    },[currency]);

    const items = trending.map((coin) => {
        let profit = coin?.price_change_percentage_24h >= 0;

        return (
            <Link 
                className='carouselitem' 
                to={`./coins/${coin?.id}`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems:"center",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    color: "#fff"
                }}
                >
                <img src={coin?.image}
                height="80"
                alt={coin?.name}
                style={{marginBottom: 10}}
                />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "rgb(14,203, 129)": "red",
                            fontWeight: 500
                        }}
                    >
                        {profit && "+"} {coin?.price_change_percentage_24h.toFixed(2)}%
                    </span>
                </span>
                <span style={{fontSize: 22, fontWeight: 500}}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    }

  return (
    <Box sx={{
        height: "50%",
        display: "flex",
        alignItems: "center"
    }}
    >
        <AliceCarousel 
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}

        />
    </Box>
  )
}

export default Carousel
