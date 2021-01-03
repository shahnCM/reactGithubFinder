import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';


// importing our global state
import GithubState from './context/github/GithubState';


// Custom Components
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import SearchBar from './components/users/Search';
import About from './components/pages/About';


const App = (props) => {

    return (
      <GithubState>
      <Router>
        <div className='App'>
          
          <Navbar />

          <div className='container'>
            <Switch>

              <Route
                exact path='/'
                render={props => (
                  <Fragment>
                    <SearchBar />

                    <Users />
                  </Fragment>
                )}
              />

              <Route exact path='/about' component={About} />

              <Route
                exact path='/user/:login'
                render={props => (
                  <Fragment>
                    <User
                      {...props}
                    />
                  </Fragment>
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
      </GithubState>
    );
  
}

export default App;


/* 
 * রাউটার এর ভিতর সুইচ , সুইচ এর ভিতর রাউট , রাউট এ আমরা প্যারামিটার ডিফাইন করি ।
 * ট্রিপল ডট প্রপ্স হলো প্রপার্টি স্প্রেড নোটেশান ! ইস ২০১৮ তে আসছে ।
 */


// Example of componentDidMount()

  /*
  async componentDidMount() {
    try {
      this.setState({ loading: true });

      const res = await axios.get(`https://api.github.com/users?client_id=$
      {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
      {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      //console.log(res.data);

      this.setState({ users: res.data, loading: false });
    } catch (e) {
      this.setState({ error: e });
    }
  }
*/