import React, { Fragment } from 'react';
import { RootState } from '../reducers';
import { ConnectedProps, connect } from 'react-redux';

interface ComponentProps {
  id: string;
}

const mapState = ({ users }: RootState, { id }: ComponentProps) => {
  return {
    user: users[id],
  }
}

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & ComponentProps;

const User = ({ user }: Props) => {
  return (
    <Fragment>
      <img src={user.avatarURL}
        className='avatar' alt={user.name} />
      <span>{user.name}</span>
    </Fragment>
  )
}

export default connector(User);