import React from 'react';
import _ from 'lodash';

import { markdownify, withPrefix } from '../utils';

export default class ContentSection extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id');
        const title = _.get(section, 'title');
        const subtitle = _.get(section, 'subtitle');
        const image = _.get(section, 'image');
        const imageAlt = _.get(section, 'image_alt', '');
        const content = _.get(section, 'content');

        return (
            <section id={sectionId} className="section section--text">
                <div className="container container--lg">
                    {title && <h2 className="section__title line-top">{title}</h2>}
                    {subtitle && <p className="section__subtitle">{subtitle}</p>}
                    {content && (
                        <div className="section__body text-block">
                            {markdownify(content)}
                        </div>
                    )}
                    {image && (
                        <figure className="section__image">
                            <img src={withPrefix(image)} alt={imageAlt} />
                        </figure>
                    )}
                </div>
            </section>
        );
    }
}
