import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../DefaultPage/HomeHeader";
import HomeFooter from "../../DefaultPage/HomeFooter";
import ResetPasswordBody from "./ResetPasswordBody";
import "../InfoBody.scss"
class ResetPassword extends Component {
    componentDidMount() {}

    render() {
        return (
            <>
                <HomeHeader />
                <ResetPasswordBody/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
