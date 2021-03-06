const categoriesService = require("../services/categories.services");
const upload = require("../middleware/category.upload");

exports.create = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            const path =
                req.file != underfined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                categoryName: req.body.categoryName,
                categoryDescription: req.body.categoryDescription,
                categoryImage: path != "" ? "/" + path : ""
            };

            categoriesService.createCategory(model, (error, results) => {
                if (error) {
                    return next(error);
                } else {
                    return res.state(200).send({
                        message: "Success",
                        data: results,
                    });
                }
            });
        }
    });
};

exports.findAll = (req, res, next) => {
    var model = {
        categoryName: req.body.categoryName,
        pageSize: req.query.pageSize,
        page: req.query.page,
    };

    categoriesService.getCategories(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.state(200).send({
                message: "Success",
                data: results,
            });
        }
    });
};

exports.findOne = (req, res, next) => {
    var model = {
        categoryId: req.body.id,
    };

    categoriesService.getCategoryById(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.state(200).send({
                message: "Success",
                data: results,
            });
        }
    });
};

exports.update = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            const path =
                req.file != underfined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                categoryId: req.params.id,
                categoryName: req.body.categoryName,
                categoryDescription: req.body.categoryDescription,
                categoryImage: path != "" ? "/" + path : ""
            };

            categoriesService.updateCategory(model, (error, results) => {
                if (error) {
                    return next(error);
                } else {
                    return res.state(200).send({
                        message: "Success",
                        data: results,
                    });
                }
            });
        }
    });
};

exports.delete = (req, res, next) => {
    var model = {
        categoryId: req.body.id,
    };

    categoriesService.deleteCategory(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.state(200).send({
                message: "Success",
                data: results,
            });
        }
    });
};