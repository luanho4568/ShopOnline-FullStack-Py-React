import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import * as actions from "../../../store/actions";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

class DeliveredOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isData: false,
        };
    }

    async componentDidMount() {
        if (this.props.userInfo && this.props.userInfo.id) {
            await this.props.fetchListOrderStartRedux(this.props.userInfo.id, "S5");
            this.setState({ isData: true });
        }
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.userInfo !== this.props.userInfo && this.props.userInfo && this.props.userInfo.id) {
            await this.props.fetchListOrderStartRedux(this.props.userInfo.id, "S5");
            this.setState({ isData: true });
        }
    }

    groupOrderItems = (orderItems) => {
        const groupedItems = {};
        orderItems.forEach((orderItem) => {
            orderItem.forEach((item) => {
                const orderId = item.order.id;
                // kiểm tra order trong orderItem
                // Nếu không có thì tạo ra order mới lấy từ item
                if (!groupedItems[orderId]) {
                    groupedItems[orderId] = {
                        orderId: orderId,
                        status: item.order.status,
                        created_date: item.order.created_date,
                        updated_date: item.order.updated_date,
                        user: item.order.user,
                        items: [], // tạo ra 1 mảng rỗng để truyền các tham số trên vào
                    };
                }
                groupedItems[orderId].items.push(item);
            });
        });
        // Trả về mảng có các giá trị của groupedItems
        return Object.values(groupedItems);
    };

    render() {
        const { orderItemsRedux } = this.props;
        const { isData } = this.state;
        const orderItems =
            orderItemsRedux && Array.isArray(orderItemsRedux.orderItems) ? orderItemsRedux.orderItems : [];
        const groupedOrderItems = this.groupOrderItems(orderItems);

        if (!isData) {
            return <div className="text-center">Loading...</div>;
        }

        return (
            <>
                {groupedOrderItems.length > 0 ? (
                    groupedOrderItems.map((order) => {
                        let totalPrice = 0;
                        let totalQuantity = 0;
                        order.items.forEach((item) => {
                            totalQuantity += item.quantity;
                            totalPrice += item.total_order;
                        });

                        return (
                            <div key={order.orderId} className="main-order">
                                <div className="header-order">
                                    <div className="header-order-left">
                                        <Link to={`/order-detail/${order.orderId}`}>
                                            <button className="info-item">Xem chi tiết</button>
                                        </Link>
                                    </div>
                                    <div className="header-order-right">
                                        <i class="fas fa-shipping-fast icon-shipping"></i>
                                        <span className="title-toast-shipping">Giao hàng thành công</span>
                                        <span className="distance">|</span>
                                        <span className="title-toast-complete">Hoàn thành</span>
                                    </div>
                                </div>
                                <div className="body-order">
                                    {order.items.length > 0 &&
                                        order.items.map((item) => (
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
                                        ))}
                                </div>
                                <div className="footer-order">
                                    <div className="total-item">
                                        <i className="fas fa-money-bill"></i>
                                        <span className="text-total-bill">Thành tiền:</span>
                                        <span className="total-bill">{totalPrice}₫</span>
                                    </div>
                                    <div className="btn-handle">
                                        <button className="btn-buy">Mua lại</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
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
    orderItemsRedux: state.product.orderItems,
});

const mapDispatchToProps = (dispatch) => ({
    fetchListOrderStartRedux: (user_id, status_key) => dispatch(actions.fetchListOrderStart(user_id, status_key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeliveredOrders);
