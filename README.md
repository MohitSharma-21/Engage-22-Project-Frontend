# Engage-22-Project-Frontend

## Introduction

In this project, I have used:

- [Next.js](https://nextjs.org/)
- Tailwind css
- [face-api.js](https://github.com/justadudewhohacks/face-api.js/) for face recognition
- [React-Toastify](https://www.npmjs.com/package/react-toastify) for pop-ups
- Deployed the app on vercel [https://picture-and-todo-manager.vercel.app/](https://picture-and-todo-manager.vercel.app/)
- **Backend** part can be found [here](https://github.com/MohitSharma-21/Engage-22-Project-Backend)


## Features of project

**User**
- User Authentication using face recognition
- Used jasonwebtokens(jwt) for server side authentication.
- If the user tries to sign-up with an already registered username, it will show an error message.
- While sign-up user can capture at max six images for verification
- While sign-in if the user is not registered with the username it will show an error pop-up.
- While sign-in if the model does not matches the face, with face used for sign-up it will show red rectangle on web cam around face.

**Gallery**
- Image classification in the Gallery page using face recognition
- If the image contains more than one face, It classifies it as "Group Photo"
- If the image doesn't conatins any face or the model doesn't detects any face then it classifies the image as "No face detected"
- If the image has only one face, and If the user has saved some pictures with an Image label, then modal will find the best match with uploaded pictures and classifies accordingly else if the image doesn't matches with any one of the faces it will classify that image into "unknown".
- You can both capture and upload image.
- You can also delete an image.

**ToDo** 
- Todo Manager with add, edit and delete feature.




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

Then setup project's backend part from [doc](https://docs.google.com/document/d/1C9-GtIkLhgYKe-9f2ZyujzEh_CabTlwG0jOldP-kJaM/edit?usp=sharing) or from [here](https://github.com/MohitSharma-21/Engage-22-Project-Backend#engage-22-project-backend) 

After that uncomment the [line](https://github.com/MohitSharma-21/Engage-22-Project-Frontend/blob/bcd632502682e4b033a39d8659de6bcd535812e8/utils/axios.jsx#L3) and comment out this [line](https://github.com/MohitSharma-21/Engage-22-Project-Frontend/blob/bcd632502682e4b033a39d8659de6bcd535812e8/utils/axios.jsx#L4)


