import { Box } from "@mui/material";
import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  return <Box

    component={'span'}
    sx={{
      border: "1px solid gold",
      borderRadius: '5px',
      padding: '10px',
      paddingLeft: '20px',
      paddingRight: '20px',
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
      width: "22%",
    }}
    onClick={onClick}

  >{children}</Box>;
};

export default SelectButton;
