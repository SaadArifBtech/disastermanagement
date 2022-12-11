import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const ProvincialPage = Loadable(lazy(() => import("./ProvincialPage")));
const Punjab = Loadable(lazy(() => import("./punjab/PunjabPage")));
const Sindh = Loadable(lazy(() => import("./sindh/SindhPage")));
const Balochistan = Loadable(lazy(() => import("./balochistan/BalochistanPage")));

const Kpk = Loadable(lazy(() => import("./kpk/KpkPage")));
// const RegisterationDetails = Loadable(lazy(() => import("./RegisterationDetailsPage")));
// const CreateCampPage = Loadable(lazy(() => import("./CreateCampPage")));
// const AddUserPage = Loadable(lazy(() => import("./add-user/AddUserPage")));
// const ProfilePage = Loadable(lazy(() => import("./profile/ProfilePage")));


const provincialRoutes = [
    {
        path: '/provincial',
        element: <ProvincialPage />,
    },
    {     
        path: '/provincial/punjab',
        element: <Punjab/>
    },    
    {     
        path: '/provincial/sindh',
        element: <Sindh/>
    },    
    {     
        path: '/provincial/balochistan',
        element: <Balochistan/>
    },    
    {     
        path: '/provincial/kpk',
        element: <Kpk/>
    },    
]

export default provincialRoutes