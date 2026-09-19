import { getAllCategories, getCategoryById } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/projects.js';

const categoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Categories';

    res.render('categories', { title, categories });
};

const categoryDetailsPage = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await getCategoryById(id);

        if (!category) {
            return res.status(404).send('Category not found');
        }

        const projects = await getProjectsByCategoryId(id);

        res.render('category', { category, projects });
    } catch (error) {
        console.error('Error loading category details page:', error);
        res.status(500).send('Something went wrong');
    }
};


export { categoriesPage, categoryDetailsPage };