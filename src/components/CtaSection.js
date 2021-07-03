import React from 'react';
import _ from 'lodash';

import { classNames, withPrefix, markdownify } from '../utils';
import CtaButtons from './CtaButtons';

export default class CtaSection extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id');
        const backgroundColor = _.get(section, 'bg_color', 'none');
        const title = _.get(section, 'title');
        const content = _.get(section, 'content');
        const actions = _.get(section, 'actions');
        const image = _.get(section, 'image');
        const imageAlt = _.get(section, 'image_alt', '');

        return (
            <section id={sectionId} className="section section--cta">
                <div className="container container--lg">
                    <div className={classNames({ 'section__bg': backgroundColor !== 'none' })}>
                        <div className={classNames({ 'grid': image })}>
                            {image && (
                                <div className="section__image cell">
                                    <img src={withPrefix(image)} alt={imageAlt} />
                                </div>
                            )}
                            <div className={classNames('section__content', { 'cell': image })}>
                                {title && <h2 className="section__title">{title}</h2>}
                                {content && (
                                    <div className="section__body text-block">
                                        {markdownify(content)}
                                    </div>
                                )}
                                {!_.isEmpty(actions) && (
                                    <div className="section__actions button-group">
                                        <CtaButtons actions={actions} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
