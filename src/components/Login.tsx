import React from 'react';
import { RootState } from '../reducers';
import { setAuthedUser } from '../actions/authUser';
import { connect, ConnectedProps } from 'react-redux';
import { Row, Col, Form, Button } from 'react-bootstrap';

const mapState = ({ users }: RootState) => {
  return { users };
};

const mapDispatch = (dispatch: Function) => {
  return {
    setAuthedUser: (id: string) => {
      dispatch(setAuthedUser(id));
    }
  }
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

const Login = ({ users, setAuthedUser }: PropsFromRedux) => {
  const [userId, setUserId] = React.useState('');

  const onUserChange = (userId: string) => setUserId(userId);

  const onLogin = () => {
    if (userId) {
      setAuthedUser(userId);
    }
  }

  return (
    <Row>
      <Col md={{span: 6, offset: 3}}>
        <Form>
          <Form.Group controlId='selectUser'>
            <Form.Label>Select User</Form.Label>
            <Form.Control as='select' value={userId}
              onChange={(event) => onUserChange(event.target.value)}>
              <option value='' disabled>Please select</option>
              {Object.keys(users).map(user =>
              <option key={user} value={user}>
                {users[user].name}
              </option>
              )}
            </Form.Control>
          </Form.Group>
          <Button onClick={onLogin} disabled={!userId}>Login</Button>
        </Form>
      </Col>
    </Row>
  )
}

export default connector(Login);