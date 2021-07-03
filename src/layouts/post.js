import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { Layout } from '../components/index';
import { withPrefix, markdownify, getPageUrl } from '../utils';

import BlogFeedItem from '../components/BlogFeedItem';

export default class Post extends React.Component {
    renderPostNavLinks(post, index, posts, postCount, currentPostUrl) {
        const postUrl = getPageUrl(post);
        if (postUrl !== currentPostUrl) {
            return null;
        }
        const prevIndex = index - 1;
        const prevPost = (index !== 0) ? posts[prevIndex] : null;
        const nextIndex = index + 1;
        const nextPost = (index < postCount - 1) ? posts[nextIndex] : null;

        return (
            <div className="grid post-feed post-feed--col-two">
                {prevPost && <BlogFeedItem post={prevPost} />}
                {nextPost && <BlogFeedItem post={nextPost} />}
            </div>
        );
    }

    render() {
        const data = _.get(this.props, 'data');
        const config = _.get(data, 'config');
        const page = _.get(this.props, 'page');
        const title = _.get(page, 'title');
        const subtitle = _.get(page, 'subtitle');
        const image = _.get(page, 'image');
        const imageAlt = _.get(page, 'image_alt', '');
        const date = _.get(page, 'date');
        const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
        const formattedDate = moment(date).strftime('%A, %B %e, %Y');
        const markdownContent = _.get(page, 'markdown_content');
        const postUrl = getPageUrl(page);
        const posts = _.orderBy(_.get(this.props, 'posts', []), 'date', 'desc');
        const postCount = _.size(posts);

        return (
            <Layout page={page} config={config}>
                <article className="post">
                    <header className="post__header">
                        <div className="container container--md">
                            <h1 className="post__title line-top">{title}</h1>
                            {subtitle && (
                                <div className="post__subtitle">
                                    {subtitle}
                                </div>
                            )}
                        </div>
                    </header>
                    {image && (
                        <div className="post__image">
                            <div className="container container--lg">
                                <img src={withPrefix(image)} alt={imageAlt} />
                            </div>
                        </div>
                    )}
                    {markdownContent && (
                        <div className="post__body text-block">
                            <div className="container container--md">
                                {markdownify(markdownContent)}
                            </div>
                        </div>
                    )}
                    <footer className="post__meta">
                        <div className="container container--md">
                            Posted on <time className="published" dateTime={dateTimeAttr}>{formattedDate}</time>
                        </div>
                    </footer>
                </article>
                {(postCount > 1) && (
                    <nav className="section section--posts">
                        <div className="container container--lg">
                            <h2 className="section__title line-top">Read Next</h2>
                            {_.map(posts, (post, index) => (
                                <React.Fragment key={index}>
                                    {this.renderPostNavLinks(post, index, posts, postCount, postUrl)}
                                </React.Fragment>
                            ))}
                        </div>
                    </nav>
                )}
            </Layout>
        );
    }
}
