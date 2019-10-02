import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import MainWrapper from '../Common/MainWrapper'
import MainScroll from '../Common/MainScroll'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import theme from '../../theme'
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MainWrapper>
          <Header />
          <MainScroll>
            <Switch>
              <Route
                exact
                path="/dashboard"
                components={withRouter(() => (
                  <div>Hello Explorer!</div>
                ))}
              />
              <Route
                exact
                path="/tasks"
                components={withRouter(() => (
                  <React.Fragment />
                ))}
              />
              <Route
                exact
                path="/users"
                components={withRouter(() => (
                  <React.Fragment />
                ))}
              />
              <Route
                exact
                path="/workers"
                components={withRouter(() => (
                  <React.Fragment />
                ))}
              />
              <Route exact path="/">
                <Redirect to={{ pathname: '/dashboard' }} />
              </Route>
              <Route component={() => <div>na-a!</div>} />
            </Switch>
            <Footer />
          </MainScroll>
        </MainWrapper>
      </ThemeProvider>
    </Router>
  )
}

export default App
