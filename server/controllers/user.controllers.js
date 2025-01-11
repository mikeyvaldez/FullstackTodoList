import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js"


// -----Test-------------------------
export const test = (req, res) => {
    return res.json({ message: "Api is working!" })
}

// ------------end of test------------------


//-------UPDATE USER--------------
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, "You are not allowed to udate this user"));
    }
  
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return next(errorHandler(400, "Password must be at least 6 characters"));
      }
  
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
  
    if (req.body.username) {
      if (req.body.username.length < 7 || req.body.username.length > 20) {
        return next(
          errorHandler(400, "Username must be between 7 and 20 characters")
        );
      }
      if (req.body.username.includes(" ")) {
        return next(errorHandler(400, "Username cannot contain spaces"));
      }
      if (req.body.username !== req.body.username.toLowerCase()) {
        return next(errorHandler(400, "Username must be lowercase"));
      }
      if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(
          errorHandler(400, "Username can only contain letters and numbers")
        );
      }
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,            
            password: req.body.password,
          },
        },
        { new: true }
      ); // this line will send back the new information
      const { password, ...rest } = updatedUser._doc; // this separates the password from the rest of the data
      res.status(200).json(rest); // we send every thing except the password
    } catch (error) {
      next(error);
    }
  };
// -----------------End of Update user--------------------------------------------------------

// --------------------DELETE USER-------------------------------------------------------------
export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};
// ------------------------End of Delete User--------------------------------------------------------




// export const signout = (req, res, next) => {
//   try {
//     res
//       .clearCookie("access_token")
//       .status(200)
//       .json("User has been signed out");
//   } catch (error) {
//     next(error);
//   }
// };

// export const getUsers = async (req, res, next) => {
//   if (!req.user.isAdmin) {
//     return next(errorHandler(403, "You are not allowed to see all users"));
//   }

//   try {
//     const startIndex = parseInt(req.query.startIndex) || 0;
//     const limit = parseInt(req.query.limit) || 9;
//     const sortDirection = req.query.sort === "asc" ? 1 : -1;

//     const users = await User.find()
//       .sort({ createdAt: sortDirection })
//       .skip(startIndex)
//       .limit(limit);

//       const securedUser = users.map((user) => {
//         const { password, ...rest } = user._doc;
//         return rest;
//       });

//       const totalUsers = await User.countDocuments();
//       const now = new Date();
//       const oneMonthAgo = new Date(
//         now.getFullYear(),
//         now.getMonth() - 1,
//         now.getDate()
//       );

//       const lastMontUsers = await User.countDocuments({
//         createdAt: { $gte: oneMonthAgo },
//       });

//       res.status(200).json({
//         users: securedUser,
//         totalUsers,
//         lastMontUsers,
//       })
//   } catch (error) {
//     next(error);
//   }
// };

// export const getUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       return next(errorHandler(404, 'User not found'));
//     }
//     const { password, ...rest } = user._doc;
//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };