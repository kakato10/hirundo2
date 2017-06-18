import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import PropTypes from 'prop-types';

import NewPostForm from '../../containers/new_post_form/new_post_form';
import CommentsForm from '../../containers/comments_form/comments_form';
import UsersList from '../users_list/users_list';
import PostsList from '../posts_list/posts_list';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showUsersList: false,
      postDetails: {
        showComments: false,
        postId: null,
      }
    };

    this.props.loadPosts();
  }

  loadUsers() {
    this.props.loadUsers();
    this.setState({
      showUsersList: true
    });
  }

  displayComments(postId) {
    this.setState({
      postDetails: {
        showComments: true,
        postId: postId,
      }
    });
  }

  render() {
    const {showUsersList, postDetails} = this.state;
    const {posts, users, loggedUser,
      followUser, unfollowUser, likePost, dislikePost} = this.props;

    return (
      <div className="feed">
        <NewPostForm/>
        <RaisedButton
          label="Show Users list"
          secondary={true}
          fullWidth
          onTouchTap={() => {
            this.loadUsers();
          }}/>
        <PostsList
          posts={posts}
          loggedUser={loggedUser}
          likePost={likePost}
          dislikePost={dislikePost}
          displayComments={(postId) => {
            this.displayComments(postId);
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
        <Dialog
          title="Comments"
          open={postDetails.showComments}
          onRequestClose={() => {
            this.setState({
              postDetails: {
                showComments: false,
                postId: null,
              }
            });
          }}
          autoScrollBodyContent={true}>
          <CommentsForm
            postId={postDetails.postId}/>
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
