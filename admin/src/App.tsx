import React, { useEffect, lazy, Suspense } from 'react'
import BasicLayout from 'layouts/BasicLayout'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthorizationRoute from 'components/AuthorizationRoute'
import { useDispatch } from 'react-redux'
import { fetchCateList } from 'redux/actions/categroy'

interface AppProps {}
const UserLayout = lazy(() => import('views/user/Login'))
const App: React.FC<AppProps> = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCateList())
  }, [dispatch])
  return (
    <Suspense fallback={null}>
      <Router>
        <Switch>
          <Route path="/signin" component={UserLayout} />
          <AuthorizationRoute component={BasicLayout} />
        </Switch>
      </Router>
    </Suspense>
  )
}

export default App
