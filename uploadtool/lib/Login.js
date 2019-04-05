const inquirer   = require('inquirer');
import settings  from './Settings';
import apiClient from "./ApiClient"
import gql from "graphql-tag";
const userQ='query{currUser{firstName, lastName}}'
const query=`mutation login(
  $email: String!,
  $password: String!,
  $appName: String!,
  $appProps: String!,
){login(
  email:$email,
  password:$password,
  appName:$appName,
  appProps:$appProps
) }`

export default  async () => {
  var token = settings.get('token');
  if (token){
    var currUser = await apiClient
    .query({query: gql(userQ)})
      .then((res)=>{
        return res.data.currUser;
    }).catch(error => {
      //invalid token
      settings.set('token',null);
      settings.save();
    });
    if (currUser)
      return currUser;
  }

  const questions = [
    {
      name: 'username',
      type: 'input',
      message: 'Enter your e-mail address:',
      validate: function( value ) {
      return true;
     }
    },
    {
      name: 'password',
      type: 'password',
      mask: '*',
      message: 'Enter your password:',
      validate: function(value) {
        if (value.length) {
          return true; 
        } else {
          return 'Please enter your password.';
        }
      }
    }
  ];
  var count=0;
  let user;
  while(count++<3){
    var credits = await inquirer.prompt(questions);
    
    user = await apiClient
      .mutate({mutation: gql(query), variables:{
        email: credits.username ||'geertjan@whitebytes.nl',
        password: credits.password,
        appName: 'CLI',
        appProps: JSON.stringify({
          hostName:'localPC'
        })
      }}) 
      .then((rest) => {
        settings.set('token',rest.data.login);
        settings.save();
        return apiClient
        .query({query: gql(userQ)})
          .then((res)=>{
            return res.data.currUser;
        })
      }).catch(error =>{console.log(error)})
      if (user)
        return user;
  }
  console.log('No valid creditials, leaving now..')
}
