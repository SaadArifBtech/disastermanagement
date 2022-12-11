import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const RegisterationsPage = Loadable(lazy(() => import("./RegisterationsPage")));
const RegisterationDetails = Loadable(lazy(() => import("./RegisterationDetailsPage")));
// const CreateCampPage = Loadable(lazy(() => import("./CreateCampPage")));
// const AddUserPage = Loadable(lazy(() => import("./add-user/AddUserPage")));
// const ProfilePage = Loadable(lazy(() => import("./profile/ProfilePage")));


const campRoutes = [
    {
        path: '/registerations',
        element: <RegisterationsPage />,
    },
    {     
        path: '/registerations/:id',
        element: <RegisterationDetails />
    },
    // {
    //     path: '/emergency-camp/add',
    //     element: <CreateCampPage />
    // }
]

export default campRoutes