import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            password: "HashPassword",
            avatarPreviewUrl: "",
            isAvtExist: false,
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
    }
    toggle = () => {
        this.props.toggleFromParent();
    };

    onChangeInput = (e, id) => {
        const { currentUser } = this.props;
        currentUser[id] = e.target.value;
        this.setState({ currentUser });
    };
    // handle save user
    handleSaveUser = () => {
        const { currentUser } = this.props;
        const { isAvtExist } = this.state;
        const formData = new FormData();

        // Thêm các trường thông tin người dùng vào FormData
        formData.append("id", currentUser.id);
        formData.append("first_name", currentUser.first_name);
        formData.append("last_name", currentUser.last_name);
        formData.append("phone_number", currentUser.phone_number);
        formData.append("gender", currentUser.gender);
        formData.append("role", currentUser.role);

        if (isAvtExist) {
            formData.append("avatar", currentUser.avatar);
        }
        // Gọi action editUser với FormData
        this.props.editUser(formData).then(() => {
            this.toggle();
        });
    };
    handleOnChangeImage = (e) => {
        const file = e.target.files[0];
        const { currentUser } = this.props;
        const previewUrl = URL.createObjectURL(file);
        currentUser.avatar = file;
        this.setState({
            avatarPreviewUrl: previewUrl,
            isAvtExist: true,
        });
    };
    render() {
        const { language, currentUser } = this.props;
        const { genderArr, roleArr, password, avatarPreviewUrl } = this.state;
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} size="lg" className="modal-user-container">
                <ModalHeader toggle={() => this.toggle()}>
                    <FormattedMessage id="manage-user.edit-user" />
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
                                        value={currentUser.first_name}
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
                                        value={currentUser.last_name}
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
                                        value={currentUser.username}
                                        onChange={(e) => this.onChangeInput(e, "username")}
                                        disabled
                                    />
                                </div>
                                <div className="col-4">
                                    <label>Email</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        value={currentUser.email}
                                        onChange={(e) => this.onChangeInput(e, "email")}
                                        disabled
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
                                        disabled
                                    />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.phonenumber" />{" "}
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={currentUser.phone_number}
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
                                        value={currentUser.gender}
                                    >
                                        {genderArr &&
                                            genderArr.length > 0 &&
                                            genderArr.map((item) => (
                                                <option key={item.key} value={item.key}>
                                                    {language === LANGUAGES.VI ? item?.valueVi : item?.valueEn}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.role" />{" "}
                                    </label>
                                    <select
                                        className="form-control"
                                        onChange={(e) => this.onChangeInput(e, "role")}
                                        value={currentUser.role}
                                    >
                                        {roleArr &&
                                            roleArr.length > 0 &&
                                            roleArr.map((item) => (
                                                <option key={item.key} value={item.key}>
                                                    {language === LANGUAGES.VI ? item?.valueVi : item?.valueEn}
                                                </option>
                                            ))}
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
                                        {avatarPreviewUrl ? (
                                            <div className="span-img">
                                                <img
                                                    src={avatarPreviewUrl}
                                                    alt="avatar preview"
                                                    style={{ maxWidth: "100%" }}
                                                />
                                            </div>
                                        ) : currentUser.avatar ? (
                                            <div className="span-img">
                                                <img
                                                    src={`http://localhost:8000/static${currentUser.avatar}`}
                                                    alt="avatar preview"
                                                    style={{ maxWidth: "100%" }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="span-img">
                                                <FormattedMessage id="manage-user.no-avatar" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSaveUser()} className="px-3">
                        <FormattedMessage id="manage-user.save" />
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
