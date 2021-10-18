# Find the fish

<br><br>

## Description

Platform for marine life and seafood lovers

This site was built using [herokuapp](https://find-the-fish.herokuapp.com/).

<br><br>

## MVP Scope and User stories

- 404 - As a user I want a 404 page when I go to page that doesn't exist.
- 500 - As a user I want a error page when the super team screws it up so that I know that is not my fault.
- signup - As a new user I want a sign button and page so that I can sign up.
- login - As an exsisting user I want a login button and page so that I can sign in.
- homepage - As a user I want home page were I can preview fish and the recipes they are used in.
- profile - As a user I want a profile page so that
- Details - As a user I want a fish details page so that I can have general info about a fish
- Recipe - As a user I want a page for specific fish recipes

<br><br>

### Backlog

List of of features outside of the MVP's scope

Favorites:

- users can add and share their favorite recipes

Geo Location:

- a page to show the locations of seafood resturants near them

<br><br>

## API routes

<br>

## Models

<br>

### User model:

    username:
    type: String,
    unique: true,
    require: true,

    password:
    type: String,
    required : true

### Fish model:

    habitatImpacts: String,
    imageGallery: String,
    Location: String,
    Population: String,
    scientificName: String,
    speciesAliases: String,
    speciesIllustrationPhoto: String,
    speciesName: String,
    Biology: String,
