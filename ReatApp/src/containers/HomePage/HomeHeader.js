import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";

class HomeHeader extends Component {
    componentDidMount() {}

    handleChangeLanguage = (language) => {
        this.props.changeLanguageRedux(language);
    };
    render() {
        const language = this.props.language;
        return (
            <>
                <div className="main">
                    <div className="home-header-container">
                        <div className="home-header-content">
                            <div className="left-content">
                                <div className="header-logo"></div>
                            </div>
                            <div className="center-content">
                                <div className="child-content">
                                    <FormattedMessage id="homepage.home" />
                                </div>
                                <div className="child-content">
                                    <FormattedMessage id="homepage.phone" />
                                </div>
                                <div className="child-content">
                                    <FormattedMessage id="homepage.laptop" />
                                </div>
                                <div className="child-content">
                                    <FormattedMessage id="homepage.accessory" />
                                </div>
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
                                    <span
                                        onClick={() => {
                                            this.handleChangeLanguage(LANGUAGES.VI);
                                        }}
                                    >
                                        VI
                                    </span>
                                </div>
                                <div className={language === LANGUAGES.EN ? "language-en active" : "language-en"}>
                                    <span
                                        onClick={() => {
                                            this.handleChangeLanguage(LANGUAGES.EN);
                                        }}
                                    >
                                        EN
                                    </span>
                                </div>
                                <div className="child-content">
                                    <button className="btn-login">
                                        <FormattedMessage id="homepage.login" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
