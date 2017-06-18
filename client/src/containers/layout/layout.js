import {connect} from 'react-redux';
import Layout from '../../components/layout/layout';

function mapStateToProps({auth}) {
  return {
    user: auth.user
  };
}

export default connect(mapStateToProps)(Layout);
