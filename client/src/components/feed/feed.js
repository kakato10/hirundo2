import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

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
              </CardActions>
            </Card>
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
        <RaisedButton
          label="Show Users list"
          secondary={true}
          fullWidth
          onTouchTap={() => {
            this.loadUsers();
          }}/>
        {this.renderPosts()}
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
