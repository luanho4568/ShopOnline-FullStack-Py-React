import React, { Component } from "react";
import { connect } from "react-redux";
import DetailOrderBody from "./DetailOrderBody";
import HomeHeader from "../../DefaultPage/HomeHeader";
import HomeFooter from "../../DefaultPage/HomeFooter";

class DetailOrder extends Component {
    componentDidMount() {}

    render() {
        return (
            <>
                <HomeHeader />
                <DetailOrderBody />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailOrder);
