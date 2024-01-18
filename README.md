# TODO API - README

Thank you for using the Todo API! This README file will guide you through the process of setting up and running the Todo project API on your local machine.

# Prerequisites

Before you start, make sure you have the following installed on your machine:

1. Node.js (https://nodejs.org/) - Make sure to install the LTS version.
2. npm (Node Package Manager) - This comes bundled with Node.js.
3. MongoDB (https://www.mongodb.com/try/download/community) - Install the Community Edition.

# Getting Started

1.  Clone the repository:

        git clone https://github.com/JenishChanchad98/ToDO-API.git
        cd ToDO-API

2.  Install dependencies:

        npm install

3.  Configure and create a .ENV file in the root of the project to store environment variables. this file should contain the following variables::

    - API_PORT=
    - MONGO_URI=
    - JWT_SECRET_KEY=
    - SALT_ROUNDS=

4.  Start the server:

        npm run dev

    The API should now be up and running at

        http://localhost:3030
