import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./DetailProductBody.scss";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { FormattedMessage } from "react-intl";
import cart from "../../assets/images/add-to-cart.png";
class DetailProduct extends Component {
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const product_id = this.props.match.params.id;
            await this.props.fetchDetailProductStartRedux(product_id);
        }
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            const product_id = this.props.match.params.id;
            await this.props.fetchDetailProductStartRedux(product_id);
        }
    }
    handleAddToCart = async (productId) => {
        const { userInfo, fetchAddItemToCartStartRedux, fetchListCartStartRedux } = this.props;
        const data = {
            user: userInfo.id,
            product: productId,
            quantity: 1,
        };
        await fetchAddItemToCartStartRedux(data);
        await fetchListCartStartRedux(userInfo.id);
    };
    render() {
        const { detailProductRedux } = this.props;
        if (!detailProductRedux) {
            return <div className="loading-circle"></div>;
        }
        return (
            <div className="product-container">
                <div className="product-content">
                    <div className="product-image">
                        <div className="form-img">
                            <div
                                className="img"
                                style={{
                                    backgroundImage: `URL(http://localhost:8000/static${detailProductRedux.product_image})`,
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="product-info">
                        <h1>{detailProductRedux.title}</h1>
                        {detailProductRedux.discount && detailProductRedux.discount > 0 ? (
                            <div className="ctgphone-price-discount">
                                <div className="reduced-price">
                                    {detailProductRedux.selling_price * ((100 - detailProductRedux.discount) / 100)}₫
                                </div>

                                <div className="main-price">
                                    <div className="main-price-discount">{detailProductRedux.selling_price}₫ </div>
                                    <span className="discount"> {-detailProductRedux.discount}%</span>
                                </div>
                            </div>
                        ) : (
                            <div className="ctgphone-price">
                                <div className="main-price">{detailProductRedux.selling_price}₫</div>
                            </div>
                        )}
                        <div className="product-description">
                            {detailProductRedux.description &&
                                detailProductRedux.description.split("\n").map((item, key) => {
                                    return <p key={key}>{item}</p>;
                                })}
                        </div>
                        <div className="btn-buy-cart mt-3">
                            <button className="btn-buy">
                                {" "}
                                <FormattedMessage id="manage-product.buy-now" />
                            </button>
                            <button
                                onClick={() => this.handleAddToCart(detailProductRedux.id)}
                                className="btn-cart"
                                style={{ backgroundImage: `url(${cart})` }}
                            ></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    detailProductRedux: state.product.productDetail,
    userInfo: state.user.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
    fetchDetailProductStartRedux: (productId) => dispatch(actions.fetchDetailProductStart(productId)),
    fetchAddItemToCartStartRedux: (productId) => dispatch(actions.fetchAddItemToCartStart(productId)),
    fetchListCartStartRedux: (user_id) => dispatch(actions.fetchListCartStart(user_id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailProduct));
