import React, { useContext } from 'react';
import UserItem from './Useritem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Users = props => {
  
  const githubContext = useContext(GithubContext);

  
  if (githubContext.error) {
    return (
      <div className='text-center'>
        <h2>{githubContext.error.message}</h2>
      </div>
    );
  } else {
    return !githubContext.loading ? (
      <div style={userStyle}>
        {githubContext.users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    ) : (
      <Spinner />
    );
  }
};


const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};


export default Users;
