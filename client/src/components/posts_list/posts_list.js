import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import CommentsForm from '../../containers/comments_form/comments_form';

export default class PostsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postDetails: {
        showComments: false,
        postId: null,
      }
    };
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
    const {posts} = this.props;
    const loggedUserId = this.props.loggedUser._id;
    const {postDetails} = this.state;

    return (
      <div className="posts-list">
        {posts.map((post, index) => {
          const likesNumber = post.likes ? post.likes.length : 0;
          const liked = post.likes && post.likes.includes(loggedUserId);
          const renderLikeOrDislike = this.props.likePost && this.props.dislikePost;

          return (
            <Card
              key={index}
              style={{
                marginBottom: 20,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                marginTop: 20
              }}
              zDepth={3}>
              <CardHeader
                title={post.authorUsername}
                style={{
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  backgroundColor: '#00bcd4',
                }}
                titleColor="white"
                subtitleColor="white"
                titleStyle={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'white'
                }}
                subtitle={`${likesNumber} likes`}
              />
              <CardText
                expandable={false}
                style={{
                  wordWrap: 'break-word',
                  fontSize: 18
                }}>
                {post.content}
              </CardText>
              <Divider/>
              <CardActions>
                {renderLikeOrDislike && (liked
                  ? <FlatButton
                    label="Dislike"
                    onTouchTap={() => {
                      this.props.dislikePost(post._id);
                    }}
                    secondary={true}/>
                  : <FlatButton
                    label="Like"
                    onTouchTap={() => {
                      this.props.likePost(post._id);
                    }}
                    primary={true}/>)
                }
                <FlatButton
                  label="Comments"
                  onTouchTap={() => {
                    this.displayComments(post._id);
                  }}
                  primary={true}/>
              </CardActions>
            </Card>
          );
        })}
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

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  loggedUser: PropTypes.object.isRequired,
  likePost: PropTypes.func,
  dislikePost: PropTypes.func,
};
