import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "@mui/material/Pagination";
import "../CategoryBody.scss";
import Stack from "@mui/material/Stack";
import * as actions from "../../../store/actions";
import cart from "../../../assets/images/add-to-cart.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FormattedMessage } from "react-intl";
class LaptopBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemPerPage: 6,
            selectedBrands: [],
            selectedPriceRanges: ["all"],
        };
    }

    componentDidMount() {
        this.props.fetchAllProductLaptopStartRedux("C2");
        this.props.fetchBrandStartRedux();
    }

    handlePageChange = (event, value) => {
        this.setState({ currentPage: value });
    };
    handleBrandChange = (e) => {
        const brandId = e.target.value;
        const isChecked = e.target.checked;
        if (isChecked) {
            this.setState((prevState) => ({
                selectedBrands: [...prevState.selectedBrands, brandId],
            }));
        } else {
            this.setState((prevState) => ({
                selectedBrands: prevState.selectedBrands.filter((id) => id !== brandId),
            }));
        }
    };
    handlePriceChange = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;
        if (isChecked) {
            this.setState((prevState) => ({
                selectedPriceRanges:
                    value === "all" // kiểm tra value là all
                        ? ["all"] // thì selectedPriceRanges sẽ là all
                        : [...prevState.selectedPriceRanges.filter((range) => range !== "all"), value],
                // nếu không có thì loại bỏ all khỏi mảng và thêm value vào sau mảng
            }));
        } else {
            this.setState((prevState) => {
                // nếu không checked thì loại bỏ value
                const updatedRanges = prevState.selectedPriceRanges.filter((range) => range !== value);
                // trả về selectedPriceRanges nếu updatedRanges không có value thì thêm all vào lại mảng
                // nếu vẫn còn value thì trả về updatedRanges
                return { selectedPriceRanges: updatedRanges.length === 0 ? ["all"] : updatedRanges };
            });
        }
    };
    getPriceFilterProducts = (products) => {
        const { selectedPriceRanges } = this.state;
        if (selectedPriceRanges.includes("all")) return products;

        const priceRanges = {
            "under-2m": { min: 0, max: 2000000 },
            "2-4m": { min: 2000000, max: 4000000 },
            "4-7m": { min: 4000000, max: 7000000 },
            "7-13m": { min: 7000000, max: 13000000 },
            "13-20m": { min: 13000000, max: 20000000 },
            "above-20m": { min: 20000000, max: Infinity },
        };

        return products.filter((item) => {
            // trả về selectedPriceRanges và lấy ra phảm vi trả về
            return selectedPriceRanges.some((value) => {
                // lấy ra giá chính bằng : giá gốc * ((100 - giá giảm%) / 100)
                const price = item.selling_price * ((100 - item.discount) / 100);
                // lấy ra giá trị min max của priceRanges
                const { min, max } = priceRanges[value];
                // trả về giá trị trong khoảng min && max
                return price >= min && price <= max;
            });
        });
    };
    handleAddToCart = async (productId) => {
        const { userInfo, fetchAddItemToCartStartRedux, fetchListCartStartRedux } = this.props;
        const data = {
            user: userInfo.id,
            product: productId,
            quantity: 1,
        };
        await fetchAddItemToCartStartRedux(data);
        await fetchListCartStartRedux(userInfo.id);
    };
    render() {
        const { listProducts, brandRedux } = this.props;
        const { currentPage, itemPerPage, selectedBrands, selectedPriceRanges } = this.state;
        const indexOfLastRecord = currentPage * itemPerPage;
        const indexOfFirstRecord = indexOfLastRecord - itemPerPage;
        const productStatus = listProducts.filter((item) => item.current_status === true && item.quatity_stock > 0);
        const filteredByBrandProducts =
            selectedBrands.length > 0
                ? productStatus.filter((item) => selectedBrands.includes(item.brand))
                : productStatus;
        const filterProducts = this.getPriceFilterProducts(filteredByBrandProducts);
        const currentItems = filterProducts.slice(indexOfFirstRecord, indexOfLastRecord);

        const nPages = Math.ceil(filterProducts.length / itemPerPage);
        return (
            <>
                <div class="container">
                    <div class="content">
                        <div class="row">
                            <div class="col-md-3">
                                <h3 className="text-center mb-4">
                                    <FormattedMessage id="manage-product.brands" />
                                </h3>
                                <div className="brands">
                                    {brandRedux &&
                                        brandRedux.length > 0 &&
                                        brandRedux.map((item) => (
                                            <div className="input">
                                                <input
                                                    type="checkbox"
                                                    id={item.id}
                                                    name="brand"
                                                    value={item.name}
                                                    onChange={(e) => this.handleBrandChange(e)}
                                                />
                                                <label htmlFor={item.id}>{item.name}</label>
                                            </div>
                                        ))}
                                </div>
                                <h3 className="text-center mb-4 mt-4">
                                    <FormattedMessage id="manage-product.price" />
                                </h3>

                                <div className="price">
                                    <div className="input">
                                        <input
                                            type="checkbox"
                                            name="selling_price"
                                            value="all"
                                            checked={selectedPriceRanges.includes("all")}
                                            onChange={this.handlePriceChange}
                                        />
                                        <label>
                                            <FormattedMessage id="manage-product.all" />
                                        </label>
                                    </div>
                                    <div className="input">
                                        <input
                                            type="checkbox"
                                            name="selling_price"
                                            value="under-2m"
                                            checked={selectedPriceRanges.includes("under-2m")}
                                            onChange={this.handlePriceChange}
                                        />
                                        <label>
                                            <FormattedMessage id="manage-product.under-2m" />
                                        </label>
                                    </div>
                                    <div className="input">
                                        <input
                                            type="checkbox"
                                            name="selling_price"
                                            value="2-4m"
                                            checked={selectedPriceRanges.includes("2-4m")}
                                            onChange={this.handlePriceChange}
                                        />
                                        <label>
                                            <FormattedMessage id="manage-product.2-4m" />
                                        </label>
                                    </div>
                                    <div className="input">
                                        <input
                                            type="checkbox"
                                            name="selling_price"
                                            value="4-7m"
                                            checked={selectedPriceRanges.includes("4-7m")}
                                            onChange={this.handlePriceChange}
                                        />
                                        <label>
                                            <FormattedMessage id="manage-product.4-7m" />
                                        </label>
                                    </div>
                                    <div className="input">
                                        <input
                                            type="checkbox"
                                            name="selling_price"
                                            value="7-13m"
                                            checked={selectedPriceRanges.includes("7-13m")}
                                            onChange={this.handlePriceChange}
                                        />
                                        <label>
                                            <FormattedMessage id="manage-product.7-13m" />
                                        </label>
                                    </div>
                                    <div className="input">
                                        <input
                                            type="checkbox"
                                            name="selling_price"
                                            value="13-20m"
                                            checked={selectedPriceRanges.includes("13-20m")}
                                            onChange={this.handlePriceChange}
                                        />
                                        <label>
                                            <FormattedMessage id="manage-product.13-20m" />
                                        </label>
                                    </div>
                                    <div className="input">
                                        <input
                                            type="checkbox"
                                            name="selling_price"
                                            value="above-20m"
                                            checked={selectedPriceRanges.includes("above-20m")}
                                            onChange={this.handlePriceChange}
                                        />
                                        <label>
                                            <FormattedMessage id="manage-product.above-20m" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div className="product-list">
                                    {currentItems &&
                                        currentItems.length > 0 &&
                                        currentItems.map((item) => (
                                            <div className="ctgphone-customize">
                                                <div className="ctgphone-customize-max-height">
                                                    <Link to={`/product-detail/${item.id}`}>
                                                        <div className="ctgphone-image">
                                                            <div className="bg-img">
                                                                <div
                                                                    className="img"
                                                                    style={{
                                                                        backgroundImage: `URL(http://localhost:8000/static${item.product_image})`,
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                        <div className="ctgphone-name">{item.title}</div>
                                                        {item.discount && item.discount > 0 ? (
                                                            <div className="ctgphone-price-discount">
                                                                <div
                                                                    className="reduced-price"
                                                                    style={{
                                                                        background: `linear-gradient(to left, #E58D90  ${
                                                                            item.discount
                                                                        }%, #cb1c22 ${100 - item.discount}%)`,
                                                                    }}
                                                                >
                                                                    {item.selling_price * ((100 - item.discount) / 100)}
                                                                    ₫
                                                                </div>

                                                                <div className="main-price">
                                                                    <div className="main-price-discount">
                                                                        {item.selling_price}₫{" "}
                                                                    </div>
                                                                    <span className="discount"> {-item.discount}%</span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div
                                                                className="ctgphone-price"
                                                                style={{ backgroundColor: "#cb1c22" }}
                                                            >
                                                                <div className="main-price">{item.selling_price}₫</div>
                                                            </div>
                                                        )}

                                                        <div className="ctgphone-descript">
                                                            {item.description &&
                                                                item.description.split("\n").map((item, key) => {
                                                                    return <p key={key}>{item}</p>;
                                                                })}
                                                        </div>
                                                    </Link>
                                                    <div className="ctgphone-btn">
                                                        <button className="btn-buy">
                                                            {" "}
                                                            <FormattedMessage id="manage-product.buy-now" />
                                                        </button>
                                                        <button
                                                            className="btn-cart"
                                                            onClick={() => this.handleAddToCart(item.id)}
                                                            style={{ backgroundImage: `url(${cart})` }}
                                                        ></button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
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
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    listProducts: state.product.productsLaptop,
    userInfo: state.user.userInfo,
    brandRedux: state.product.brands,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllProductLaptopStartRedux: (category_key) => dispatch(actions.fetchAllProductLaptopStart(category_key)),
    fetchBrandStartRedux: () => dispatch(actions.fetchBrandStart()),
    fetchAddItemToCartStartRedux: (data) => dispatch(actions.fetchAddItemToCartStart(data)),
    fetchListCartStartRedux: (user_id) => dispatch(actions.fetchListCartStart(user_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LaptopBody);
