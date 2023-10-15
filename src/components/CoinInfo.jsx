import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api'
import { CircularProgress,Box,Container,  Grid, LinearProgress, Link, ThemeProvider, createTheme, Button } from '@mui/material';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {

  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const [flag, setFlag] = useState(false);

  const { currency } = CryptoState();

  const fetchhistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
    setFlag(true);
    setHistoricalData(data.prices);
  }

  useEffect(() => {
    fetchhistoricalData()
  }, [days]);


  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });




  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{
        width:  '100%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: { xs: '0', md: '25px' },
        padding: '40px',
        padding: { xs: '20px', md: '40px' },
        paddingTop: { xs: '0', md: '' },

      }}>
        
          {
            !historicalData ? (
              <CircularProgress
                style={{ color: "gold" }}
                size={250}
                thickness={1}
              />
            ) : (
              <>
                <Line
                  data={{
                    labels: historicalData.map((coin) => {
                      let date = new Date(coin[0]);
                      let time =
                        date.getHours() > 12
                          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                          : `${date.getHours()}:${date.getMinutes()} AM`;
                      return days === 1 ? time : date.toLocaleDateString();
                    }),

                    datasets: [
                      {
                        data: historicalData.map((coin) => coin[1]),
                        label: `Price ( Past ${days} Days ) in ${currency}`,
                        borderColor: "#EEBC1D",
                      },
                    ],
                  }}
                  options={{
                    elements: {
                      point: {
                        radius: 1,
                      },
                    },
                    plugins: {
                      legend: {
                        display: true,
                      },
                    },
                    responsive: true,

                  }}
                 
                />
                <Box sx={{
                   display: "flex",
                   marginTop: '20px',
                   justifyContent: "space-around",
                   width: "100%",
                }}>
                  {chartDays.map(day => (
                     <SelectButton
                     key={day.value}
                     onClick={() => {setDays(day.value);
                       setFlag(false);
                     }}
                     selected={day.value === days}
                   >
                    
                     {day.label}
                   </SelectButton>
                  ))}
                </Box>
              </>
            )

          }
       

      </Container>
    </ThemeProvider>
  )
}

export default CoinInfo
