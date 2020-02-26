import React, { lazy } from 'react'
import { StyledApp } from './App.style'
import XHeader from 'components/Layout/Header'
import XFooter from 'components/Layout/Footer'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import TransitionRouter from 'components/TransitionRouter'

const App: React.FC = () => {
  return (
    <StyledApp>
      <Router>
        <XHeader />
        <Switch>
          <TransitionRouter
            path="/"
            exact
            component={lazy(() => import('views/Home'))}
          />
          <TransitionRouter
            path="/about"
            component={lazy(() => import('views/About'))}
          />
          <TransitionRouter
            path="/article/:id"
            component={lazy(() => import('views/Article'))}
          />
        </Switch>
        <XFooter />
      </Router>
    </StyledApp>
  )
}

export default App
