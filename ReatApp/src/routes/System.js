import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import AdminManage from "../containers/System/AdminManage/AdminManage";
import Header from "../containers/Header/Header";
import StaffManage from "../containers/System/StaffManage/StaffManage";
import CustomerManage from "../containers/System/CustomerManage/CustomerManage";
import PhoneManage from "../containers/System/PhoneManage/PhoneManage";
import LaptopManage from "../containers/System/LaptopManage/LaptopManage";
import TabletManage from "../containers/System/TabletManage/TabletManage";

class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/admin-manage" component={AdminManage} />
                            <Route path="/system/staff-manage" component={StaffManage} />
                            <Route path="/system/customer-manage" component={CustomerManage} />
                            <Route path="/system/manage-category-phone" component={PhoneManage} />
                            <Route path="/system/manage-category-laptop" component={LaptopManage} />
                            <Route path="/system/manage-category-tablet" component={TabletManage} />
                            <Route
                                component={() => {
                                    return <Redirect to={systemMenuPath} />;
                                }}
                            />
                        </Switch>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
