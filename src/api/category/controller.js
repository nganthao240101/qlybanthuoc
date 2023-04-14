import db from "../../models";

let getCategoryList = (req, res, next) => {
  try {
    db.Category.findAll({
      attributes: ["id", "name"],
    })
      .then((list) => {
        res.status(200).json({ success: true, data: list });
      })
      .catch(function (err) {
        next(err);
      });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

let handleCreateSubCategory = (req, res, next) => {
  const { sub_name, categoryId } = req.body;
  console.log(req.body);
  db.SubCategory.findOne({
    where: {
      sub_name: sub_name,
    },
  })
    .then((data) => {
      console.log(data.id);
      if (data) {
        return db.SubCategory.update(
          {
            sub_name: sub_name,
            categoryId: categoryId,
          },
          { where: { id: data.id } }
        );
      }
      return db.SubCategory.create({
        sub_name: sub_name,
        categoryId: categoryId,
      });
    })
    .then((data) => {
      res.status(200).json({
        success: true,
        msg: "Successfully inserted subcategory",
      });
    })
    .catch((err) => {
      next(err);
    });
};

let handleCreateChildCategory = (req, res, next) => {
  const { name, categoryId, subcategoryId } = req.body;
  console.log(req.body);
  db.SubChildCategory.findOne({
    where: {
      name: name,
    },
  })
    .then((data) => {
      if (data) {
        return db.SubChildCategory.update(
          {
            name: name,
            categoryId: categoryId,
            subcategoryId: subcategoryId,
          },
          { where: { id: data.id } }
        );
      }
      return db.SubChildCategory.create({
        name: name,
        categoryId: categoryId,
        subcategoryId: subcategoryId,
      });
      console.log(data.id);
    })
    .then((data) => {
      res.status(200).json({
        success: true,
        msg: "Successfully inserted childcategory",
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getCategoryList: getCategoryList,
  handleCreateSubCategory: handleCreateSubCategory,
  handleCreateChildCategory: handleCreateChildCategory,
};
