import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import "./RepurchaseOrderBody.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

class RepurchaseOrderBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAddress: null,
        };
    }

    async componentDidMount() {
        if (this.props.userInfo && this.props.userInfo.id) {
            await this.props.fetchGetAddressUserRedux(this.props.userInfo.id);
        }
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const order_id = this.props.match.params.id;
            await this.props.fetchDetailOrderStartRedux(order_id);
        }
    }
    async componentDidUpdate(prevProps) {
        const { userInfo } = this.props;
        if (prevProps.cartItemsRedux !== this.props.cartItemsRedux) {
            if (this.props.userInfo && this.props.userInfo.id && this.props.userInfo.id !== prevProps.userInfo?.id) {
                await this.props.fetchListCartStartRedux(userInfo.id);
            }
        }
    }

    handleSelectAddress = (addressId) => {
        this.setState({ selectedAddress: addressId });
    };

    handleOrder = async () => {
        // const { userInfo, fetchCreateOrderStartRedux, cartItemsRedux } = this.props;
        // const { selectedAddress } = this.state;
        // cartItemsRedux.forEach(async (item) => {
        //     const orderData = {
        //         address: selectedAddress,
        //         order: item.order.id,
        //     };
        //     await fetchCreateOrderStartRedux(orderData);
        // });
    };
    handleGoBack = () => {
        this.props.history.goBack();
    };
    render() {
        let { orderDetailsRedux, addressRedux } = this.props;
        const { selectedAddress } = this.state;
        const orderItems = orderDetailsRedux.orderItems;
        if (!addressRedux) {
            return null;
        }
        console.log(orderDetailsRedux);

        return (
            <>
                <div className="container">
                    <div className="content">
                        <div className="row">
                            <div className="col-md-9">
                                {orderItems &&
                                    orderItems.length > 0 &&
                                    orderItems.map((item) => (
                                        <div className="body-order">
                                            <div key={item.id} className="item-container">
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
                                                                <div className="main-price">
                                                                    {item.product.selling_price}₫
                                                                </div>
                                                                <div className="reduced-price">
                                                                    {item.product.selling_price *
                                                                        ((100 - item.product.discount) / 100)}
                                                                    ₫ ₫
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="item-price">
                                                                <div className="main-price">
                                                                    {item.product.selling_price}₫
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="col-md-3">
                                <div className="cart-summary">
                                    <div className="summary-body">
                                        <div className="summary-item">
                                            <span className="summary-label">Tổng số lượng: </span>
                                            <span className="summary-value">{orderDetailsRedux.totalQuantity}</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="summary-label">Thành tiền: </span>
                                            <span className="summary-value">{orderDetailsRedux.totalOrder}₫</span>
                                        </div>
                                    </div>
                                    <div className="summary-body-address">
                                        {addressRedux && addressRedux.length > 0 ? (
                                            addressRedux.map((item, index) => (
                                                <div key={index} className="summary-address">
                                                    <input
                                                        type="radio"
                                                        name="address"
                                                        value={item.id}
                                                        checked={selectedAddress === item.id}
                                                        onChange={() => this.handleSelectAddress(item.id)}
                                                    />
                                                    <div className="summary-item">
                                                        <span className="summary-label">Địa chỉ: </span>
                                                        <span className="summary-value">{item.address}</span>
                                                    </div>
                                                    <div className="summary-item">
                                                        <span className="summary-label">Tỉnh: </span>
                                                        <span className="summary-value">{item.province}</span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="no-address">Bạn chưa có địa chỉ nào</div>
                                        )}
                                    </div>
                                </div>
                                <div className="btn-back-repurchase">
                                    <button className="back-order" onClick={() => this.handleGoBack()}>
                                        Quay lại
                                    </button>
                                    <button
                                        onClick={() => this.handleOrder()}
                                        className={
                                            orderItems && orderItems.length > 0 && selectedAddress
                                                ? "btn-pay"
                                                : "btn-pay disabled"
                                        }
                                        disabled={!selectedAddress}
                                    >
                                        Đặt hàng
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

const mapStateToProps = (state) => ({
    language: state.app.language,
    userInfo: state.user.userInfo,
    addressRedux: state.user.addressData,
    orderDetailsRedux: state.product.orderDetails,
});

const mapDispatchToProps = (dispatch) => ({
    fetchGetAddressUserRedux: (id) => dispatch(actions.fetchGetAddressUser(id)),
    fetchCreateOrderStartRedux: (data) => dispatch(actions.fetchCreateOrderStart(data)),
    fetchDetailOrderStartRedux: (order_id) => dispatch(actions.fetchDetailOrderStart(order_id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RepurchaseOrderBody));
