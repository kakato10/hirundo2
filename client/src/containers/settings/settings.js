import {connect} from 'react-redux';
import {changeSettings} from '../../actions/settings';
import Settings from '../../components/settings/settings';

function mapStateToProps({settings}) {
  return {
    settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSettings: settings => {
      dispatch(changeSettings(settings));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
