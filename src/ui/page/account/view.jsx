import React from 'react';
import RewardSummary from 'component/rewardSummary';
import RewardTotal from 'component/rewardTotal';
import Page from 'component/page';
import UserEmail from 'component/userEmail';
// import InvitePage from 'page/invite';
import InviteNew from 'component/inviteNew';
import InviteList from 'component/inviteList';

const AccountPage = () => (
  <Page>
    <div className="columns">
      <div>
        <RewardSummary />
        <RewardTotal />
      </div>
      <InviteNew />
    </div>
    <InviteList />
    <UserEmail />
  </Page>
);

export default AccountPage;
