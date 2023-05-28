import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({ data }) => {
  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }
  data.sort((a, b) => new Date(a.date) - new Date(b.date));
  // Create arrays for prices and dates

  // Create an empty object to store unique dates
  const uniqueDates = {};

  // Iterate over the data array
  data.forEach((item) => {
    const { date } = item;

    // Check if the date already exists in the uniqueDates object
    if (!uniqueDates[date]) {
      // If the date doesn't exist, add the current item to uniqueDates
      uniqueDates[date] = item;
    }
  });

  data = Object.values(uniqueDates);
  console.log('apex', data);
  const prices = data.map((obj) => obj.price);
  const dates = data.map((obj) => formatDate(obj.date));
  console.log(prices, dates);
  //   console.log('apex', data);
  const series = [
    {
      name: 'Rs',
      data: prices,
    },
  ];

  const options = {
    chart: {
      height: 600,
      type: 'line',
      zoom: {
        enabled: true,
        type: 'x',
        resetIcon: {
          offsetX: -10,
          offsetY: 0,
          fillColor: '#fff',
          strokeColor: '#37474F',
        },
        selection: {
          background: '#90CAF9',
          border: '#0D47A1',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'NIFTY 50',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: dates,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default ApexChart;
