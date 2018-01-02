import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import PropTypes from 'prop-types';

export default class NewPostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postText: ''
    };
  }

  getHashTags(content) {
    const words = content.split(' ');

    return words.filter(word => {
      return word[0] === '#';
    }).map(hashtag => {
      return hashtag.slice(1);
    });
  }

  onPostClicked() {
    const {createPost, user} = this.props;
    const postText = this.state.postText;

    this._textField.input.value = '';

    this.setState({
      postText: ''
    });

    return createPost({
      content: postText,
      authorId: user._id,
      authorUsername: user.username,
      hashtags: this.getHashTags(postText)
    });
  }

  render() {
    return (
      <Card
        className="new-post-form"
        zDepth={2}
        style={{
          marginBottom: 20
        }}>
        <CardHeader
          title="What's on your mind?"
          titleStyle={{
            fontSize: 18,
            fontWeight: 'bold'
          }}/>
        <Divider/>
        <CardText>
          <TextField
            hintText="Type here"
            multiLine={true}
            rows={1}
            rowsMax={4}
            onChange={(e, postText) => {
              this.setState({
                postText: postText
              });
            }}
            underlineShow={false}
            style={{
              marginLeft: 20,
              marginRight: 20
            }}
            fullWidth
            ref={(node) => {
              this._textField = node;
            }}
            value={this.state.postText}
          />
        </CardText>
        <CardActions>
          <FlatButton
            label="Post"
            primary={true}
            onTouchTap={() => {
              this.onPostClicked();
            }}/>
        </CardActions>
      </Card>
    );
  }
}

NewPostForm.propTypes = {
  user: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired,
};

