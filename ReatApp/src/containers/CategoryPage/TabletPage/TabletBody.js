import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "@mui/material/Pagination";
import "../CategoryBody.scss";
import Stack from "@mui/material/Stack";
import * as actions from "../../../store/actions";
import cart from "../../../assets/images/add-to-cart.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
class TabletBody extends Component {
    state = {
        currentPage: 1,
        itemPerPage: 6,
        selectedBrands: [],
        selectedPriceRanges: ["all"],
    };

    componentDidMount() {
        this.props.fetchAllProductTabletStartRedux("C3");
        this.props.fetchBrandStartRedux();
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageRedux(language);
    };

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
    render() {
        const { listProducts, brandRedux } = this.props;
        const { currentPage, itemPerPage, selectedBrands, selectedPriceRanges } = this.state;
        const indexOfLastRecord = currentPage * itemPerPage;
        const indexOfFirstRecord = indexOfLastRecord - itemPerPage;
        const productStatus = listProducts.filter((item) => item.current_status === true);
        const currentItems = productStatus.slice(indexOfFirstRecord, indexOfLastRecord);
        const filteredByBrandProducts =
            selectedBrands.length > 0
                ? currentItems.filter((item) => selectedBrands.includes(item.brand))
                : currentItems;
        const filteredProducts = this.getPriceFilterProducts(filteredByBrandProducts);

        const nPages = Math.ceil(productStatus.length / itemPerPage);
        return (
            <>
                <div class="container">
                    <div class="content">
                        <div class="row">
                            <div class="col-md-3">
                                <h3 className="text-center mb-4">Brands</h3>
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
                                <h3 className="text-center mb-4 mt-4">Price</h3>

                                <div className="price">
                                    <div className="input">
                                        <input
                                            type="checkbox"
                                            name="selling_price"
                                            value="all"
                                            checked={selectedPriceRanges.includes("all")}
                                            onChange={this.handlePriceChange}
                                        />
                                        <label>Tất cả</label>
                                    </div>
                                    <div className="input">
                                        <input
                                            type="checkbox"
                                            name="selling_price"
                                            value="under-2m"
                                            checked={selectedPriceRanges.includes("under-2m")}
                                            onChange={this.handlePriceChange}
                                        />
                                        <label>Dưới 2 triệu</label>
                                    </div>
                                    <div className="input">
                                        <input
                                            type="checkbox"
                                            name="selling_price"
                                            value="2-4m"
                                            checked={selectedPriceRanges.includes("2-4m")}
                                            onChange={this.handlePriceChange}
                                        />
                                        <label>Từ 2 - 4 triệu</label>
                                    </div>
                                    <div className="input">
                                        <input
                                            type="checkbox"
                                            name="selling_price"
                                            value="4-7m"
                                            checked={selectedPriceRanges.includes("4-7m")}
                                            onChange={this.handlePriceChange}
                                        />
                                        <label>Từ 4 - 7 triệu</label>
                                    </div>
                                    <div className="input">
                                        <input
                                            type="checkbox"
                                            name="selling_price"
                                            value="7-13m"
                                            checked={selectedPriceRanges.includes("7-13m")}
                                            onChange={this.handlePriceChange}
                                        />
                                        <label>Từ 7 - 13 triệu</label>
                                    </div>
                                    <div className="input">
                                        <input
                                            type="checkbox"
                                            name="selling_price"
                                            value="13-20m"
                                            checked={selectedPriceRanges.includes("13-20m")}
                                            onChange={this.handlePriceChange}
                                        />
                                        <label>Từ 13 - 20 triệu</label>
                                    </div>
                                    <div className="input">
                                        <input
                                            type="checkbox"
                                            name="selling_price"
                                            value="above-20m"
                                            checked={selectedPriceRanges.includes("above-20m")}
                                            onChange={this.handlePriceChange}
                                        />
                                        <label>Trên 20 triệu</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div className="product-list">
                                    {filteredProducts &&
                                        filteredProducts.length > 0 &&
                                        filteredProducts.map((item) => (
                                            <Link to={`/product-detail/${item.id}`} className="ctgphone-customize">
                                                <div className="ctgphone-customize-max-height">
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
                                                                {item.selling_price * ((100 - item.discount) / 100)}₫
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
                                                    <div className="ctgphone-btn">
                                                        <button className="btn-buy">Mua ngay</button>
                                                        <button
                                                            className="btn-cart"
                                                            style={{ backgroundImage: `url(${cart})` }}
                                                        ></button>
                                                    </div>
                                                </div>
                                            </Link>
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
    listProducts: state.product.productsTablet,
    brandRedux: state.product.brands,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllProductTabletStartRedux: (category_key) => dispatch(actions.fetchAllProductTabletStart(category_key)),
    fetchBrandStartRedux: () => dispatch(actions.fetchBrandStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabletBody);
