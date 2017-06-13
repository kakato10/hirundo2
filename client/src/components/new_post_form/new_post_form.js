import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

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
        <h2>New post</h2>
        <TextField
          hintText="What's on your mind?"
          multiLine={true}
          rows={2}
          rowsMax={4}
          onChange={(e, postText) => {
            this.postText = postText;
          }}
        />
        <div>
          <FlatButton
            label="Post"
            primary={true}
            onTouchTap={() => {
              this.onPostClicked();
            }}/>
        </div>
      </div>
    );
  }
}

