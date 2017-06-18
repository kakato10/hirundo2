import {connect} from 'react-redux';
import {createComment, loadComments} from '../../actions/comments';
import CommentsForm from '../../components/comments_form/comments_form';

function mapStateToProps({comments}) {
  return {
    comments,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createComment: (postId, commentData) => {
      dispatch(createComment(postId, commentData));
    },

    loadComments: (postId) => {
      return dispatch(loadComments(postId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsForm);
