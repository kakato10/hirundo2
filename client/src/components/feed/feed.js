import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import NewPostForm from '../../containers/new_post_form/new_post_form';

import './feed.css'

export default class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showUsersList: false
    };

    this.props.loadPosts();
  }

  loadUsers() {
    this.props.loadUsers();
      this.setState({
        showUsersList: true
      });
  }

  getActionButton(user, loggedUser) {
    const followed = loggedUser.followedUsers &&
      loggedUser.followedUsers.includes(user.id);

    return (
      followed
          ? <FlatButton label="Unfollow"
                        style={{
                          color: '#ff3838'
                        }}
                        onTouchTap={() => {
                          this.props.unfollowUser(user.id);
                        }}/>
        : <FlatButton label="Follow"
                      style={{
                        color: '#5cf751'
                      }}
                      onTouchTap={() => {
                        this.props.followUser(user.id);
                      }}/>
    );
  }

  renderPosts() {
    const {posts} = this.props;

    return (
      <div className="posts-list">
        {posts.map((post, index) => {
          return <p key={index}>{post.content}</p>;
        })}
      </div>
    )
  }

  renderUsers() {
    const {users, loggedUser} = this.props;

    return (
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
                    {this.getActionButton(user, loggedUser)}
                  </div>
                </ListItem>
                <Divider/>
              </div>
          )
        })}
      </List>
    )
  }

  render() {
    const {showUsersList} = this.state;

    return (
      <div className="feed">
        <NewPostForm/>
        <div>
          {this.renderPosts()}
        </div>
        <RaisedButton
          label="Users list"
          primary={true}
          onTouchTap={() => {
            this.loadUsers();
          }}/>
        <Dialog
          title="Users list"
          open={showUsersList}
          onRequestClose={() => {
            this.setState({
              showUsersList: false
            });
          }}
          autoScrollBodyContent={true}>
          {this.renderUsers()}
        </Dialog>
      </div>
    );
  }
}
