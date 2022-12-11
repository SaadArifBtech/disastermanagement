import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const ViewCampsPage = Loadable(lazy(() => import("./ViewCampsPage")));
// const ViewCampDetails = Loadable(lazy(() => import("./ViewCampDetails")));
const ViewCampDetails = Loadable(lazy(() => import("./CampDetails/CampDetails")));
const CreateCampPage = Loadable(lazy(() => import("./CreateCampPage")));
// const AddUserPage = Loadable(lazy(() => import("./add-user/AddUserPage")));
// const ProfilePage = Loadable(lazy(() => import("./profile/ProfilePage")));


const campRoutes = [
    {
        path: '/emergency-camps',
        element: <ViewCampsPage />,
    },
    {     
        path: '/emergency-camps/:id',
        element: <ViewCampDetails />
    },
    // {
    //     path: '/emergency-camps/add-camp-via-map',
    //     element: <Map />
    // },
    {
        path: '/emergency-camp/add',
        element: <CreateCampPage />
    }
]

export default campRoutes