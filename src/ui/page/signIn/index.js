import { connect } from 'react-redux';
import { selectEmailToVerify, selectUser, selectClaimedRewards } from 'lbryinc';
import { selectMyChannelClaims } from 'lbry-redux';
import SignUpPage from './view';

const select = state => ({
  email: selectEmailToVerify(state),
  user: selectUser(state),
  channels: selectMyChannelClaims(state),
  claimedRewards: selectClaimedRewards(state),
});

export default connect(
  select,
  null
)(SignUpPage);
