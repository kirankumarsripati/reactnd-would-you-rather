import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { LoadingBar } from 'react-redux-loading';
import { Container } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../reducers'
import Header from './Header';
import Dashboard from './Dashboard';
import QuestionDetails from './QuestionDetails';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import Login from './Login';

const mapState = (state: RootState) => ({
  notLoggedIn: state.authedUser === null,
})

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>

const App: React.FC<PropsFromRedux> = ({ notLoggedIn }) => (
  <Router>
    <Fragment>
      <LoadingBar />
      <Header />
      <Container>
        <Switch>
          {
            notLoggedIn ? <Route path='/' component={Login} /> :
            <Fragment>
              <Route path='/' exact component={Dashboard} />
              <Route path='/questions/:id' component={QuestionDetails} />
              <Route path='/add' component={NewQuestion} />
              <Route path='/leaderboard' component={LeaderBoard} />
            </Fragment>
          }
        </Switch>
      </Container>
    </Fragment>
  </Router>
)

export default connector(App);
