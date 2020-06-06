import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import { Container } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../reducers'
import Header from './Header';
import Dashboard from './Dashboard';
import QuestionDetails from './QuestionDetails';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import Login from './Login';
import NotFound from './NotFound';
import { handleInitialData } from '../actions/shared';

const mapState = (state: RootState) => ({
  notLoggedIn: state.authedUser === null,
})

const mapDispatch = (dispatch: Function) => {
  return {
    loadData: () => {
      dispatch(handleInitialData());
    }
  }
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

const App: React.FC<PropsFromRedux> = ({ notLoggedIn, loadData }) => {
  React.useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Router>
      <Fragment>
        <LoadingBar className='loading-bar' />
        <Header />
        <Container className='main'>
          <Switch>
            {
              notLoggedIn ? <Route exact path='/' component={Login} /> :
              <Fragment>
                <Route path='/' exact component={Dashboard} />
                <Route path='/questions/:id' component={QuestionDetails} />
                <Route path='/add' component={NewQuestion} />
                <Route path='/leaderboard' component={LeaderBoard} />
                <Route path='/404' component={NotFound} />
              </Fragment>
            }
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Fragment>
    </Router>
  )
}

export default connector(App);
