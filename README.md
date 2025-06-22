## HackRU Frontend

To get started, you must install `PNpm`, a much faster version of `npm`. You can find instructions on how to install [`PNpm` here](https://pnpm.io/installation).

Then, you can run the following on your terminal.

```
git clone git@github.com:HackRU/frontendv2.git
cd frontendv2
git branch dev
pnpm i
```

## Running the dev environment
To run the project locally, type `npm run dev`. Then, you can go to `localhost:3000` on your browser.

There are two main pages landing and dashboard

`localhost:3000/`: This is the landing page (where the hero will reside). This is mapped to `/app/(pre-dashboard)/(landing)/page.tsx`.

`localhost:3000/dashboard`: This is the dashboard route. This is mapped to `/app/dashboard/page.tsx`.

the rest of the pages are in `app\(pre-dashboard)\(entry)` they are 
  forgot and magic, which are used for creating magic links to reset password, and the consuming those links to reset the password
  login and signup which do what they are named for
  there is also leaderboard which was used for the spring 2024, it's unclear at the moment if it will be used again



## Making Changes
If you are a part of the frontend team, do not fork the project. Instead, use `git clone`, then create and switch to a branch *from* the `dev` branch by typing
```
git checkout dev
git checkout -b <your-feature-name>
```
Then, you can submit changes via a pull request so that it can be merged to the `dev` branch.

if you are having any trouble, don't be afraid to reach out either in the frontend chat or privately to the frontend lead
