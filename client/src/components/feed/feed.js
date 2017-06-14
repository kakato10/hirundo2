import React from 'react';
import NewPostForm from '../../containers/new_post_form/new_post_form';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showUsersList: false
    };
  }

  loadUsers() {
    this.props.loadUsers();
      this.setState({
        showUsersList: true
      });
  }

  renderUsers() {
    const {users, loggedUser} = this.props;

    return (
      <List>
        {users && users.map((user, index) => (
          loggedUser.id !== user.id && <ListItem
            key={index}
            primaryText={user.username}
            secondaryText={user.email}/>
        ))}
      </List>
    )
  }

  render() {
    const {showUsersList} = this.state;

    return (
      <div className="feed">
        <NewPostForm/>
        <RaisedButton
          label="Users list"
          primary={true}
          onTouchTap={() => {
            this.loadUsers();
          }}/>
        <Dialog
          title="Users list"
          open={showUsersList}
          onRequestClose={() => {
            this.setState({
              showUsersList: false
            });
          }}
          autoScrollBodyContent={true}>
          {this.renderUsers()}
        </Dialog>
      </div>
    );
  }
}
