import React, { Component } from "react";
import { connect } from "react-redux";
import ModalStaff from "./ModalStaff";
import * as actions from "../../../store/actions";
import ModalEditStaff from "./ModalEditStaff";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import "../StyleImage.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
class StaffManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUserStaff: [],
            isOpenModalUser: false,
            isOpenModalEidtUser: false,
            userEdit: {},
            currentPage: 1,
            itemPerPage: 7,
        };
    }

    componentDidMount() {
        this.props.fetchAllUserRedux("R2");
        this.props.fetchRoleRedux();
        this.props.fetchGenderStart();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                arrUserStaff: this.props.listUsers,
            });
        }
    }
    // handle add new user
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    };

    toogleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };

    toogleUserEditModal = () => {
        this.setState({
            isOpenModalEidtUser: !this.state.isOpenModalEidtUser,
        });
    };

    createNewUser = async (data) => {
        this.props.createNewUserRedux(data, "R2");
    };

    // handle delete user
    handleDeleteUser = async (userId) => {
        await this.props.deleteOneUserRedux(userId, "R2");
    };

    // handle edit user
    handleEditUser = (user) => {
        this.setState({
            isOpenModalEidtUser: true,
            userEdit: { ...user },
        });
    };

    doEditUser = async (user) => {
        await this.props.editOneUserRedux(user, "R2");
    };
    handlePageChange = (event, value) => {
        this.setState({ currentPage: value });
    };
    render() {
        const { arrUserStaff, currentPage, itemPerPage } = this.state;
        const { roleRedux, language, genderRedux } = this.props;
        const indexOfLastRecord = currentPage * itemPerPage;
        const indexOfFirstRecord = indexOfLastRecord - itemPerPage;
        const currentItems = arrUserStaff.slice(indexOfFirstRecord, indexOfLastRecord);
        const nPages = Math.ceil(arrUserStaff.length / itemPerPage);
        return (
            <div className="users-container">
                <ModalStaff
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toogleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEidtUser && (
                    <ModalEditStaff
                        isOpen={this.state.isOpenModalEidtUser}
                        toggleFromParent={this.toogleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                )}
                <div className="title text-center">
                    <FormattedMessage id="manage-user.manage-staff" />
                </div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3" onClick={() => this.handleAddNewUser()}>
                        <i className="fas fa-plus"></i> <FormattedMessage id="manage-user.addnewuser" />
                    </button>
                </div>
                <div className="users-table mt-4 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>
                                    <FormattedMessage id="manage-user.username" />
                                </th>
                                <th>Email</th>
                                <th>
                                    <FormattedMessage id="manage-user.firstname" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user.lastname" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user.phonenumber" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user.gender" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user.role" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user.avatar" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user.action" />
                                </th>
                            </tr>
                            {currentItems &&
                                currentItems.map((item) => {
                                    const avatar = item.avatar;
                                    const role = roleRedux.find((role) => role.key === item.role);
                                    const gender = genderRedux.find((gender) => gender.key === item.gender);
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.first_name}</td>
                                            <td>{item.last_name}</td>
                                            <td>{item.phone_number}</td>

                                            <td>{language === LANGUAGES.VI ? gender?.valueVi : gender?.valueEn}</td>
                                            <td>{language === LANGUAGES.VI ? role?.valueVi : role?.valueEn}</td>
                                            <td>
                                                <div
                                                    className="preview-avatar"
                                                    style={{
                                                        backgroundImage: `url(http://localhost:8000/static${avatar})`,
                                                    }}
                                                ></div>
                                            </td>
                                            <td>
                                                <button className="btn-edit" onClick={() => this.handleEditUser(item)}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => this.handleDeleteUser(item)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                    <Stack spacing={2} className="mt-4">
                        <Pagination
                            count={nPages}
                            page={currentPage}
                            onChange={this.handlePageChange}
                            showFirstButton
                            showLastButton
                        />
                    </Stack>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listUsers: state.admin.users,
        roleRedux: state.admin.roles,
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllUserRedux: (role_key) => dispatch(actions.fetchAllUserStart(role_key)),
        fetchRoleRedux: () => dispatch(actions.fetchRoleStart()),
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        createNewUserRedux: (data, role_key) => dispatch(actions.createNewUser(data, role_key)),
        deleteOneUserRedux: (data, role_key) => dispatch(actions.deleteOneUser(data, role_key)),
        editOneUserRedux: (data, role_key) => dispatch(actions.editOneUser(data, role_key)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffManage);
