import {connect} from 'react-redux';
import {loadStats} from '../../actions/stats';
import Stats from '../../components/stats/stats';

function mapStateToProps({stats}) {
  return {
    stats
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadStats: (theme) => {
      dispatch(loadStats(theme));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
