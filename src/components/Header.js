import React from 'react';
import Router from 'next/router';
import _ from 'lodash';

import { Link, withPrefix, classNames, getPageUrl } from '../utils';
import Action from './Action';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handleRouteChange = this.handleRouteChange.bind(this);
        this.menuOpenRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize, true);
        Router.events.on('routeChangeStart', this.handleRouteChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize, true);
        Router.events.off('routeChangeStart', this.handleRouteChange);
    }

    handleWindowResize() {
        const menuOpenElm = _.get(this.menuOpenRef, 'current.offsetParent');
        if (menuOpenElm === null) {
            document.body.classList.remove('js-nav-open');
        }
    }

    handleRouteChange() {
        document.body.classList.remove('js-nav-open');
    }

    handleMenuToggle(event) {
        event.preventDefault();
        document.body.classList.toggle('js-nav-open');
    }

    render() {
        const page = _.get(this.props, 'page');
        const pageUrl = _.trim(getPageUrl(page), '/');
        const config = _.get(this.props, 'config');
        const header = _.get(config, 'header');
        const logo = _.get(header, 'logo_img');
        const logoAlt = _.get(header, 'logo_img_alt', '');
        const title = _.get(header, 'title');
        const hasNav = _.get(header, 'has_nav');
        const navLinks = _.get(header, 'nav_links');

        return (
            <header id="masthead" className="site-header container">
                <nav className="navbar" aria-label="Main Navigation">
                    {logo ? (
                        <div className="navbar__logo">
                            <Link href={withPrefix('/')}><img src={withPrefix(logo)} alt={logoAlt} /></Link>
                        </div>
                    ) : (
                        <div className="navbar__title">
                            <Link href={withPrefix('/')}>{title}</Link>
                        </div>
                    )}
                    {hasNav && !_.isEmpty(navLinks) && (
                        <React.Fragment>
                            <button id="navbar__open" className="navbar__toggle" ref={this.menuOpenRef} onClick={this.handleMenuToggle.bind(this)}>
                                <span className="screen-reader-text">Open Menu</span>
                                <span className="icon-menu" aria-hidden="true" />
                            </button>
                            <div className="navbar__menu-container">
                                <div className="navbar__scroller">
                                    <button id="navbar__close" className="navbar__toggle" onClick={this.handleMenuToggle.bind(this)}>
                                        <span className="screen-reader-text">Close Menu</span>
                                        <span className="icon-close" aria-hidden="true" />
                                    </button>
                                    <ul className="navbar__menu menu">
                                        {_.map(navLinks, (action, index) => {
                                            const actionUrl = _.trim(_.get(action, 'url'), '/');
                                            const actionStyle = _.get(action, 'style', 'link');
                                            return (
                                                <li
                                                    key={index}
                                                    className={classNames('menu__item', {
                                                        'menu__item--current': pageUrl === actionUrl,
                                                        'menu__item--button': actionStyle !== 'link'
                                                    })}
                                                >
                                                    <Action action={action} />
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                </nav>
            </header>
        );
    }
}
