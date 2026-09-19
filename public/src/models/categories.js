import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT category_id, category_name
      FROM categories;
    `;

    const result = await db.query(query);

    return result.rows;
}

// 1. Retrieve a single category by its ID
const getCategoryById = async (categoryId) => {
  const query = `
      SELECT category_id, category_name
      FROM categories
      WHERE category_id = $1;
  `;

  const result = await db.query(query, [categoryId]);

  return result.rows[0];
}

// 2. Retrieve all categories for a given service project
const getCategoriesByProjectId = async (projectId) => {
  const query = `
      SELECT c.category_id, c.category_name
      FROM categories c
      JOIN service_category sc ON c.category_id = sc.category_id
      WHERE sc.project_id = $1;
  `;

  const result = await db.query(query, [projectId]);

  return result.rows;
}

export { getAllCategories, getCategoryById, getCategoriesByProjectId }  
