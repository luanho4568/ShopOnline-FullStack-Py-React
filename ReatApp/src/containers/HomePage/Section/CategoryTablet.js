import React, { Component } from "react";
import { connect } from "react-redux";
import "./CategoryTablet.scss";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";

class CategoryTablet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrProductTablet: [],
        };
    }
    componentDidMount() {
        this.props.fetchAllProductStartRedux("C3");
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listProducts !== this.props.listProducts) {
            this.setState({
                arrProductTablet: this.props.listProducts,
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
        const { arrProductTablet } = this.state;
        return (
            <>
                <div className="ctgtablet-container">
                    <div className="ctgtablet-content">
                        <div className="ctgtablet-header">
                            <span className="title-ctgtablet">Máy tính bảng nổi bật</span>
                            <button className="btn-ctgtablet">Xem tất cả</button>
                        </div>
                        <div className="ctgtablet-body">
                        <Slider {...settings}>
                                {arrProductTablet &&
                                    arrProductTablet.length > 0 &&
                                    arrProductTablet.map((item) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTablet);
