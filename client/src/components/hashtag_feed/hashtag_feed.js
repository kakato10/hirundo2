import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import PropTypes from 'prop-types';

import PostsList from '../posts_list/posts_list';
import Feed from "../feed/feed";

export default class HashtagFeed extends React.Component {
  constructor(props) {
    super(props);

    this.hashtag = null;
  }

  renderSearchField() {
    return (
      <Card
        zDepth={2}
        style={{
          marginBottom: 20
        }}>
        <CardHeader
          title="Search for a hashtag"
          titleStyle={{
            fontSize: 18,
            fontWeight: 'bold'
          }}/>
        <Divider/>
        <CardText>
          <TextField
            hintText="Enter hashtag"
            multiLine={true}
            rows={1}
            rowsMax={4}
            onChange={(e, hashtag) => {
              this.hashtag = hashtag;
            }}
            underlineShow={false}
            style={{
              marginLeft: 20,
              marginRight: 20
            }}
            fullWidth
          />
        </CardText>
        <CardActions>
          <FlatButton
            label="Search"
            secondary={true}
            fullWidth
            onTouchTap={() => {
              this.props.loadPostsByHashtag(this.hashtag);
            }}/>
        </CardActions>
      </Card>
    )
  }
  render() {
    const {posts, loggedUser, likePost, dislikePost} = this.props;

    return (
      <div className="feed">
        {this.renderSearchField()}
        <PostsList
          posts={posts}
          loggedUser={loggedUser}
          likePost={likePost}
          dislikePost={dislikePost}/>
      </div>
    );
  }
}

Feed.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  loggedUser: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  loadPostsByHashtag: PropTypes.func.isRequired,
  loadPosts: PropTypes.func.isRequired,
};
