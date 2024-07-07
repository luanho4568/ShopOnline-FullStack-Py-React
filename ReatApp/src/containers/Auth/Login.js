import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLoginAPI } from "../../services/userService";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: "",
        };
    }

    // hàm thay đổi value khi nhập
    handleOnChangeUsername = (e) => {
        this.setState({
            username: e.target.value,
        });
    };

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    // hàm xử lý login
    handleLogin = async () => {
        this.setState({
            errMessage: "",
        });
        try {
            const data = await handleLoginAPI(
                this.state.username,
                this.state.password
            );
            console.log(data);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.errMessage,
                });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.errMessage,
                    });
                }
            }
        }
    };

    // hàm show hide password
    handleShowHidePass = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };

    render() {
        return (
            <>
                <div className="login-background">
                    <div className="login-container">
                        <div className="login-content row">
                            <div className="col-12 text-login">Login</div>
                            <div className="col-12 form-group login-input">
                                <label>Username:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your username..."
                                    value={this.state.username}
                                    onChange={(e) =>
                                        this.handleOnChangeUsername(e)
                                    }
                                />
                            </div>
                            <div className="col-12 form-group login-input">
                                <label>Password:</label>
                                <div className="custom-input-password">
                                    <input
                                        className="form-control"
                                        type={
                                            this.state.isShowPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Enter your password..."
                                        value={this.state.password}
                                        onChange={(e) =>
                                            this.handleOnChangePassword(e)
                                        }
                                    />
                                    <span
                                        onClick={() => {
                                            this.handleShowHidePass();
                                        }}
                                    >
                                        <i
                                            className={
                                                this.state.isShowPassword
                                                    ? "far fa-eye"
                                                    : "far fa-eye-slash"
                                            }
                                        ></i>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12" style={{ color: "red" }}>
                                {this.state.errMessage}
                            </div>
                            <div className="col-12">
                                <span className="forgot-password">
                                    Forgot your password?
                                </span>
                            </div>
                            <div className="col-12">
                                <button
                                    className="btn-login"
                                    onClick={() => {
                                        this.handleLogin();
                                    }}
                                >
                                    Login
                                </button>
                            </div>
                            <div className="col-12 text-center mt-3">
                                <span className="text-other-login">
                                    Or Login with:
                                </span>
                            </div>
                            <div className="col-12 social-login">
                                <i className="fab fa-facebook fb"></i>
                                <i className="fab fa-google-plus gg"></i>
                            </div>
                        </div>
                    </div>
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
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (useInfo) =>
            dispatch(actions.userLoginSuccess(useInfo)),
    };
};  

export default connect(mapStateToProps, mapDispatchToProps)(Login);
