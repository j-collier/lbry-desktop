// @flow
import type { Node } from 'react';
import * as ICONS from 'constants/icons';
import React, { Fragment } from 'react';
import classnames from 'classnames';
import SideBar from 'component/sideBar';
import Header from 'component/header';
import Button from 'component/button';

type Props = {
  children: Node | Array<Node>,
  className: ?string,
  fullscreen: boolean,
};

function Page(props: Props) {
  const { children, className, fullscreen = false } = props;

  return (
    <Fragment>
      <Header minimal={fullscreen} />
      <div className={classnames('main-wrapper__inner')}>
        <main className={classnames('main', className)}>{children}</main>
        {!fullscreen && <SideBar />}
      </div>
    </Fragment>
  );
}

export default Page;
