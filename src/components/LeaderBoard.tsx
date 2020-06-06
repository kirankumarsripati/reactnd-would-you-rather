import React from 'react';
import { RootState } from '../reducers';
import { connect, ConnectedProps } from 'react-redux';
import { Table } from 'react-bootstrap';
import User from './User';

const mapState = ({ users }: RootState) => {
  const list = Object.keys(users).map(id => ({
    id,
    created: users[id].questions.length,
    answered: Object.keys(users[id].answers).length,
  }))
  .sort((a, b) => b.created + b.answered - (a.created + a.answered));
  return {
    list,
  }
}

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>

const LeaderBoard = ({ list }: PropsFromRedux) => (
  <Table className='leader-board'>
    <thead>
      <tr>
        <th>Rank</th>
        <th>User</th>
        <th>Questions Created</th>
        <th>Questions Answered</th>
      </tr>
    </thead>
    <tbody>
      {list.map((user, index) =>
        <tr key={user.id}>
          <td>{index + 1}</td>
          <td><User id={user.id} /></td>
          <td>{user.created}</td>
          <td>{user.answered}</td>
        </tr>
      )}
    </tbody>
  </Table>
)

export default connector(LeaderBoard);