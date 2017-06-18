import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import PropTypes from 'prop-types';

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
              this.postText = postText;
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

