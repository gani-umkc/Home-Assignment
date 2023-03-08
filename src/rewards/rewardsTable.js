import React, {useState, useEffect} from 'react';
import mockRewardsData from './data'
import {getTotalRewards} from './utils'

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'




function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  const rowsByMonth = groupBy(row.transactions, (e)=> {
    return new Date(e.timestamp).toLocaleString('default', {month:'long'})
  })





  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell >{getTotalRewards(row.transactions)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Rewards Calculation
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell>Money Spent</TableCell>
                    <TableCell >Rewards</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    Object.entries(rowsByMonth).map(([monthName, monthlyTransactions], i) => (
                      <TableRow key={monthName}>
                        <TableCell component="th" scope="row">
                          {monthName}
                        </TableCell>
                        <TableCell>{monthlyTransactions.reduce((a,c)=>a+c.amount, 0) +"$"}</TableCell>
                        <TableCell >{getTotalRewards(monthlyTransactions)}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function RewardsTable() {

  const [rewardsData, setRewardsData] = useState([]);

  /*
    to simulate api call. Since we do not have active api, simulating it from data.js file.
    if we have actual api hosted, would have used some libraru like axios to fetch
  */
  useEffect(()=> {
    /*
      if we have actual api, would have used below code

      axios
      .get("api-url", {
        responseType: "json",
      })
      .then(function (response) {
        console.log(response.data);
        setRewardsData(mockRewardsData)
      });
    */

    //sort the backend data by month if api does not give it as sorted
    mockRewardsData.forEach(rec=> {
      rec.transactions = sortBy(rec.transactions, (e)=>new Date(e.timestamp).getMonth())
    })
    setRewardsData(mockRewardsData)
  }, [])

    return (
      <TableContainer component={Paper} style={{width:"50rem"}}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Customer Name</TableCell>
              <TableCell>Total Rewards</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rewardsData.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  
