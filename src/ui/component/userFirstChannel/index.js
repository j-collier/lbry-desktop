import { connect } from 'react-redux';
import {
  selectUser,
  selectEmailToVerify,
  rewards as REWARD_TYPES,
  doClaimRewardType,
  makeSelectIsRewardClaimPending,
} from 'lbryinc';
import { doCreateChannel, selectCreatingChannel, selectMyChannelClaims } from 'lbry-redux';
import UserFirstChannel from './view';

const select = state => ({
  email: selectEmailToVerify(state),
  user: selectUser(state),
  channels: selectMyChannelClaims(state),
  creatingChannel: selectCreatingChannel(state),
  claimingReward: makeSelectIsRewardClaimPending()(state, { reward_type: REWARD_TYPES.EMAIL_PROVIDED }),
});

const perform = dispatch => ({
  createChannel: (name, amount) => dispatch(doCreateChannel(name, amount)),
  claimReward: cb =>
    dispatch(
      doClaimRewardType(REWARD_TYPES.EMAIL_PROVIDED, {
        notifyError: true,
        callback: cb,
      })
    ),
});

export default connect(
  select,
  perform
)(UserFirstChannel);
