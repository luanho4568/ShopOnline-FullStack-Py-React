import React, { Component } from "react";
import { connect } from "react-redux";
import "./CategoryLaptop.scss";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class CategoryLaptop extends Component {
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
                <div className="ctglaptop-container">
                    <div className="ctglaptop-content">
                        <div className="ctglaptop-header">
                            <span className="title-ctglaptop">Laptop nổi bật</span>
                            <button className="btn-ctglaptop">Xem tất cả</button>
                        </div>
                        <div className="ctglaptop-body">
                            <Slider {...settings}>
                                <div className="ctglaptop-customize">
                                    <div className="ctglaptop-customize-max-height">
                                        <div className="ctglaptop-image">
                                            <div className="bg-img">
                                                <div className="img"></div>
                                            </div>
                                        </div>
                                        <div className="ctglaptop-name-price">
                                            <div className="name">HP 240 G10 i3-N305 (8U7D8PA)</div>
                                            <div className="price">$400</div>
                                        </div>
                                        <div className="ctglaptop-descript">
                                            Intel UHD Graphics - 14 inch
                                            <br />
                                            Core i3 - 8GB(1 thanh 8GB)
                                            <br/>
                                            SSD 256GB - 1.37 kg
                                        </div>
                                        <div className="ctglaptop-btn">
                                            <button className="btn-buy">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="ctglaptop-customize">
                                    <div className="ctglaptop-customize-max-height">
                                        <div className="ctglaptop-image">
                                            <div className="bg-img">
                                                <div className="img"></div>
                                            </div>
                                        </div>
                                        <div className="ctglaptop-name-price">
                                            <div className="name">HP 240 G10 i3-N305 (8U7D8PA)</div>
                                            <div className="price">$350</div>
                                        </div>
                                        <div className="ctglaptop-descript">
                                            Intel UHD Graphics - 14 inch
                                            <br />
                                            Core i3 - 8GB(1 thanh 8GB)
                                            <br/>
                                            SSD 256GB - 1.37 kg
                                        </div>
                                        <div className="ctglaptop-btn">
                                            <button className="btn-buy">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="ctglaptop-customize">
                                    <div className="ctglaptop-customize-max-height">
                                        <div className="ctglaptop-image">
                                            <div className="bg-img">
                                                <div className="img"></div>
                                            </div>
                                        </div>
                                        <div className="ctglaptop-name-price">
                                            <div className="name">HP 240 G10 i3-N305 (8U7D8PA)</div>
                                            <div className="price">$350</div>
                                        </div>
                                        <div className="ctglaptop-descript">
                                            Intel UHD Graphics - 14 inch
                                            <br />
                                            Core i3 - 8GB(1 thanh 8GB)
                                            <br/>
                                            SSD 256GB - 1.37 kg
                                        </div>
                                        <div className="ctglaptop-btn">
                                            <button className="btn-buy">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="ctglaptop-customize">
                                    <div className="ctglaptop-customize-max-height">
                                        <div className="ctglaptop-image">
                                            <div className="bg-img">
                                                <div className="img"></div>
                                            </div>
                                        </div>
                                        <div className="ctglaptop-name-price">
                                            <div className="name">HP 240 G10 i3-N305 (8U7D8PA)</div>
                                            <div className="price">$350</div>
                                        </div>
                                        <div className="ctglaptop-descript">
                                            Intel UHD Graphics - 14 inch
                                            <br />
                                            Core i3 - 8GB(1 thanh 8GB)
                                            <br/>
                                            SSD 256GB - 1.37 kg
                                        </div>
                                        <div className="ctglaptop-btn">
                                            <button className="btn-buy">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="ctglaptop-customize">
                                    <div className="ctglaptop-customize-max-height">
                                        <div className="ctglaptop-image">
                                            <div className="bg-img">
                                                <div className="img"></div>
                                            </div>
                                        </div>
                                        <div className="ctglaptop-name-price">
                                            <div className="name">HP 240 G10 i3-N305 (8U7D8PA)</div>
                                            <div className="price">$350</div>
                                        </div>
                                        <div className="ctglaptop-descript">
                                            Intel UHD Graphics - 14 inch
                                            <br />
                                            Core i3 - 8GB(1 thanh 8GB)
                                            <br/>
                                            SSD 256GB - 1.37 kg
                                        </div>
                                        <div className="ctglaptop-btn">
                                            <button className="btn-buy">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="ctglaptop-customize">
                                    <div className="ctglaptop-customize-max-height">
                                        <div className="ctglaptop-image">
                                            <div className="bg-img">
                                                <div className="img"></div>
                                            </div>
                                        </div>
                                        <div className="ctglaptop-name-price">
                                            <div className="name">HP 240 G10 i3-N305 (8U7D8PA)</div>
                                            <div className="price">$350</div>
                                        </div>
                                        <div className="ctglaptop-descript">
                                            Intel UHD Graphics - 14 inch
                                            <br />
                                            Core i3 - 8GB(1 thanh 8GB)
                                            <br/>
                                            SSD 256GB - 1.37 kg
                                        </div>
                                        <div className="ctglaptop-btn">
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryLaptop);
