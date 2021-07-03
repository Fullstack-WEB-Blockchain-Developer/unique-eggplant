import React from 'react';
import _ from 'lodash';

import { Link, withPrefix, getPageUrl } from '../utils';

export default class PortfolioItem extends React.Component {
    render() {
        const project = _.get(this.props, 'project');
        const title = _.get(project, 'title');
        const subtitle = _.get(project, 'subtitle');
        const thumbImage = _.get(project, 'thumb_image');
        const thumbImageAlt = _.get(project, 'thumb_image_alt', '');
        const projectUrl = getPageUrl(project, { withPrefix: true });


        return (
            <article className="cell project-card">
                <Link href={projectUrl} className="project-card__link">
                    {thumbImage && (
                        <div className="project-card__image">
                            <img src={withPrefix(thumbImage)} alt={thumbImageAlt} />
                        </div>
                    )}
                    <header className="project-card__header">
                        <h3 className="project-card__title">{title}</h3>
                        {subtitle && (
                            <div className="project-card__subtitle">
                                {subtitle}
                            </div>
                        )}
                    </header>
                </Link>
            </article>
        );
    }
}
