const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();

// Bring in Models & Helpers
const Product = require('../../models/product');
const Brand = require('../../models/brand');
const Category = require('../../models/category');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');


const upload = multer({
  storage: multer.diskStorage({
    destination(req, image, cb) {
      cb(null, './files');
    },
    filename(req, image, cb) {
      cb(null, `${new Date().getTime()}_${image.originalname}`);
    }
  }),
  limits: {
    fileSize: 1000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, image, cb) {
    if (!image.originalname.match(/\.(jpeg|jpg|png)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

router.post('/add', auth, role.checkRole(role.ROLES.Admin), upload.single('image'),(req, res) => {

  const sku = req.body.sku;
  const name = req.body.name;
  const description = req.body.description;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const taxable = req.body.taxable;
  const brand = req.body.brand;
  const image = {
    data: fs.readFileSync(req.file.path),
    contentType: req.file.mimetype
  }

  if (!sku) {
    return res.status(400).json({ error: 'You must enter sku.' });
  }

  if (!description || !name) {
    return res
      .status(400)
      .json({ error: 'You must enter description & name.' });
  }

  if (!quantity) {
    return res.status(400).json({ error: 'You must enter a quantity.' });
  }

  if (!price) {
    return res.status(400).json({ error: 'You must enter a price.' });
  }

  Product.findOne({ sku }, (err, existingProduct) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    if (existingProduct) {
      return res.status(400).json({ error: 'This sku is already in use.' });
    }

    const product = new Product({
      sku,
      name,
      description,
      quantity,
      price,
      taxable,
      brand,
      image
    });

    product.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        success: true,
        message: `Product has been added successfully!`,
        product: data
      });
    });
  });
});

// fetch product api
router.get('/item/:slug', (req, res) => {
  const slug = req.params.slug;

  Product.findOne({ slug })
    .populate('brand')
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      if (!data) {
        return res.status(404).json({
          message: 'No product found.'
        });
      }

      res.status(200).json({
        product: data
      });
    });
});

// fetch all products api
router.get('/list', (req, res) => {
  Product.find({})
    .populate('brand', 'name')
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }
      res.status(200).json({
        products: data
      });
    });
});

// fetch all products by category api
router.get('/list/category/:slug', (req, res) => {
  const slug = req.params.slug;

  Category.findOne({ slug: slug }, 'products -_id')
    .populate('products')
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      if (!data) {
        return res.status(404).json({
          message: 'No products found.'
        });
      }

      res.status(200).json({
        products: data ? data.products : data
      });
    });
});

// fetch all products by brand api
router.get('/list/brand/:slug', (req, res) => {
  const slug = req.params.slug;

  Brand.find({ slug }, (err, brand) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    if (brand.length <= 0) {
      return res.status(404).json({
        message: `Cannot find brand with the slug: ${slug}.`
      });
    }

    Product.find({ brand: brand[0]._id })
      .populate('brand', 'name')
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
          });
        }
        res.status(200).json({
          products: data
        });
      });
  });
});

router.get('/list/select', auth, (req, res) => {
  Product.find({}, 'name', (err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      products: data
    });
  });
});

router.delete(
  '/delete/:id',
  auth,
  role.checkRole(role.ROLES.Admin),
  (req, res) => {
    Product.deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        success: true,
        message: `Product has been deleted successfully!`,
        product: data
      });
    });
  }
);

module.exports = router;
