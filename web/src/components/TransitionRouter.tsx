import React, { useEffect, Component, Suspense } from 'react'
import Nprogress from 'nprogress'
import { Route } from 'react-router-dom'
import Sketon from 'components/Sketon' 

export interface TransitionRouterProps {
  component: any;
  path?: string;
  exact?: boolean;
}
const TransitionRouter:React.FC<TransitionRouterProps> = ({ component, ...rest }) => {
  const NComponent = component || Component
  Nprogress.start()
  useEffect(() => {
    console.log('------------1')
    Nprogress.done()
  })
  return (
    <Route {...rest} render={(routeProps: any) => <Suspense fallback={<Sketon />}><NComponent {...routeProps} /></Suspense>} />
  )
}

export default TransitionRouter
