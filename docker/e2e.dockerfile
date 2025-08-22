FROM cypress/base:22.18.0
WORKDIR /app

COPY cypress.json ./
COPY package.json .

RUN yarn
RUN npx cypress verify
