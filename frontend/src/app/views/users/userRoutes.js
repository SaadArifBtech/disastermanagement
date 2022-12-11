import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const AppTable = Loadable(lazy(() => import("./UsersPage")));
const AddUserPage = Loadable(lazy(() => import("./add-user/AddUserPage")));
const ProfilePage = Loadable(lazy(() => import("./profile/ProfilePage")));


const userRoutes = [
    {
        path: '/users',
        element: <AppTable />,
    },
    {
        path: '/user/add',
        element: <AddUserPage />
    },
    {
        path: '/users/profile',
        element: <ProfilePage />
    }
]

export default userRoutes