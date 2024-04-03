# TaskQuest
## This is an task management web app.

### Thank you for visiting, now I want to provide instructions for how you can run this web app locally.

## #Way number one:

### You need to clone of my task quest client and task quest server.
#### Clone client:
```
git clone https://github.com/mdhasanali39/taskQuest-client.git
```
#### Clone server:
```
git clone https://github.com/mdhasanali39/taskQuest-server.git
```
### run command npm i for client and server
``` 
npm i
```
## Now you need some environment variables for both the client and server.
## For client side .env.local file:
### for firebase configuration:
```
VITE_APIKEY="api key"
VITE_AUTHDOMAIN=your auth domain
VITE_PROJECTID=your project id
VITE_STORAGEBUCKET=your storagebucket
VITE_MESSAGINGSENDERID=your messaging sender id
VITE_APPID=your app id
```
### Another for axiosSecure:
```
VITE_API_BASE_URL="http://localhost:5000"
```
### Another for Imgbb api key:
```
VITE_IMGBB_API_KEY=your imgbb api key
```
## For server side .env file:
```
MONGODB_URI_STRING= your mongodb connection uri string with password
```
### Another for token generation:
```
SECRET=your secret
```

### now run by run below command for client and server.
```
npm run dev
```
## #Way number two:
   ### You need to set up only client-side and run the deployed server link on your browser tab;
### But make sure to change by deployed server link on client side:
```
VITE_API_BASE_URL="https://task-quest-server.vercel.app"
```
### Deployed [Server](https://task-quest-server.vercel.app/)

## For any inquiry: 
Email:mdhasanali9139@gmail.com

## Live site link for taskQuest

[Live Link](https://task-quest-client.vercel.app/)