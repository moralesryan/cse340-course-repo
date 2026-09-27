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

const assignCategoryToProject = async (projectId, categoryId) => {
  const query = `
  INSERT INTO service_category (category_id, project_id)
        VALUES ($1, $2);
    `;

  await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async (projectId, categoryIds) => {
  // First, remove existing category assignments for the project
  const deleteQuery = `
        DELETE FROM service_category
        WHERE project_id = $1;
  `;
  await db.query(deleteQuery, [projectId]);

  // Next, add the new category assignments
  for (const categoryId of categoryIds) {
    await assignCategoryToProject(projectId, categoryId);
  }
}

const createCategory = async (categoryName) => {
  const query = `
  INSERT INTO categories (category_name)
  VALUES ($1)
  RETURNING category_id
  `;

  const queryParams = [categoryName];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to create category');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Created new category with ID:', result.rows[0].category_id);
  }

  return result.rows[0].category_id;
};

const updateCategory = async (categoryId, categoryName) => {
  const query = `
    UPDATE categories
    SET category_name = $1
    WHERE category_id = $2
    RETURNING category_id;
  `;

  const queryParams = [categoryName, categoryId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Category not found');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Updated category with ID:', categoryId);
  }

  return result.rows[0].category_id;
};

export { getAllCategories, getCategoryById, getCategoriesByProjectId, updateCategoryAssignments, createCategory, updateCategory }  
