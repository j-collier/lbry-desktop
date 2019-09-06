// @flow
import type { Node } from 'react';
import React from 'react';
import classnames from 'classnames';
import Icon from 'component/common/icon';

type Props = {
  title: string,
  subtitle: string | Node,
  body: string | Node,
  actions?: string | Node,
  icon?: string,
};

export default function Card(props: Props) {
  const { title, subtitle, body, actions, icon } = props;
  return (
    <section className={classnames('card')}>
      <div className="card__header">
        <div className="section__flex">
          {icon && <Icon sectionIcon icon={icon} />}
          <div>
            <h2 className="section__title">{title}</h2>
            <p className="section__subtitle">{subtitle}</p>
          </div>
        </div>
      </div>

      {body && <div className={classnames('card__body', { 'card__body--with-icon': icon })}>{body}</div>}
      {actions && <div className="card__main-actions">{actions}</div>}
    </section>
  );
}
