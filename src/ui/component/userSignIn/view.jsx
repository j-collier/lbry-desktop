// @flow
import React from 'react';
import { withRouter } from 'react-router';
import UserEmailNew from 'component/userEmailNew';
import UserEmailVerify from 'component/userEmailVerify';
import UserFirstChannel from 'component/userFirstChannel';
import UserVerify from 'component/userVerify';

type Props = {
  user: ?User,
  email: ?string,
  channels: ?Array<string>,
};

function UserSignIn(props: Props) {
  const { email, user, channels } = props;
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
          {hasVerifiedEmail && channelCount === 0 && <UserFirstChannel />}
        </div>
      )}
    </section>
  );
}

export default withRouter(UserSignIn);
