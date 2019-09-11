// @flow
import React from 'react';
import { withRouter } from 'react-router';
import UserEmailNew from 'component/userEmailNew';
import UserEmailVerify from 'component/userEmailVerify';
import UserFirstChannel from 'component/userFirstChannel';
import UserVerify from 'component/userVerify';
import Spinner from 'component/spinner';

type Props = {
  user: ?User,
  email: ?string,
  fetchingChannels: boolean,
  channels: ?Array<string>,
};

function UserSignIn(props: Props) {
  const { email, user, channels, claimingReward, balance, fetchingChannels } = props;
  const hasVerifiedEmail = user && user.has_verified_email;
  const rewardsApproved = user && user.is_reward_approved;
  const channelCount = channels ? channels.length : 0;

  return (
    <section>
      {hasVerifiedEmail && channelCount > 0 && !rewardsApproved ? (
        <UserVerify />
      ) : (
        <div className="auth-wrapper">
          {!email && !hasVerifiedEmail && <UserEmailNew />}
          {email && !hasVerifiedEmail && <UserEmailVerify />}
          {hasVerifiedEmail && channelCount === 0 && (
            <React.Fragment>
              {!fetchingChannels && !claimingReward ? (
                <UserFirstChannel />
              ) : (
                <div className="main--empty">
                  <Spinner delayed />
                </div>
              )}
            </React.Fragment>
          )}
        </div>
      )}
    </section>
  );
}

export default withRouter(UserSignIn);
