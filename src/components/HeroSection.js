import React from 'react';
import _ from 'lodash';

import { markdownify } from '../utils';
import CtaButtons from './CtaButtons';

export default class HeroSection extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id');
        const title = _.get(section, 'title');
        const content = _.get(section, 'content');
        const actions = _.get(section, 'actions');

        return (
            <section id={sectionId} className="hero">
                <div className="container container--lg">
                    {title && <h1 className="hero__title">{title}</h1>}
                    {content && (
                        <div className="hero__body text-block">
                            {markdownify(content)}
                        </div>
                    )}
                    {!_.isEmpty(actions) && (
                        <div className="hero__actions button-group">
                            <CtaButtons actions={actions} />
                        </div>
                    )}
                </div>
            </section>
        );
    }
}
