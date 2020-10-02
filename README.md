# match-api

a [Sails v1](https://sailsjs.com) application

### Links

- [Sails framework documentation](https://sailsjs.com/get-started)

### Installation & Configuration

Clone the code using the following command :

```bash
git clone https://github.com/alaahatem/Arqam.git
```

## Using docker

- Prerequisite :
  Install Docker
  Check if installed using :
  ```bash
  docker --version
  ```

Direct into the project

```bash
cd Arqam
```

Run docker compose server( exposed at same default port 1337 to avoid confusion)

```bash
docker-compose up
```

## OR using npm manually

Direct into the project :

```bash
cd Arqam
```

Install dependencies :

```bash
npm install
```

Start the project :

```bash
npm start
```

The postgres database is deployed on heroku (response speed not as locally) to avoid the hassle of configuring it and the connection url should be in env but is embedded to start testing the api immediately

## API USAGE

- Create a new Team (at least two to create a match)
  All CRUD available

```bash
POST http://localhost:1337/team

{
    "name" :"Chelsea"
}

```

- Create a new Competition
  All CRUD available

```bash
POST http://localhost:1337/competition

{
    "name" :"Premier League"
}

```

OPTIONALLY You can also do the following :

- Create a new Player :
  All CRUD available

```bash
POST http://localhost:1337/player

{
    "name" :"Eden Hazard",
    "number": 10 ,
    "team_id": 3

}

```

- Get players with of a specific team with team_id=1

```bash
GET http://localhost:1337/player?team_id=1



```

- Create a new Referee :
  All CRUD available

```bash
POST http://localhost:1337/referee

{
    "name" :"Howard Webb"
}

```

Create a new Stadium :
All CRUD available

```bash
POST http://localhost:1337/stadium

{
    "name" :"Stamford Bridge"
}

```

## MATCH API

- Create a new Match

* Make sure to enter the date and time in the same format
* Matches in the future date or time won't be assigned as they are not played yet.

```bash
POST http://localhost:1337/match


{
   "date": "2020-09-25 ",
   "home_team_id":3,
   "away_team_id":1,
   "stadium_id":2,
   "referee_id":2,
   "competition_id":1,
   "kickoff_time":"15:45:00"

}

```

- GET All Matches

```bash
GET http://localhost:1337/match

```

- GET Match by id

```bash
GET http://localhost:1337/match/{match_id}

```

- GET Matches of a specific team

```bash
GET http://localhost:1337/match/team/{team_id}

```

- edit a specific match

```bash
PATCH http://localhost:1337/match/{match_id}
{
    "home_team_id": 2
}

```

- delete a specific match

```bash
DELETE http://localhost:1337/match/{match_id}


```

## Collector Api

- create a new collector

```bash
  POST http://localhost:1337/collector
```

- edit a collector

```bash
  PATCH http://localhost:1337/collector/{collector_id}
```

- delete a collector
  ```bash
  DELETE http://localhost:1337/collector/{collector_id}
  ```

## We have created a match and a collector now we can assign a collector a match

- Assign collector with id 2 a match with id 1

```bash
POST http://localhost:1337/match/1/assign
{
    "collector_id":2
}
```

Note :
Assigning a collector with more than 2 matches won't be accepted
and assigning a collector a match that is yet to be played won't be accepted

- GET history of assignments of a specific collector with id 2

```bash
GET http://localhost:1337/collector/2/assignments
```

- We can also do any CRUD operation on table matches collector which contains records of match assignments with every record containing a match id and a collector id assigned to that match.

```bash
GET http://localhost:1337/matchescollector
```

```bash
DELETE http://localhost:1337/matchescollector/1
```

- for example editing a match assignment

```bash
PATCH http://localhost:1337/matchescollector/1

{
    collector_id : 1
}
```

- Collect a match

```bash
PATCH http://localhost:1337/match/{match_id}/collect

```
