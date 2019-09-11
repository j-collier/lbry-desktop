// @flow
import type { Node } from 'react';
import React, { Fragment } from 'react';
import classnames from 'classnames';
import SideBar from 'component/sideBar';
import Header from 'component/header';

type Props = {
  children: Node | Array<Node>,
  className: ?string,
  fullscreen: boolean,
  authenticated: boolean,
};

function Page(props: Props) {
  const { children, className, fullscreen = false, authenticated } = props;
  const showSideBar = !fullscreen && (IS_WEB ? authenticated : true);

  return (
    <Fragment>
      <Header minimal={fullscreen} />
      <div className={classnames('main-wrapper__inner')}>
        <main className={classnames('main', className, { 'main--full-width': !showSideBar })}>{children}</main>
        {showSideBar && <SideBar />}
      </div>
    </Fragment>
  );
}

export default Page;
