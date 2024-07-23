import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
class ShippingOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isData: false,
        };
    }
    async componentDidMount() {
        if (this.props.userInfo && this.props.userInfo.id) {
            await this.props.fetchListOrderStartRedux(this.props.userInfo.id, "S4");
            this.setState({ isData: true });
        }
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.userInfo !== this.props.userInfo && this.props.userInfo && this.props.userInfo.id) {
            await this.props.fetchListOrderStartRedux(this.props.userInfo.id, "S4");
            this.setState({ isData: true });
        }
    }

    render() {
        const { cartItemsRedux } = this.props;
        let totalQuantity = 0;
        let totalPrice = 0;
        if (cartItemsRedux && cartItemsRedux.length > 0) {
            cartItemsRedux.forEach((item) => {
                totalQuantity += item.quantity;
                totalPrice += item.total_price;
            });
        }
        const cartItemsStatus = cartItemsRedux.filter((item) => item.order.status === "S4");
        return (
            <>
                {cartItemsStatus && cartItemsStatus.length > 0 ? (
                    cartItemsStatus.map((item) => (
                        <div className="main-order">
                            <div className="header-order">
                                <div className="header-order-left">
                                    <button className="info-item">Xem chi tiết</button>
                                </div>
                                <div className="header-order-right">
                                    <i class="fas fa-shipping-fast icon-shipping"></i>
                                    <span className="title-toast-shipping">Đang vận chuyển</span>
                                </div>
                            </div>
                            <div className="body-order">
                                <div className="item-container">
                                    <div className="row">
                                        <div className="col-2">
                                            <img
                                                src={`http://localhost:8000/static${item.product.product_image}`}
                                                alt={item.product.title}
                                            />
                                        </div>
                                        <div className="col-7">
                                            <div className="body-item">
                                                <div className="title-item">{item.product.title}</div>
                                                <div className="quantity-item">x{item.quantity}</div>
                                                <div className="toast-item">
                                                    <span>Trả hàng miễn phí 15 ngày</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            {item.product.discount && item.product.discount > 0 ? (
                                                <div className="item-price-discount">
                                                    <div className="main-price">{item.product.selling_price}₫</div>
                                                    <div className="reduced-price">
                                                        {item.selling_price * ((100 - item.product.discount) / 100)}₫
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="item-price">
                                                    <div className="main-price">{item.product.selling_price}₫</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-order">
                                <div className="total-item">
                                    <i class="fas fa-money-bill"></i>
                                    <span className="text-total-bill">Thành tiền:</span>
                                    <span className="total-bill">{totalPrice}₫</span>
                                </div>
                                <div className="btn-handle">
                                    <button className="btn-wait">Chờ</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-toast-not-order">Bạn chưa có đơn hàng nào</div>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
    userInfo: state.user.userInfo,
    cartItemsRedux: state.product.cartItems,
});

const mapDispatchToProps = (dispatch) => ({
    fetchListCartStartRedux: (user_id) => dispatch(actions.fetchListCartStart(user_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShippingOrders);
