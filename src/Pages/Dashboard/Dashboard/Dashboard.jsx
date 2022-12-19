import React from 'react';
import DoughnutChart from '../DoughnutChart/DoughnutChart';
import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';

const Dashboard = () => {
    return (
        <main>
            <WelcomeMessage />
            <DoughnutChart />
        </main>
    );
};

export default Dashboard;