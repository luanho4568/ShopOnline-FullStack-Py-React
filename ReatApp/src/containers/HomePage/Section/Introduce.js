import React, { Component } from "react";
import { connect } from "react-redux";
import "./Introduce.scss";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Introduce extends Component {
    componentDidMount() {}
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
        };
        return (
            <>
                <div className="introduce-container">
                    <div className="introduce-content">
                        <div className="left-content">
                            <Slider {...settings}>
                                <div className="introduce-customize">
                                    <div className="bg-img img"></div>
                                </div>
                                <div className="introduce-customize">
                                    <div className="bg-img img1"></div>
                                </div>
                                <div className="introduce-customize">
                                    <div className="bg-img img2"></div>
                                </div>
                                <div className="introduce-customize">
                                    <div className="bg-img img3"></div>
                                </div>
                            </Slider>
                        </div>
                        <div className="right-content">
                            <div className="right-content-col">
                                <div className="up-col">
                                    <div className="img-up"></div>
                                </div>
                                <div className="lw-col">
                                    <div className="img-lw"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Introduce);
