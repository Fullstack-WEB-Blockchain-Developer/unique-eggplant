import React from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';
import { withPrefix, markdownify } from '../utils';

export default class Page extends React.Component {
    render() {
        const data = _.get(this.props, 'data');
        const config = _.get(data, 'config');
        const page = _.get(this.props, 'page');
        const title = _.get(page, 'title');
        const subtitle = _.get(page, 'subtitle');
        const image = _.get(page, 'image');
        const imageAlt = _.get(page, 'image_alt', '');
        const markdownContent = _.get(page, 'markdown_content');

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
                    <div className="post__body text-block">
                        <div className="container container--md">
                            {markdownify(markdownContent)}
                        </div>
                    </div>
                </article>
            </Layout>
        );
    }
}
