import { CategoryModel } from './category.model.js';

export const getListCategory = async (req, res) => {
  try {
    const { page = 1, limit, perPage = 10 } = req.query;

    CategoryModel.find({ auth_id: res.locals.auth_id })
      .populate('name')
      .skip(limit * page - limit)
      .limit(limit)
      .exec((err, notes) => {
        CategoryModel.countDocuments((err, count) => {
          if (err) return;

          res.status(200).json({
            data: notes,
            current_page: parseInt(page),
            total_page: Math.ceil(count / perPage)
          });
        });
      });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const putCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await CategoryModel.findByIdAndUpdate(id, {
      name: name
    });
    res.status(200).json({ id, name });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryModel.findByIdAndDelete(id);
    res.status(200).json({ id, message: 'sucsess' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createCategory = async (req, res) => {
  try {
    const newCategory = new CategoryModel(req.body);
    await newCategory.save();
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
