import express from 'express';
import {
  createCategory,
  deleteCategory,
  getListCategory,
  putCategory
} from './category.controller.js';

const routerCategory = express.Router();

routerCategory.get('/', getListCategory);

routerCategory.post('/', createCategory);

routerCategory.put('/:id', putCategory);

routerCategory.delete('/:id', deleteCategory);

export default routerCategory;
