import React, { Component } from 'react';
import { createDatas, prepareString, groupBy } from '../../../helpers';
import { portfolioAction, portfolioConstant } from '../../../portfolio/redux';
import { connect } from 'react-redux';
import { portfolioEventNames, portfolioEvents } from '../../../events';
import './style.scss';

function Contact(props) {
    return (
        <div className="resume_item resume_info">
            <div className="title">
                <p className="bold">{props.portfolio.name}</p>
                <p className="regular">{props.portfolio.title}</p>
            </div>
            <ul>
                {props.portfolio.contacts.sort((c1, c2) => (c1.name < c2.name) ? -1 : 1).map(contact => {
                    return (
                        <li key={contact.name}>
                            <div className="data">
                                {contact.data}
                            </div>
                        </li>
                    );
                })}
                <li>
                    <div className="data">
                        https://arunthomasalex.github.io
                    </div>
                </li>
            </ul>
        </div>
    );
}

function Skill(props) {
    return (
        <div className="resume_item resume_skills">
            <div className="title">
                <p className="bold">skill's</p>
            </div>
            <ul>
                {Object.entries(groupBy(props.skills, 'percentage'))
                    .sort((s1, s2) => (parseInt(s1[0]) > parseInt(s2[0])) ? -1 : 1)
                    .map(d => {
                        let percent = d[0] + "%"
                        return (
                            <li key={percent}>
                                <div className="skill_name">
                                    {d[1].map(v => {
                                        const str = v.name.toLowerCase();
                                        return str.charAt(0).toUpperCase() + str.slice(1);
                                    }).join(' / ')}
                                    <div className="skill_per">{percent}</div>
                                </div>
                                <div className="skill_progress">
                                    <span style={{ width: percent }}></span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

function Experience(props) {
    return (
        <div className="resume_item resume_work">
            <div className="title">
                <p className="bold">Work Experience</p>
            </div>
            <ul>
                {props.experiences.map(experience => {
                    return (
                        <li key={experience.duration}>
                            <div className="date">{experience.duration}</div>
                            <div className="info">
                                <p className="semi-bold">{experience.company}</p>
                                <p>{experience.description}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function Education(props) {
    return (
        <div className="resume_item resume_education">
            <div className="title">
                <p className="bold">Education</p>
            </div>
            <ul>
                {props.educations.map(education => {
                    return (
                        <li key={education.duration}>
                            <div className="date">{education.duration}</div>
                            <div className="info">
                                <p className="semi-bold">{education.course}</p>
                                <p>{education.institution}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

class ResumeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolio: void 0
        };
    }
    componentDidMount() {
        portfolioEvents.addOnceEvent(
            portfolioEventNames.ON_SUCCESS,
            portfolioConstant.SUCCESS_PORTFOLIO,
            ({ portfolio }) => this.setState({ ...this.state, portfolio })
        );
        this.props.fetchPortfolio();
    }
    componentWillUnmount() {
        portfolioEvents.off(portfolioEventNames.ON_SUCCESS);
    }
    render() {
        const { portfolio } = this.state;
        if (!portfolio) return (<></>);
        let datas = portfolio && createDatas(portfolio);
        let about = portfolio && prepareString(portfolio["about"], datas);
        return (
            <div className="resume">
                <div className="resume_left">
                    <div className="resume_profile">
                        <img src={portfolio.image} alt="profile_pic" />
                    </div>
                    <div className="resume_content">
                        <Contact portfolio={portfolio} />
                        <Skill skills={portfolio['skills']} />
                    </div>
                </div>
                <div className="resume_right">
                    <div className="resume_item resume_about">
                        <div className="title">
                            <p className="bold">About Me</p>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: about }}></div>
                    </div>
                    <Experience experiences={portfolio['experiences']} />
                    <Education educations={portfolio['educations']} />
                </div>
            </div>
        );
    }
}

function mapStateToProps() {
    return {};
}

const actions = {
    fetchPortfolio: portfolioAction.fetchPortfolio
}

export default connect(mapStateToProps, actions)(ResumeComponent)