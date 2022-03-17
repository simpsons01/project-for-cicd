FROM alpine

RUN apk add nodejs-current

RUN apk add --update npm

CMD [ "sleep", "30" ]
