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
* 


### Database structure

#### tables 
-Posts
| columns | Data type  |
|---------|------------|
| id      | Primary Key|
| Title   | Varchar()  |
| Post    | Text       |
| Created | Timestamp  |


```JSON
{
	"id": "SERIAL PRIMARY KEY",
	"title": "VARCHAR(64)",
	"post": "TEXT",
	"created_at": "TIMESTAMP default CURRENT_TIMESTAMP"
}
```


