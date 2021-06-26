import express from 'express';
import path from 'path';
import { renderPortfolio, renderResume } from './src/ssr';
import portfolioTemplate from './src/templates/portfolio';
import resumeTemplate from './src/templates/resume';

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