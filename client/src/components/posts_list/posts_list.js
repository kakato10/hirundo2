import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

export default class PostsList extends React.Component {
  render() {
    const {posts} = this.props;
    const loggedUserId = this.props.loggedUser.id;

    return (
      <div className="posts-list">
        {posts.map((post, index) => {
          const likesNumber = post.likes ? post.likes.length : 0;
          const liked = post.likes && post.likes.includes(loggedUserId);

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
                <FlatButton
                  label="Comments"
                  onTouchTap={() => {
                    this.props.displayComments(post.id);
                  }}
                  primary={true}/>
              </CardActions>
            </Card>
          );
        })}
      </div>
    );
  }
}

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  loggedUser: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
  displayComments: PropTypes.func.isRequired
};
