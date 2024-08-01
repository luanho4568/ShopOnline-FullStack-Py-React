import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import { userIsAuthenticated, userIsNotAuthenticated } from "../hoc/authentication";
import { path } from "../utils";
import Home from "../routes/Home";
import Login from "./Auth/Login";
import System from "../routes/System";
import HomePage from "./HomePage/HomePage";
import CustomScrollbars from "../components/CustomScrollbars";
import PhonePage from "./CategoryPage/PhonePage/PhonePage";
import LaptopPage from "./CategoryPage/LaptopPage/LaptopPage";
import TabletPage from "./CategoryPage/TabletPage/TabletPage";
import DetailProduct from "./DetailProduct/DetailProduct";
import UserInfo from "./UserInfo/UserInfoBody/UserInfo";
import AddressInfo from "./UserInfo/AddressInfo/AddressInfo";
import ResetPassword from "./UserInfo/ResetPassword/ResetPassword";
import CartPage from "./Cart/CartPage";
import OderPage from "./Order/OderPage";
import RepurchaseOrder from "./RepurchaseOrder/RepurchaseOrder";
import DetailOrder from "./Order/OrderDetail/DetailOrder";
import Register from "./Auth/Register";

class App extends Component {
    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={Home} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.REGISTER} component={userIsNotAuthenticated(Register)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.PHONEPAGE} component={PhonePage} />
                                    <Route path={path.LAPTOPPAGE} component={LaptopPage} />
                                    <Route path={path.TABLETPAGE} component={TabletPage} />
                                    <Route path={path.DETAILPRODUCTPAGE} component={DetailProduct} />
                                    <Route path={path.REPURCHASEPAGE} component={RepurchaseOrder} />
                                    <Route path={path.DETAILORDERPAGE} component={DetailOrder} />
                                    <Route path={path.USERINFOPAGE} component={UserInfo} />
                                    <Route path={path.ADDRESSINFOPAGE} component={AddressInfo} />
                                    <Route path={path.RESETPASSPAGE} component={ResetPassword} />
                                    <Route path={path.CARTPAGE} component={CartPage} />
                                    <Route path={path.ORDERPAGE} component={OderPage} />
                                </Switch>
                            </CustomScrollbars>
                        </div>
                        <ToastContainer
                            position="top-center"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
