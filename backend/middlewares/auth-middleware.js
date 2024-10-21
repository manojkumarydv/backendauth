import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'

var checkUserAuth = async (req, res, next) => {
  let token
  const { authorization } = req.headers

  // Here are some common HTTP headers you might access using req.header:

  // 'Content-Type': Specifies the media type of the request payload.
  // 'Authorization': Contains the credentials to authenticate the user agent with the server.
  // 'User-Agent': Contains information about the user agent (browser, version, etc.).
  // 'Referer': Contains the URL of the page that linked to the resource being requested.
  // 'Cookie': Contains the cookies that were included with the request.



  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from header
      token = authorization.split(' ')[1]

      // Verify Token
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)

      // Get User from Token
      req.user = await UserModel.findById(userID).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
    }
  }
  if (!token) {
    res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
  }
}

export default checkUserAuth