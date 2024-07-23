import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../DefaultPage/HomeHeader";
import HomeFooter from "../DefaultPage/HomeFooter";
import OrderBody from "./OrderBody";
class OderPage extends Component {
    componentDidMount() {}

    render() {
        return (
            <>
                <HomeHeader />
                <OrderBody/>
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

export default connect(mapStateToProps, mapDispatchToProps)(OderPage);
