import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { LANGUAGES, DISCOUNT_CHOICES, PROVINCE_CHOICES } from "../../../utils";
class ModalAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            province: "",
        };
    }
    componentDidMount() {}
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.addressRedux !== this.props.addressRedux) {
            this.setState({
                address: "",
                province: "",
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
        const arrCheck = ["address", "province"];
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
    handleAddNewProduct = () => {
        const isValid = this.checkvalidateInput();
        if (!isValid) return;
        const { userInfo } = this.props;
        const { address, province } = this.state;
        const formData = new FormData();
        formData.append("user", userInfo.id);
        formData.append("address", address);
        formData.append("province", province);
        this.props.createNewAddress(formData).then(() => {
            this.toggle();
        });
    };
    render() {
        const { language, addressRedux } = this.props;
        const { address, province } = this.state;
        console.log(addressRedux);
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                {...this.args}
                size="None"
                className="modal-user-container"
            >
                <ModalHeader toggle={() => this.toggle()}>Thêm địa chỉ</ModalHeader>
                <ModalBody>
                    <div className="user-redux-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <label>Địa chỉ</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={address}
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
                                        value={province}
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
                    <Button
                        onClick={() => {
                            this.handleAddNewProduct();
                        }}
                        className="px-3 btn-save"
                    >
                        Thêm địa chỉ
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
        addressRedux: state.user.addressData || [],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddress);
