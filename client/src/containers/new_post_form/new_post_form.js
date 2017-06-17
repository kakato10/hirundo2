import {connect} from 'react-redux';
import {createPost} from '../../actions/posts';
import NewPostForm from '../../components/new_post_form/new_post_form';

function mapStateToProps({auth}) {
  const {user} = auth;

  return {user};
}

function mapDispatchToProps(dispatch) {
  return {
    createPost: (postData) => {
      dispatch(createPost(postData));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPostForm);
