// @flow
import * as PAGES from 'constants/pages';
import * as ICONS from 'constants/icons';
import React from 'react';
import Button from 'component/button';
import Tag from 'component/tag';
import StickyBox from 'react-sticky-box/dist/esnext';
import 'css-doodle';

type Props = {
  subscriptions: Array<Subscription>,
  followedTags: Array<Tag>,
  email: ?string,
};

function SideBar(props: Props) {
  const { subscriptions, followedTags, prop } = props;
  function buildLink(path, label, icon, guide) {
    return {
      navigate: path ? `$/${path}` : '/',
      label,
      icon,
      guide,
    };
  }

  return IS_WEB && prop ? (
    <StickyBox offsetTop={100} offsetBottom={20}>
      <div className="card navigation--placeholder">
        <div className="wrap">
          <h2>LBRY</h2>

          <p>{__('The best decentralized content platform on the web.')}</p>
          <div className="card__actions">{/* <Button button="primary" label={__('Do Something')} /> */}</div>
        </div>
        <css-doodle>
          {` :doodle { 
                @grid: 200x1 / 60vmin;
                    overflow: hidden;
                    background: #271034;
                  }
                
                  background: @multi(20, (
                    linear-gradient(to left, #fff, transparent)
                    @r(100%) @r(100%) / @r(50%) @r(.5px, 2px)
                    no-repeat
                  ));
                
                  background-color: @p(#BFF4ED, #EF5A5A, #33b58f);
                  transform: scale(@r(.5, 1, .01)) rotate(-45deg);
                  @place-cell: @r(100%) @r(100%);
                  @size: @r(15%);
                
                  --f: @r(45%);
                  clip-path: polygon(
                    0 var(--f),
                    100% 50%,
                    0 calc(100% - var(--f)),
                    @r(20%, 90%) 50%,
                    0 var(--f)
                  );
                }
            `}
        </css-doodle>
      </div>
    </StickyBox>
  ) : (
    <StickyBox offsetTop={100} offsetBottom={20}>
      <nav className="navigation">
        <ul className="navigation-links">
          {[
            {
              ...buildLink(null, __('Home'), ICONS.HOME),
            },
            // @if TARGET='app'
            {
              ...buildLink(PAGES.LIBRARY, __('Library'), ICONS.LIBRARY),
            },
            // @endif
            {
              ...buildLink(PAGES.PUBLISHED, __('Publishes'), ICONS.PUBLISH),
            },
          ].map(linkProps => (
            <li key={linkProps.label}>
              <Button {...linkProps} className="navigation-link" activeClass="navigation-link--active" />
            </li>
          ))}
        </ul>

        <Button
          navigate={`/$/${PAGES.FOLLOWING}`}
          label={__('Customize')}
          icon={ICONS.EDIT}
          className="navigation-link"
          activeClass="navigation-link--active"
        />
        <ul className="navigation-links tags--vertical">
          {followedTags.map(({ name }, key) => (
            <li className="navigation-link__wrapper" key={name}>
              <Tag navigate={`/$/tags?t${name}`} name={name} />
            </li>
          ))}
        </ul>
        <ul className="navigation-links--small">
          {subscriptions.map(({ uri, channelName }, index) => (
            <li key={uri} className="navigation-link__wrapper">
              <Button
                navigate={uri}
                label={channelName}
                className="navigation-link"
                activeClass="navigation-link--active"
              />
            </li>
          ))}
        </ul>
      </nav>
    </StickyBox>
  );
}

export default SideBar;
