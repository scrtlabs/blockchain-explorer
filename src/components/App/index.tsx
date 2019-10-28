import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import MainWrapper from '../Common/MainWrapper'
import MainScroll from '../Common/MainScroll'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Home from '../Home'
import Tasks from '../Tasks'
import theme from '../../theme'
import Workers from '../Workers'
import Worker from '../Worker'
import Contract from '../Contract'
import NotFound from '../NotFound'
import Epochs from '../Epochs'
import '../../assets/styles/index.css'

const NonExistent = () => <NotFound message="404 Not Found" />

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MainWrapper>
          <Header />
          <MainScroll>
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/tasks/:userAddress?" component={Tasks} />
              <Route exact path="/epochs/:epochNumber?" component={Epochs} />
              <Route exact path="/workers" component={Workers} />
              <Route exact path="/worker/:workerAddress?" component={Worker} />
              <Route exact path="/contract/:contractAddress?" component={Contract} />
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
