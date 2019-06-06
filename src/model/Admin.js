const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const adminUserSchema = new Schema({
  uid: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String
  },
  settings: {
    phoneNumber: {
      type: String,
      default: ""
    },
    twilioPhoneNumber: {
      type: String,
      default: ""
    },
    twilioAccountSID: {
      type: String,
      default: ""
    },
    twilioAuthToken: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    }
  },
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ],
  analytic: {
    usage: {
      type: Number,
      default: 0
    },
    balance: {
      type: Number,
      default: 0
    },
    users: {
      type: Number,
      default: 0
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

adminUserSchema.pre("save", async function(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  user.confirmPassword = null;

  return next();
});

adminUserSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = Admin = mongoose.model("admin", adminUserSchema);
