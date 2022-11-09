const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');
const Blog = require('./models/blog');

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ');
}));
//info page
app.get('/info', (request, response) => {
  const currentDate = new Date().toLocaleString();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  Blog.find({}).then(blogs => {
    response.send(
      `
            <div>
                <p>Blog list contains ${blogs.length} posts</p>
            </div>
            <div>
                <p>${currentDate} (${timeZone})</p>
            </div>`
    );
  });
});
//all blogs
app.get('/api/blogs', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs.map(blog => blog.toJSON()));
  });
});
//blog by id
app.get('/api/blogs/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});
//delete
app.delete('/api/blogs/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});
//post/add new blog
app.post('/api/blogs', (request, response, next) => {
  const body = request.body;
  const blogName = body.name;
  const blogMessage = body.message;
  const blogDate = body.date;
  const blogMood = body.mood;

  if (Object.keys(body).length === 0) {
    return response.status(400).json({
      error: 'content missing'
    });
  }

  const blog = new Blog({
    name: blogName,
    message: blogMessage,
    mood: blogMood,
    date:blogDate
  });
  blog.save()
    .then(savedBlog =>  savedBlog.toJSON())
    .then(savedAndFormattedBlog => {
      console.log(`added ${blog.name} message ${blog.message} to blog list`);
      response.json(savedAndFormattedBlog);
    })
    .catch(error => next(error));
});
//edit blog
app.put('/api/blogs/:id', (request, response, next) => {
  const body = request.body;

  const blog = {
    name: body.name,
    message: body.message,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(() => {
      Blog.find({}).then(blogs => {
        response.json(blogs.map(blog => blog.toJSON()));
      });
    })
    .catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});