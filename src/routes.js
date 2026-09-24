import express from 'express';

import { homePage } from './controllers/index.js';
import { organizationsPage, organizationDetailsPage, newOrganizationPage, addOrganization, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from './controllers/organizations.js';
import { projectsPage } from './controllers/projects.js';
import { categoriesPage, showAssignCategoriesForm, processAssignCategoriesForm } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { projectDetailsPage, processNewProjectForm, showNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm } from './controllers/projects.js';
import { categoryDetailsPage } from './controllers/categories.js';

const router = express.Router();

router.get('/', homePage);
router.get('/organizations', organizationsPage);
router.get('/projects', projectsPage);
router.get('/categories', categoriesPage);
router.get('/organization/:id', organizationDetailsPage);
router.get('/project/:id', projectDetailsPage);
router.get('/category/:id', categoryDetailsPage);
router.get('/new-organization', newOrganizationPage);
router.post('/new-organization', organizationValidation, addOrganization);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', processEditProjectForm);


// error-handling routes
router.get('/test-error', testErrorPage);

export default router;