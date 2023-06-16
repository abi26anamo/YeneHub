# YeneHub

Full Stack Social Media Website

![abi_post](https://github.com/abi26anamo/YeneHub/assets/91598495/50da406c-8367-47f0-ab3e-778aa2083367)
## Features
- Email & Password Authentication
- Persisting Auth State
- Searching for users
- Posting posts
- Commenting on Posts
- Liking Posts
- Following and Unfollowing friends
- Dispalying the number of likes,comments
- Profile page for user
- Filtering posts (Based on user)
- Deleting Own Posts
- Get specific user posts
- Getting Friends List


## Running Locally
After cloning this repository, migrate to ```YeneHub``` folder. Then, follow the following steps:
- Create MongoDB Project & Cluster
- Click on Connect, follow the process where you will get the uri.- Replace the MongoDB uri with yours in ```backend/index.js```.
Then run the following commands to run your app:

### Server Side
```bash
  cd backend
  npm install
  npm run dev (for continuous development)
  OR
  npm start (to run script 1 time)
```

### Client Side
```bash
  cd frontend
  npm install
  npm start
```

## Tech Used
**Server**: Node.js, Express, Mongoose, MongoDB, 

**Client**: ReactJs,ReduxToolkit, Redux-Persist,React-Router,Formik,Yup,React-DropZone
    
## Feedback

If you have any feedback, please reach out to me at abianamo282@gmail.com
