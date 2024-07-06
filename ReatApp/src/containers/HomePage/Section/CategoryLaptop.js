import React, { Component } from "react";
import { connect } from "react-redux";
import "./CategoryLaptop.scss";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";

class CategoryLaptop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrProductLaptop: [],
        };
    }
    componentDidMount() {
        this.props.fetchAllProductStartRedux("C2");
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listProducts !== this.props.listProducts) {
            this.setState({
                arrProductLaptop: this.props.listProducts,
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
        const { arrProductLaptop } = this.state;
        return (
            <>
                <div className="ctglaptop-container">
                    <div className="ctglaptop-content">
                        <div className="ctglaptop-header">
                            <span className="title-ctglaptop">Laptop nổi bật</span>
                            <button className="btn-ctglaptop">Xem tất cả</button>
                        </div>
                        <div className="ctglaptop-body">
                        <Slider {...settings}>
                                {arrProductLaptop &&
                                    arrProductLaptop.length > 0 &&
                                    arrProductLaptop.map((item) => {
                                        return (
                                            <div className="ctgphone-customize">
                                                <div className="ctgphone-customize-max-height">
                                                    <div className="ctgphone-image">
                                                        <div className="bg-img">
                                                            <div className="img"></div>
                                                        </div>
                                                    </div>
                                                    <div className="ctgphone-name-price">
                                                        <div className="name">{item.title}</div>
                                                        <div className="price">{item.selling_price}VND</div>
                                                    </div>
                                                    <div className="ctgphone-descript">
                                                        {item.description}
                                                    </div>
                                                    <div className="ctgphone-btn">
                                                        <button className="btn-buy">Mua ngay</button>
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
        listProducts: state.product.products,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllProductStartRedux: (category_key) => dispatch(actions.fetchAllProductStart(category_key)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryLaptop);
