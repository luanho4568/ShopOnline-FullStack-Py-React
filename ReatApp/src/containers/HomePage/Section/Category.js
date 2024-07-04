import React, { Component } from "react";
import { connect } from "react-redux";
import "./Category.scss";

class Category extends Component {
    componentDidMount() {}
    render() {
        return (
            <>
                <div className="category-container">
                    <div className="category-content">
                        <div className="category-box">
                            <div className="category-img">
                                <div className="img phone"></div>
                            </div>
                            <div className="category-text">
                                <div>Điện thoại</div>
                            </div>
                        </div>
                        <div className="category-box">
                            <div className="category-img">
                                <div className="img laptop"></div>
                            </div>
                            <div className="category-text">
                                <div>Laptop</div>
                            </div>
                        </div>
                        <div className="category-box">
                            <div className="category-img">
                                <div className="img tablet"></div>
                            </div>
                            <div className="category-text">
                                <div>Máy tính bảng</div>
                            </div>
                        </div>
                        <div className="category-box">
                            <div className="category-img">
                                <div className="img accessory"></div>
                            </div>
                            <div className="category-text">
                                <div>Phụ kiện</div>
                            </div>
                        </div>
                        
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
