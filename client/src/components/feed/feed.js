import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import PropTypes from 'prop-types';

import NewPostForm from '../../containers/new_post_form/new_post_form';
import UsersList from '../users_list/users_list';
import PostsList from '../posts_list/posts_list';

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

  render() {
    const {showUsersList} = this.state;
    const {posts, users, loggedUser,
      followUser, unfollowUser, likePost, dislikePost} = this.props;

    return (
      <div className="feed">
        <NewPostForm/>
        <RaisedButton
          label={i18n.usersListButton}
          secondary={true}
          fullWidth
          onTouchTap={() => {
            this.loadUsers();
          }}/>
        <PostsList
          posts={posts}
          loggedUser={loggedUser}
          likePost={likePost}
          dislikePost={dislikePost}/>
        <Dialog
          title={i18n.usersList.label}
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

Feed.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  loggedUser: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
  loadPosts: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
};
