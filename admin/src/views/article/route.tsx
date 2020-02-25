import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { iRoute } from '@interface/router.interface'
import { ArticleRoutes } from 'router/article'

const ArticleRoute:React.FC = () => {
  return (
    <div className="container">
      <Switch>
        <Redirect from="/" to="/article/list" exact />
        {ArticleRoutes.map((item: iRoute) => {
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

export default ArticleRoute
