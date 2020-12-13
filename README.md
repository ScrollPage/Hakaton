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
```

If you want to run by runserver:
1) You need Python `3.*.*`
2) You need to have your Docker installed
```bash
3) python -m pip install –upgrade pip
4) pip install vurtual env
5) env\Scripts\activate.bat
6) pip install -r req.txt
7) python manage.py upload_data sensor_daat.csv
8) python manage.py regress
9) celery -A backend worker --pool=solo -l info
10) docker run -d -p 6379:6379 redis
11) docker run -d --name=<name> -p 5432:5432 -e POSTGRES_PASSWORD=<password> -e PGDATA=/pgdata -v /pgdata:/pgdata postgres
12) python manage.py runserver
```
Do not forget to specify your PostgreSQL password in backend.settings!


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.