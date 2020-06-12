const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      require: true,
    },
    lastName: {
      type: String,
      trim: true,
      require: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    position: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      require: true,
    },
    adminAuthorize: {
      type: Boolean,
      default: false,
    },
    isVerifiedEmail: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

// UserSchema.methods.toJSON = function () {
//   const user = this
//   const userObject = user.toObject()
//   delete userObject.password
//   return userObject
// }

UserSchema.virtual('horizons', {
  ref: 'horizon',
  localField: '_id',
  foreignField: 'owner',
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
