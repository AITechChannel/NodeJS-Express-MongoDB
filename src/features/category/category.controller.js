import { CategoryModel } from './category.model.js';

export const getListCategory = async (req, res) => {
  try {
    // const a = req.params;
    // // const cate = new CategoryModel({ name: "category 3" });
    // // cate.save();
    // const posts = await CategoryModel.find();
    // res.status(200).json(posts);
    let perPage = 2; // số lượng sản phẩm xuất hiện trên 1 page
    let page = req.query.page || 2;
    const data = await CategoryModel.find() // find tất cả các data
      .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec((err, categories) => {
        CategoryModel.countDocuments((err, count) => {
          // đếm để tính xem có bao nhiêu trang
          if (err) return next(err);
          res.status(200).json({
            categories, // sản phẩm trên một page
            current: page, // page hiện tại
            total: Math.ceil(count / perPage) // tổng số các page
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
    console.log(id, name);
    await CategoryModel.findByIdAndUpdate(id, {
      name: name
    });
    // res.header("Access-Control-Allow-Credentials", true);
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
    const newCate = req.body;
    const cate = new CategoryModel(newCate);
    cate.save();
    const data = await CategoryModel.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
