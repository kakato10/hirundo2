import React from 'react';
import NewPostForm from '../../containers/new_post_form/new_post_form';

export default class Feed extends React.Component {
  render() {
    return (
      <div className="feed">
        <NewPostForm/>
      </div>
    );
  }
}
