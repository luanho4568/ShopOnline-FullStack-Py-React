import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { FormattedMessage } from "react-intl";
import { PROVINCE_CHOICES } from "../../../utils";
import * as actions from "../../../store/actions";
import ModalEditAddress from "./ModalEditAddress";
import ModalAddress from "./ModalAddress";

class AddressInfoBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: { ...this.props.userInfo },
            isOpenModalEditAddress: false,
            address: [...this.props.addressRedux],
            isOpenModalAddress: false,
        };
    }

    async componentDidMount() {
        if (this.state.userInfo && this.state.userInfo.id) {
            await this.props.fetchGetAddressUserRedux(this.state.userInfo.id);
        }
    }
    handleAddNewAddress = () => {
        this.setState({
            isOpenModalAddress: true,
        });
    };
    toogleAddressModal = () => {
        this.setState({
            isOpenModalAddress: !this.state.isOpenModalAddress,
        });
    };
    createNewAddress = async (address) => {
        this.props.createAddressStartRedux(address,  this.state.userInfo.id);
    };
    componentDidUpdate(prevProps) {
        if (prevProps.addressRedux !== this.props.addressRedux) {
            this.setState({
                address: [...this.props.addressRedux],
            });
        }
    }

    handleDeleteAddress = async (addressId) => {
        await this.props.deleteAddressStartRedux(addressId, this.state.userInfo.id);
    };

    toogleAddressEditModal = () => {
        this.setState({
            isOpenModalEditAddress: !this.state.isOpenModalEditAddress,
        });
    };

    handleEditAddress = (address) => {
        this.setState({
            isOpenModalEditAddress: true,
            addressEdit: { ...address },
        });
    };

    doEditAdress = async (address) => {
        await this.props.editAddressStartRedux(address, this.state.userInfo.id);
    };

    render() {
        const { language } = this.props;
        const { userInfo, address } = this.state;
        return (
            <div className="container">
                <ModalAddress
                    isOpen={this.state.isOpenModalAddress}
                    toggleFromParent={this.toogleAddressModal}
                    createNewAddress={this.createNewAddress}
                />
                {this.state.isOpenModalEditAddress && (
                    <ModalEditAddress
                        isOpen={this.state.isOpenModalEditAddress}
                        toggleFromParent={this.toogleAddressEditModal}
                        currentAddress={this.state.addressEdit}
                        editAdress={this.doEditAdress}
                    />
                )}
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
                            <div className="address-header">
                                <div className="title-address">Địa chỉ của tôi</div>
                                <button className="btn-new-address" onClick={() => this.handleAddNewAddress()}>
                                    Thêm địa chỉ mới
                                </button>
                            </div>
                            <hr />
                            {address && address.length > 0 ? (
                                address.map((item, index) => (
                                    <div key={index} className="address-item">
                                        <div className="address-item-left">
                                            <div className="address">Địa chỉ: {item.address}</div>
                                            <div className="province">Tỉnh: {item.province}</div>
                                        </div>
                                        <div className="address-item-right">
                                            <div className="address-actions">
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => this.handleEditAddress(item)}
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => this.handleDeleteAddress(item.id)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-address">Bạn chưa có địa chỉ nào</div>
                            )}
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
    addressRedux: state.user.addressData,
});

const mapDispatchToProps = (dispatch) => ({
    fetchGetAddressUserRedux: (id) => dispatch(actions.fetchGetAddressUser(id)),
    editAddressStartRedux: (data, user_id) => dispatch(actions.editAddressStart(data, user_id)),
    createAddressStartRedux: (data, user_id) => dispatch(actions.createAddressStart(data, user_id)),
    deleteAddressStartRedux : (addressId, user_id) => dispatch(actions.deleteAddressStart(addressId, user_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressInfoBody);
