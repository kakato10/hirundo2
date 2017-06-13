import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

export default class NewPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.postText = null;
  }

  onPostClicked() {
    const {createPost, user} = this.props;
    const postText = this.postText;

    return createPost({
      content: postText,
      authorId: user.id,
      authorUsername: user.username
    });
  }

  render() {
    return (
      <div className="new-post-form">
        <Paper zDepth={2}>
        <h2>What's on your mind?</h2>
        <Divider/>
        <TextField
          hintText="What's on your mind?"
          multiLine={true}
          rows={1}
          rowsMax={4}
          onChange={(e, postText) => {
            this.postText = postText;
          }}
          underlineShow={false}
          style={{
            marginLeft: 20,
            marginRight: 20
          }}
          fullWidth
        />
        <Divider/>
        <FlatButton
          label="Post"
          primary={true}
          onTouchTap={() => {
            this.onPostClicked();
          }}/>
        </Paper>
      </div>
    );
  }
}

