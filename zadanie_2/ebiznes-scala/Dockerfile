FROM kprzystalski/ebiznes-scala:latest

WORKDIR /home/student/app

COPY --chown=student:student . /home/student/app/

EXPOSE 9000

CMD ["sbt", "run -Dhttp.port=9000 -Dhttp.address=0.0.0.0"]

