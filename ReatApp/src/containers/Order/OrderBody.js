import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import "./Order.scss";
import { CanceledOrder, DeliveredOrders, PendingOrders, ShippingOrders } from "./OrderProcessing";
class OrderBody extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {}
    async componentDidUpdate(prevProps) {}

    render() {
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
                            <div className="col-md-9">
                                <div className="order-status-buttons">
                                    <NavLink to="/order/pending" className="link-info" activeClassName="active">
                                        Chờ xác nhận
                                    </NavLink>
                                    <NavLink to="/order/shipping" className="link-info" activeClassName="active">
                                        Đang vận chuyển
                                    </NavLink>
                                    <NavLink to="/order/delivered" className="link-info" activeClassName="active">
                                        Đã giao hàng
                                    </NavLink>
                                    <NavLink to="/order/canceled" className="link-info" activeClassName="active">
                                        Đã Huỷ
                                    </NavLink>
                                </div>
                                <div className="order-status-content mt-3">
                                    <Switch>
                                        <Route path="/order/pending" component={PendingOrders} />
                                        <Route path="/order/shipping" component={ShippingOrders} />
                                        <Route path="/order/delivered" component={DeliveredOrders} />
                                        <Route path="/order/canceled" component={CanceledOrder} />
                                        <Redirect exact from="/order" to="/order/pending" />
                                    </Switch>
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
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OrderBody);
