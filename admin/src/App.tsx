import React, { useEffect } from 'react'
import BasicLayout from 'layouts/BasicLayout'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import loadable from 'utils/loadable'
import AuthorizationRoute from 'components/AuthorizationRoute'
import { useDispatch } from 'redux-react-hook'
import { fetchCateList } from 'redux/actions/categroy'

interface AppProps {
}
const App: React.FC<AppProps> = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCateList())
  }, [dispatch])
  return (
    <Router>
      <Switch>
        <Route path="/signin" component={loadable(() => import('views/user/Login'))} />
        <AuthorizationRoute component={BasicLayout} />
      </Switch>
    </Router>
  )
}

export default App
