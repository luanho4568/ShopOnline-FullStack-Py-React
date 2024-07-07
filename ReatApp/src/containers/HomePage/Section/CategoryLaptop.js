import React, { Component } from "react";
import { connect } from "react-redux";
import "./CategoryPhone.scss";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";

class CategoryLaptop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrProductTable: [],
        };
    }
    componentDidMount() {
        this.props.fetchAllProductLaptopStartRedux("C2");
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listProducts !== this.props.listProducts) {
            this.setState({
                arrProductTable: this.props.listProducts,
            });
        }
    }
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
        };
        const { arrProductTable } = this.state;
        return (
            <>
                <div className="ctgphone-container">
                    <div className="ctgphone-content">
                        <div className="ctgphone-header">
                            <span className="title-ctgphone"><FormattedMessage id="homepage.outstanding-laptop"/></span>
                            <button className="btn-ctgphone"><FormattedMessage id="homepage.view-all-products"/></button>
                        </div>
                        <div className="ctgphone-body">
                            <Slider {...settings}>
                                {arrProductTable &&
                                    arrProductTable.length > 0 &&
                                    arrProductTable.map((item) => {
                                        return (
                                            <div className="ctgphone-customize">
                                                <div className="ctgphone-customize-max-height">
                                                    <div className="ctgphone-image">
                                                        <div className="bg-img">
                                                            <div
                                                                className="img"
                                                                style={{
                                                                    backgroundImage: `URL(http://localhost:8000/static${item.product_image})`,
                                                                }}
                                                            ></div>{" "}
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

                                                    <div className="ctgphone-descript">{item.description}</div>
                                                    <div className="ctgphone-btn">
                                                        <button className="btn-buy"><FormattedMessage id="homepage.buy-now"/></button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listProducts: state.product.productsLaptop,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllProductLaptopStartRedux: (category_key) => dispatch(actions.fetchAllProductLaptopStart(category_key)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryLaptop);
