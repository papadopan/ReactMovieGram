# MovieGram #

## Philosophy behind this platform
The initial thought was to create a similar service as instagram, but for movies. Users can save in their profiles the movies that they watched and the service will provide them with information such as , how many movies they watched, how many hours they spend watching movies and also it will calculate the most common/favourite genre of the user. 

## Let me introduce you what this platform is about

* It is an online platform for movies
* Users can search their movies based on the genre, title, or category ( top rated , latest, upcoming ). 
* Users can also search any actor they want, and find out interesting infomation about them 
* Users can favourite one movie , by clicking the heart icon in the bottom of every movie box. If the color of the heart is red it means that it is added to the profile, if it is white it means that it is not in the profile. 
* Users can select a movie and go through the details of the movie such as, release date, duration, ranking, budget, description of the movie, and finaly recommended movies based on their movie selection.
* This service provides an opportunity  to save the movies they already have seen and the service will provide them with stats about their preferences
* Users can also interact with the movies in their profile:
    *   There is a star rating system, and users can give the score they prefer in every movie

    *   They can add (and of course delete) comments to every movie, in order to save something important for them 

    * Users can create their own lists from the movies in their profile. Every movie initialy has a tag with assigned value `all`. When the users want to create a list practically, they can create a new tag. And then they can go through the movies they want to add to this list/tag and change their tag value. In addition , on the top of the screen there is a filtering mechanism, so when the users want to see only one list, they can select the tag they want. When the users delete all the movie from a specific tag , this tag is automatically deleted too.
  

    *   When the users want to delete, one movie from their profile there is the bin area on the bottom of the         screen that they can actually drag and drop any movie they want. When they drop the movie, it will be           deleted. In order to keep this mechanism availabla for smaller screens where the drag and drop functionality is  not always feasible, we created a new rubbish icon in the movie box, which the users can click when they   want to delete this specific movie.

## Technologies 
* HTML , CSS , JavaScript (React)
* Firebase (database)
* Heroku (hosting/deploy)
* API : The Movie Database API ( https://developers.themoviedb.org/3/getting-started/introduction )

## Project File Structure
* The project's hierarchy starts with App.js file where every route is implemented and all the components are imported
* MainView is the first ( welcome screen) of the platform
* ResultsView is the second screen where the users can sort the movies based on the categories (top rated, upcoming) and also in this view there is a child component (Sidebar) in which the users can search movies based on other criteria and have access to their profile too.
* When the users sort movies based on the genre  the SearchResults component will display the results
* When the users search for a movie the MovieList component will display their results
* When the users search for an Actor the ActorsView is the component that will display the results
* When the users want to check their profile the ProfileView is the responsible one

## Set up
 * You can clone the repo, we uploaded also the node_modules folder ( we did that just to be sure because in the mid-project review we faced some problems when the students tried to install the packages) and then from terminal you can run ` npm start` inside the folder in order to run the project localy.

## Heroku deploy 
The website is accesible through Heroku from this link 
[MovieGram](https://instamovies.herokuapp.com/)






