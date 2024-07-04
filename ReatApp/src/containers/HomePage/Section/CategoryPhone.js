import React, { Component } from "react";
import { connect } from "react-redux";
import "./CategoryPhone.scss";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class CategoryPhone extends Component {
    componentDidMount() {}
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
        return (
            <>
                <div className="ctgphone-container">
                    <div className="ctgphone-content">
                        <div className="ctgphone-header">
                            <span className="title-ctgphone">Điện Thoại nổi bật</span>
                            <button className="btn-ctgphone">Xem tất cả</button>
                        </div>
                        <div className="ctgphone-body">
                            <Slider {...settings}>
                                <div className="ctgphone-customize">
                                    <div className="ctgphone-customize-max-height">
                                        <div className="ctgphone-image">
                                            <div className="bg-img">
                                                <div className="img"></div>
                                            </div>
                                        </div>
                                        <div className="ctgphone-name-price">
                                            <div className="name">SamSung S22 Utral</div>
                                            <div className="price">$350</div>
                                        </div>
                                        <div className="ctgphone-descript">
                                            Snapdragon 680 - 6.8inch
                                            <br />
                                            8GB - 256GB
                                        </div>
                                        <div className="ctgphone-btn">
                                            <button className="btn-buy">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="ctgphone-customize">
                                    <div className="ctgphone-customize-max-height">
                                        <div className="ctgphone-image">
                                            <div className="bg-img">
                                                <div className="img"></div>
                                            </div>
                                        </div>
                                        <div className="ctgphone-name-price">
                                            <div className="name">SamSung S22 Utral</div>
                                            <div className="price">$350</div>
                                        </div>
                                        <div className="ctgphone-descript">
                                            Snapdragon 680 - 6.8inch
                                            <br />
                                            8GB - 256GB
                                        </div>
                                        <div className="ctgphone-btn">
                                            <button className="btn-buy">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="ctgphone-customize">
                                    <div className="ctgphone-customize-max-height">
                                        <div className="ctgphone-image">
                                            <div className="bg-img">
                                                <div className="img"></div>
                                            </div>
                                        </div>
                                        <div className="ctgphone-name-price">
                                            <div className="name">SamSung S22 Utral</div>
                                            <div className="price">$350</div>
                                        </div>
                                        <div className="ctgphone-descript">
                                            Snapdragon 680 - 6.8inch
                                            <br />
                                            8GB - 256GB
                                        </div>
                                        <div className="ctgphone-btn">
                                            <button className="btn-buy">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="ctgphone-customize">
                                    <div className="ctgphone-customize-max-height">
                                        <div className="ctgphone-image">
                                            <div className="bg-img">
                                                <div className="img"></div>
                                            </div>
                                        </div>
                                        <div className="ctgphone-name-price">
                                            <div className="name">SamSung S22 Utral</div>
                                            <div className="price">$350</div>
                                        </div>
                                        <div className="ctgphone-descript">
                                            Snapdragon 680 - 6.8inch
                                            <br />
                                            8GB - 256GB
                                        </div>
                                        <div className="ctgphone-btn">
                                            <button className="btn-buy">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="ctgphone-customize">
                                    <div className="ctgphone-customize-max-height">
                                        <div className="ctgphone-image">
                                            <div className="bg-img">
                                                <div className="img"></div>
                                            </div>
                                        </div>
                                        <div className="ctgphone-name-price">
                                            <div className="name">SamSung S22 Utral</div>
                                            <div className="price">$350</div>
                                        </div>
                                        <div className="ctgphone-descript">
                                            Snapdragon 680 - 6.8inch
                                            <br />
                                            8GB - 256GB
                                        </div>
                                        <div className="ctgphone-btn">
                                            <button className="btn-buy">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="ctgphone-customize">
                                    <div className="ctgphone-customize-max-height">
                                        <div className="ctgphone-image">
                                            <div className="bg-img">
                                                <div className="img"></div>
                                            </div>
                                        </div>
                                        <div className="ctgphone-name-price">
                                            <div className="name">SamSung S22 Utral</div>
                                            <div className="price">$350</div>
                                        </div>
                                        <div className="ctgphone-descript">
                                            Snapdragon 680 - 6.8inch
                                            <br />
                                            8GB - 256GB
                                        </div>
                                        <div className="ctgphone-btn">
                                            <button className="btn-buy">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPhone);
