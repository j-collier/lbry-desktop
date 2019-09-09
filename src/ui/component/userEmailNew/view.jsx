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
    <div>
      <h1 className="section__title--large">{__('Hello')}</h1>
      <p className="section__subtitle">{__('Create a new account or sign in.')}</p>
      <Form onSubmit={handleSubmit} className="section">
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
        <div className="card__actions">
          <Button button="primary" type="submit" label={__('Continue')} disabled={!newEmail || isPending} />
        </div>
      </Form>
    </div>
  );
}

export default UserEmailNew;
