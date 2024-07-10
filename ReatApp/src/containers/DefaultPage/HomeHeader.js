import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import * as actions from "../../store/actions";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import noavatar from "../../assets/images/no-avatar.jpg";
class HomeHeader extends Component {
    componentDidMount() {}

    handleChangeLanguage = (language) => {
        this.props.changeLanguageRedux(language);
    };

    render() {
        const { language, isLoggedIn, userInfo, processLogout } = this.props;
        return (
            <div className="main">
                <div className="home-header-container">
                    <div className="home-header-content">
                        <NavLink to="/home" className="left-content" activeClassName="active">
                            <div className="header-logo"></div>
                        </NavLink>
                        <div className="center-content">
                            <NavLink to="/home" className="child-content" activeClassName="active">
                                <FormattedMessage id="homepage.home" />
                            </NavLink>
                            <NavLink to="/phone" className="child-content" activeClassName="active">
                                <FormattedMessage id="homepage.phone" />
                            </NavLink>
                            <NavLink to="/laptop" className="child-content" activeClassName="active">
                                <FormattedMessage id="homepage.laptop" />
                            </NavLink>
                            <NavLink to="/tablet" className="child-content" activeClassName="active">
                                <FormattedMessage id="homepage.tablet" />
                            </NavLink>
                            <div className="child-content">
                                <div className="search">
                                    <i className="fas fa-search"></i>
                                    <FormattedMessage id="homepage.search">
                                        {(placeholder) => <input type="text" placeholder={placeholder} />}
                                    </FormattedMessage>
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}>
                                <span onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VI</span>
                            </div>
                            <div className={language === LANGUAGES.EN ? "language-en active" : "language-en"}>
                                <span onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                            {isLoggedIn ? (
                                <>
                                    <div className="cart">
                                        <span className="quantity-item">0</span>
                                    </div>
                                    <div className="user">
                                        {userInfo.avatar ? (
                                            <div
                                                className="avatar-user"
                                                style={{
                                                    backgroundImage: `url(http://localhost:8000/static${userInfo.avatar})`,
                                                }}
                                            ></div>
                                        ) : (
                                            <div
                                                className="avatar-user"
                                                style={{
                                                    backgroundImage: `url(${noavatar})`,
                                                }}
                                            ></div>
                                        )}

                                        <ul className="info-user">
                                            <li className="separate-fullname">
                                                {userInfo.first_name} {userInfo.last_name}
                                            </li>
                                            {userInfo.role === "R1" || userInfo.role === "R2" ? (
                                                <li>
                                                    <NavLink
                                                        className="link"
                                                        to="/system/admin-manage"
                                                        activeClassName="active"
                                                    >
                                                        Quản lý
                                                    </NavLink>
                                                </li>
                                            ) : null}
                                            <li>
                                                <NavLink className="link" to="/user-info" activeClassName="active">
                                                    Thông tin
                                                </NavLink>
                                            </li>
                                            <li>Đơn hàng</li>
                                            <li onClick={processLogout}>
                                                <Link
                                                    onClick={processLogout}
                                                    className="link separate-logout"
                                                    to="/home"
                                                >
                                                    Đăng xuất
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <Link to="/login" className="child-content">
                                    <button className="btn-login">
                                        <FormattedMessage id="homepage.login" />
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageRedux: (language) => dispatch(actions.changeLanguageApp(language)),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
