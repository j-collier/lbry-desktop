// @flow
import React, { useState } from 'react';
import { FormField, Form } from 'component/common/form';
import Button from 'component/button';
import { Lbryio } from 'lbryinc';
import analytics from 'analytics';

type Props = {
  errorMessage: ?string,
  isPending: boolean,
  addUserEmail: string => void,
};

function UserEmailNew(props: Props) {
  const { errorMessage, isPending, addUserEmail } = props;
  const [newEmail, setEmail] = useState('');

  function handleSubmit() {
    addUserEmail(newEmail);
    analytics.emailProvidedEvent();

    // @if TARGET='web'
    Lbryio.call('user_tag', 'edit', { add: 'lbrytv' });
    // @endif
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormField
        autoFocus
        placeholder={__('hotstuff_96@hotmail.com')}
        type="email"
        id="sign_up_email"
        label={__('Email')}
        value={newEmail}
        error={errorMessage}
        onChange={e => setEmail(e.target.value)}
      />
      <Button button="primary" type="submit" label={__('Continue')} disabled={isPending} />
    </Form>
  );
}

export default UserEmailNew;
