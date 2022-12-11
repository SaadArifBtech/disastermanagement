import React from 'react'
import { Store } from './redux/Store'
import { Provider } from 'react-redux'
import { AllPages } from './routes/routes'
import { MatxTheme } from 'app/components'
import { useRoutes } from 'react-router-dom'
import { AuthProvider } from 'app/contexts/JWTAuthContext'
import { SettingsProvider } from 'app/contexts/SettingsContext'
// import PermissionsContext from './contexts/PermissionsContext'
// import useAuth from './hooks/useAuth'
import axios from 'axios.js'

const App = () => {
    const all_pages = useRoutes(AllPages())
    // const {user} = useAuth()

    // console.log(user)

    // const [permissions, setPermissions] = React.useState(user.permissions)
    
    // const getPermissions = async () => {
    //     try{
    //         const res = await axios.get(`/api/permissions/${user.id}`)
    //         setPermissions(res.data)
    //     }catch(e){
    //         console.log(e)
    //     }

    // }


    return (
        <Provider store={Store}>
            <SettingsProvider>
                <MatxTheme>                    
                    <AuthProvider>                        
                        {/* <PermissionsContext.Provider value={{
                            permissions: user.permissions,
                            getPermissions: getPermissions
                        }}> */}
                            {all_pages}
                        {/* </PermissionsContext.Provider>                         */}
                    </AuthProvider>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
}

export default App
