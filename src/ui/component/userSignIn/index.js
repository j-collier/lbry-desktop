import { connect } from 'react-redux';
import {
  selectEmailToVerify,
  doUserResendVerificationEmail,
  doUserCheckEmailVerified,
  selectUser,
  doFetchAccessToken,
  selectAccessToken,
} from 'lbryinc';
import { selectMyChannelClaims } from 'lbry-redux';
import UserSignUp from './view';

const select = state => ({
  email: selectEmailToVerify(state),
  user: selectUser(state),
  accessToken: selectAccessToken(state),
  channels: selectMyChannelClaims(state),
});

const perform = dispatch => ({
  resendVerificationEmail: email => dispatch(doUserResendVerificationEmail(email)),
  checkEmailVerified: () => dispatch(doUserCheckEmailVerified()),
  fetchAccessToken: () => dispatch(doFetchAccessToken()),
});

export default connect(
  select,
  perform
)(UserSignUp);
