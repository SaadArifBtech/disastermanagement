import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
import AddDistributeForm from './AddDistributeForm';
import AddFundsForm from './AddFundsForm';
import DistributionPage from './DistributionPage';
import FundAllocationForm from './FundAllocation';
const FundsPage = Loadable(lazy(() => import("./FundsPage")));


const fundsRoutes = [
    {
        path: '/funds/view',
        element: <FundsPage />,
    },
    {
        path: '/funds/add',
        element: <AddFundsForm />
    }


    ,
    {
        path: '/funds/distribute',
        element: <AddDistributeForm />
    }
    ,
    {
        path: '/funds/viewdistribution',
        element: <DistributionPage />
    },
    {
        path: '/funds/fundallocation',
        element: <FundAllocationForm />
    }
]

export default fundsRoutes