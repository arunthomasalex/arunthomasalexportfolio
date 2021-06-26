'use strict';

import React, { Component, useState } from 'react';
import axios from 'axios';
import { withPortfolioContext } from '../../../helpers';
import './contact.scss';

function Contacts(props) {
    return (
        <div className="row">
            {props.contacts.map(contact => {
                const classes = `fas ${contact.class} icon`;
                return (
                    <div key={contact.name} className="contact-item">
                        <div className="contact-item-inner outer-shadow">
                            {contact.url && <a className={classes} href={contact.url}></a>}
                            {!contact.url && <i className={classes}></i>}
                            <span>{contact.name}</span>
                            <p>{contact.data}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}


async function validateData(details) {
    let validation = {};
    try {
        const resp = await axios.get('/rule/message');
        const rules = resp.data;
        for (let index in rules) {
            for (let [key, value] of Object.entries(rules[index])) {
                validation[key] = value.required && !details[key];
                let { length, email } = value.validations;
                if (details[key] && length && !validation[key]) {
                    validation[key] = (length.min && (details[key].length < length.min)) || (length.max && details[key] && details[key].length > length.max);
                }
                if (email && !validation[key]) {
                    validation[key] = !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+(\.[A-Za-z]+)+$/.test(details[key]);
                }
            }
        }
        validation.valid = () => !Object.values(validation).includes(true);
        return validation;
    } catch (e) {
        validation = {
            name: !details.name,
            email: !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+(\.[A-Za-z]+)+$/.test(details.email),
            subject: !details.subject,
            message: !details.message
        };
        validation.valid = () => !Object.values(validation).includes(true);
        return validation;
    }
}
function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [validation, setValidation] = useState({});
    const onSubmit = (event) => {
        event.preventDefault();
        var details = { name, email, subject, message };
        validateData(details).then(validation => {
            if (validation.valid()) {
                var formBody = new FormData();
                for(const [key, value] of Object.entries(details)) {
                    formBody.append(key, value);
                }
                axios.post('/message', formBody, {'Content-Type' : 'application/x-www-form-urlencoded'})
                    .then(resp => resp.data)
                    .then(resp => alert(resp.message))
                    .catch(err => alert("Server unavailable, please Email me or try again later."));
                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
                setValidation({});
            } else {
                setValidation(validation);
            }
        });
    };
    return (
        <div className="row">
            <div className="contact-form">
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="w-50">
                            <div className="input-group outer-shadow">
                                <input type="text" placeholder="Name" autoComplete="off" name="name" id="name" value={name} className={validation.name ? "error input-control" : "input-control"} onChange={event => setName(event.target.value)} />
                            </div>
                            <div className="input-group outer-shadow">
                                <input type="text" placeholder="Email" autoComplete="off" name="email" id="email" value={email} className={validation.email ? "error input-control" : "input-control"} onChange={event => setEmail(event.target.value)} />
                            </div>
                            <div className="input-group outer-shadow">
                                <input type="text" placeholder="Subject" autoComplete="off" name="subject" id="subject" value={subject} className={validation.subject ? "error input-control" : "input-control"} onChange={event => setSubject(event.target.value)} />
                            </div>
                        </div>
                        <div className="w-50">
                            <div className="input-group outer-shadow">
                                <textarea name="message" id="message" className={validation.message ? "error input-control" : "input-control"} placeholder="Message" onChange={event => setMessage(event.target.value)} value={message}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="submit-btn">
                            <button type="submit" className="btn-1 outer-shadow">Send Message</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

class ContactComponent extends Component {
    render() {
        const { portfolio } = this.props;
        return (
            <section className="contact-section section" id="contact">
                <div className="container">
                    <div className="row">
                        <div className="section-title">
                            <h2 data-heading="contact">Get In Touch</h2>
                        </div>
                    </div>
                    {portfolio && <Contacts contacts={portfolio["contacts"]} />}
                    <ContactForm />
                </div>
            </section>
        );
    }
}

const Contact = withPortfolioContext(ContactComponent);
export { Contact };