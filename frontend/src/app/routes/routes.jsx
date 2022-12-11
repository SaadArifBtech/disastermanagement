import AuthGuard from 'app/auth/AuthGuard'
import NotFound from 'app/views/sessions/NotFound'
import materialRoutes from 'app/views/material-kit/MaterialRoutes'
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes'
import sessionRoutes from 'app/views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import userRoutes from 'app/views/users/userRoutes'
import campRoutes from 'app/views/camps/campRoutes'
import registerationRoutes from 'app/views/registerations/registerationRoutes'
import provincialRoutes from 'app/views/provincial/provincialRoutes'
import permissionsRoutes from 'app/views/permissions/permissionRoutes'
import Map from 'app/views/Map/Map'
import { Navigate } from 'react-router-dom'
import resourceRoutes from 'app/views/resources/resourceRoutes'
import fundsRoutes from 'app/views/fundsmanagement/FundsRoutes'



export const AllPages = () => {
    const all_routes = [
        {
            element: (
                <AuthGuard>
                    <MatxLayout />
                </AuthGuard>
            ),
            children: [...dashboardRoutes,  ...materialRoutes, ...userRoutes, ...campRoutes, ...registerationRoutes, ...provincialRoutes, ...permissionsRoutes,...resourceRoutes, ...fundsRoutes],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="dashboard" />,
        },
        {
            path: '/add-camp-via-map',
            element: <Map />
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]

    return all_routes
}
