import React from 'react';
import DashSidebar from '../Pages/Dashboard/DashSidebar';
import { Outlet } from 'react-router';

const Dashboard = () => {
    return (
        <div data-theme="light" className='flex max-w-[1440px] mx-auto'>
            <DashSidebar/>
            <Outlet/>
            
        </div>
    );
};

export default Dashboard;