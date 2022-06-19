const express = require("express");

const { schemas } = require("../../models/Contacts");

const { validation } = require("../../middlewares");

const ctrl = require("../../controllers/contacts");

const router = express.Router();