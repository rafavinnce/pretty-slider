# AngularComponentLibrary

This project is to understand how to create npm ready angular component libraries to use in an angular application.

After, generating an angular application for the demo we will follow below steps to create component library
1. Generate a library project by running following command  
```ng generate library pretty-slider --prefix=lib```
2. Library project will be created with one default exported component ```pretty-slider```
3. Lets write some code snippet to make ```pretty-slider``` to behave like a slider component.
4. We can find the source code of rating component [here](https://github.com/rafaelmilanibarbosa/pretty-slider/blob/master/projects/pretty-slider/src/lib/pretty-slider.component.ts)
5. To build the library run the below command  
``` ng build pretty-slider``` 
6. Built is added to the dist folder of our application as ```dist/pretty-slider```
7. There are two ways angular registers external libraries.  
    1. NPM Module declarations in the ```package.json``` file.
    2. Library registered in the ```tsconfig.json``` file
    > Note: Since we generated library with our application. Angular registered our library by placing library dependency entries in ```angular.json``` and ```tsconfig.json```
8. We have added few scripts to built the library and pack for npm in ```package.json ```  
```javascript
"scripts": {
    ...
    ...
    "build-lib": "ng build --prod pretty-slider",
    "npm-pack": "cd dist/pretty-slider && npm pack",
    "package": "npm run build-lib && npm run npm-pack"
}
  ```
  > Last three commands (**build-lib, npm-pack, package**) are responsible for building and packing the library for npm

9. Run ```npm run package``` to create npm ready library in ```dist/pretty-slider```


Finally, lets see how to publish npm package

  1. Add npm user by running below command  
  ```npm adduser```
 > Note: 
 > 1. If you are not signed up above command will sign up you as npm user.
 > 2. Type ```npm whoami``` from a terminal to see if you are already logged in (technically, this also means that your credentials have been stored locally).
 2. Login into npm by running  
 ```npm login```
 3. Go to the packaged output in ```dist/pretty-slider```

 ```cmd
 > cd dist/pretty-slider
 > dist/pretty-slider> npm publish
 ```

 component explains **[how to use?](https://github.com/rafaelmilanibarbosa/pretty-slider/tree/master/projects/pretty-slider)**
 
 npm package will be uploaded to the **[npm registry - pretty-slider](https://www.npmjs.com/package/pretty-slider)**





  


