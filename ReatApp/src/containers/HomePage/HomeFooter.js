/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";
import { changeLanguageApp } from "../../store/actions/appActions";
import payment from "../../assets/footer/payment.png";

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
                            <h5>Thông tin liên hệ</h5>
                            <p>
                                <i className="fas fa-map-marker-alt"></i> Địa chỉ: 225 Nguyễn Thông, Phú Hài, Thành phố
                                Phan Thiết, Bình Thuận
                            </p>

                            <p>
                                <i className="fas fa-phone"></i> Điện thoại: 0824-525-127
                            </p>
                            <p>
                                <i className="fas fa-envelope"></i> Email: hotro@upt-shopping.com
                            </p>
                        </div>

                        <div className="col-md-3">
                            <h5>Liên kết mạng xã hội</h5>
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
                                <li>
                                    <a to="https://www.aedin.com" className="text-white" target="_blank">
                                        <i className="fab fa-aedin"></i> aedIn
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-3">
                            <h5>Thông tin pháp lý</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a to="/securitypolicy" className="text-white">
                                        <i className="fas fa-shield-alt"></i> Chính sách bảo mật
                                    </a>
                                </li>
                                <li>
                                    <a to="#" className="text-white">
                                        <i className="fas fa-file-contract"></i> Điều khoản sử dụng
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-3">
                            <h5>Liên kết hữu ích</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a to="#" className="text-white">
                                        <i className="fas fa-info-circle"></i> Về chúng toi
                                    </a>
                                </li>
                                <li>
                                    <a to="#" className="text-white">
                                        <i className="fas fa-question-circle"></i> Các câu hỏi thường gặp
                                    </a>
                                </li>
                                <li>
                                    <a to="#" className="text-white">
                                        <i className="fas fa-shopping-cart"></i> Hướng dẫn mua hàng
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <small>Bản quyền &copy; 2024 || Được thiết kế bởi SV-UPT || </small>
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
