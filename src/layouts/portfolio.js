import React from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';
import { classNames, getPageUrl, Link, withPrefix } from '../utils';

import PortfolioItem from '../components/PortfolioItem';

export default class Portfolio extends React.Component {
    renderProject(project, index) {
        const title = _.get(project, 'title');
        const subtitle = _.get(project, 'subtitle');
        const thumbImage = _.get(project, 'thumb_image');
        const thumbImageAlt = _.get(project, 'thumb_image_alt', '');
        const projectUrl = getPageUrl(project, { withPrefix: true });

        return (
            <article key={index} className="cell project-card">
                <Link href={projectUrl} className="project-card__link">
                    {thumbImage && (
                        <div className="project-card__image">
                            <img src={withPrefix(thumbImage)} alt={thumbImageAlt} />
                        </div>
                    )}
                    <header className="project-card__header">
                        <h2 className="project-card__title">{title}</h2>
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

    render() {
        const data = _.get(this.props, 'data');
        const config = _.get(data, 'config');
        const page = _.get(this.props, 'page');
        const title = _.get(page, 'title');
        const subtitle = _.get(page, 'subtitle');
        const hideTitle = _.get(page, 'hide_title');
        const layoutStyle = _.get(page, 'layout_style', 'mosaic');
        const projects = _.orderBy(_.get(this.props, 'projects', []), 'date', 'desc');

        return (
            <Layout page={page} config={config}>
                <header
                    className={classNames('section', 'section--header', {
                        'screen-reader-text': hideTitle
                    })}
                >
                    <div className="container container--lg">
                        <h1 className="section__title line-top">{title}</h1>
                        {subtitle && <p className="section__subtitle">{subtitle}</p>}
                    </div>
                </header>
                <div className="section section--portfolio">
                    <div className="container container--lg">
                        <div className={`grid portfolio-feed portfolio-feed--${layoutStyle}`}>
                            {_.map(projects, (project, index) => (
                                <PortfolioItem key={index} project={project} />
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}
