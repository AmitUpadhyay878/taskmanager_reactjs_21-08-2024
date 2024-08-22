import { RouteObject } from 'react-router'
import Boards from '../pages/Boards'
import Layout from '../Layout'
// import SignIn from '../pages/Signin'
// import PrivateRoute from '../components/PrivateRoutes'

const RoutesConfig: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            // {
            //     path: 'signin',
            //     element: <SignIn />
            // },
            {
                path: '/',
                element: (
                        <Boards />
                )
            },
            // {
            //     path: '/',
            //     element: (
            //         <PrivateRoute>
            //             <Boards />
            //         </PrivateRoute>
            //     )
            // }
        ]
    }
]

export default RoutesConfig
