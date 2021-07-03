import React from 'react';
import _ from 'lodash';

import { htmlToReact } from '../utils';
import ActionLink from './ActionLink';
import Action from './Action';

export default class Footer extends React.Component {
    render() {
        const config = _.get(this.props, 'config');
        const footer = _.get(config, 'footer');
        const copyright = _.get(footer, 'content');
        const links = _.get(footer, 'links');
        const hasSocial = _.get(footer, 'has_social');
        const socialLinks = _.get(footer, 'social_links');

        return (
            <footer id="colophon" className="site-footer">
                <div className="container container--lg">
                    <div className="site-footer__inside">
                        <div className="site-footer__info">
                            {copyright && <span className="site-footer__copyright">{htmlToReact(copyright)}</span>}
                            {_.map(links, (action, index) => (
                                <ActionLink key={index} action={action} />
                            ))}
                        </div>
                        {hasSocial && !_.isEmpty(socialLinks) && (
                            <div className="site-footer__social">
                                {_.map(socialLinks, (action, index) => (
                                    <Action key={index} action={action} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </footer>
        );
    }
}
