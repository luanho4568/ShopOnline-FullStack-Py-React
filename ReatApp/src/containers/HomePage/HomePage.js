import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../DefaultPage/HomeHeader";
import HomeBody from "./HomeBody";
import HomeFooter from "../DefaultPage/HomeFooter";

class HomePage extends Component {

    componentDidMount() {}

    render() {
        return (
            <>
                <HomeHeader />
                <HomeBody />
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
