import React from 'react';
import PropTypes from 'prop-types';

import PostsList from '../posts_list/posts_list';

export default class MyPosts extends React.Component {
  constructor(props) {
    super(props);

    props.loadPostsOfCurrentUser();
  }

  render() {
    const {posts, loggedUser} = this.props;

    return (
      <PostsList
        posts={posts}
        loggedUser={loggedUser}/>
    );
  }
}

MyPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  loggedUser: PropTypes.object.isRequired,
  loadPostsOfCurrentUser: PropTypes.func.isRequired,
};
