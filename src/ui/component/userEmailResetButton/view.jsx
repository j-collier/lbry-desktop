// @flow
import React from 'react';
import Button from 'component/button';

type Props = {
  button: string,
  signOut: () => void,
};

function UserEmailResetButton(props: Props) {
  const { button = 'link', signOut } = props;

  return <Button button={button} label={__('Change')} onClick={signOut} />;
}

export default UserEmailResetButton;
