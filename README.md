# Group 3 - CA3 - FrontEnd
*This project is the startcode written by Group 3 for the CA3-assignment*

### Preconditions
*In order to use this code, you should have a local developer setup + a "matching" droplet on Digital Ocean as described in the 3. semester guidelines* 

### Initial Setup
 - Clone the project `git clone git@github.com:PetersenAndreas/CA3-Gruppe3-Front.git`
 - Delete the .git folder in the project
 - Make your own Repository for the project (git init, make repository on github, and follow github instructions to push this project up)
 - Do a `npm install` in the root folder, to get the node modules downloaded (these are ingored in the .gitIgnore file)
 - Do a `code .` to open Visual Studio
 - Do a `npm start` to launch the program locally in a browser

 ### Customise your project
 - Change the backEndURL in the settings.js to match your own backEnd.
 - Change the externalApi in the settings.js to match you desired API
    - If you need multiple API's to fetch from that are not combined in the backEnd, you can get inspiration on how to make the .js class in the External.js and make a "getter" simaler to the externalApi in settings.js 
### Deploy the project to surge
- Make sure that you have surge install globaly on your machine.(Go to the build, if already done)
    - Open a terminal and type `install -g surge` 
- Build your frontend project
    - `npm run build`
- Push the build up on surge(Change **A_DOMAIN_NAME** to your own desired domain)
    - `surge --project ./build --domain A_DOMAIN_NAME.surge.sh`
- If this was your first time running surge, you'll be prompted to create an account. Add email and password, then hit enter.     

# Original startup code from the teachers

As the project is build on the original startcode provided by React the previus readme, with instruction can be found here: 
 - [Orginal REACT guide](README_NPM_INSTRUCTIONS.md)
