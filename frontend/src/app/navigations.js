export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'dashboard',
    },
    {
        label: 'Provincial',
        type: 'label',
    },  
    {
        name: 'Provincial Maps',
        path: '/provincial',
        icon: 'dashboard',
    },
    {
        label: 'Admins & Permissions',
        type: 'label',
    },
    
    {
        name: 'Regional Admins',        
        icon: 'people',
        children:[
            {
                name: 'View Regional Admins',
                iconText: 'SI',
                path: '/users',
            },
            {
                name: 'Add Regional Admin',
                iconText: 'SI',
                path: '/user/add',
            },
        ]
    },
    {
        name: 'Permissions',
        path: '/permissions',
        icon: 'accessibility',
    },
    {
        label: 'MENU',
        type: 'label',
    },
    
    {
        name: 'Resources',        
        icon: 'rv_hookup',
        children:[
            // {
            //     name: 'Over All Resources',
            //     iconText: 'SI',
            //     path: '/resource/dashboard'
            // },
            {
                name: 'Resource OverView',
                iconText: 'SI',
                path: '/resource/dashboard'
            },
            {
                name: 'View Resources',
                iconText: 'SI',
                path: '/resources/view'
            },
            {
                name: 'Add Resources',
                iconText: 'SI',
                path: '/resource/add'
            },

        ]
    },
    {
        name: 'Funds Management',        
        icon: 'rv_hookup',
        children:[
            {
                name: 'View All Funds',
                iconText: 'SI',
                path: '/funds/view'
            },
            {
                name: 'Add Funds',
                iconText: 'SI',
                path: '/funds/add'
            },
            {
                name: 'Distribute Fund',
                iconText: 'SI',
                path: '/funds/distribute'
            },
            {
                name: 'View All Distribution',
                iconText: 'SI',
                path: '/funds/viewdistribution'
            },  {
                name: 'Assign Funds',
                iconText: 'SI',
                path: '/funds/fundallocation'
            },

        ]
    },
    {
        name: 'Camps',        
        icon: 'assistant_photo',
        children: [
            {
                name: 'Create Camp',
                iconText: 'SI',
                path: '/emergency-camp/add'
            },
            {
                name: 'View Camps',
                iconText: 'SI',
                path: '/emergency-camps'
            },            
        ]
    },
   
    {
        name: 'Alerts',        
        icon: 'notifications_active',
        children: [
            {
                name: 'View alerts',
                iconText: 'SI',
                path: '/alert/create'
            },
            {
                name: 'Add alert',
                iconText: 'SI',
                path: '/alerts'
            },            
        ]
    },
    {
        name: 'Registerations',
        path: '/registerations',
        icon: 'dashboard',
    },
   
]
