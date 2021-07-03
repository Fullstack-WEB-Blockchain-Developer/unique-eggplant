import React from 'react';
import _ from 'lodash';

import { withPrefix } from '../utils';

export default class TestimonialsSection extends React.Component {
    renderTestimonial(testimonial) {
        const content = _.get(testimonial, 'content');
        const avatar = _.get(testimonial, 'avatar');
        const avatarAlt = _.get(testimonial, 'avatar_alt', '');
        const author = _.get(testimonial, 'author');
        const position = _.get(testimonial, 'position');

        return (
            <blockquote className="testimonial">
                <p className="testimonial__content">{content}</p>
                <footer className="testimonial__footer">
                    {avatar && <img className="testimonial__avatar" src={withPrefix(avatar)} alt={avatarAlt} />}
                    <div className="testimonial__details">
                        <div className="testimonial__author">
                            {author}
                        </div>
                        {position && (
                            <div className="testimonial__position">
                                {position}
                            </div>
                        )}
                    </div>
                </footer>
            </blockquote>
        );
    }

    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id');
        const title = _.get(section, 'title');
        const subtitle = _.get(section, 'subtitle');
        const testimonials = _.get(section, 'testimonials');

        return (
            <section id={sectionId} className="section section--testimonials">
                <div className="container container--lg">
                    {title && <h2 className="section__title line-top">{title}</h2>}
                    {subtitle && <p className="section__subtitle">{subtitle}</p>}
                    {!_.isEmpty(testimonials) && (
                        <div className="grid">
                            {_.map(testimonials, (testimonial, index) => (
                                <div key={index} className="cell">
                                    {this.renderTestimonial(testimonial)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        );
    }
}
