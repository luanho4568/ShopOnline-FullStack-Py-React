import React, { Component } from "react";
import { connect } from "react-redux";
import "./CategoryTablet.scss";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class CategoryTablet extends Component {
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
                <div className="ctgtablet-container">
                    <div className="ctgtablet-content">
                        <div className="ctgtablet-header">
                            <span className="title-ctgtablet">Máy tính bảng nổi bật</span>
                            <button className="btn-ctgtablet">Xem tất cả</button>
                        </div>
                        <div className="ctgtablet-body">
                            <Slider {...settings}>
                                <div className="ctgtablet-customize">
                                    <div className="ctgtablet-customize-max-height">
                                        <div className="ctgtablet-image">
                                            <div className="bg-img">
                                                <div className="img"></div>
                                            </div>
                                        </div>
                                        <div className="ctgtablet-name-price">
                                            <div className="name">Lenovo Tab M10 32GB (Gen 2)</div>
                                            <div className="price">$400</div>
                                        </div>
                                        <div className="ctgtablet-descript">
                                            MediaTek Helio P22 (MT6762R)
                                            <br />
                                            10.1 inch - 2 GB - 32 GB
                                        </div>
                                        <div className="ctgtablet-btn">
                                            <button className="btn-buy">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="ctgtablet-customize">
                                    <div className="ctgtablet-customize-max-height">
                                        <div className="ctgtablet-image">
                                            <div className="bg-img">
                                                <div className="img"></div>
                                            </div>
                                        </div>
                                        <div className="ctgtablet-name-price">
                                            <div className="name">Lenovo Tab M10 32GB (Gen 2)</div>
                                            <div className="price">$350</div>
                                        </div>
                                        <div className="ctgtablet-descript">
                                            MediaTek Helio P22 (MT6762R)
                                            <br />
                                            10.1 inch - 2 GB - 32 GB
                                        </div>
                                        <div className="ctgtablet-btn">
                                            <button className="btn-buy">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="ctgtablet-customize">
                                    <div className="ctgtablet-customize-max-height">
                                        <div className="ctgtablet-image">
                                            <div className="bg-img">
                                                <div className="img"></div>
                                            </div>
                                        </div>
                                        <div className="ctgtablet-name-price">
                                            <div className="name">Lenovo Tab M10 32GB (Gen 2)</div>
                                            <div className="price">$350</div>
                                        </div>
                                        <div className="ctgtablet-descript">
                                            MediaTek Helio P22 (MT6762R)
                                            <br />
                                            10.1 inch - 2 GB - 32 GB
                                        </div>
                                        <div className="ctgtablet-btn">
                                            <button className="btn-buy">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="ctgtablet-customize">
                                    <div className="ctgtablet-customize-max-height">
                                        <div className="ctgtablet-image">
                                            <div className="bg-img">
                                                <div className="img"></div>
                                            </div>
                                        </div>
                                        <div className="ctgtablet-name-price">
                                            <div className="name">Lenovo Tab M10 32GB (Gen 2)</div>
                                            <div className="price">$350</div>
                                        </div>
                                        <div className="ctgtablet-descript">
                                            MediaTek Helio P22 (MT6762R)
                                            <br />
                                            10.1 inch - 2 GB - 32 GB
                                        </div>
                                        <div className="ctgtablet-btn">
                                            <button className="btn-buy">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="ctgtablet-customize">
                                    <div className="ctgtablet-customize-max-height">
                                        <div className="ctgtablet-image">
                                            <div className="bg-img">
                                                <div className="img"></div>
                                            </div>
                                        </div>
                                        <div className="ctgtablet-name-price">
                                            <div className="name">Lenovo Tab M10 32GB (Gen 2)</div>
                                            <div className="price">$350</div>
                                        </div>
                                        <div className="ctgtablet-descript">
                                            MediaTek Helio P22 (MT6762R)
                                            <br />
                                            10.1 inch - 2 GB - 32 GB
                                        </div>
                                        <div className="ctgtablet-btn">
                                            <button className="btn-buy">Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="ctgtablet-customize">
                                    <div className="ctgtablet-customize-max-height">
                                        <div className="ctgtablet-image">
                                            <div className="bg-img">
                                                <div className="img"></div>
                                            </div>
                                        </div>
                                        <div className="ctgtablet-name-price">
                                            <div className="name">Lenovo Tab M10 32GB (Gen 2)</div>
                                            <div className="price">$350</div>
                                        </div>
                                        <div className="ctgtablet-descript">
                                            MediaTek Helio P22 (MT6762R)
                                            <br />
                                            10.1 inch - 2 GB - 32 GB
                                        </div>
                                        <div className="ctgtablet-btn">
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTablet);
