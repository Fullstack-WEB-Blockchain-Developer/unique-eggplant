import React from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';
import { classNames } from '../utils';

import BlogFeedItem from '../components/BlogFeedItem';

export default class Blog extends React.Component {
    render() {
        const data = _.get(this.props, 'data');
        const config = _.get(data, 'config');
        const page = _.get(this.props, 'page');
        const title = _.get(page, 'title');
        const subtitle = _.get(page, 'subtitle');
        const hideTitle = _.get(page, 'hide_title');
        const colNumber = _.get(page, 'col_number', 'three');
        const posts = _.orderBy(_.get(this.props, 'posts', []), 'date', 'desc');

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
                        <div className={`grid post-feed post-feed--col-${colNumber}`}>
                            {_.map(posts, (post, index) => (
                                <BlogFeedItem key={index} post={post} />
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}
