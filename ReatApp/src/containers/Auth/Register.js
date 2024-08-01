import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import "./Register.scss";
import { registerUserService } from "../../services/userService";
import { LANGUAGES } from "../../utils";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPassword: false,
            errMessage: "",
            genderArr: [],
            username: "",
            email: "",
            password: "",
            gender: "",
            phone_number: "",
            errCode: "",
        };
    }
    componentDidMount() {
        this.props.fetchGenderRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            const arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : "",
            });
        }
    }
    onChangeInput = (e, id) => {
        const { username, email, password, gender, phone_number } = this.state;
        const copyState = { username, email, password, gender, phone_number };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState,
        });
        console.log(copyState);
    };
    // hàm show hide password
    handleShowHidePass = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };
    handleRegister = async () => {
        const { username, password, email, gender, phone_number } = this.state;
        const data_user = {
            username,
            email,
            password,
            gender,
            phone_number,
        };
        this.setState({
            errMessage: "",
        });
        try {
            const data = await registerUserService(data_user);
            console.log(data);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.errMessage,
                    errCode: data.errCode,
                });
            }
            if (data && data.errCode === 0) {
                this.props.registerUserRedux(data);
                this.setState({
                    errMessage: data.errMessage,
                    errCode: data.errCode,
                    username: "",
                    email: "",
                    password: "",
                    gender: "",
                    phone_number: "",
                });
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
    render() {
        const { language } = this.props;
        const { genderArr } = this.state;
        return (
            <>
                <div className="login-background">
                    <div className="register-container">
                        <div className="register-content row">
                            <div className="col-12 text-register">Sign up</div>
                            <div className="col-12 form-group register-input">
                                <i class="fas fa-user"></i>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="UserName"
                                    value={this.state.username}
                                    onChange={(e) => this.onChangeInput(e, "username")}
                                />
                            </div>
                            <div className="col-12 form-group register-input">
                                <i class="fas fa-envelope"></i>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={(e) => this.onChangeInput(e, "email")}
                                />
                            </div>
                            <div className="col-12 form-group register-input">
                                <i class="fas fa-lock"></i>
                                <div className="custom-input-password">
                                    <input
                                        className="form-control"
                                        type={this.state.isShowPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={(e) => this.onChangeInput(e, "password")}
                                    />
                                    <span
                                        onClick={() => {
                                            this.handleShowHidePass();
                                        }}
                                    >
                                        <i
                                            className={this.state.isShowPassword ? "far fa-eye" : "far fa-eye-slash"}
                                        ></i>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 form-group register-input">
                                <i className="fas fa-venus-mars"></i>
                                <div className="gender-container">
                                    {genderArr &&
                                        genderArr.length > 0 &&
                                        genderArr.map((item) => (
                                            <div key={item.key} className="form-check">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    id={item.key}
                                                    value={item.key}
                                                    checked={this.state.gender === item.key}
                                                    onChange={(e) => this.onChangeInput(e, "gender")}
                                                />
                                                <label className="form-check-label" htmlFor={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </label>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="col-12 form-group register-input">
                                <i class="fas fa-phone"></i>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Phone Number"
                                    value={this.state.phone_number}
                                    onChange={(e) => this.onChangeInput(e, "phone_number")}
                                />
                            </div>

                            <p
                                className="col-12 text-center"
                                style={this.state.errCode === 0 ? { color: "green" } : { color: "red" }}
                            >
                                {this.state.errMessage}
                            </p>
                            <div className="col-12"></div>
                            <div className="col-6">
                                <button
                                    className="btn-register"
                                    onClick={() => {
                                        this.handleRegister();
                                    }}
                                >
                                    Sign up
                                </button>
                            </div>
                            <div className="col-6">
                                <button className="btn-sign-up" onClick={() => this.props.history.goBack()}>
                                    Login
                                </button>
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
        genderRedux: state.admin.genders,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (useInfo) => dispatch(actions.userLoginSuccess(useInfo)),
        registerUserRedux: (data) => dispatch(actions.registerUser(data)),
        fetchGenderRedux: () => dispatch(actions.fetchGenderStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
