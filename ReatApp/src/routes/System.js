import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import AdminManage from "../containers/System/AdminManage/AdminManage";
import Header from "../containers/Header/Header";
import StaffManage from "../containers/System/StaffManage/StaffManage";
import CustomerManage from "../containers/System/CustomerManage/CustomerManage";
import PhoneManage from "../containers/System/PhoneManage/PhoneManage";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import * as actions from "../store/actions";

class System extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemPerPage: 7,
            arrProductPhone: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllProductStartRedux("C1");
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listProducts !== this.props.listProducts) {
            this.setState({
                arrProductPhone: this.props.listProducts,
            });
        }
    }

    handlePageChange = (event, value) => {
        this.setState({
            currentPage: value,
        });
    };

    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        const { currentPage, itemPerPage, arrProductPhone } = this.state;
        const indexOfLastRecord = currentPage * itemPerPage;
        const indexOfFirstRecord = indexOfLastRecord - itemPerPage;
        const currentItemsProduct = arrProductPhone.slice(indexOfFirstRecord, indexOfLastRecord);
        const nPages = Math.ceil(arrProductPhone.length / itemPerPage);

        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/admin-manage" component={AdminManage} />
                            <Route path="/system/staff-manage" component={StaffManage} />
                            <Route path="/system/customer-manage" component={CustomerManage} />
                            <Route
                                path="/system/manage-category-phone"
                                render={(props) => (
                                    <PhoneManage
                                        {...props}
                                        currentItemsProduct={currentItemsProduct}
                                        totalItems={arrProductPhone.length}
                                        currentPage={currentPage}
                                        itemPerPage={itemPerPage}
                                    />
                                )}
                            />
                            <Route
                                component={() => {
                                    return <Redirect to={systemMenuPath} />;
                                }}
                            />
                        </Switch>
                        <Stack spacing={2} className="mt-2">
                            <Pagination
                                count={nPages}
                                page={currentPage}
                                onChange={this.handlePageChange}
                                showFirstButton
                                showLastButton
                            />
                        </Stack>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        listProducts: state.product.products,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllProductStartRedux: (category_key) => dispatch(actions.fetchAllProductStart(category_key)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
