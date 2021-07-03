import React from 'react';
import _ from 'lodash';

import { classNames, withPrefix } from '../utils';

export default class ImageSection extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const width = _.get(section, 'width', 'regular');
        const image = _.get(section, 'image');
        const imageAlt = _.get(section, 'image_alt', '');
        const caption = _.get(section, 'caption');

        return (
            <figure
                className={classNames('image-block', 'container', {
                    'container--md': width === 'regular',
                    'container--lg': width === 'wide'
                })}
            >
                {image && <img src={withPrefix(image)} alt={imageAlt} />}
                {caption && (
                    <figcaption className="image-block__caption">
                        {caption}
                    </figcaption>
                )}
            </figure>
        );
    }
}
