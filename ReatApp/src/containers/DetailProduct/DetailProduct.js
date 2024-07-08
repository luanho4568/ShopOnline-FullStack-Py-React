import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../DefaultPage/HomeHeader";
import HomeFooter from "../DefaultPage/HomeFooter";
import DetailProductBody from "./DetailProductBody";

class DetailProduct extends Component {
    componentDidMount() {}

    render() {
        return (
            <>
                <HomeHeader />
                <DetailProductBody />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct);
