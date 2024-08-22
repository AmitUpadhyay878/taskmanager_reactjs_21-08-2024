import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface PrivateRouteProps {
    children: React.ReactElement
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const location = useLocation()
    const [isToken, setIsToken] = useState<boolean>(false)

    if (!isToken) {
      
        return <Navigate to="/signin" state={{ from: location }} replace />
    }

    return children
}

export default PrivateRoute
