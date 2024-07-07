import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../DefaultPage/HomeHeader";
import HomeFooter from "../../DefaultPage/HomeFooter";
import PhoneBody from "./PhoneBody";

class PhonePage extends Component {
    componentDidMount() {}
    render() {
        return (
            <>
                <HomeHeader />
                <PhoneBody/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PhonePage);
