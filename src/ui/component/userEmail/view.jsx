// @flow
import type { Node } from 'react';
import React, { useEffect } from 'react';
import Button from 'component/button';
import { FormField } from 'component/common/form';
import UserEmailNew from 'component/userEmailNew';
import UserEmailVerify from 'component/userEmailVerify';
import Card from 'component/common/card';

type Props = {
  cancelButton: Node,
  email: string,
  resendVerificationEmail: string => void,
  checkEmailVerified: () => void,
  user: {
    has_verified_email: boolean,
  },
  fetchAccessToken: () => void,
  accessToken: string,
};

function UserEmail(props: Props) {
  const { email, user, accessToken, fetchAccessToken } = props;

  let isVerified = false;
  if (user) {
    isVerified = user.has_verified_email;
  }

  useEffect(() => {
    if (!accessToken) {
      fetchAccessToken();
    }
  }, [accessToken, fetchAccessToken]);

  return (
    <Card
      title={__('Email')}
      subtitle={
        <FormField
          type="text"
          className="form-field--copyable"
          readOnly
          label={
            <React.Fragment>
              {__('Your Email')}{' '}
              <Button
                button="link"
                label={__('Update mailing preferences')}
                href={`http://lbry.io/list/edit/${accessToken}`}
              />
            </React.Fragment>
          }
          value={email}
        />
      }
    />
    // <section className="card card--section">
    //   <React.Fragment>

    //     <p className="help">
    //       {`${__(
    //         'This information is disclosed only to LBRY, Inc. and not to the LBRY network. It is only required to save account information and earn rewards.'
    //       )} `}
    //     </p>
    //   </React.Fragment>
    // </section>
  );
}

export default UserEmail;
