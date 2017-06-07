# Portfolio Blog app

Develop a fully functional Portfolio | Blog app, using Node, Express and PostgreSQL, that has the ability to store and retrieve blog posts from a postgres database.

## Overview

### 1. Portfolio
A place to show off previous projects and showcase development skills

* Each project should have an image and an animated gif for a visual representation of functionality
* A description of each project with links to either github or heroku

### 2. Blog
A place to write about code

* a database backed blogging app

## Project goals

* Portfolio page will feature gifs which will animate on hover and display more detailed information on click
* Blog page will utilize a sequelize backed database to store and display all posts
* A form page will handle blog submissions

#### Nice to haves

* a comment feature (would require another db table)
* user authentication (would also require another db table)
* a search function to find older posts


### Database structure

#### tables 

 `Posts`

| columns  | Data type  |
|----------|------------|
| `id`     | Primary Key|
| `title`  | Varchar()  |
| `post`   | Text       |
| `created`| Timestamp  |


```JSON
{
	"id": "SERIAL PRIMARY KEY",
	"title": "VARCHAR(64)",
	"post": "TEXT",
	"created_at": "TIMESTAMP default CURRENT_TIMESTAMP"
}
```

## Routes

### GET `/`

| Argument  |  Description                       |
|-----------|------------------------------------|
| `posts`   | this page will display posts       |

* the layout page will have links to the portfolio page and a submit page
* the landing page will display the most recent posts
* 

### GET `/submit`

no arguments

* a form to accept blog submissions
* on submit posts to `/submit`

### POST `/submit`

| Argument  |  Description                       |
|-----------|------------------------------------|
| `title`   | user submitted title for blog post |
| `post`    | the text body of the post          |

* posts to db
* upon success, redirects to `/` home page
* on error, error message sent to user, prevent default submit

### GET `/search` 

| Argument  |  Description                       |
|-----------|------------------------------------|
| `id`      | search by post id                  |
| `title`   | title available to search          |
| `post`    | the text body available to search  |

* allow users to search for older posts
* display a form for searching by each field or any field

### GET `/portfolio`

no arguments

* display portfolio projects

### Inspiration notes





