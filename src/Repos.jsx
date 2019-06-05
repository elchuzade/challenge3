import React from 'react';
import PropTypes from 'prop-types';

const Repos = props => (
  <div className="container mb-3">
    {props.repos.length > 0 && (
      <div className="row">
        <div className="col-12">
          <h4 className="text-center my-3">Check out my repos</h4>
        </div>
      </div>
    )}
    <div className="row">
      {props.repos.map(repo => (
        <div className="col-12" key={repo.name}>
          <a href={repo.html_url} target="_blank">
            <h4>{repo.name}</h4>
          </a>
          <p className="text-muted lead">
            {repo.description ? (
              repo.description
            ) : (
              <span>Description is not provided</span>
            )}
          </p>
        </div>
      ))}
    </div>
  </div>
);

Repos.propTypes = {
  repos: PropTypes.array.isRequired
};

export default Repos;
