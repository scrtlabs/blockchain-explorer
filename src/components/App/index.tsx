import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import MainWrapper from '../Common/MainWrapper'
import MainScroll from '../Common/MainScroll'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Home from '../Home'
import theme from '../../theme'
import '../../assets/styles/index.css'

const EmptyContent = () => <React.Fragment />
const NonExistent = () => <div>404 Not Found</div>

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MainWrapper>
          <Header />
          <MainScroll>
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/tasks" component={EmptyContent} />
              <Route exact path="/epochs" component={EmptyContent} />
              <Route exact path="/workers" component={EmptyContent} />
              <Route exact path="/">
                <Redirect to={{ pathname: '/home' }} />
              </Route>
              <Route component={NonExistent} status={404} />
            </Switch>
            <Footer />
          </MainScroll>
        </MainWrapper>
      </ThemeProvider>
    </Router>
  )
}

export default App
