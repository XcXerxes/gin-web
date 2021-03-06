import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import RouterConfig from './routerConfig'

const routers = () => (
  <Switch>
    <Redirect from="/" to="/categroy/list" exact />
    {RouterConfig.map((item: any) => {
      return (
        <Route key={item.path} path={item.path} component={item.component} />
      )
    })}
  </Switch>
)
export default routers
