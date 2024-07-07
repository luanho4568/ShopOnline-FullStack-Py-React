import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../DefaultPage/HomeHeader";
import HomeFooter from "../../DefaultPage/HomeFooter";
import LaptopBody from "./LaptopBody";

class LaptopPage extends Component {
    componentDidMount() {}

    render() {
        return (
            <>
                <HomeHeader />
                <LaptopBody/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LaptopPage);
