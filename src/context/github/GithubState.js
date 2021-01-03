import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import {
    SEARCH_USERS,
    SET_LOADING,
    SET_ERROR,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

const GithubState = props => {
  const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        error: null,
    }

  const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search Users
  const searchUser = async text => {
    try {
      setLoading();
      nullError();

      const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=$
      {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
      {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

      dispatch({ type: SEARCH_USERS, payload: res.data.items });
        
      if(res.data.items.length == 0){
        dispatch({ type: SET_ERROR, payload: {message: 'Nothing Found'} });
      }
       
    } catch (e) {
        dispatch({ type: SET_ERROR, payload: e });
    }
  };

    // Get User
  const getUser = async username => {
    try {
      setLoading();
      nullError();

      const res = await axios.get(`https://api.github.com/users/${username}?per_page=6&client_id=$
      {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
      {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
   
      dispatch({type: GET_USER, payload: res.data})

    } catch (e) {
        dispatch({ type: SET_ERROR, payload: e });
    }
  };

    // Get Repos
  const getUserRepos = async username => {
    try {
      setLoading();
      nullError();

      const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=$
      {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
      {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

      dispatch({type: GET_REPOS, payload: res.data});
      nullError();

    } catch (e) {
      dispatch({ type: SET_ERROR, payload: e });
    }
  };    
    
    // Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });
    // Clear User
    const clearSearch = () => dispatch({ type: CLEAR_USERS });
    // Null Error 
    const nullError = () => dispatch({ type: SET_ERROR, payload: null });


    // returning provider
    return <GithubContext.Provider
      value={{
          searchUser,
          clearSearch,
          getUser,
          getUserRepos,
          nullError,
          users: state.users,
          user: state.user,
          repos: state.repos,
          loading: state.loading,
          error: state.error,
      }}> {props.children} </GithubContext.Provider> 

}

export default GithubState;