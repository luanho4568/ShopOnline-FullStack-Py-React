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
    constructor(props) {
        super(props);
        this.state = {
            searchItem: "",
        };
    }
    async componentDidMount() {
        const { searchItem } = this.state;
        if (searchItem) {
            await this.props.searchProductStartRedux(searchItem);
        }
        if (this.props.userInfo && this.props.userInfo.id ) {
            await this.props.fetchListCartStartRedux(this.props.userInfo.id);
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        const { searchItem } = this.state;
        if (searchItem !== prevState.searchItem) {
            await this.props.searchProductStartRedux(searchItem);
        }
        if (this.props.userInfo && this.props.userInfo.id && this.props.userInfo.id !== prevProps.userInfo?.id) {
            await this.props.fetchListCartStartRedux(this.props.userInfo.id);
        }
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageRedux(language);
    };

    handleSearchInputChange = (event) => {
        const title = event.target.value;
        this.setState({ searchItem: title });
    };

    render() {
        const { language, isLoggedIn, userInfo, processLogout, productItemRedux, cartItemRedux } = this.props;
        const { searchItem } = this.state;
        const totalQuantity = Array.isArray(cartItemRedux)
            ? cartItemRedux.reduce((total, item) => total + item.quantity, 0)
            : 0;

        return (
            <div className="main">
                <div className="home-header-container">
                    <div className="home-header-content">
                        <NavLink to="/home" className="left-content" activeClassName="active">
                            <div className="header-logo"></div>
                        </NavLink>
                        <div className="center-content">
                            <NavLink to="/home" className="child-content page" activeClassName="active">
                                <FormattedMessage id="homepage.home" />
                            </NavLink>
                            <NavLink to="/phone" className="child-content page" activeClassName="active">
                                <FormattedMessage id="homepage.phone" />
                            </NavLink>
                            <NavLink to="/laptop" className="child-content page" activeClassName="active">
                                <FormattedMessage id="homepage.laptop" />
                            </NavLink>
                            <NavLink to="/tablet" className="child-content page" activeClassName="active">
                                <FormattedMessage id="homepage.tablet" />
                            </NavLink>
                            <div className="child-content">
                                <div className="search">
                                    <i className="fas fa-search"></i>
                                    <FormattedMessage id="homepage.search">
                                        {(placeholder) => (
                                            <input
                                                type="text"
                                                placeholder={placeholder}
                                                onChange={(e) => this.handleSearchInputChange(e)}
                                                value={searchItem}
                                            />
                                        )}
                                    </FormattedMessage>
                                    {productItemRedux?.length > 0 && searchItem && (
                                        <div className="search-results">
                                            {productItemRedux.map((product) => (
                                                <Link
                                                    to={`/product-detail/${product.id}`}
                                                    className="search-result-item"
                                                    key={product.id}
                                                >
                                                    <img src={product.product_image} alt={product.title} />
                                                    <div className="search-result-info">
                                                        <div className="search-result-title">{product.title}</div>
                                                        {product.discount === 0 ? (
                                                            <div className="search-result-price">
                                                                ${product.selling_price}
                                                            </div>
                                                        ) : (
                                                            <div className="search-result-price">
                                                                <div className="reduced-price">
                                                                    {product.selling_price *
                                                                        ((100 - product.discount) / 100)}
                                                                    ₫
                                                                </div>
                                                                <div className="main-price">
                                                                    <div className="main-price-discount">
                                                                        {product.selling_price}₫{" "}
                                                                    </div>
                                                                    <span className="discount">
                                                                        {" "}
                                                                        {-product.discount}%
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
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
                                    <Link to="/cart" className="cart">
                                        <span className="quantity-item">{totalQuantity}</span>
                                    </Link>
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
                                            <li><NavLink className="link" to="/order" activeClassName="active">
                                                    Đơn hàng
                                                </NavLink></li>
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
        productItemRedux: state.product.searchProduct,
        cartItemRedux: state.product.cartItems,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageRedux: (language) => dispatch(actions.changeLanguageApp(language)),
        processLogout: () => dispatch(actions.processLogout()),
        searchProductStartRedux: (title) => dispatch(actions.searchProductStart(title)),
        fetchListCartStartRedux: (user_id) => dispatch(actions.fetchListCartStart(user_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
