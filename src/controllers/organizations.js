import { getAllOrganizations, getOrganizationDetails, createOrganization } from '../models/organizations.js';;
import { getProjectsByOrganizationId } from '../models/projects.js';;

const organizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
};

const organizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organization', { title, organizationDetails, projects });
};

const newOrganizationPage = (req, res) => {
    const title = 'Add New Organization';

    res.render('new-organization', { title });
};

const addOrganization = async (req, res) => {
    const { name, description, contact_email } = req.body;
    const logo_filename = 'placeholder-logo.png';

    const organizationId = await createOrganization(name, description, contact_email, logo_filename);

    // Set a success flash message
    req.flash('success', 'Organization added successfully!');

    res.redirect(`/organization/${organizationId}`);
};


export { organizationsPage, organizationDetailsPage, newOrganizationPage, addOrganization };
