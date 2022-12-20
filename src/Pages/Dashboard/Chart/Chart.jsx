import React from 'react';
import DoughnutChart from '../DoughnutChart/DoughnutChart';

const Chart = () => {
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <DoughnutChart />
        </section>
    );
};

export default Chart;