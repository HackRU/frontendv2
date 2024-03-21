## HackRU Frontend

To get started, you must install `PNpm`, a much faster version of `npm`. You can find instructions on how to install [`PNpm` here](https://pnpm.io/installation).

Then, you can run the following on your terminal.

```
git clone git@github.com:HackRU/frontendv2.git
cd frontendv2
git branch dev
pnpm i
```
In the project folder, you will find a `` file. Rename this file to `.env` (this must never be pushed to GitHub).

Contact me (Kevin) and I will provide you with the secret API keys to connect to the dummy database.

## Running the dev environment
To run the project locally, type `npm run dev`. Then, you can go to `localhost:3000` on your browser.

We are in the beginning stages of development.

`localhost:3000/`: This is the landing page (where the hero will reside). This is mapped to `/app/page.tsx`.

`localhost:3000/dashboard`: This is the dashboard route. This is mapped to `/app/dashboard/(overview)/page.tsx`.

## Making Changes
If you are a part of the frontend team, do not fork the project. Instead, use `git clone`, create a branch *from* the `dev` branch by typing
```
git checkout dev
git branch <your-feature-name>
```
Then, you can submit changes via a pull request so that it can be merged to the `dev` branch.
