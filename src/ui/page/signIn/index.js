import { connect } from 'react-redux';
import {
  selectEmailToVerify,
  selectUser,
  selectClaimedRewards,
  makeSelectIsRewardClaimPending,
  rewards as REWARD_TYPES,
} from 'lbryinc';
import { selectMyChannelClaims, selectBalance } from 'lbry-redux';
import SignUpPage from './view';

const select = state => ({
  email: selectEmailToVerify(state),
  user: selectUser(state),
  channels: selectMyChannelClaims(state),
  claimedRewards: selectClaimedRewards(state),
  isClaimingReward: makeSelectIsRewardClaimPending(REWARD_TYPES.TYPE_CONFIRM_EMAIL),
  balance: selectBalance(state),
});

export default connect(
  select,
  null
)(SignUpPage);
