import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import "./DetailOrderBody.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import orderImg from "../../../assets/images/order.png";
import noTrackingImg from "../../../assets/images/no-tracking.png";
import unfinishedImg from "../../../assets/images/unfinished.png";
import completeImg from "../../../assets/images/completed.png";
import trackingImg from "../../../assets/images/tracking.png";
import canceledImg from "../../../assets/images/canceled.png";

class DetailOrderBody extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
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

    handleGoBack = () => {
        this.props.history.goBack();
    };

    render() {
        let { orderDetailsRedux } = this.props;
        const orderItems = orderDetailsRedux?.orderItems;
        const orderAddress = orderDetailsRedux?.shippingAddress?.address;
        const address = orderAddress?.address;
        const province = orderAddress?.province;
        const firstName = orderAddress?.user?.first_name;
        const lastName = orderAddress?.user?.last_name;
        const phoneNumber = orderAddress?.user?.phone_number;
        const userName = firstName + " " + lastName;
        if (!Array.isArray(orderItems)) {
            return <div className="text-center">Loading...</div>;
        }
        const isStatusOrder = orderItems.map((item) => item.order.status);
        return (
            <>
                <div className="container">
                    <div className="content">
                        <div className="row">
                            <div className="row-3">
                                {isStatusOrder[0] === "S6" ? (
                                    <div className="progress-container">
                                        <div className="progress-step">
                                            <div className="icon canceled">
                                                <div
                                                    className="icon-canceled"
                                                    style={{ backgroundImage: `URL(${canceledImg})` }}
                                                ></div>
                                            </div>
                                            <p className="content-canceled">Đơn hàng đã bị huỷ</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="progress-container">
                                        <div className="progress-step">
                                            <div className="icon active">
                                                <div
                                                    className="icon-order"
                                                    style={{ backgroundImage: `URL(${orderImg})` }}
                                                ></div>
                                            </div>
                                            <p>Đơn hàng đã đặt</p>
                                        </div>
                                        <div className="progress-step">
                                            <div
                                                className={
                                                    isStatusOrder[0] === "S4" || isStatusOrder[0] === "S5"
                                                        ? "icon tracking active"
                                                        : "icon tracking"
                                                }
                                            >
                                                <div
                                                    className="icon-img"
                                                    // style={{ backgroundImage: `URL(${trackingImg})` }}
                                                    style={
                                                        isStatusOrder[0] === "S4" || isStatusOrder[0] === "S5"
                                                            ? { backgroundImage: `URL(${trackingImg})` }
                                                            : { backgroundImage: `URL(${noTrackingImg})` }
                                                    }
                                                ></div>
                                            </div>
                                            <p>Đang vận chuyển</p>
                                        </div>
                                        <div className="progress-step">
                                            <div
                                                className={
                                                    isStatusOrder[0] === "S5"
                                                        ? "icon completed active"
                                                        : "icon completed"
                                                }
                                            >
                                                <div
                                                    className="icon-img"
                                                    style={
                                                        isStatusOrder[0] === "S5"
                                                            ? { backgroundImage: `URL(${completeImg})` }
                                                            : { backgroundImage: `URL(${unfinishedImg})` }
                                                    }
                                                ></div>
                                            </div>
                                            <p>Đơn đã hoàn thành</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="row-9">
                                <div className="row">
                                    <div className="row-6">
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
                                                                    <div className="title-item">
                                                                        {item.product.title}
                                                                    </div>
                                                                    <div className="quantity-item">
                                                                        x{item.quantity}
                                                                    </div>
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
                                    <div className="row-4">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="summary-address">
                                                    <div className="title-address">Địa chỉ nhận hàng</div>
                                                    <div className="info-address">
                                                        <div className="user-name">
                                                            {firstName} {lastName}
                                                        </div>
                                                        <div className="phone-number">(+84){phoneNumber}</div>
                                                        <div className="address-user">
                                                            {address} - {province}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="summary-order">
                                                    <div className="total-order">
                                                        <div className="title-total">Thành tiền:</div>
                                                        <div className={
                                                                isStatusOrder[0] === "S6"
                                                                    ? "value-total canceled"
                                                                    : "value-total"
                                                            }>
                                                            {orderDetailsRedux.totalOrder}₫
                                                        </div>
                                                    </div>
                                                    <div className="payment-method-order">
                                                        <div className="title-payment">Phương thức thanh toán:</div>
                                                        <div
                                                            className={
                                                                isStatusOrder[0] === "S6"
                                                                    ? "result-payment canceled"
                                                                    : "result-payment"
                                                            }
                                                        >
                                                            {isStatusOrder[0] === "S6"
                                                                ? "Đã huỷ"
                                                                : "Thanh toán khi nhận hàng"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-2">
                                        <button className="back-order" onClick={() => this.handleGoBack()}>
                                            Quay lại
                                        </button>
                                    </div>
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
    orderDetailsRedux: state.product.orderDetails,
});

const mapDispatchToProps = (dispatch) => ({
    fetchDetailOrderStartRedux: (order_id) => dispatch(actions.fetchDetailOrderStart(order_id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailOrderBody));
