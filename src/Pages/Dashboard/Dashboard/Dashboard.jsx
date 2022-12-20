import React from 'react';
import DoughnutChart from '../DoughnutChart/DoughnutChart';
import ShowImage from '../ImageUpload/ShowImage';
import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';

const Dashboard = () => {
    return (
        <main>
            <WelcomeMessage />
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <DoughnutChart />
                <ShowImage />
            </div>
        </main>
    );
};

export default Dashboard;