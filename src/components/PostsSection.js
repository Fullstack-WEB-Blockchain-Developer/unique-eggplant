import React from 'react';
import _ from 'lodash';

import BlogFeedItem from './BlogFeedItem';
import CtaButtons from './CtaButtons';

export default class PostsSection extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id');
        const title = _.get(section, 'title');
        const subtitle = _.get(section, 'subtitle');
        const actions = _.get(section, 'actions');
        const colNumber = _.get(page, 'col_number', 'three');
        const posts = _.orderBy(_.get(this.props, 'posts', []), 'date', 'desc');

        return (
            <section id={sectionId} className="section section--posts">
                <div className="container container--lg">
                    {title && <h2 className="section__title line-top">{title}</h2>}
                    {subtitle && <p className="section__subtitle">{subtitle}</p>}
                    <div className={`grid post-feed post-feed--col-${colNumber}`}>
                        {_.map(posts, (post, index) => (
                            <BlogFeedItem key={index} post={post} />
                        ))}
                    </div>
                    {!_.isEmpty(actions) && (
                        <div className="section__actions button-group">
                            <CtaButtons actions={actions} />
                        </div>
                    )}
                </div>
            </section>
        );
    }
}
