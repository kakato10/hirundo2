import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

export default class CommentsList extends React.Component {

  render() {
    const {comments} = this.props;

    return (
      (
        <List>
          {comments && comments.map((comment, index) => {
            return (
              <div key={index}>
                <ListItem
                  disabled
                  primaryText={
                    <p style={{fontWeight : "bold"}}>
                      {comment.authorUsername}
                    </p>
                  }
                  secondaryText={
                    <p>
                      {comment.content}
                    </p>
                  }/>
                <Divider/>
              </div>
            );
          })}
        </List>
      )
    );
  }
}
