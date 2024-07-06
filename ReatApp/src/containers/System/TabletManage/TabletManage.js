import React, { Component } from "react";
import { connect } from "react-redux";
import ModalTablet from "./ModalTablet";
import * as actions from "../../../store/actions";
import ModalEditTablet from "./ModalEditTablet";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import "../StyleImage.scss";
import Pagination from "@mui/material/Pagination"; 
import Stack from "@mui/material/Stack"; 

class TabletManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrProductPhone: [],
            isOpenModalTablet: false,
            isOpenModalEidtPhone: false,
            productEdit: {},
            currentPage: 1,
            itemPerPage: 7,
        };
    }

    componentDidMount() {
        this.props.fetchAllProductStartRedux("C3");
        this.props.fetchCategoryStartRedux();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listProducts !== this.props.listProducts) {
            this.setState({
                arrProductPhone: this.props.listProducts,
            });
        }
    }

    handleAddNewProduct = () => {
        this.setState({
            isOpenModalTablet: true,
        });
    };

    toogleProductModal = () => {
        this.setState({
            isOpenModalTablet: !this.state.isOpenModalTablet,
        });
    };

    toogleproductEditModal = () => {
        this.setState({
            isOpenModalEidtPhone: !this.state.isOpenModalEidtPhone,
        });
    };

    createNewProduct = async (data) => {
        this.props.createNewProductRedux(data, "C3");
    };

    handleDeleteProduct = async (product) => {
        await this.props.deleteOneProductRedux(product, "C3");
    };

    handleEditProduct = (product) => {
        this.setState({
            isOpenModalEidtPhone: true,
            productEdit: { ...product },
        });
    };

    doEditProduct = async (product) => {
        await this.props.editOneProductRedux(product, "C3");
    };

    handlePageChange = (event, value) => {
        this.setState({ currentPage: value });
    };

    render() {
        const { arrProductPhone, currentPage, itemPerPage } = this.state;
        const { categoryRedux, language } = this.props;
        const indexOfLastRecord = currentPage * itemPerPage;
        const indexOfFirstRecord = indexOfLastRecord - itemPerPage;
        const currentItems = arrProductPhone.slice(indexOfFirstRecord, indexOfLastRecord);
        const nPages = Math.ceil(arrProductPhone.length / itemPerPage);

        return (
            <div className="users-container">
                <ModalTablet
                    isOpen={this.state.isOpenModalTablet}
                    toggleFromParent={this.toogleProductModal}
                    createNewProduct={this.createNewProduct}
                />
                {this.state.isOpenModalEidtPhone && (
                    <ModalEditTablet
                        isOpen={this.state.isOpenModalEidtPhone}
                        toggleFromParent={this.toogleproductEditModal}
                        currentProduct={this.state.productEdit}
                        editProduct={this.doEditProduct}
                    />
                )}
                <div className="title text-center">
                    <FormattedMessage id="manage-product.manage-phone" />
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
                            {currentItems &&
                                currentItems.map((item) => {
                                    const img = item.product_image;
                                    console.log(item);
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
                                                    className="btn-add"
                                                    onClick={() => this.handleAddNewProduct()}
                                                >
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => this.handleEditProduct(item)}
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => this.handleDeleteProduct(item.id)}
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
        deleteOneProductRedux: (data, category_key) => dispatch(actions.deleteOneProduct(data, category_key)),
        editOneProductRedux: (data, category_key) => dispatch(actions.editOneProduct(data, category_key)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabletManage);
