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
import getCoinDetails from "./services/getCoinDetails";
import DataTable from "./components/DataTable";
import Spinner from "./components/Spinner";
import CoinInfoDailog from "./components/CoinInfoDailog";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [unFilteredCoin, setUnFilteredCoin] = useState([]);
  const [coinData, setCoinData] = useState(undefined);
  const [showSpinner, setShowSpinner] = useState(true);
  const [openDialog, setOpenDailog] = useState(false);

  useEffect(() => {
    console.log("showSpinner", showSpinner);
    const data = getCoinList().then((coins) => {
      setCoins(coins);
      setUnFilteredCoin(coins);
      setShowSpinner(false);
    });
  }, []);

  const filterCoinData = (filterTerm) => {
      setCoins(unFilteredCoin); //Not working
      let filteredData = coins.filter((item) => {
        return item.name.toLowerCase().includes(filterTerm.toLowerCase()) || item.symbol.toLowerCase().includes(filterTerm.toLowerCase());
      });
      setCoins(filteredData);
  };

  const clearFilter = () => {
      setCoins(unFilteredCoin);
  };

  const getCoinData = (row) => {
    // const afterSelectionCoins = coins.map((x) => x === row ? x.selected = true : x.selected =false)
    // setCoins(afterSelectionCoins)
    setShowSpinner(true);
    getCoinDetails(row.id).then((coinData) => {
      setCoinData(coinData);
      setOpenDailog(true);
      setShowSpinner(false);
    });
  };
  console.log("coinData", coinData);
  if (showSpinner) {
    return <Spinner open={showSpinner} />;
  }

  return (
    <div>
      <SearchBar onFilterChange={(filterTerm) => filterCoinData(filterTerm)} clearFilter={() => clearFilter()}/>
      {coinData ? (
        <CoinInfoDailog
          showInfo={openDialog}
          coinInfo={coinData}
          closeDailog={() => setOpenDailog(false)}
        />
      ) : null}
      {coins.length !== 0 ? (
        <DataTable rows={coins} onRowClick={(row) => getCoinData(row)} />
      ) : (
        <div> Loading... </div>
      )}
    </div>
  );
};

export default App;
