// @flow
import React, { useState } from 'react';
import { isNameValid } from 'lbry-redux';
import Button from 'component/button';
import { Form, FormField } from 'component/common/form';

const DEFAULT_BID_FOR_FIRST_CHANNEL = 0.9;

type Props = {
  createChannel: (string, number) => void,
  claimReward: (() => void) => void,
  creatingChannel: boolean,
  claimingReward: boolean,
};

function UserFirstChannel(props: Props) {
  const { createChannel, claimReward, creatingChannel, claimingReward } = props;
  const [channel, setChannel] = useState('');
  const [nameError, setNameError] = useState();

  function handleCreateChannel() {
    claimReward(error => {
      // console.log('?', error);
      if (error) {
        // setError()
        // return;
      }

      createChannel(`@${channel}`, DEFAULT_BID_FOR_FIRST_CHANNEL);
    });
  }

  function handleChannelChange(e) {
    const { value } = e.target;
    setChannel(value);
    if (!isNameValid(value, false)) {
      setNameError(__('LBRY names cannot contain spaces or reserved symbols ($#@;/"<>%{}|^~[]`)'));
    } else {
      setNameError();
    }
  }

  return (
    <Form onSubmit={handleCreateChannel}>
      <h1 className="section__title--large">{__('Create A Channel')}</h1>
      <p className="section__subtitle">
        {__('Normally this would use LBRY credits, but we have your back for this first one.')}
      </p>
      <section className="section">
        <fieldset-group class="fieldset-group--smushed fieldset-group--disabled-prefix">
          <fieldset-section>
            <label htmlFor="auth_first_channel">
              {nameError ? <span className="error-text">{nameError}</span> : __('Your Channel')}
            </label>
            <div className="form-field__prefix">@</div>
          </fieldset-section>

          <FormField type="text" name="auth_first_channel" value={channel} onChange={handleChannelChange} />
        </fieldset-group>
        <div className="card__actions">
          <Button
            button="primary"
            type="submit"
            disabled={nameError || !channel || creatingChannel || claimingReward}
            label={creatingChannel || claimingReward ? __('Creating') : __('Create')}
          />
        </div>
      </section>
    </Form>
  );
}

export default UserFirstChannel;
