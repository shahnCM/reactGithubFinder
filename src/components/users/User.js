import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../Repos/Repos';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const User = (props) => {
  
  const githubContext = useContext(GithubContext);

  useEffect(() => {
    githubContext.getUser(props.match.params.login);
    githubContext.getUserRepos(props.match.params.login);
    // eslint-disable-next-line
  }, []);

    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = githubContext.user;

    //const { error, loading, user, repos } = props;

    if (githubContext.loading) {
      return <Spinner />;
    } else if (githubContext.user != {}) {
      return (
        <Fragment>
          <Link to='/' className='btn btn-sm btn-primary'>
            Back
          </Link>
          <br />
          <br />
          <h2>{name}</h2>
          {location ? <p>Location: {location}</p> : null}

          <h4>
            Hireable:{' '}
            {hireable ? (
              <i className='fas fa-check text-success' />
            ) : (
              <i className='fas fa-times-circle text-danger' />
            )}
          </h4>

          <div className='card grid-2'>
            <div className='all-center'>
              <img
                src={avatar_url}
                className='round-img'
                alt=''
                style={{ width: '150px' }}
              />
              <br />
              <div className='badge badge-primary'>Followers: {followers}</div>
            </div>
            <div>
              {bio && (
                <Fragment>
                  <h3>Bio</h3>
                  <p>{bio}</p>
                </Fragment>
              )}
              <div className='text-center'>
                <a
                  href={html_url}
                  className='btn btn-sm btn-outline btn-light my-1 '
                >
                  Visit Github Profile
                </a>
              </div>
            </div>
          </div>
          <Repos repos={githubContext.repos} />
        </Fragment>
      );
    } else if (githubContext.error) {
      return (
        <div>
          <h1>{githubContext.error.message}</h1>
        </div>
      );
    }
  
}

export default User;
