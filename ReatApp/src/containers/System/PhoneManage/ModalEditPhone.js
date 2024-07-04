import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { LANGUAGES , DISCOUNT_CHOICES} from "../../../utils";

class ModalEditPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryArr: [],
            brandArr: [],
            title: "",
            selling_price: "",
            description: "",
            discount: "",
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
    }
    toggle = () => {
        this.props.toggleFromParent();
    };

    onChangeInput = (e, id) => {
        const { currentProduct } = this.props;
        currentProduct[id] = e.target.value;
        this.setState({ currentProduct });
    };
    // handle save user
    handleSaveProduct = () => {
        this.props.editProduct(this.state.currentProduct).then(() => {
            this.toggle();
        });
    };

    render() {
        const { language, currentProduct } = this.props;
        const { categoryArr, brandArr } = this.state;
        console.log(currentProduct);
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} size="lg" className="modal-user-container">
                <ModalHeader toggle={() => this.toggle()}>
                    <FormattedMessage id="manage-user.edit-user" />
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
                                        value={currentProduct.title}
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
                                        value={currentProduct.selling_price}
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
                                        value={currentProduct.quatity_stock}
                                        onChange={(e) => this.onChangeInput(e, "quatity_stock")}
                                    />
                                </div>
                                <div className="col-12">
                                    <label>
                                        <FormattedMessage id="manage-product.description" />
                                    </label>
                                    <textarea
                                        className="form-control"
                                        value={currentProduct.description}
                                        onChange={(e) => this.onChangeInput(e, "description")}
                                    />
                                </div>
                                <div className="col-3">
                                    <label>Discount</label>
                                    <select
                                        className="form-control"
                                        onChange={(e) => this.onChangeInput(e, "discount")}
                                        value={currentProduct.discount}
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
                                        value={currentProduct.category}
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
                                        value={currentProduct.brand}
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
                                        <FormattedMessage id="manage-user.avatar" />{" "}
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
                                            style={{ backgroundImage: `url(${currentProduct.product_image})` }}
                                            onClick={() => this.openPreviewImage()}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSaveProduct()} className="px-3">
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditPhone);
