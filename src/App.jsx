import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchBar from "./components/SearchBar";
import getCoinList from "./services/getCoinList";
import DataTable from "./components/DataTable";
import Spinner from "./components/Spinner";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [displaySpinner, setdisplaySpinner] = useState(undefined);

  useEffect(() => {
    
      getCoinList().then((coins)=>setCoins(coins));
      
  }, []);

  console.log("coins", coins);

  return (
    <div>
    <SearchBar/>
    
    {coins.length !== 0 ? (<DataTable rows={coins} />) : <Spinner/>}
    
    </div>
  );
};

export default App;
