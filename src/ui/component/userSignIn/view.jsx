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
    <section className="auth-wrapper">
      {!email && !hasVerifiedEmail && (
        <div>
          <h1 className="card__title--large" style={{ marginTop: '5rem' }}>
            {__('Get Rockin')}
          </h1>
          <UserEmailNew />
        </div>
      )}
      {email && !hasVerifiedEmail && (
        <div>
          <h1 className="card__title--large">{__('We Sent You An Email')}</h1>
          {email && <UserEmailVerify />}
        </div>
      )}

      {hasVerifiedEmail && channelCount === 0 && <UserFirstChannel />}

      {hasVerifiedEmail && channelCount > 0 && !rewardsApproved && <UserVerify />}
    </section>
  );
}

export default withRouter(UserSignIn);
