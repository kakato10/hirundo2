import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import NewPostForm from '../../containers/new_post_form/new_post_form';
import UsersList from '../users_list/users_list';

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

  renderPosts() {
    const {posts} = this.props;
    const loggedUserId = this.props.loggedUser.id;

    return (
      <div className="posts-list">
        {posts.map((post, index) => {
          const likesNumber = post.likes ? post.likes.length : 0;
          const liked = post.likes && post.likes.includes(loggedUserId);

          return (
            <div key={index}>
              <p>{post.content}</p>
              <span>{likesNumber} likes</span>
              { liked
                ? <FlatButton
                  label="Dislike"
                  onTouchTap={() => {
                    this.props.dislikePost(post.id);
                  }}
                  secondary={true}/>
                : <FlatButton
                  label="Like"
                  onTouchTap={() => {
                    this.props.likePost(post.id);
                  }}
                  primary={true}/>
              }
            </div>
          );
        })}
      </div>
    )
  }

  render() {
    const {showUsersList} = this.state;
    const {users, loggedUser, followUser, unfollowUser} = this.props;

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
          <UsersList
            users={users}
            loggedUser={loggedUser}
            followUser={followUser}
            unfollowUser={unfollowUser}/>
        </Dialog>
      </div>
    );
  }
}
