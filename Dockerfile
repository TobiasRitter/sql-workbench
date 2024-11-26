FROM python:slim-bullseye

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir --upgrade -r ./server/requirements.txt

CMD ["fastapi", "run", "server/server.py", "--port", "80"]

EXPOSE 80
