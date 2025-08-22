FROM cypress/base:22.18.0
WORKDIR /app

# Copy package files first for better caching
COPY package.json ./
RUN yarn install && \
    yarn cache clean

# Copy only necessary files
COPY cypress.json ./
COPY cypress ./cypress

# Verify Cypress installation
RUN npx cypress verify
