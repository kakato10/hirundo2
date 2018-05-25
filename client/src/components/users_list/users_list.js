import React from 'react';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';

import '../users_list/users_list.css'

export default class UsersList extends React.Component {
  getActionButton(user, loggedUser) {
    const {followUser, unfollowUser} = this.props;

    const followed = loggedUser.followedUsers &&
      loggedUser.followedUsers.includes(user._id);

    return (
      followed
        ? <FlatButton label={i18n.usersList.unfollow}
                      style={{
                        color: '#ff3838'
                      }}
                      onTouchTap={() => {
                        unfollowUser(user._id);
                      }}/>
        : <FlatButton label={i18n.usersList.follow}
                      style={{
                        color: '#5cf751'
                      }}
                      onTouchTap={() => {
                        followUser(user._id);
                      }}/>
    );
  }

  render() {
    const {users, loggedUser} = this.props;

    return (
      (
        <List>
          {users && users.map((user, index) => {

            return (
              loggedUser._id !== user._id &&
              <div key={index}>
                <ListItem disabled>
                  <div className="list-item">
                    <div className="user-info">
                      <span>
                        {user.username}
                      </span>
                      <span className="email">({user.email})</span>
                    </div>
                    {
                      this.getActionButton(user, loggedUser)
                    }
                  </div>
                </ListItem>
                <Divider/>
              </div>
            );
          })}
        </List>
      )
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired
};
