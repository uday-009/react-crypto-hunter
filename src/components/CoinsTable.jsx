import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { Container, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const CoinsTable = () => {

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1)

    const navigate = useNavigate();
    const {currency, symbol, coins, loading, fetchCoins} = CryptoState();

   

    

    useEffect(() => {
        fetchCoins();
    }, [currency])

    
    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          mode: "dark",
        },
      });

      const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ))
      }

  return (
    <ThemeProvider theme={darkTheme}>
        <Container sx={{ textAlign: "center"}}>
        <Typography
          variant="h4"
          sx={{ margin: "18px", fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          sx={{ marginBottom: "20px", width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
            {
                loading?(
                    <LinearProgress sx={{background: "gold"}} />
                ):(
                    <Table>
                        <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
                        <TableRow>
                            {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                <TableCell
                                sx={{
                                    color: "black",
                                    fontWeight: "700",
                                    fontFamily: "Montserrat",
                                }}
                                key={head}
                                align={head === "Coin" ? "inherit" : "right"}
                                >
                                    {head}
                                </TableCell>
                            ))}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                                {handleSearch()
                                .slice((page-1)*10, (page-1)*10 + 10)
                                .map((row) => {
                                    const profit = row.price_change_percentage_24h > 0;

                                    return(
                                        <TableRow 
                                            onClick={() => navigate(`/coins/${row.id}`)}
                                            key={row.name}
                                            sx={{
                                                backgroundColor: "#16171a",
                                                cursor: "pointer",
                                                "&:hover": {
                                                    backgroundColor: "#131111",
                                                },
                                                fontFamily: "Montserrat",
                                            }}
                                        >
                                            <TableCell component="th"
                                            scope='row'
                                            sx={{
                                                display: "flex",
                                                gap: 15
                                            }}
                                            >
                                                <img src={row?.image}
                                                    height="50"
                                                    alt={row?.name}
                                                    style={{marginBottom: 10}}
                                                />
                                                <div
                                                    style={{ display: "flex", flexDirection: "column" }}
                                                >
                                                    <span
                                                    style={{
                                                        textTransform: "uppercase",
                                                        fontSize: 22,
                                                    }}
                                                    >
                                                    {row.symbol}
                                                    </span>
                                                    <span style={{ color: "darkgrey" }}>
                                                    {row.name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">
                                            {symbol}{" "}
                                            {numberWithCommas(row.current_price.toFixed(2))}
                                            </TableCell>

                                            <TableCell
                                            align="right"
                                            sx={{
                                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                fontWeight: 500,
                                            }}
                                            >
                                            {profit && "+"}
                                            {row.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>

                                            <TableCell align="right">
                                            {symbol}{" "}
                                            {numberWithCommas(
                                                row.market_cap.toString().slice(0, -6)
                                            )}
                                            M
                                            </TableCell>

                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                    
                )
            }
        </TableContainer>
        <Pagination 
            count={parseInt((handleSearch()?.length/10).toFixed(0))}
            sx={{
                padding: "20px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                '& .MuiPaginationItem-root' : {
                    color: "gold"
                } 

            }}
            page={page}
            onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 450);
              }}
        />
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable
