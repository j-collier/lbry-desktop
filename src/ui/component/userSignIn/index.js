import { connect } from 'react-redux';
import {
  selectEmailToVerify,
  doUserResendVerificationEmail,
  doUserCheckEmailVerified,
  selectUser,
  doFetchAccessToken,
  selectAccessToken,
  makeSelectIsRewardClaimPending,
  rewards as REWARD_TYPES,
} from 'lbryinc';
import { selectMyChannelClaims, selectBalance, selectFetchingMyChannels } from 'lbry-redux';
import UserSignIn from './view';

const select = state => ({
  email: selectEmailToVerify(state),
  user: selectUser(state),
  accessToken: selectAccessToken(state),
  channels: selectMyChannelClaims(state),
  isClaimingReward: makeSelectIsRewardClaimPending(REWARD_TYPES.TYPE_CONFIRM_EMAIL),
  balance: selectBalance(state),
  fetchingChannels: selectFetchingMyChannels(state),
});

const perform = dispatch => ({});

export default connect(
  select,
  perform
)(UserSignIn);
