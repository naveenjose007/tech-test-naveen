import { USERS } from './userLogins';
export class BasicAuthUtils {

  authenticate(authorization: string) { 
    const base64Token = authorization.split(' ')[1];
    const decoded = Buffer.from(base64Token, 'base64').toString('ascii');
    const [userLogin, password] = decoded.split(':');
    const {users}  = USERS;
    const userFound = users.find(user => user.userLogin === userLogin && user.password === password);
    if (userFound) {
      return true;
    }
    return false;
  }
}
