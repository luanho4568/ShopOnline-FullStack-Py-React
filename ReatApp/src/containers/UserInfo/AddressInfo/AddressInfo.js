import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../DefaultPage/HomeHeader";
import HomeFooter from "../../DefaultPage/HomeFooter";
import "../InfoBody.scss"
import AddressInfoBody from "./AddressInfoBody";
class AddressInfo extends Component {
    componentDidMount() {}

    render() {
        return (
            <>
                <HomeHeader />
                <AddressInfoBody/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressInfo);
