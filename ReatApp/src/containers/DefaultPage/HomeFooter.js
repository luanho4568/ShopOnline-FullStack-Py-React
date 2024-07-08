/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";
import { changeLanguageApp } from "../../store/actions/appActions";
import "./HomeFooter.scss";
import payment from "../../assets/footer/payment.png";
import { FormattedMessage } from "react-intl";
class HomeFooter extends Component {
    componentDidMount() {}

    handleChangeLanguage = (language) => {
        this.props.changeLanguageRedux(language);
    };
    render() {
        return (
            <>
                <footer className="container-fluid bg-danger text-white py-4 mt-3 px-5">
                    <div className="row">
                        <div className="col-md-3">
                            <h5>
                                <FormattedMessage id="homepage.contact-info" />
                            </h5>
                            <p>
                                <i className="fas fa-map-marker-alt"></i>
                                <FormattedMessage id="homepage.address" />: 225 Nguyễn Thông, Phú Hài, Thành phố Phan
                                Thiết, Bình Thuận
                            </p>

                            <p>
                                <i className="fas fa-phone"></i>
                                <FormattedMessage id="homepage.telephone" />: 0824-525-127
                            </p>
                            <p>
                                <i className="fas fa-envelope"></i> Email: hotro@upt-shopping.com
                            </p>
                        </div>

                        <div className="col-md-3">
                            <h5>
                                <FormattedMessage id="homepage.social-network" />
                            </h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a to="https://www.facebook.com" className="text-white" target="_blank">
                                        <i className="fab fa-facebook"></i> Facebook
                                    </a>
                                </li>
                                <li>
                                    <a to="https://www.instagram.com" className="text-white" target="_blank">
                                        <i className="fab fa-instagram"></i> Instagram
                                    </a>
                                </li>
                                <li>
                                    <a to="https://www.twitter.com" className="text-white" target="_blank">
                                        <i className="fab fa-twitter"></i> Twitter
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-3">
                            <h5>
                                <FormattedMessage id="homepage.method-information" />
                            </h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a to="/securitypolicy" className="text-white">
                                        <i className="fas fa-shield-alt"></i>
                                        <FormattedMessage id="homepage.privacy-policy" />
                                    </a>
                                </li>
                                <li>
                                    <a to="#" className="text-white">
                                        <i className="fas fa-file-contract"></i>
                                        <FormattedMessage id="homepage.terms-of-use" />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-3">
                            <h5>
                                <FormattedMessage id="homepage.useful" />
                            </h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a to="#" className="text-white">
                                        <i className="fas fa-info-circle"></i>
                                        <FormattedMessage id="homepage.about-us" />
                                    </a>
                                </li>
                                <li>
                                    <a to="#" className="text-white">
                                        <i className="fas fa-question-circle"></i>
                                        <FormattedMessage id="homepage.frequently-asked-questions" />
                                    </a>
                                </li>
                                <li>
                                    <a to="#" className="text-white">
                                        <i className="fas fa-shopping-cart"></i>
                                        <FormattedMessage id="homepage.shopping-guide" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <small>
                            <FormattedMessage id="homepage.copyright" /> &copy; 2024 ||{" "}
                            <FormattedMessage id="homepage.designed-by" /> SV-UPT ||{" "}
                        </small>
                        <div>
                            <img src={payment} alt="Payment Methods" className="img-fluid mt-2" height="30" />
                        </div>
                    </div>
                </footer>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
