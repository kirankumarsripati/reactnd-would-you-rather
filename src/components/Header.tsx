import React, { Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../reducers';
import { unsetAuthedUser } from '../actions/authUser';
import { RouteComponentProps, withRouter, NavLink } from 'react-router-dom';
import User from './User';

const mapState = ({ authedUser }: RootState) => {
  return { authedUser };
}

const mapDispatch = (dispatch: Function) => {
  return {
    logout: () => {
      dispatch(unsetAuthedUser());
    }
  }
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & RouteComponentProps;

const Header = ({ authedUser, logout, history }: Props) => {
  const onLogout = (event: any) => {
    event.preventDefault();
    history.push('/');
    logout();
  }

  return (
    <Navbar bg="light" expand="md">
      <Navbar.Brand href="/">Would You Rather</Navbar.Brand>
      { authedUser &&
      <Fragment>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} exact to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/add">New Question</Nav.Link>
            <Nav.Link as={NavLink} to="/leaderboard">Leader Board</Nav.Link>
            <Nav.Link><User id={authedUser} /></Nav.Link>
            <Nav.Link onClick={onLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Fragment>
      }
    </Navbar>
  )
}

export default connector(withRouter(Header));