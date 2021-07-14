/* tslint:disable */
// @ts-nocheck

const { writeFile,existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');

// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;

function writeFileUsingFS(targetPath, environmentFileContent){
    writeFile(targetPath, environmentFileContent, function(err){
        if(err){
            console.log(err);
        }

        if(environmentFileContent !== ''){
            console.log('wrote variables to ${targetPath}');
            
        }
    });
}

//providing path to the `environments` directory
const envDirectory = './src/environments';

//creates the `environments` directory if does not exist
if(!existsSync(envDirectory)){
    mkdirSync(envDirectory);
}
//creates the `enviroment.prod.ts` and `environment.ts` files if it does not exist
writeFileUsingFS('./src/environments/environment.prod.ts');
writeFileUsingFS('./src/environments/environment.ts');

const isProduction = environment === 'prod';

//chose the correct path based on the environment
const targetPath = isProduction
    ? './src/environments/environment.prod.ts'
    : './src/environments/environment.ts'

//actual content to be compiled dynamically and pased into respective environment files
const environmentFileContent = `
    //this file was autogenerated dynamically running setEnv.ts and using dotenv for managing APIKEYs secrecy
    
    export const environment = {
        production: ${isProduction},
        SPOTIFY_CLIENT_ID: '${process.env.SPOTIFY_CLIENT_ID}',
        SPOTIFY_CLIENT_SECRET: '${process.env.SPOTIFY_CLIENT_SECRET}',
        AGM_APIKEY: '${process.env.AGM_APIKEY}',
        AUTH_CLIENT_ID: '${process.env.AUTH_CLIENT_ID}',
        AUTH_DOMAIN: '${process.env.AUTH_DOMAIN}',
        firebase: '${process.env.FIREBAE}',
    };
`;

writeFileUsingFS(targetPath, environmentFileContent); // appending data into the target file

/* tslint:enable */