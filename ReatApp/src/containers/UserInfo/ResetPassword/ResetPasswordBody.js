import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../../../store/actions";

class ResetPasswordBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            userInfo: {
                id: this.props.userInfo ? this.props.userInfo.id : "",
                old_password: "",
                new_password: "",
                confirm_password: "",
            },
            isShowPassword: {
                old_password: false,
                new_password: false,
                confirm_password: false,
            },
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.userInfo !== this.props.userInfo) {
            this.setState({
                userInfo: {
                    id: this.props.userInfo ? this.props.userInfo.id : "",
                    old_password: "",
                    new_password: "",
                    confirm_password: "",
                },
            });
        }
    }
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
            userInfo: {
                id: this.props.userInfo ? this.props.userInfo.id : "",
                old_password: "",
                new_password: "",
                confirm_password: "",
            },
        });
    };

    handleSave = async () => {
        const { userInfo } = this.state;
        await this.props.updatePasswordStartRedux(userInfo);
        this.setState({
            isEditing: false,
            userInfo: {
                id: this.props.userInfo ? this.props.userInfo.id : "",
                old_password: "",
                new_password: "",
                confirm_password: "",
            },
        });
    };

    handleShowHidePass = (id) => {
        this.setState((prevState) => ({
            isShowPassword: {
                ...prevState.isShowPassword,
                [id]: !prevState.isShowPassword[id],
            },
        }));
    };

    render() {
        const { language } = this.props;
        const { userInfo, isEditing, isShowPassword } = this.state;
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
                                                type={isShowPassword.old_password ? "text" : "password"}
                                                value={userInfo.old_password}
                                                disabled={!isEditing}
                                                onChange={(e) => this.onChangeInput(e, "old_password")}
                                            />
                                            {isEditing ? (
                                                <span onClick={() => this.handleShowHidePass("old_password")}>
                                                    <i
                                                        className={
                                                            isShowPassword.old_password
                                                                ? "far fa-eye"
                                                                : "far fa-eye-slash"
                                                        }
                                                    ></i>
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 ">
                                        <label>Mật khẩu mới</label>
                                        <div className="custom-input-password">
                                            <input
                                                className="form-control"
                                                type={isShowPassword.new_password ? "text" : "password"}
                                                value={userInfo.new_password}
                                                disabled={!isEditing}
                                                onChange={(e) => this.onChangeInput(e, "new_password")}
                                            />
                                            {isEditing ? (
                                                <span onClick={() => this.handleShowHidePass("new_password")}>
                                                    <i
                                                        className={
                                                            isShowPassword.new_password
                                                                ? "far fa-eye"
                                                                : "far fa-eye-slash"
                                                        }
                                                    ></i>
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 ">
                                        <label>Xác nhận mật khẩu</label>
                                        <div className="custom-input-password">
                                            <input
                                                className="form-control"
                                                type={isShowPassword.confirm_password ? "text" : "password"}
                                                value={userInfo.confirm_password}
                                                disabled={!isEditing}
                                                onChange={(e) => this.onChangeInput(e, "confirm_password")}
                                            />
                                            {isEditing ? (
                                                <span onClick={() => this.handleShowHidePass("confirm_password")}>
                                                    <i
                                                        className={
                                                            isShowPassword.confirm_password
                                                                ? "far fa-eye"
                                                                : "far fa-eye-slash"
                                                        }
                                                    ></i>
                                                </span>
                                            ) : null}
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

const mapDispatchToProps = (dispatch) => ({
    updatePasswordStartRedux: (data) => dispatch(actions.updatePasswordStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordBody);
