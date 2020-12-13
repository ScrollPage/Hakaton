## Soil-State-Tracker

Site for placing indicators and selling sensors for spot monitoring of soil in sown fields

This is a [Django](https://www.djangoproject.com/) and [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Getting Started

1) Run the FRONTEND server (cd frontend): 

```bash
npm install
npm run dev
# or
yarn install
yarn dev
```

Run the BACKEND server (cd backend): 


If you run on docker:
1) You need to have your Docker installed
```bash
2) cd backend
3) docker-compose up
4) docker-compose -f docker-compose.yml exec web bash
5) python manage.py upload_data sensor_daat.csv
6) python manage.py regress
7) celery -A backend worker --pool=solo -l info
```

!!!Warning!!!
It may take 15-20 minutes to lift the container up

If you want to run by runserver:
1) You need Python `3.*.*`
2) You need to have your Docker installed
```bash
3) python -m pip install –upgrade pip
4) pip install virtualenv
5) python -m venv env
6) env\Scripts\activate.bat (Fow windows)
6) source ./env/bin/activate (For Linux)
7) pip install -r req.txt
8) python manage.py upload_data sensor_daat.csv
9) python manage.py regress
10) celery -A backend worker --pool=solo -l info
11) docker run -d -p 6379:6379 redis
12) docker run -d --name=<name> -p 5432:5432 -e POSTGRES_PASSWORD=<password> -e PGDATA=/pgdata -v /pgdata:/pgdata postgres
13) python manage.py runserver
```
Do not forget to specify your PostgreSQL password in backend.settings! (Database section)
And set the Reds host to `127.0.0.1` backend.settings uncomment line 206 and comment line 207

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.