import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const PermissionsPage = Loadable(lazy(() => import("./PermissionsPage")));


const permissionsRoutes = [
    {
        path: '/permissions',
        element: <PermissionsPage />,
    },
]

export default permissionsRoutes