import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ApexChart from './ApexChart';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
// import { UserState } from '../Context/UserProvider';
function Home() {
  // const { user } = UserState();
  // console.log(user);
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [symbol, setSymbol] = React.useState('');
  async function getAllData() {
    try {
      const res = await axios.get('http://localhost:5000/api/data');
      const firsttwentry = res.data.data.slice(-20);

      setData(firsttwentry);
    } catch (err) {
      console.log(err);
    }
  }

  async function getData() {
    try {
      const res = await axios
        .post('http://localhost:5000/api/data', {
          startDate: startDate,
          endDate: endDate,
          symbol: symbol,
        })
        .then((response) => {
          console.log(response.data.data);
          setData(response.data.data);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllData();
    const userInfo = localStorage.getItem('userInfo');
    console.log(userInfo);
    if (!userInfo) {
      navigate('/');
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    getData();
    console.log(startDate, endDate, symbol);
  }

  const handleChange = (event) => {
    event.preventDefault();
    setSymbol(event.target.value);
  };

  function addLeadingZeros(date) {
    const [year, month, day] = date.split('-');

    // Add leading zeros to month and day
    const formattedMonth = month.padStart(2, '0');
    const formattedDay = day.padStart(2, '0');

    // Return the formatted date
    return `${year}-${formattedMonth}-${formattedDay}`;
  }
  return (
    <>
      <Navbar logout={true} />

      <Stack
        sx={{
          marginTop: '30px',
          marginLeft: { md: '70px', sm: '20px', xs: '10px' },
          marginRight: { md: '70px', sm: '20px', xs: '10px' },
          gap: 10,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginLeft: { md: '30px', sm: '20px', xs: '10px' },
            marginRight: { md: '30px', sm: '20px', xs: '10px' },
          }}
        >
          <Box
            component="form"
            sx={{
              // '& .MuiTextField-root': { m: 1, width: '25ch' },
              display: 'flex',
              justifyContent: 'center',
              flexDirection: {
                xl: 'row',
                lg: 'row',
                md: 'row',
                sm: 'column',
                xs: 'column',
              },
              width: { sm: '100%', xs: '100%' },

              gap: 3,
            }}
            noValidate
            onSubmit={handleSubmit}
            autoComplete="on"
          >
            <DatePicker
              value={startDate}
              onChange={(e) => {
                const temp = e.$y + '-' + (e.$M + 1) + '-' + e.$D;
                const ltemp = addLeadingZeros(temp);
                setStartDate(ltemp);
              }}
              format="YYYY-MM-DD"
              label="Start Date"
            />

            <DatePicker
              value={endDate}
              onChange={(e) => {
                const temp = e.$y + '-' + (e.$M + 1) + '-' + e.$D;
                const ltemp = addLeadingZeros(temp);
                setEndDate(ltemp);
              }}
              format="YYYY-MM-DD"
              label="End Date"
            />

            <Box sx={{ minWidth: 250 }}>
              <FormControl fullWidth>
                <InputLabel>Symbol</InputLabel>
                <Select value={symbol} onChange={handleChange}>
                  <MenuItem value={'NIFTY 50'}>NIFTY 50</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                type="submit"
                sx={{ p: -1, height: 55, width: '100%' }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
        {data ? <ApexChart data={data} /> : <div>Lodaing..</div>}
      </Stack>
    </>
  );
}

export default Home;

{
  /* <div>
<Stack direction="column">
  <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    onSubmit={handleSubmit}
    autoComplete="on"
  >
    <Box>
      <DatePicker
        value={startDate}
        onChange={(e) => {
          const temp = e.$y + '-' + (e.$M + 1) + '-' + e.$D;
          const ltemp = addLeadingZeros(temp);
          setStartDate(ltemp);
        }}
        format="YYYY-MM-DD"
        label="Start Date"
      />

      <DatePicker
        value={endDate}
        onChange={(e) => {
          const temp = e.$y + '-' + (e.$M + 1) + '-' + e.$D;
          const ltemp = addLeadingZeros(temp);
          setEndDate(ltemp);
        }}
        format="YYYY-MM-DD"
        label="End Date"
      />
    </Box>
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Symbol</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={symbol}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={'NIFTY 50'}>NIFTY 50</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <Button variant="contained" type="submit">
      Submit
    </Button>
  </Box>
</Stack>
{data ? <ApexChart data={data} /> : <div>Lodaing..</div>}
</div> */
}
