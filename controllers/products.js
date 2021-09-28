const Products = require("../models/productsModel");

exports.all = async (req, res) => {
  let amountOfData, amountOfPage, previous, next, position, page;
  let pages = [];
  let limit = 12;
  let data = {
    filterName: req.query.name ? req.query.name : "",
    filterCategory: req.query.category ? req.query.category : "",
    orderBy: req.query.orderby ? req.query.orderby : "",
  };

  Products.countProducts(data).then((result) => {
    amountOfData = result;
    amountOfPage = Math.ceil(amountOfData / limit);
    page = !req.query.page
      ? 1
      : parseInt(req.query.page) > amountOfPage
      ? amountOfPage
      : parseInt(req.query.page);

    previous = page > 1 ? page - 1 : false;
    next = page >= amountOfPage ? false : page + 1;
    // first page number
    page > 3 ? pages.push("...") : "";
    for (i = page - 2; i < page; i++) {
      if (i < 1) {
        continue;
      }
      pages.push(i);
    }
    // middle page number
    pages.push(page);
    for (i = page + 1; i < page + 3; i++) {
      if (i > amountOfPage) {
        break;
      }
      pages.push(i);
    }
    // last page number
    if (page + 2 < amountOfPage) {
      pages.push("...");
      pages.push(amountOfPage);
    }
    position = page === 1 ? 0 : (page - 1) * limit;
    let data = {
      limit,
      position,
      filterName: req.query.name ? req.query.name : "",
      filterCategory: req.query.category ? req.query.category : "",
      orderBy: req.query.orderby ? req.query.orderby : "",
    };
    let selectProducts = Products.selectProducts(data);
    selectProducts
      .then((result) => {
        if (result.length > 0) {
          res.json({
            page: page,
            products: result,
            links: {
              first_page: 1,
              previous: previous,
              pages: pages,
              next: next,
              last_page: amountOfPage,
            },
          });
          return;
        }
      })
      .catch((err) => {
        res.json({
          page: 1,
          products: [],
          links: {
            first_page: 1,
            previous: 1,
            pages: pages,
            next: 1,
            last_page: 1,
          },
        });
        return;
      });
  });
};

exports.detail = async (req, res) => {
  let data = {
    id: req.params.id,
  };
  let result = Products.detail(data);
  result
    .then(function (result) {
      if (result.length > 0) {
        res.json({
          status: 200,
          product: result,
        });
      } else {
        res.json({
          status: 500,
          message: err,
        });
      }
    })
    .catch(function (err) {
      res.json({
        status: 500,
        message: err,
      });
    });
};
