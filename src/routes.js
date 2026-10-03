import express from 'express';

import { homePage } from './controllers/index.js';
import { organizationsPage, organizationDetailsPage, newOrganizationPage, addOrganization, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from './controllers/organizations.js';
import { projectsPage } from './controllers/projects.js';
import {
    categoriesPage, showAssignCategoriesForm, processAssignCategoriesForm, categoryValidation, newCategoryPage, addCategory, showEditCategoryForm, processEditCategoryForm
} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { projectDetailsPage, processNewProjectForm, showNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm } from './controllers/projects.js';
import { categoryDetailsPage } from './controllers/categories.js';
import { processUserRegistrationForm, showUserRegistrationForm, showLoginForm, processLoginForm, processLogout, showDashboard, requireLogin, requireRole, showUsersPage } from './controllers/users.js';

const router = express.Router();

// Public routes
router.get('/', homePage);
router.get('/organizations', organizationsPage);
router.get('/projects', projectsPage);
router.get('/categories', categoriesPage);
router.get('/organization/:id', organizationDetailsPage);
router.get('/project/:id', projectDetailsPage);
router.get('/category/:id', categoryDetailsPage);

// Auth routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);

// Admin protection
// Organizations
router.get('/new-organization', requireRole('admin'), newOrganizationPage);
router.post('/new-organization', requireRole('admin'), organizationValidation, addOrganization);
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Projects
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

// Categories
router.get('/new-category', requireRole('admin'), newCategoryPage);
router.post('/new-category', requireRole('admin'), categoryValidation, addCategory);
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

// Assigning categories to projects
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

// Users
router.get('/users', requireRole('admin'), showUsersPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;