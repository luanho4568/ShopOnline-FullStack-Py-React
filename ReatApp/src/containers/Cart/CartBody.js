import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import "./Cart.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

class CartBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemPerPage: 5,
            selectedAddress: null,
        };
    }

    async componentDidMount() {
        if (this.props.userInfo && this.props.userInfo.id) {
            await this.props.fetchGetAddressUserRedux(this.props.userInfo.id);
            await this.props.fetchListCartStartRedux(this.props.userInfo.id);
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
    handlePageChange = (event, value) => {
        this.setState({ currentPage: value });
    };

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

    handleRemoveToCart = async (productId, quantity) => {
        const { userInfo, fetchRemoveItemToCartStartRedux, fetchListCartStartRedux } = this.props;
        const data = {
            user: userInfo.id,
            product: productId,
            quantity: quantity,
        };
        await fetchRemoveItemToCartStartRedux(data);
        await fetchListCartStartRedux(userInfo.id);
    };

    handleRemoveOneItemToCart = async (productId) => {
        const { userInfo, fetchRemoveItemToCartStartRedux, fetchListCartStartRedux } = this.props;
        const data = {
            user: userInfo.id,
            product: productId,
            quantity: 1,
        };
        await fetchRemoveItemToCartStartRedux(data);
        await fetchListCartStartRedux(userInfo.id);
    };

    handleSelectAddress = (addressId) => {
        this.setState({ selectedAddress: addressId });
    };

    handleOrder = async () => {
        const { userInfo, fetchCreateOrderStartRedux, cartItemsRedux } = this.props;
        const { selectedAddress } = this.state;
        cartItemsRedux.forEach(async (item) => {
            const orderData = {
                address: selectedAddress,
                order: item.order.id,
            };
            await fetchCreateOrderStartRedux(orderData);
        });
    };

    render() {
        let { cartItemsRedux, addressRedux } = this.props;
        const { currentPage, itemPerPage, selectedAddress } = this.state;
        if (!addressRedux) {
            return null;
        }

        if (!Array.isArray(cartItemsRedux)) {
            return null;
        }
        let totalQuantity = 0;
        let totalPrice = 0;
        if (cartItemsRedux && cartItemsRedux.length > 0) {
            cartItemsRedux.forEach((item) => {
                totalQuantity += item.quantity;
                totalPrice += item.total_price;
            });
        }

        let cartItemStatus = cartItemsRedux.filter((item) => item.order.status === "S2");

        const indexOfLastRecord = currentPage * itemPerPage;
        const indexOfFirstRecord = indexOfLastRecord - itemPerPage;
        const currentItems = cartItemStatus.slice(indexOfFirstRecord, indexOfLastRecord);
        const nPages = Math.ceil(cartItemsRedux.length / itemPerPage);

        return (
            <>
                <div className="container">
                    <div className="content">
                        <div className="row">
                            <div className="col-md-3 text-center">
                                <div className="nav-links">
                                    <div className="nav-link-item">
                                        <NavLink to="/cart" className="link-info" activeClassName="active">
                                            Giỏ hàng
                                        </NavLink>
                                    </div>
                                    <div className="nav-link-item">
                                        <NavLink to="/order" className="link-info" activeClassName="active">
                                            Đơn hàng
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="cart-container">
                                    <table className="cart-table">
                                        <thead>
                                            <tr>
                                                <th>Ảnh</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Giá</th>
                                                <th>Số lượng</th>
                                                <th>Tổng giá</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems && currentItems.length > 0 ? (
                                                currentItems.map((item) => (
                                                    <tr key={item.id}>
                                                        <td className="item-image">
                                                            <img
                                                                src={`http://localhost:8000/static${item.product.product_image}`}
                                                                alt={item.product.title}
                                                            />
                                                        </td>
                                                        <td>{item.product.title}</td>
                                                        <td>{item.selling_price}</td>
                                                        <td>
                                                            <div className="item-quantity">
                                                                <button
                                                                    onClick={() =>
                                                                        this.handleRemoveOneItemToCart(item.product.id)
                                                                    }
                                                                    className="quantity-button"
                                                                >
                                                                    -
                                                                </button>
                                                                {item.quantity}
                                                                <button
                                                                    onClick={() =>
                                                                        this.handleAddToCart(item.product.id)
                                                                    }
                                                                    className="quantity-button"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td>{item.total_price}</td>
                                                        <td>
                                                            <div className="action-icon">
                                                                <Link to={`/product-detail/${item.product.id}`}>
                                                                    <i className="fas fa-info text-primary"></i>
                                                                </Link>
                                                                <i
                                                                    onClick={() =>
                                                                        this.handleRemoveToCart(
                                                                            item.product.id,
                                                                            item.quantity
                                                                        )
                                                                    }
                                                                    className="fas fa-trash text-danger"
                                                                ></i>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-toast">
                                                        Giỏ hàng của bạn trống.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    {currentItems && currentItems.length > 0 ? (
                                        <Stack spacing={2} className="mt-4">
                                            <Pagination
                                                count={nPages}
                                                page={currentPage}
                                                onChange={this.handlePageChange}
                                                showFirstButton
                                                showLastButton
                                            />
                                        </Stack>
                                    ) : null}
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="cart-summary">
                                    <div className="summary-body">
                                        <div className="summary-item">
                                            <span className="summary-label">Tổng số lượng: </span>
                                            <span className="summary-value">{totalQuantity}</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="summary-label">Thành tiền: </span>
                                            <span className="summary-value">{totalPrice}₫</span>
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
                                    <div className="summary-address"></div>
                                    <button
                                        onClick={() => this.handleOrder()}
                                        className={
                                            currentItems && currentItems.length > 0 && selectedAddress
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
    orderItemsRedux: state.product.orderItems,
    cartItemsRedux: state.product.cartItems,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAddItemToCartStartRedux: (data, user_id) => dispatch(actions.fetchAddItemToCartStart(data, user_id)),
    fetchRemoveItemToCartStartRedux: (data, user_id) => dispatch(actions.fetchRemoveItemToCartStart(data, user_id)),
    fetchGetAddressUserRedux: (id) => dispatch(actions.fetchGetAddressUser(id)),
    fetchListCartStartRedux: (user_id) => dispatch(actions.fetchListCartStart(user_id)),
    fetchCreateOrderStartRedux: (data) => dispatch(actions.fetchCreateOrderStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartBody);
