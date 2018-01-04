import {connect} from 'react-redux';
import {changeTheme} from '../../actions/settings';
import Settings from '../../components/settings/settings';

function mapStateToProps({settings}) {
  return {
    settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeTheme: (theme) => {
      dispatch(changeTheme(theme));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
