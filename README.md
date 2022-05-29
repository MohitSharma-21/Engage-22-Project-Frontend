# Engage-22-Project-Frontend

## Introduction

In this project, I have used:

- [Next.js](https://nextjs.org/)
- Tailwind css
- [face-api.js](https://github.com/justadudewhohacks/face-api.js/) for face recognition
- Deployed the app on vercel [https://picture-and-todo-manager.vercel.app/](https://picture-and-todo-manager.vercel.app/)
- **Backend** part can be found [here](https://github.com/MohitSharma-21/Engage-22-Project-Backend)


### Setting up the project

Follow the following steps to setup this project.

Or More detailed setup is [here](https://docs.google.com/document/d/1C9-GtIkLhgYKe-9f2ZyujzEh_CabTlwG0jOldP-kJaM/edit?usp=sharing)

**Note** - This task requires [yarn](https://yarnpkg.com/) which is a tool similar to npm.

### Run the Project

- Clone this repo.
- Go the project folder in terminal.

Install the dependencies using
```
yarn install
```

Then you can finally run the server using this command.
```
yarn dev
```

Then you can go to `http://localhost:3000` in your browser.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit and save the file.

**NOTE** :- Site takes little bit time to load while refreshing the page as it loads the models and while sign-in browser freezes for some time due to face recognition process.




### Run the Backend

If you want to connect to the local server database

Then setup project's backend part from [doc](https://docs.google.com/document/d/11e8OAf8bUSYIFSRN9MPN-docPlZsRtjOo_FTxUwgtQY/edit?usp=sharing) or from [here](https://github.com/MohitSharma-21/Engage-22-Project-Backend#engage-22-project-backend) 

After that uncomment the [line](https://github.com/MohitSharma-21/Engage-22-Project-Frontend/blob/bcd632502682e4b033a39d8659de6bcd535812e8/utils/axios.jsx#L3) and comment out this [line](https://github.com/MohitSharma-21/Engage-22-Project-Frontend/blob/bcd632502682e4b033a39d8659de6bcd535812e8/utils/axios.jsx#L4)


