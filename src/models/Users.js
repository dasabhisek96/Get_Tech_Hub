
'use strict';
const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    status:{
        type:Number,
        default: 0
    }
})

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
    },
    phone:{
        type: String,
    },
    role: RoleSchema,
    access_token:{
        type: String,
    }
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});
module.exports = mongoose.model('Users', UserSchema);