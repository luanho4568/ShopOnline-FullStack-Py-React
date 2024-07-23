import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../DefaultPage/HomeHeader";
import HomeFooter from "../DefaultPage/HomeFooter";
import CartBody from "./CartBody";
class CartPage extends Component {
    componentDidMount() {}

    render() {
        return (
            <>
                <HomeHeader />
                <CartBody/>
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
