// @flow
import React from 'react';
import UserSignIn from 'component/userSignIn';
import Page from 'component/page';
import { rewards } from 'lbryinc';
import { DEFAULT_BID_FOR_FIRST_CHANNEL } from 'component/userFirstChannel/view';

type Props = {
  user: ?User,
  channels: ?Array<ChannelClaim>,
  location: { search: string },
  history: { replace: string => void },
  claimedRewards: Array<Reward>,
};

export default function SignInPage(props: Props) {
  const { user, channels, location, history, claimedRewards, balance } = props;
  const { search } = location;
  const urlParams = new URLSearchParams(search);
  const redirect = urlParams.get('redirect');
  const rewardsApproved = user && user.is_reward_approved;
  const channelCount = channels ? channels.length : 0;

  const hasClaimedEmailAward = claimedRewards.some(reward => reward.reward_type === rewards.TYPE_CONFIRM_EMAIL);

  if (
    rewardsApproved &&
    hasClaimedEmailAward &&
    (channelCount > 0 || (balance && balance > 0 && balance < DEFAULT_BID_FOR_FIRST_CHANNEL))
  ) {
    history.replace(redirect || '/');
  }

  return (
    <Page fullscreen className="main--auth-page">
      <UserSignIn />
    </Page>
  );
}
