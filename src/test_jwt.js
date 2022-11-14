var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh', { expiresIn: 60*60});
// console.log(token)
const atk='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2NjgzMjU1NDcsImV4cCI6MTY2ODMyOTE0N30.mCsi3xVlL0JxyV4pG51QB3xsMr08xz_NafKJmXwQn04'

console.log(jwt.verify(atk,'shhhhh'))