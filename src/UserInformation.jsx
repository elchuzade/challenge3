import React from 'react';
import PropTypes from 'prop-types';

const UserInformation = props => (
  <div className="container mb-3">
    <div className="row">
      {console.log(props.user)}
      <div className="col-3">
        <img src={props.user.avatar_url} alt="avatar" className="img-fluid" />
      </div>
      <div className="col-9">
        <div className="row">
          <div className="col-12">
            <a href={props.user.html_url} target="_blank">
              <h3>{props.user.name}</h3>
            </a>
          </div>
          <div className="col-12">
            <p className="lead">{props.user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

UserInformation.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserInformation;
