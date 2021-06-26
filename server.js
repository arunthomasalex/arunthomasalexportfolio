import express from 'express';
import path from 'path';
import { renderPortfolio, renderResume } from './src/ssr';
import portfolioTemplate from './src/templates/portfolio';
import resumeTemplate from './src/templates/resume';
import messageScheme from './src/validations/message';

const app = express();
app.use('/public', express.static(path.resolve(__dirname, 'public')));

// hide powered by express
app.disable('x-powered-by');
app.listen(process.env.PORT || 8888);

const initialState = {
    portfolio: void 0
}

app.get('/', (req, res) => {
    const { content, state } = renderPortfolio(initialState);
    const response = portfolioTemplate("Arun Thomas Alex", content, state);
    res.setHeader('Cache-Control', 'pulbic, max-age=604800');
    res.send(response);
});

app.get('/resume', (req, res) => {
    const { content, state } = renderResume(initialState);
    const response = resumeTemplate("Arun Thomas Alex", content, state);
    res.setHeader('Cache-Control', 'pulbic, max-age=604800');
    res.send(response);
});

app.get('/rule/:name', (req, res) => {
    const validations = [];
    const schema = require(`./src/validations/${req.params.name}`).default;
    for (const [key, value] of schema._ids._byKey) {
        const validation = {}
        validation[key] = {
            type: value.schema.type,
            required: (value.schema._flags.presence === 'required'),
            validations: {}
        };
        for( const rule of value.schema._rules) {
            if(rule.name === 'min') {
                if(!validation[key]['validations']['length']) validation[key]['validations']['length'] = {}
                validation[key]['validations']['length']['min'] = rule.args.limit;
            } else if(rule.name === 'max') {
                if(!validation[key]['validations']['length']) validation[key]['validations']['length'] = {}
                validation[key]['validations']['length']['max'] = rule.args.limit;
            } else if(rule.name === 'email') {
                validation[key]['validations']['isEmail'] = true;
                validation[key]['validations']['pattern'] = rule.regex.toString();
            } else if(rule.name === 'pattern') {
                validation[key]['validations']['pattern'] = rule.args.regex.toString();
            }
        }
        validations.push(validation);
    }
    res.status(200).send(validations);
});

const validateMessage = (req, res, next) => {
    req.on('data', data => {
        const body = {};
        data = decodeURIComponent(data);
        data = data.substring(1, (data.length - 1));
        for (const entry of data.split('&')) {
            const [key, value] = entry.split('=');
            body[decodeURIComponent(key)] = decodeURIComponent(value);
        };
        const { error } = messageScheme.validate(body);
        if (error) {
            res.status(400).send({ message: "Data not valid." });
            return;
        }
        req.body = body;
        next();
    });
};

app.post('/message', validateMessage, (req, res) => {
    res.status(200).send({ message: "Message saved successfully." });
});