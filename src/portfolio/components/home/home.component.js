import React, { Component } from "react";
import { withPortfolioContext } from "../../../helpers";
import './home.scss';

class HomeComponent extends Component {
    render() {
        let { portfolio } = this.props;
        return (
            <section className="home-section section" id="home">
                <div className="effect-wrap">
                    <div className="effect effect-1"></div>
                    <div className="effect effect-2">
                        <div></div><div></div><div></div><div></div><div></div><div>
                        </div><div></div><div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div><div></div><div>
                        </div><div></div><div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div><div></div><div>
                        </div>
                    </div>
                    <div className="effect effect-3"></div>
                    <div className="effect effect-4"></div>
                    <div className="effect effect-5">
                        <div></div><div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div><div></div>
                    </div>
                </div>
                <div className="container">
                    <div className="row full-screen align-item-center">
                        <div className="home-text">
                            <p>Hello</p>
                            {portfolio && <h2>I'm {portfolio["name"]}</h2>}
                            <h1>Full stack Developer</h1>
                            <a href="#about" className="btn-1 outer-shadow hover-in-shadow">More About Me</a>
                        </div>
                        <div className="home-img">
                            <div className="img-box inner-shadow">
                                {portfolio && <img src={portfolio["image"]} alt="profile-pic" className="outer-shadow" />}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const Home = withPortfolioContext(HomeComponent)
export { Home };