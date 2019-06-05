import React, { Component } from 'react';
import './App.css';
import UserInformation from './UserInformation';
import Repos from './Repos';
import logo from '../public/spy.svg';
import classnames from 'classnames';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      user: {},
      errors: {},
      fetchedUser: false
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
      fetchedUser: false,
      user: {},
      repos: [],
      errors: {}
    });
  };
  getUserInformation = () => {
    const errors = {};
    const user = {};
    if (this.state.username.length < 1 || this.state.username.length > 39) {
      errors.usernameError = 'Username must be between 1 and 39 characters';
      this.setState({ errors });
    } else {
      // Fetch user data
      fetch(`http://api.github.com/users/${this.state.username}`).then(
        response => {
          if (response.status === 200) {
            response.json().then(data => {
              // Take only those fields that I need
              user.name = data.name;
              user.bio = data.bio;
              user.avatar_url = data.avatar_url;
              this.setState({ fetchedUser: true, user, errors: {} });
            });
          } else {
            errors.userError = response.statusText;
            this.setState({ errors });
          }
        }
      );
      console.log(this.state);
      // Fetch repos
      fetch(`http://api.github.com/users/${this.state.username}/repos`).then(
        response => {
          if (response.status === 200) {
            response.json().then(data => {
              // Decrease the response down to only the key value pairs that I need
              let slimData = data.map(({ name, description, html_url }) => ({
                name,
                description,
                html_url
              }));
              this.setState({ repos: slimData, errors: {} });
            });
          } else {
            errors.userError = response.statusText;
            this.setState({ errors });
          }
        }
      );
    }
  };

  render() {
    const { user, repos, errors } = this.state;
    return (
      <div className="container">
        <div className="App-header">
          <img src={logo} alt="logo" className="mainLogo" />
          <h2>Welcome to GitHub Spy</h2>
        </div>
        <p className="App-intro mt-3 lead">
          If GitHub is prohibited in your country, you can type a GitHub
          username here and check all the repositories
        </p>
        <div className="App-intro mb-3">
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
              <div className="invalid-feedback">{errors.usernameError}</div>
            )}
            {errors.reposError && (
              <div className="alert alert-danger mt-2" role="alert">
                {this.state.errors.reposError}
              </div>
            )}
          </div>
          {!this.state.fetchedUser ? (
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
        <hr />
        {!errors.userError && Object.keys(user).length > 0 && (
          <UserInformation user={user} />
        )}
        {!errors.reposError && repos && repos.length > 0 && (
          <Repos repos={repos} />
        )}
      </div>
    );
  }
}

export default App;
