import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import style from '../TransactionGraph/TransactionGraph.module.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TransactionGraph({ transactions }) {
  const lineData = {
    labels: transactions.map((t) => t.date),
    datasets: [
      {
        label: 'Transaction Amount (Line)',
        data: transactions.map((t) => t.amount),
        backgroundColor: [
          'rgba(75,192,192,1)',
          '#ecf0f1',
          '#50AF95',
          '#f3ba2f',
          '#2a71d0',
        ],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: transactions.map((t) => t.date),
    datasets: [
      {
        label: 'Transaction Amount (Bar)',
        data: transactions.map((t) => t.amount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(255, 205, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(201, 203, 207, 0.8)',
        ],
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'rgba(0,0,0,1)',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(0,0,0,1)',
        },
      },
      y: {
        ticks: {
          color: 'rgba(0,0,0,1)',
        },
      },
    },
    elements: {
      line: {
        borderColor: 'rgba(0,0,0,1)',
      },
    },
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2>Transaction Amount Per Day</h2>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-6 col-12'>  
              <Line data={lineData} options={options} />
            </div>
            <div className='col-xl-6 col-12'>  
              <Bar data={barData} options={options} />
            </div>
          </div>
        </div>
        {/* <div className={style.graph}>
          <Line data={lineData} options={options} />
        </div>
        <div className={style.graph}>
          <Bar data={barData} options={options} />
        </div> */}
      {/* </div> */}
    </div>
  );
}
