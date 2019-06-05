import React, { Component } from 'react';
import './App.css';
import UserInformation from './UserInformation';
import logo from '../public/spy.svg';
import classnames from 'classnames';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  };
  getUserInformation = () => {
    /*
      TODO: fetch a user from the GitHub API

      TIPS:
       1) The Fetch API provides an interface for
         fetching resources (including across the network).
       2) Maybe you want to update the state here.
    */
    const name = this.refs.name.value;
    const errors = {};
    if (name.length < 1 || name.length > 39) {
      errors.usernameError = 'Username must be between 1 and 39 characters';
      this.setState({ errors });
    } else {
      fetch(`http://api.github.com/users/${name}`).then(response => {
        if (response.status === 200) {
          response.json().then(data => {
            this.setState({ fetched: true, user: data, errors: {} });
          });
        } else {
          this.setState({ errors });
          errors.responseError = response.statusText;
        }
      });
    }
  };

  render() {
    const { user, errors } = this.state;
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
              ref="name"
              placeholder="Enter GitHub Username"
            />
            {this.state.errors.usernameError && (
              <div className="invalid-feedback">
                {this.state.errors.usernameError}
              </div>
            )}
          </div>
          <button className="btn btn-primary" onClick={this.getUserInformation}>
            Show Repos
          </button>
        </div>
        <UserInformation user={user} errors={errors} />
      </div>
    );
  }
}

export default App;
