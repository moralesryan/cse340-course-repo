import db from './db.js'

const getAllProjects = async () => {
    const query = `
        SELECT service_projects.project_id, service_projects.title, 
               service_projects.description, service_projects.location, 
               service_projects.date, organization.name AS organization_name
        FROM public.service_projects
        JOIN public.organization 
          ON service_projects.organization_id = organization.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
      SELECT
        project_id,
        organization_id,
        title,
        description,
        location,
        date
      FROM service_projects
      WHERE organization_id = $1
      ORDER BY date;
    `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
      SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.date,
      sp.location,
      sp.organization_id,
      o.name AS organization_name
    FROM service_projects sp
    JOIN organization o ON sp.organization_id = o.organization_id
    WHERE sp.date >= CURRENT_DATE
    ORDER BY sp.date ASC
    LIMIT $1
  `
  const { rows } = await db.query(query, [Number(number_of_projects)]);
  return rows;
}

const getProjectDetails = async (id) => {
  const query = `
  SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.date,
      sp.location,
      sp.organization_id,
      o.name AS organization_name
    FROM service_projects sp
    JOIN organization o ON sp.organization_id = o.organization_id
    WHERE sp.project_id = $1
  `
  
  const { rows } = await db.query(query, [id]);
  return rows[0];
}

// 3. Retrieve all service projects for a given category
const getProjectsByCategoryId = async (categoryId) => {
  const query = `
      SELECT sp.project_id, sp.organization_id, sp.title, sp.description, sp.location, sp.date
      FROM service_projects sp
      JOIN service_category sc ON sp.project_id = sc.project_id
      WHERE sc.category_id = $1;
  `;

  const result = await db.query(query, [categoryId]);

  return result.rows;
}

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, getProjectsByCategoryId };
