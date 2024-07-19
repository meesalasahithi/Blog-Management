import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let posts = [];

app.get('/', (req, res) => {
    res.render('index', { posts });
});

app.get('/new-post', (req, res) => {
    res.render('new-post');
});

app.post('/new-post', (req, res) => {
    const { title, content } = req.body;
    posts.push({ title, content });
    res.redirect('/');
});

app.get('/edit-post/:id', (req, res) => {
    const post = posts[req.params.id];
    res.render('edit-post', { post, id: req.params.id });
});

app.post('/edit-post/:id', (req, res) => {
    const { title, content } = req.body;
    posts[req.params.id] = { title, content };
    res.redirect('/');
});

app.post('/delete-post/:id', (req, res) => {
    posts.splice(req.params.id, 1);
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
