import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import * as actions from "../../../store/actions";
import { LANGUAGES, DISCOUNT_CHOICES } from "../../../utils";
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryArr: [],
            brandArr: [],
            title: "",
            selling_price: "",
            description: "",
            discount: DISCOUNT_CHOICES[0].value,
            brand: "",
            category: "",
            quatity_stock: "",
            product_image: "",
        };
    }
    componentDidMount() {
        this.props.fetchCategoryRedux();
        this.props.fetchBrandRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.categorysRedux !== this.props.categorysRedux) {
            const arrCategorys = this.props.categorysRedux;
            this.setState({
                categoryArr: arrCategorys,
                category: arrCategorys && arrCategorys.length > 0 ? arrCategorys[0].key : "",
            });
        }
        if (prevProps.brandsRedux !== this.props.brandsRedux) {
            const arrBrands = this.props.brandsRedux;
            this.setState({
                brandArr: arrBrands,
                brand: arrBrands && arrBrands.length > 0 ? arrBrands[0].name : "",
            });
        }
        if (prevProps.listProducts !== this.props.listProducts) {
            this.setState({
                title: "",
                selling_price: "",
                description: "",
                discount: DISCOUNT_CHOICES[0].value,
                brand: "",
                category: "",
                quatity_stock: "",
                product_image: "",
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
        const arrCheck = ["title", "selling_price", "description", "quatity_stock"];
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
        this.props.createNewProduct(this.state).then(() => {
            this.toggle();
        });
    };

    render() {
        const { language } = this.props;
        const {
            categoryArr,
            brandArr,
            title,
            selling_price,
            description,
            discount,
            brand,
            category,
            quatity_stock,
            product_image,
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
                    <FormattedMessage id="manage-product.add-product" />
                </ModalHeader>
                <ModalBody>
                    <div className="user-redux-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-4">
                                    <label>
                                        <FormattedMessage id="manage-product.title" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={title}
                                        onChange={(e) => this.onChangeInput(e, "title")}
                                    />
                                </div>
                                <div className="col-4">
                                    <label>
                                        <FormattedMessage id="manage-product.price" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={selling_price}
                                        onChange={(e) => this.onChangeInput(e, "selling_price")}
                                    />
                                </div>
                                <div className="col-4">
                                    <label>
                                        <FormattedMessage id="manage-product.quatity-stock" />
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={quatity_stock}
                                        onChange={(e) => this.onChangeInput(e, "quatity_stock")}
                                    />
                                </div>
                                <div className="col-12">
                                    <label>
                                        <FormattedMessage id="manage-product.description" />
                                    </label>
                                    <textarea
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => this.onChangeInput(e, "description")}
                                    />
                                </div>
                                <div className="col-3">
                                    <label>Discount</label>
                                    <select
                                        className="form-control"
                                        onChange={(e) => this.onChangeInput(e, "discount")}
                                        value={discount}
                                    >
                                        {DISCOUNT_CHOICES.map(({ value, label }) => (
                                            <option key={value} value={value}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-product.category" />{" "}
                                    </label>
                                    <select
                                        className="form-control"
                                        onChange={(e) => this.onChangeInput(e, "category")}
                                        value={category}
                                    >
                                        {categoryArr &&
                                            categoryArr.length > 0 &&
                                            categoryArr.map((item) => {
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
                                        <FormattedMessage id="manage-product.brand" />{" "}
                                    </label>
                                    <select
                                        className="form-control"
                                        onChange={(e) => this.onChangeInput(e, "brand")}
                                        value={brand}
                                    >
                                        {brandArr &&
                                            brandArr.length > 0 &&
                                            brandArr.map((item) => (
                                                <option key={item.name} value={item.name}>
                                                    {item.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-product.image" />{" "}
                                    </label>
                                    <div className="preview-img-container">
                                        <input
                                            onChange={(e) => this.handleOnchangeImage(e)}
                                            id="previewImg"
                                            type="file"
                                            hidden
                                        />
                                        <label className="label-upload" htmlFor="previewImg">
                                            Tải ảnh <i className="fas fa-upload"></i>
                                        </label>
                                        <div
                                            className="preview-image"
                                            style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                            onClick={() => this.openPreviewImage()}
                                        ></div>
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
                            this.handleAddNewProduct();
                        }}
                        className="px-3"
                    >
                        <FormattedMessage id="manage-product.add-product" />
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
        categorysRedux: state.product.categorys,
        brandsRedux: state.product.brands,
        listProducts: state.product.products,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategoryRedux: () => dispatch(actions.fetchCategoryStart()),
        fetchBrandRedux: () => dispatch(actions.fetchBrandStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
