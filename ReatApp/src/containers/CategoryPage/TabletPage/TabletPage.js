import React, { Component } from "react";
import { connect } from "react-redux";
import { changeLanguageApp } from "../../../store/actions/appActions";
import HomeHeader from "../../DefaultPage/HomeHeader";
import HomeFooter from "../../DefaultPage/HomeFooter";
import TabletBody from "./TabletBody";

class TabletPage extends Component {
    componentDidMount() {}

    handleChangeLanguage = (language) => {
        this.props.changeLanguageRedux(language);
    };
    render() {
        return (
            <>
                <HomeHeader />
                <TabletBody/>
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabletPage);
