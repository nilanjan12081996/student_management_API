'use strict';

const express = require('express');

const organizationController = require("../../controllers/organizationsController/organizationsController");

const router = express.Router();

// Create Organization
router.post('/createOrganization', organizationController.createOrganization);

// Get All Organizations
router.get('/getAllOrganization', organizationController.getAllOrganizations);

// Get Organization By ID
router.get('/getOrganizationById/:id', organizationController.getOrganizationById);

// Update Organization
router.put('/updateOrganization/:id', organizationController.updateOrganization);

// Delete Organization
router.delete('/deleteOrganization/:id', organizationController.deleteOrganization);

module.exports = router;