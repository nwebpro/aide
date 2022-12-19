import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Pink', 'Gray'],
    datasets: [
      {
        label: '# of Votes',
        data: [12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255,192,203,0.2)',
          'rgba(128,128,128,0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,192,203,1)',
          'rgba(128,128,128,1)'
        ],
        borderWidth: 1,
      },
    ],
  };

const DoughnutChart = () => {
    return (
        <div className='grid grid-cols-12 gap-6'>
            <div className='bg-theme-secondary flex flex-col col-span-full sm:col-span-6 xl:col-span-6 p-5'>
                <h2 className='text-lg mb-3 font-semibold'>Doughnut Chart</h2>
                <Doughnut data={data} />
            </div>
        </div>
        
    );
};

export default DoughnutChart;