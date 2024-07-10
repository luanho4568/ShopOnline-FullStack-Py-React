import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeBody.scss";
import { changeLanguageApp } from "../../store/actions/appActions";
import "./HomeBody.scss";
import Introduce from "./Section/Introduce";
import Category from "./Section/Category";
import CategoryPhone from "./Section/CategoryPhone";
import CategoryLaptop from "./Section/CategoryLaptop";
import CategoryTablet from "./Section/CategoryTablet";
import { FormattedMessage } from "react-intl";

class HomeBody extends Component {
    componentDidMount() {}

    handleChangeLanguage = (language) => {
        this.props.changeLanguageRedux(language);
    };
    render() {
        return (
            <>
                <div className="background-body">
                    <div className="mk-sale-body sale-header"></div>
                    <Introduce />
                    <Category />
                    <div className="mk-sale-body sale-body img-phone"></div>
                    <CategoryPhone />
                    <div className="mk-sale-body sale-body img-laptop"></div>
                    <CategoryLaptop />
                    <div className="mk-sale-body sale-body img-tablet"></div>
                    <CategoryTablet />
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeBody);
