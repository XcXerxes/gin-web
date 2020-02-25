import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { iRoute } from '@interface/router.interface'
import { CategoryRoutes } from 'router/categroy'

const CategoryRoute: React.FC = () => {
  return (
    <div className="container">
      <Switch>
        <Redirect from="/" to="/tag/list" exact />
        {CategoryRoutes.map((item: iRoute) => {
          return (
            <Route
              key={item.path}
              path={item.path}
              component={item.component}
            />
          )
        })}
      </Switch>
    </div>
  )
}

export default CategoryRoute
