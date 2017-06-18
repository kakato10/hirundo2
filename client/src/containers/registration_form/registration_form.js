import {connect} from 'react-redux';
import {register} from '../../actions/auth';
import RegistrationForm from '../../components/registration_form/registration_form';

function mapDispatchToProps(dispatch) {
  return {
    register: (userData) => {
      dispatch(register(userData));
    }
  };
}

export default connect(null, mapDispatchToProps)(RegistrationForm);
