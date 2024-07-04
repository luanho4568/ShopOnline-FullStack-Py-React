import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            username: "",
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            phone_number: "",
            role: "",
            gender: "",
            avatar: null,
            avatarPreviewUrl: "",
        };
    }
    componentDidMount() {
        this.props.fetchRoleRedux();
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
        if (prevProps.roleRedux !== this.props.roleRedux) {
            const arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : "",
            });
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                username: "",
                email: "",
                password: "",
                first_name: "",
                last_name: "",
                phone_number: "",
                avatar: null,
                avatarPreviewUrl: "",
            });
        }
    }
    toggle = () => {
        this.props.toggleFromParent();
    };

    onChangeInput = (e, id) => {
        const copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState,
        });
    };

    // validate input
    checkvalidateInput = () => {
        let isValid = true;
        const arrCheck = ["username", "email", "password", "first_name", "last_name", "phone_number", "role", "gender"];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert(`This input is required: ${arrCheck[i]}`);
                break;
            }
        }
        return isValid;
    };

    // handle add new user
    handleAddNewUser = () => {
        const isValid = this.checkvalidateInput();
        if (!isValid) return;

        // Tạo FormData để gửi lên server
        const formData = new FormData();
        formData.append("username", this.state.username);
        formData.append("email", this.state.email);
        formData.append("password", this.state.password);
        formData.append("first_name", this.state.first_name);
        formData.append("last_name", this.state.last_name);
        formData.append("phone_number", this.state.phone_number);
        formData.append("role", this.state.role);
        formData.append("gender", this.state.gender);
        formData.append("avatar", this.state.avatar);
        this.props.createNewUser(formData).then(() => {
            this.toggle();
        });
    };

    handleOnChangeImage = (e) => {
        const file = e.target.files[0];
        const previewUrl = URL.createObjectURL(file);
        this.setState({
            avatar: file,
            avatarPreviewUrl: previewUrl,
        });
    };

    render() {
        const { language } = this.props;
        const {
            genderArr,
            roleArr,
            email,
            password,
            first_name,
            last_name,
            phone_number,
            gender,
            role,
            avatar,
            username,
            avatarPreviewUrl,
        } = this.state;
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                {...this.args}
                size="lg"
                className="modal-user-container"
            >
                <ModalHeader toggle={() => this.toggle()}>
                    <FormattedMessage id="manage-user.addnewuser" />
                </ModalHeader>
                <ModalBody>
                    <div className="user-redux-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <label>
                                        <FormattedMessage id="manage-user.firstname" />{" "}
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={first_name}
                                        onChange={(e) => this.onChangeInput(e, "first_name")}
                                    />
                                </div>
                                <div className="col-6">
                                    <label>
                                        <FormattedMessage id="manage-user.lastname" />{" "}
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={last_name}
                                        onChange={(e) => this.onChangeInput(e, "last_name")}
                                    />
                                </div>
                                <div className="col-4">
                                    <label>
                                        <FormattedMessage id="manage-user.username" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={username}
                                        onChange={(e) => this.onChangeInput(e, "username")}
                                    />
                                </div>
                                <div className="col-4">
                                    <label>Email</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        value={email}
                                        onChange={(e) => this.onChangeInput(e, "email")}
                                    />
                                </div>
                                <div className="col-4">
                                    <label>
                                        <FormattedMessage id="manage-user.password" />{" "}
                                    </label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        value={password}
                                        onChange={(e) => this.onChangeInput(e, "password")}
                                    />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.phonenumber" />{" "}
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={phone_number}
                                        onChange={(e) => this.onChangeInput(e, "phone_number")}
                                    />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.gender" />{" "}
                                    </label>
                                    <select
                                        className="form-control"
                                        onChange={(e) => this.onChangeInput(e, "gender")}
                                        value={gender}
                                    >
                                        {genderArr &&
                                            genderArr.length > 0 &&
                                            genderArr.map((item) => {
                                                return (
                                                    <>
                                                        <option key={item.key} value={item.key}>
                                                            {language === LANGUAGES.VI ? item?.valueVi : item?.valueEn}
                                                        </option>
                                                    </>
                                                );
                                            })}
                                    </select>
                                </div>

                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.role" />{" "}
                                    </label>

                                    <select
                                        className="form-control"
                                        onChange={(e) => this.onChangeInput(e, "role")}
                                        value={role}
                                    >
                                        {roleArr &&
                                            roleArr.length > 0 &&
                                            roleArr.map((item) => {
                                                return (
                                                    <>
                                                        <option key={item.key} value={item.key}>
                                                            {language === LANGUAGES.VI ? item?.valueVi : item?.valueEn}
                                                        </option>
                                                    </>
                                                );
                                            })}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.avatar" />{" "}
                                    </label>
                                    <div className="preview-img-container">
                                        <input
                                            onChange={(e) => this.handleOnChangeImage(e)}
                                            id="previewImg"
                                            type="file"
                                            hidden
                                        />
                                        <label className="label-upload" htmlFor="previewImg">
                                            Tải ảnh <i className="fas fa-upload"></i>
                                        </label>
                                        <div className="span-img">
                                            {avatarPreviewUrl ? (
                                                <img
                                                    src={avatarPreviewUrl}
                                                    alt="avatar preview"
                                                    style={{ maxWidth: "100%" }}
                                                />
                                            ) : (
                                                <FormattedMessage id="manage-user.no-avatar" />
                                            )}{" "}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            this.handleAddNewUser();
                        }}
                        className="px-3"
                    >
                        <FormattedMessage id="manage-user.addnewuser" />
                    </Button>{" "}
                    <Button color="secondary" onClick={() => this.toggle()} className="px-3">
                        <FormattedMessage id="manage-user.close" />
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRoleRedux: () => dispatch(actions.fetchRoleStart()),
        fetchGenderRedux: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
