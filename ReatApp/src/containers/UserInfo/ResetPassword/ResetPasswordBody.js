import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

class ResetPasswordBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            userInfo: { ...this.props.userInfo },
            isShowPassword: false,
        };
    }
    componentDidMount() {}
    onChangeInput = (e, id) => {
        const { userInfo } = this.state;
        userInfo[id] = e.target.value;
        this.setState({ userInfo });
    };
    handleEdit = () => {
        this.setState({ isEditing: true });
    };

    handleCancelEdit = () => {
        this.setState({
            isEditing: false,
            address: { ...this.props.addressRedux },
        });
    };
    handleSave = async () => {
        const { address } = this.state;
        await this.props.editAddressStartRedux(address);
        this.setState({ isEditing: false });
    };
    handleShowHidePass = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };
    render() {
        const { language } = this.props;
        const { userInfo, isEditing } = this.state;
        return (
            <>
                <div className="container">
                    <div className="content">
                        <div className="row">
                            <div className="col-md-3 text-center">
                                <div className="nav-links">
                                    <div className="nav-link-item">
                                        <NavLink to="/user-info" className="link-info" activeClassName="active">
                                            Thông tin cá nhân
                                        </NavLink>
                                    </div>
                                    <div className="nav-link-item">
                                        <NavLink to="/address-info" className="link-info" activeClassName="active">
                                            Địa chỉ giao hàng
                                        </NavLink>
                                    </div>
                                    <div className="nav-link-item">
                                        <NavLink to="/reset-password" className="link-info" activeClassName="active">
                                            Đổi mật khẩu
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9 user-info">
                                <div className="row">
                                    <div className="col-12 ">
                                        <label>Mật khẩu cũ</label>
                                        <div className="custom-input-password">
                                            <input
                                                className="form-control"
                                                type={this.state.isShowPassword ? "text" : "password"}
                                                value={userInfo.password}
                                                disabled={!isEditing}
                                                onChange={(e) => this.onChangeInput(e, "password")}
                                            />
                                            <span
                                                onClick={() => {
                                                    this.handleShowHidePass();
                                                }}
                                            >
                                                <i
                                                    className={
                                                        this.state.isShowPassword ? "far fa-eye" : "far fa-eye-slash"
                                                    }
                                                ></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 ">
                                        <label>Mật khẩu mới</label>
                                        <div className="custom-input-password">
                                            <input
                                                className="form-control"
                                                type={this.state.isShowPassword ? "text" : "password"}
                                                value={userInfo.password}
                                                disabled={!isEditing}
                                                onChange={(e) => this.onChangeInput(e, "password")}
                                            />
                                            <span
                                                onClick={() => {
                                                    this.handleShowHidePass();
                                                }}
                                            >
                                                <i
                                                    className={
                                                        this.state.isShowPassword ? "far fa-eye" : "far fa-eye-slash"
                                                    }
                                                ></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 ">
                                        <label>Xác nhận mật khẩu</label>
                                        <div className="custom-input-password">
                                            <input
                                                className="form-control"
                                                type={this.state.isShowPassword ? "text" : "password"}
                                                value={userInfo.password}
                                                disabled={!isEditing}
                                                onChange={(e) => this.onChangeInput(e, "password")}
                                            />
                                            <span
                                                onClick={() => {
                                                    this.handleShowHidePass();
                                                }}
                                            >
                                                <i
                                                    className={
                                                        this.state.isShowPassword ? "far fa-eye" : "far fa-eye-slash"
                                                    }
                                                ></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        {isEditing ? (
                                            <div className="btn-confirm-exit">
                                                <button className="btn-confirm" onClick={this.handleSave}>
                                                    <i className="fas fa-check"></i>
                                                </button>
                                                <button className="btn-exit" onClick={this.handleCancelEdit}>
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            </div>
                                        ) : (
                                            <button className="btn-ed" onClick={this.handleEdit}>
                                                Chỉnh sửa
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
    userInfo: state.user.userInfo,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordBody);
