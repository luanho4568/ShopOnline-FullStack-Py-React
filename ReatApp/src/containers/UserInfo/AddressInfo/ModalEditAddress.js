import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { LANGUAGES, PROVINCE_CHOICES } from "../../../utils";

class ModalEditAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}
    componentDidUpdate(prevProps, prevState, snapshot) {}
    toggle = () => {
        this.props.toggleFromParent();
    };

    onChangeInput = (e, id) => {
        const { currentAddress } = this.props;
        currentAddress[id] = e.target.value;
        this.setState({ currentAddress });
    };

    handleSaveUser = () => {
        const { currentAddress } = this.props;
        const formData = new FormData();
        formData.append("id", currentAddress.id);
        formData.append("user", currentAddress.user.id);
        formData.append("address", currentAddress.address);
        formData.append("province", currentAddress.province);
        this.props.editAdress(formData).then(() => {
            this.toggle();
        });
    };

    render() {
        const { language, currentAddress } = this.props;
        console.log(currentAddress);
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} size="None" className="modal-user-container">
                <ModalHeader toggle={() => this.toggle()}>Edit Address</ModalHeader>
                <ModalBody>
                    <div className="address-redux-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <label>Địa chỉ</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={currentAddress.address}
                                        onChange={(e) => this.onChangeInput(e, "address")}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <label>Tỉnh</label>
                                    <select
                                        className="form-control"
                                        onChange={(e) => this.onChangeInput(e, "province")}
                                        value={currentAddress.province}
                                    >
                                        {PROVINCE_CHOICES.map(({ value, label }) => (
                                            <option key={value} value={value}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => this.handleSaveUser()} className="px-3 btn-save">
                        Lưu địa chỉ
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
        userInfo: state.user.userInfo,
        addressRedux: state.user.addressData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditAddress);
