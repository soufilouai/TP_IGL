FROM python:3.12.1

RUN pip install --upgrade pip 

COPY ./requirements.txt .

RUN pip install -r requirements.txt

WORKDIR /app

COPY . /app

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]



