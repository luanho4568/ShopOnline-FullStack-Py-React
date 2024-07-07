import React, { Component } from "react";
import { connect } from "react-redux";
import "./Category.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FormattedMessage } from "react-intl";

class Category extends Component {
    componentDidMount() {}
    render() {
        return (
            <>
                <div className="category-container">
                    <div className="category-content">
                        <Link to="/phone" className="category-box">
                            <div className="category-img">
                                <div className="img phone"></div>
                            </div>
                            <div className="category-text">
                                <div><FormattedMessage id="homepage.phone"/></div>
                            </div>
                        </Link>
                        <Link to="/laptop" className="category-box">
                            <div className="category-img">
                                <div className="img laptop"></div>
                            </div>
                            <div className="category-text">
                                <div><FormattedMessage id="homepage.laptop"/></div>
                            </div>
                        </Link>
                        <Link to="/tablet" className="category-box">
                            <div className="category-img">
                                <div className="img tablet"></div>
                            </div>
                            <div className="category-text">
                                <div><FormattedMessage id="homepage.tablet"/></div>
                            </div>
                        </Link>
                        <Link to="/accessory" className="category-box">
                            <div className="category-img">
                                <div className="img accessory"></div>
                            </div>
                            <div className="category-text">
                                <div><FormattedMessage id="homepage.accessory"/></div>
                            </div>
                        </Link>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
