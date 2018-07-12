'use strict';
const PropTypes = require('prop-types');
const React = require('react');
const ReactRouter = require('react-router-dom');
const ClassNames = require('classnames');

const Link = ReactRouter.Link;
const propTypes = {
    location: PropTypes.object
};

class Navbar extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            navBarOpen: false
        };
    }

    componentWillReceiveProps() {

        this.setState({ navBarOpen: false });
    }

    classForPath(pathPattern) {

        return ClassNames({
            active: this.props.location.pathname.match(pathPattern),
            'nav-item': true
        });
    }

    toggleMenu() {

        this.setState({ navBarOpen: !this.state.navBarOpen });
    }

    render() {

        const navBarCollapse = ClassNames({
            'navbar-collapse': true,
            collapse: !this.state.navBarOpen
        });

        return (

            <div className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/admin">
                            <img
                                className="navbar-logo"
                                src="/public/media/logo-square-inverse.png"
                            />
                            <span className="navbar-brand-label">Aqua</span>
                        </Link>
                        <button
                            className="navbar-toggler collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarToggler"
                            aria-controls="navbarToggler"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={this.toggleMenu.bind(this)}
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                    </div>
                    <div className={navBarCollapse}>
                        <ul className="nav navbar-nav">
                            <li
                                className={this.classForPath(
                                    /^\/admin\/accounts/
                                )}
                            >
                                <Link className="nav-link" to="/admin/accounts">
                                    Accounts
                                </Link>
                            </li>
                            <li
                                className={this.classForPath(
                                    /^\/admin\/admins/
                                )}
                            >
                                <Link className="nav-link" to="/admin/admins">
                                    Admins
                                </Link>
                            </li>
                            <li
                                className={this.classForPath(
                                    /^\/admin\/admin-groups/
                                )}
                            >
                                <Link
                                    className="nav-link"
                                    to="/admin/admin-groups"
                                >
                                    Admin Groups
                                </Link>
                            </li>
                            <li
                                className={this.classForPath(
                                    /^\/admin\/statuses/
                                )}
                            >
                                <Link className="nav-link" to="/admin/statuses">
                                    Statuses
                                </Link>
                            </li>
                            <li
                                className={this.classForPath(/^\/admin\/users/)}
                            >
                                <Link className="nav-link" to="/admin/users">
                                    Users
                                </Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/login/logout">
                                    Sign out
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

Navbar.propTypes = propTypes;

module.exports = Navbar;
