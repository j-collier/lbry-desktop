// @flow
import React from 'react';
import UserSignIn from 'component/userSignIn';
import Page from 'component/page';

type Props = {
  user: ?User,
  channels: ?Array<ChannelClaim>,
  location: { search: string },
  history: { replace: string => void },
};

export default function SignInPage(props: Props) {
  const { user, channels, location, history } = props;
  const { search } = location;
  const urlParams = new URLSearchParams(search);
  const redirect = urlParams.get('redirect');
  const rewardsApproved = user && user.is_reward_approved;
  const channelCount = channels ? channels.length : 0;

  if (rewardsApproved && channelCount > 0) {
    history.replace(redirect || '/');
  }

  return (
    <Page fullscreen className="main--auth-page">
      <UserSignIn />
    </Page>
  );
}
