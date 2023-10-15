import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <div
    className='banner'
        style={{
            background: "url(./banner2.jpg)"
       }}
    > 
      <Container className='banner-container'
        sx={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          paddingTop: "25px",
          justifyContent: "space-around"
        }}
      >
          <Box className="tagline"
            sx={{
              display: "flex",
              height: "40%",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center"
            }}
          >
              <Typography
              variant='h2'
              sx={{
                fontWeight: "bold",
                marginBottom: "15px",
                fontFamily: "Montserrat"
              }}
              >
                Crypto Hunter
              </Typography>
              <Typography
              variant='subtitle2'
              sx={{
                color: "darkgrey",
                textTransform: "capitalize",
                fontFamily: "Montserrat"
              }}
              >
                Get all the Info regarding your favorite Crypto Currency
              </Typography>
          </Box>
          <Carousel />
      </Container>
    </div>
  )
}

export default Banner
