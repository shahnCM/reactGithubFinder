import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';



const Search = (props) => {
  const githubContext = useContext(GithubContext);

  const [text, setText] = useState('');

  const handleChange = e => setText(e.target.value);
  
  
  const handleSubmit = e => {
    e.preventDefault();
    if (text === '') {
      alert('Enter Something than search');
    } else {
      githubContext.searchUser(text);
      setText('');
    }
  };
  
  const handleClear = e => {
    githubContext.clearSearch();
    githubContext.nullError();
  };

  
    return (
      <div>
        <form className='form' onSubmit={handleSubmit}>
          <div className='text-center'>
            <input
              type='text'
              name='text'
              placeholder='Search Users ...'
              style={userStyle}
              onChange={handleChange}
              value={text}
            />
          </div>

          <div className='text-center'>
            <input
              type='submit'
              value='Search'
              className='btn btn-dark'
              style={{ borderRadius: '25px' }}
            />
          </div>
        </form>

        {githubContext.users.length > 0 || githubContext.error ? (
          <div className='text-center'>
            <input
              type='button'
              value='Clear'
              className='btn btn-primary'
              style={{ borderRadius: '25px' }}
              onClick={handleClear}
            />
          </div>
        ) : null}
      </div>
    );
  
}

const userStyle = {
  border: '2px solid grey',
  borderRadius: '25px'
};

export default Search;
