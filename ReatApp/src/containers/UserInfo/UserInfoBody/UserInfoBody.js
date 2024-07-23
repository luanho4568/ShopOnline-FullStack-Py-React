import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";

class UserInfoBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            avatarPreviewUrl: "",
            isAvtExist: false,
            isEditing: false,
            userInfo: { ...this.props.userInfo },
        };
    }

    async componentDidMount() {
        await this.props.fetchGenderRedux();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            const arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : "",
            });
        }
        if (prevProps.userInfo !== this.props.userInfo) {
            const user = this.props.userInfo;
            this.setState({
                userInfo: { ...user },
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
            userInfo: { ...this.props.userInfo },
        });
    };

    handleSave = () => {
        const { isAvtExist, userInfo } = this.state;
        const formData = new FormData();

        formData.append("id", userInfo.id);
        formData.append("first_name", userInfo.first_name);
        formData.append("last_name", userInfo.last_name);
        formData.append("phone_number", userInfo.phone_number);
        formData.append("gender", userInfo.gender);

        if (isAvtExist) {
            formData.append("avatar", userInfo.avatar);
        }
        this.props.editUserRedux(formData);
        this.setState({ isEditing: false });
    };

    handleOnChangeImage = (e) => {
        const file = e.target.files[0];
        const { userInfo } = this.state;
        const previewUrl = URL.createObjectURL(file);
        userInfo.avatar = file;
        this.setState({
            avatarPreviewUrl: previewUrl,
            isAvtExist: true,
            userInfo,
        });
    };

    render() {
        const { language } = this.props;
        const { userInfo, genderArr, avatarPreviewUrl, isEditing } = this.state;
        if (!userInfo) {
            return null;
        }
        return (
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
                                <div className="col-6">
                                    <label>
                                        <FormattedMessage id="manage-user.firstname" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={userInfo.first_name}
                                        onChange={(e) => this.onChangeInput(e, "first_name")}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="col-6">
                                    <label>
                                        <FormattedMessage id="manage-user.lastname" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={userInfo.last_name}
                                        onChange={(e) => this.onChangeInput(e, "last_name")}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label>
                                        <FormattedMessage id="manage-user.username" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={userInfo.username}
                                        onChange={(e) => this.onChangeInput(e, "username")}
                                        disabled
                                    />
                                </div>
                                <div className="col-6">
                                    <label>Email</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        value={userInfo.email}
                                        onChange={(e) => this.onChangeInput(e, "email")}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label>
                                        <FormattedMessage id="manage-user.phonenumber" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={userInfo.phone_number}
                                        onChange={(e) => this.onChangeInput(e, "phone_number")}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="col-6">
                                    <label>
                                        <FormattedMessage id="manage-user.gender" />
                                    </label>
                                    <select
                                        className="form-control"
                                        onChange={(e) => this.onChangeInput(e, "gender")}
                                        disabled={!isEditing}
                                        value={userInfo.gender}
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
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <label className="lb-avatar">
                                        <FormattedMessage id="manage-user.avatar" />
                                    </label>
                                    <div className="preview-img-container">
                                        <input
                                            onChange={(e) => this.handleOnChangeImage(e)}
                                            id="previewImg"
                                            type="file"
                                            hidden
                                            disabled={!isEditing}
                                        />
                                        <label className="label-upload-img" htmlFor="previewImg">
                                            Tải ảnh <i className="fas fa-upload"></i>
                                        </label>
                                        {avatarPreviewUrl ? (
                                            <div className="img-avatar">
                                                <img
                                                    src={avatarPreviewUrl}
                                                    alt="avatar preview"
                                                    style={{ maxWidth: "100%" }}
                                                />
                                            </div>
                                        ) : userInfo.avatar ? (
                                            <div className="img-avatar">
                                                <img
                                                    src={`http://localhost:8000/static${userInfo.avatar}`}
                                                    alt="avatar preview"
                                                    style={{ maxWidth: "100%" }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="img-avatar">
                                                <FormattedMessage id="manage-user.no-avatar" />
                                            </div>
                                        )}
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
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
    userInfo: state.user.userInfo,
    genderRedux: state.admin.genders,
});

const mapDispatchToProps = (dispatch) => ({
    fetchGenderRedux: () => dispatch(actions.fetchGenderStart()),
    editUserRedux: (data) => dispatch(actions.editUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoBody);
