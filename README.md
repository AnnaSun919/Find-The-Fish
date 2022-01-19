## Find the fish

Platform for marine life and seafood lovers.  
<br>

## Deployment Link

https://find-the-fish.herokuapp.com/

## MVP Scope and User stories

- 404 - As a user I want a 404 page when I go to page that doesn't exist.
- 500 - As a user I want a error page when the super team screws it up so that I know that is not my fault.
- Signup - As a new user I want a sign button and page so that I can sign up.
- Login - As an exsisting user I want a login button and page so that I can sign in.
- Homepage - As a user I want home page were I can preview fish and the recipes they are used in.
- Profile - As a user I want a profile page so that
- Details - As a user I want a fish details page so that I can have general info about a fish
- Recipe - As a user I want a page for specific fish recipes

### Backlog

List of of features outside of the MVP's scope

Favorites:

- users can add and share their favorite recipes

Geo Location:

- a page to show the locations of seafood resturants near them


## API routes

This Web Application is build with this API : https://www.fishwatch.gov/api/species

## Goal

- learn to link database , and allow user to enter information to the database.
- learn to make search bar. 
- learn to use Jquery as the frontend part. 
- learn to use libraray (e.g. cloudinary) to add more features. 
- learn git controls while working as a team. 

## Models

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
    location: String,
    population: String,
    scientificName: String,
    speciesAliases: String,
    speciesIllustrationPhoto: String,
    speciesName: String,
    biology: String,
    
    
## Built with

-   JQuery
-   Handlebars
-   Boostrap 
-   Axios
-   Cloudinary 
-   Express.js
-   Mongodb
