# finalProject

## Brief description about this wonderful project

### This project is developed using TypeScript and Express. Under development it runs Nodemon. Please have a look at the following script:

```"start": "nodemon --watch './\*\*/_.ts' --exec 'ts-node' src/index.ts"```

#### Index.ts file is the starting point at development. It is fed with userRouter.ts where all the routes are set.  Within this file, we have the CRUD API's for successfully creating, updating, listing, searching and deleting users. Users have been modelized under a interface called "IUser" which is imported from the user.interface.ts file. As well, the heavy logic of implementing this CRUD API's is performed under a user.service.ts file which is imported as well.
