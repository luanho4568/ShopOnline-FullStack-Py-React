import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { FormattedMessage } from "react-intl";
import { PROVINCE_CHOICES } from "../../../utils";
import * as actions from "../../../store/actions";

class AddressInfoBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            userInfo: { ...this.props.userInfo },
            address: { ...this.props.addressRedux },
        };
    }
    async componentDidMount() {
        if (this.state.userInfo && this.state.userInfo.id) {
            await this.props.fetchGetAddressUserRedux(this.state.userInfo.id);
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.addressRedux !== this.props.addressRedux) {
            const address = this.props.addressRedux;
            this.setState({
                address: { ...address },
            });
        }
    }
    onChangeInput = (e, id) => {
        const { address } = this.state;
        address[id] = e.target.value;
        this.setState({ address });
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
        await this.props.editAddressStartRedux(address)
        this.setState({ isEditing: false });
    };
    render() {
        const { language } = this.props;
        const { userInfo, address, isEditing } = this.state;
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
                                        <label>Địa chỉ</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={address.address}
                                            onChange={(e) => this.onChangeInput(e, "address")}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <label>Tỉnh</label>
                                        <select
                                            className="form-control"
                                            onChange={(e) => this.onChangeInput(e, "province")}
                                            value={address.province}
                                            disabled={!isEditing}
                                        >
                                            {PROVINCE_CHOICES.map(({ value, label }) => (
                                                <option key={value} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
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
    genderRedux: state.admin.genders,
    addressRedux: state.user.addressData,
});

const mapDispatchToProps = (dispatch) => ({
    fetchGenderRedux: () => dispatch(actions.fetchGenderStart()),
    fetchGetAddressUserRedux: (id) => dispatch(actions.fetchGetAddressUser(id)),
    editAddressStartRedux : (data) => dispatch(actions.editAddressStart(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressInfoBody);
