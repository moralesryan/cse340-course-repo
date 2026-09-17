import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const projectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

const projectDetailsPage = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await getProjectDetails(id);

        if (!project) {
            return res.status(404).send('Project not found');
        }

        res.render('project', { project });
    } catch (error) {
        console.error('Error loading project details page:', error);
        res.status(500).send('Something went wrong');
    }
};

export { projectsPage, projectDetailsPage };