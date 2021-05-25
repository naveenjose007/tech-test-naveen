import express from 'express';
import {BasicAuthUtils} from './basicAuthUtils';

const app = express()
const port = 3000

app.use(express.json())

app.get('/status', (req, res) => { res.status(200).end(); });
app.head('/status', (req, res) => { res.status(200).end(); });

const basicAuthHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const headers = req.headers;

  if (!headers.authorization || headers.authorization.indexOf('Basic:') === -1) {
    return res.status(401).json({ message: 'Authorization Header missing' });
  }
  const basicAuthUtils = new BasicAuthUtils();
  const authenticated = basicAuthUtils.authenticate(headers.authorization);

  if (!authenticated) {
    res.set('WWW-Authenticate', 'Basic realm="tech-test-3"')
    res.status(401).send('Authentication required')
  }  
  next()
}

app.get('/basic-auth', basicAuthHandler, (req: express.Request, res: express.Response) => {
  res.status(200).end();
})

export const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
