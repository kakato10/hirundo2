import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
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
        <h2>What do you think?</h2>
        <Divider/>
        <TextField
          hintText="What do you think?"
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
        <Divider/>
        <FlatButton
          label="Comment"
          primary={true}
          onTouchTap={(postId) => {
            this.onCommentCreated(postId);
          }}/>
        <Divider/>
        <CommentsList
          comments={this.props.comments}/>
      </div>
    );
  }
}

