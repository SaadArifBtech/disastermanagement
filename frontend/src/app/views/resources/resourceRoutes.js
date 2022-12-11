import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
import AddResourceForm from './AddResourceForm';

import { authRoles } from '../../auth/authRoles';

const ResourcePage = Loadable(lazy(() => import("./ResourcePage")));
const Analytics = Loadable(lazy(() => import('./Analytics')))

const resourceRoutes = [
    {
        path: '/resources/view',
        element: <ResourcePage />,
    },
    {
        path: '/resource/add',
        element: <AddResourceForm />
    },
    {
        path: '/resource/dashboard',
        element: <Analytics />,
        auth: authRoles.sa,
    },
]

export default resourceRoutes