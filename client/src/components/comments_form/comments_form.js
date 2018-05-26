import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import CommentsList from "../comments_list/comments_list";

export default class CommentsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commentText: '',
    };
    props.loadComments(props.postId);
  }

  onCommentCreated() {
    const {createComment, postId} = this.props;
    const newCommentText = this.state.commentText;

    if (!newCommentText) {
      return;
    }

    this.inputFieldComment.input.value = '';

    this.setState({
      commentText: '',
    });

    return createComment({
      content: newCommentText,
      postId: postId,
    });
  }

  render() {
    return (
      <div className="comments-form">
        <Card
          className="new-comment"
          zDepth={2}
          style={{
            marginBottom: 20
          }}>
          <CardHeader
            title={i18n.post.comment.comment}
            titleStyle={{
              fontSize: 18,
              fontWeight: 'bold'
            }}
            style={{
              backgroundColor: window.themePalette.primary1Color,
            }}
            titleColor="white"/>
          <Divider/>
          <CardText>
            <TextField
              hintText={i18n.post.comment.placeholder}
              multiLine={true}
              rows={1}
              rowsMax={4}
              onChange={(e, newCommentText) => {
                this.setState({
                  commentText: newCommentText,
                });
              }}
              underlineShow={false}
              fullWidth
              ref={(node) => {
                this.inputFieldComment = node;
              }}
              value={this.state.commentText}
            />
          </CardText>
          <CardActions>
            <FlatButton
              label={i18n.post.comment.action}
              primary={true}
              onTouchTap={(postId) => {
                this.onCommentCreated(postId);
              }}/>
          </CardActions>
        </Card>
        <CommentsList
          comments={this.props.comments}/>
      </div>
    );
  }
}

