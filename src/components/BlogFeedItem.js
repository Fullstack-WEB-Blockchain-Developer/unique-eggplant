import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { Link, withPrefix, getPageUrl } from '../utils';

export default class BlogFeedItem extends React.Component {
    render() {
        const post = _.get(this.props, 'post');
        const title = _.get(post, 'title');
        const thumbImage = _.get(post, 'thumb_image');
        const thumbImageAlt = _.get(post, 'thumb_image_alt', '');
        const excerpt = _.get(post, 'excerpt');
        const date = _.get(post, 'date');
        const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
        const formattedDate = moment(date).strftime('%B %d, %Y');
        const postUrl = getPageUrl(post, { withPrefix: true });

        return (
            <article className="cell post-card">
                {thumbImage && (
                    <Link className="post-card__image" href={postUrl}>
                        <img src={withPrefix(thumbImage)} alt={thumbImageAlt} />
                    </Link>
                )}
                <header className="post-card__header">
                    <h3 className="post-card__title"><Link href={postUrl}>{title}</Link></h3>
                    <div className="post-card__meta">
                        <time className="published" dateTime={dateTimeAttr}>{formattedDate}</time>
                    </div>
                </header>
                {excerpt && <p className="post-card__body">{excerpt}</p>}
            </article>
        );
    }
}
