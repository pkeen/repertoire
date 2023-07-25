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
| Method | URL Path               | Action  | CRUD Operation                     |
|--------|------------------------|---------|------------------------------------|
| GET    | /workouts              | index   | Read all workouts                  |
| GET    | /workouts/:id          | show    | Return view to add                 |
| POST   | /workouts              | create  | Create new workout                 |
| PUT    | /workouts/:id          | update  | Update workout                     |
| DELETE | /workouts/:id          | destroy | Destroy workout                    |
| GET    | /workouts/:id/sets     | index   | read all sets belonging to workout |
| GET    | /workouts/:id/sets/:id | show    | read one set                       |
| POST   | /workouts/:id/sets     | create  | Create a new set within workout    |
| PUT    | /workouts/:id/sets/:id | update  | Update a set                       |
| DELETE | /workouts/:id/sets/:id | destroy | Destroy a set                      |

## MVP
* User Authentication
* Add workouts
* Add sets to workouts
* Add reps to sets
* Use the exerciseDB API


