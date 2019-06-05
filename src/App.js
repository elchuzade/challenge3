import React, { Component } from 'react';
import './App.css';
import UserInformation from './UserInformation';
import logo from '../public/spy.svg';
import classnames from 'classnames';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      user: {},
      errors: {},
      fetched: false
    };
    // for username min is 1 character and max is 39 characters according to the GitHub signin rules
  }
  onChange = e => {
    e.preventDefault();
    if (this.state.errors.usernameError) {
      const updatedErrors = this.state.errors;
      delete updatedErrors.usernameError;
      this.setState({ errors: updatedErrors });
    }
    this.setState({ username: e.target.value });
  };
  refresh = () => {
    this.setState({
      username: '',
      fetched: false,
      user: {},
      errors: {}
    });
  };
  getUserInformation = () => {
    /*
      TODO: fetch a user from the GitHub API

      TIPS:
       1) The Fetch API provides an interface for
         fetching resources (including across the network).
       2) Maybe you want to update the state here.
    */
    const errors = {};
    if (this.state.username.length < 1 || this.state.username.length > 39) {
      errors.usernameError = 'Username must be between 1 and 39 characters';
      this.setState({ errors });
    } else {
      fetch(`http://api.github.com/users/${this.state.username}`).then(
        response => {
          if (response.status === 200) {
            response.json().then(data => {
              this.setState({ fetched: true, user: data, errors: {} });
            });
          } else {
            errors.responseError = response.statusText;
            this.setState({ errors });
          }
        }
      );
    }
  };

  render() {
    const { user, errors } = this.state;
    console.log(errors);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} alt="logo" className="mainLogo" />
          <h2>Welcome to GitHub Spy</h2>
        </div>
        <p className="App-intro mt-3 lead">
          If GitHub is prohibited in your country, you can type a GitHub
          username here and check all the repositories
        </p>
        <div className="App-intro container">
          <hr />
          <div className="col-6 mx-auto mb-3">
            <input
              onChange={this.onChange}
              type="text"
              className={classnames('form-control', {
                'is-invalid': errors.usernameError
              })}
              value={this.state.username}
              placeholder="Enter GitHub Username"
            />
            {errors.usernameError && (
              <div className="invalid-feedback">
                {errors.usernameError}
              </div>
            )}
            {errors.responseError && (
              <div className="alert alert-danger mt-2" role="alert">
                {this.state.errors.responseError}
              </div>
            )}
          </div>
          {!this.state.fetched ? (
            <button
              className="btn btn-primary"
              onClick={this.getUserInformation}
            >
              Show Repos
            </button>
          ) : (
            <button className="btn btn-primary" onClick={this.refresh}>
              Another One
            </button>
          )}
        </div>
        <UserInformation user={user} errors={errors} />
      </div>
    );
  }
}

export default App;
