import { connect } from 'react-redux';
import { doSignOut } from 'redux/actions/app';
import UserEmailResetButton from './view';

const select = state => ({});

const perform = dispatch => ({
  signOut: () => dispatch(doSignOut()),
});

export default connect(
  select,
  perform
)(UserEmailResetButton);
