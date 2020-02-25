import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { getToken } from 'utils/auth'
import Nprogress from 'nprogress'

interface AuthorizationRouteProps {
  component: any;
}
const AuthorizationRoute:React.FC<AuthorizationRouteProps> = ({ component }) => {
  Nprogress.start()
  const Component = component
  const token = getToken()
  useEffect(() => {
    Nprogress.done()
  })
  if (!token) {
    return (
      <Redirect to="signin" />
    )
  }
  return (
    <Component />
  )
}

export default AuthorizationRoute
