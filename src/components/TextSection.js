import React from 'react';
import _ from 'lodash';

import { markdownify } from '../utils';

export default class TextSection extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const content = _.get(section, 'content');

        return (
            <div className="text-block container container--md">
                {markdownify(content)}
            </div>
        );
    }
}
