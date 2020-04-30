<h1 align="center">Galaxybnb 🪐</h1>

A `React` application that allows users to book vacations on different Star Wars planets! 🚀

## Technologies
This web app makes use of the following technologies:

**Frontend**
- React.js
- React Router - implemented for delcaritive routing
- Semantic UI React
- Customized CSS3 styling
- Stripe API

[**Backend**](https://github.com/rlc900/galaxybnb_backend_api)
- Ruby [2.6.1]
- Rails [~> 6.0.2, >= 6.0.2.1] - MVC web framework used as an API
- SWAPI (Star Wars API)
- Stripe API
- Dotenv - Rails gem for securing API Keys
- Bcrypt [~> 3.1.7] - Encrypt and secure user passwords
- Rack-cors - Handles Cross-Origin Resource Sharing (CORS), which makes cross-origin AJAX possible
- JWT [~> 2.2] - Cryptographic signing
- PostgreSQL [>= 0.18, < 2.0] - Database

## Prerequistes
Before you continue, please make sure you have installed the latest version of:

- Ruby
- Ruby on Rails
- PostgreSQL
- React

## Launch
To launch this application, you'll have to follow these steps:

**Frontend Installation**
- Clone [this repo](https://github.com/rlc900/galaxybnb_frontend.git) in your computers terminal.
- Make sure your Backend API is running at http://localhost:4000/.
- Run `npm install` to install all dependencies.
- Run `npm start` to start server.
- Once you're taken to the web app, ensure Frontend is running at http://localhost:3001.

**Backend Installation**
- Clone [this repo](https://github.com/rlc900/galaxybnb_backend_api.git) in your computers terminal.
- After cloning, `cd` into that directiory `cd galaxy_bnb_api/`.
- Run `bundle install` to install the required dependencies.
- Make sure PostgreSQL is running on your machine.
- Run `rails db:create` to create a database locally.
- Run `rails db:migrate` to create tables into the database.
- Run `rails db:seed` to create seed data.
- Run `rails s` to run the server.

## Features
Users are able to signup/login to their account (you must be logged in to book a trip!)

<p align="center">
<img src="gif1.gif"
     alt="sign in option taken to home page"
     style="max-width: 100%" />
</p>


The user then fills out a form on the homepage, where they'll be able to input & submit they're travel info!

<p align="center">
<img src="gif2.gif"
     alt="sign in option taken to home page"
     style="max-width: 100%" />
</p>

Upon submitting, the user is propmpted to the designated planets page, which displays all of the locations to go to for that
planet!

<p align="center">
<img src="gif3.gif"
     alt="sign in option taken to home page"
     style="max-width: 100%" />
</p>

After the user decides the destination they'd like to travel to, a confirmation window pops up to confirm all of their
information is correct, followed by an already existing card payment method.

<p align="center">
<img src="gif4.gif"
     alt="sign in option taken to home page"
     style="max-width: 100%" />
</p>

User is then taken to their profile page, with their booked location & including their information.

<p align="center">
<img src="gif5.gif"
     alt="sign in option taken to home page"
     style="max-width: 100%" />
</p>

The user is also able to update their username and delete their account!

<p align="center">
<img src="gif6.gif"
     alt="sign in option taken to home page"
     style="max-width: 100%" />
</p>
