import React from 'react';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import '../users_list/users_list.css'

export default class UsersList extends React.Component {
  getActionButton(user, loggedUser) {
    const {followUser, unfollowUser} = this.props;

    const followed = loggedUser.followedUsers &&
      loggedUser.followedUsers.includes(user.id);

    return (
      followed
        ? <FlatButton label="Unfollow"
                      style={{
                        color: '#ff3838'
                      }}
                      onTouchTap={() => {
                        unfollowUser(user.id);
                      }}/>
        : <FlatButton label="Follow"
                      style={{
                        color: '#5cf751'
                      }}
                      onTouchTap={() => {
                        followUser(user.id);
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
              loggedUser.id !== user.id &&
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
