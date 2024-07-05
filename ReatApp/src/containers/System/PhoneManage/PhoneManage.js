import React, { Component } from "react";
import { connect } from "react-redux";
import ModalPhone from "./ModalPhone";
import * as actions from "../../../store/actions";
import ModalEditPhone from "./ModalEditPhone";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import "../StyleImage.scss";

class PhoneManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalPhone: false,
            isOpenModalEidtPhone: false,
            productEdit: {},
        };
    }

    componentDidMount() {
        this.props.fetchAllProductStartRedux("C1");
        this.props.fetchCategoryStartRedux();
    }

    // handle add new product
    handleAddNewProduct = () => {
        this.setState({
            isOpenModalPhone: true,
        });
    };

    toogleProductModal = () => {
        this.setState({
            isOpenModalPhone: !this.state.isOpenModalPhone,
        });
    };

    toogleproductEditModal = () => {
        this.setState({
            isOpenModalEidtPhone: !this.state.isOpenModalEidtPhone,
        });
    };

    createNewProduct = async (data) => {
        this.props.createNewProductRedux(data, "C1");
    };

    // handle delete product
    handleDeleteProduct = async (productId) => {
        await this.props.deleteOneProductRedux(productId, "C1");
    };

    // handle edit product
    handleEditProduct = (product) => {
        this.setState({
            isOpenModalEidtPhone: true,
            productEdit: { ...product },
        });
    };

    doEditProduct = async (product) => {
        await this.props.editOneProductRedux(product, "C1");
    };

    render() {
        const { currentItemsProduct } = this.props;
        const { categoryRedux, language } = this.props;
        return (
            <div className="users-container">
                <ModalPhone
                    isOpen={this.state.isOpenModalPhone}
                    toggleFromParent={this.toogleProductModal}
                    createNewProduct={this.createNewProduct}
                />
                {this.state.isOpenModalEidtPhone && (
                    <ModalEditPhone
                        isOpen={this.state.isOpenModalEidtPhone}
                        toggleFromParent={this.toogleproductEditModal}
                        currentProduct={this.state.productEdit}
                        editProduct={this.doEditProduct}
                    />
                )}
                <div className="title text-center">
                    <FormattedMessage id="manage-product.manage-phone" />
                </div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3" onClick={() => this.handleAddNewProduct()}>
                        <i className="fas fa-plus"></i> <FormattedMessage id="manage-product.add-product" />
                    </button>
                </div>
                <div className="users-table mt-4 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>
                                    <FormattedMessage id="manage-product.title" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-product.price" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-product.description" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-product.discount" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-product.quatity-stock" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-product.brand" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-product.category" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-product.image" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-product.current-status" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user.action" />
                                </th>
                            </tr>
                            {currentItemsProduct &&
                                currentItemsProduct.map((item) => {
                                    const img = item.product_image;
                                    const category = categoryRedux.find((category) => category.key === item.category);
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.title}</td>
                                            <td>{item.selling_price}</td>
                                            <td>{item.description}</td>
                                            <td>{item.discount}%</td>
                                            <td>
                                                {item.quatity_stock} <FormattedMessage id="manage-product.items" />
                                            </td>
                                            <td>{item.brand}</td>
                                            <td>{language === LANGUAGES.VI ? category?.valueVi : category?.valueEn}</td>
                                            <td>
                                                <div
                                                    className="preview-avatar"
                                                    style={{
                                                        backgroundImage: `url(http://localhost:8000/static${img})`,
                                                    }}
                                                ></div>
                                            </td>
                                            <td>
                                                {item.current_status ? (
                                                    <FormattedMessage id="manage-product.in-stock" />
                                                ) : (
                                                    <FormattedMessage id="manage-product.out-of-stock" />
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => this.handleEditProduct(item)}
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => this.handleDeleteProduct(item)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listProducts: state.product.products,
        categoryRedux: state.product.categorys,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllProductStartRedux: (category_key) => dispatch(actions.fetchAllProductStart(category_key)),
        fetchCategoryStartRedux: () => dispatch(actions.fetchCategoryStart()),
        createNewProductRedux: (data, category_key) => dispatch(actions.createNewProduct(data, category_key)),
        deleteOneProductRedux: (productId, category_key) =>
            dispatch(actions.deleteOneProduct(productId, category_key)),
        editOneProductRedux: (data, category_key) => dispatch(actions.editOneProduct(data, category_key)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneManage);
