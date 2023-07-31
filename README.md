# Repertoire
A workout tracking app. It allows Users to login, track their workouts.
It also uses an API [ExerciseAPI](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb/details) to generate the list of exercises a user can choose. 

## Wireframes
### Homepage
![Homepage](./public/images/homepage.png)
### Workouts Index
![workouts](./public/images/workouts.png)
### Workouts Show
![workouts-show](./public/images/workouts-show.png)
### Set
![workouts](./public/images/set.png)

## ERD Database Planning
![ERD](./public/images/ERD.png)

## RESTful Routing 
| Method     | URL Path                             | Action  | CRUD Operation                     |
|------------|--------------------------------------|---------|------------------------------------|
| GET        | /workouts                            | index   | Read all workouts                  |
| GET        | /workouts/:id                        | show    | Return view to add                 |
| POST       | /workouts                            | create  | Create new workout                 |
| PUT        | /workouts/:id                        | update  | Update workout                     |
| DELETE     | /workouts/:id                        | destroy | Destroy workout                    |
| GET        | /workouts/:id/exercises              | index   | read all sets belonging to workout |
| GET        | /workouts/:id/exercises/:id          | show    | read one set                       |
| POST       | /workouts/:id/exercises              | create  | Create a new set within workout    |
| PUT        | /workouts/:id/exercises/:id          | update  | Update a set                       |
| DELETE     | /workouts/:id/exercises/:id          | destroy | Destroy a set                      |
| GET        | /workouts/:id/exercises/:id/sets     |         |                                    |
| GET        | /workouts/:id/exercises/:id/sets/:id |         |                                    |
| POST       | /workouts/:id/exercises/:id/sets     |         |                                    |
| PUT/DELETE | /workouts/:id/exercises/:id/sets/:id |         |                                    |

## User Stories
* AAU I want to see a list of my workouts on my homepage ✅
* AAU I want to be able to add a workout quickly and add sets within the same page ✅
* AAU I want to search exercises by muscle, body-part and equipment ✅
* AAU I want to be able to change the exercise without deleting the sets ✅

## MVP
* User Authentication (with Google) ✅
* Add workouts ✅
* Add exercises to workouts ✅
* Add sets to exercises ✅
* Add reps to sets ✅
* Use the exerciseDB API ✅

## Stretch Goals
* A nicer front-end maybe using a library ✅
    * Bringing views together, being able to add workout, exercise and set at the same time ✅
* User metric tracking, e.g BMI, progress pics, body fat %
* Built in login, or more login options
* Users able to save workout templates to quickly get workouts
* Weight and sets prefilled based on last time that exercise was performed
* Workouts index page to be sorted by date and display the exercises included as subtext
* Workouts index view toggle calender view

## Work List
* Improve Styling ✅
* KG to Lbs calculation - front end? ✅
    * Preference Model ✅
* Dont include reps on certain exercises?
* Dont include weight on certain exercises i.e. body weight exercises
* Add default date of now and display in UI ✅
* Download all gifs ✅
* Make sets update clientside - no redirect
* Make default most recent weight and sets on new set


