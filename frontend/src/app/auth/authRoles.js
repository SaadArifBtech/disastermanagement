export const authRoles = {
    sa: ['Superadmin', 'Employee', 'Admin'], // Only Super Admin has access
    admin: ['Superadmin', 'Admin'], // Only SA & Admin has access
    Employee: ['Superadmin', 'Admin', 'Employee'], // Only SA & Admin & Editor has access
    guest: ['SA', 'ADMIN', 'EDITOR', 'GUEST'], // Everyone has access
}

// Check out app/views/dashboard/DashboardRoutes.js
// Only SA & Admin has dashboard access

// const dashboardRoutes = [
//   {
//     path: "/dashboard/analytics",
//     component: Analytics,
//     auth: authRoles.admin <===============
//   }
// ];

// Check navigaitons.js

// {
//   name: "Dashboard",
//   path: "/dashboard/analytics",
//   icon: "dashboard",
//   auth: authRoles.admin <=================
// }
