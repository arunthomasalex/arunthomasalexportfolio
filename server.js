import express from 'express';
import path from 'path';
import render from './src/ssr';
import template from './src/templates/portfolio';

const app = express();
app.use('/public', express.static(path.resolve(__dirname, 'public')));

// hide powered by express
app.disable('x-powered-by');
app.listen(process.env.PORT || 8888);

const portfolioState = {
    portfolio: void 0
}

app.get('/', (req, res) => {
    const { content, state } = render(portfolioState);
    const response = template("Arun Thomas Alex", content, state);
    res.setHeader('Cache-Control', 'pulbic, max-age=604800');
    res.send(response);
});