import React from 'react';
import _ from 'lodash';

import { withPrefix, markdownify } from '../utils';
import CtaButtons from './CtaButtons';

export default class GridSection extends React.Component {
    renderGridItem(gridItem, index) {
        const title = _.get(gridItem, 'title');
        const subtitle = _.get(gridItem, 'subtitle');
        const content = _.get(gridItem, 'content');
        const image = _.get(gridItem, 'image');
        const imageAlt = _.get(gridItem, 'image_alt', '');
        const actions = _.get(gridItem, 'actions');

        return (
            <div key={index} className="cell card">
                {image && (
                    <div className="card__image">
                        <img src={withPrefix(image)} alt={imageAlt} />
                    </div>
                )}
                {title && <h3 className="card__title">{title}</h3>}
                {subtitle && <div className="card__subtitle">{subtitle}</div>}
                {content && (
                    <div className="card__body">
                        {markdownify(content)}
                    </div>
                )}
                {!_.isEmpty(actions) && (
                    <div className="card__actions button-group">
                        <CtaButtons actions={actions} />
                    </div>
                )}
            </div>
        );
    }

    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id');
        const title = _.get(section, 'title');
        const subtitle = _.get(section, 'subtitle');
        const gridItems = _.get(section, 'grid_items');
        const colNumber = _.get(section, 'col_number', 'three');

        return (
            <section id={sectionId} className="section section--grid">
                <div className="container container--lg">
                    {title && <h2 className="section__title line-top">{title}</h2>}
                    {subtitle && <p className="section__subtitle">{subtitle}</p>}
                    {!_.isEmpty(gridItems) && (
                        <div className={`grid grid--col-${colNumber}`}>
                            {_.map(gridItems, (gridItem, index) => this.renderGridItem(gridItem, index))}
                        </div>
                    )}
                </div>
            </section>
        );
    }
}
