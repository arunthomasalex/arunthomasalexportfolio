import React, { Component } from "react";

export default class Header extends Component {
    enableMenu() {
        document.querySelector("#root")?.classList.add("disableScroll");
        this.props.refValue.current?.classList.add("open");
    }

    render() {
        return (
            <header className="header">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="logo">
                            <a href="/">A</a>
                        </div>
                        <div onClick={this.enableMenu.bind(this)} className="hamburger-btn outer-shadow hover-in-shadow">
                            <span></span>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}