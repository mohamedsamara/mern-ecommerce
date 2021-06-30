const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const Mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

// Bring in Models & Helpers
const Product = require('../../models/product');
const Brand = require('../../models/brand');
const Category = require('../../models/category');
const Wishlist = require('../../models/wishlist');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const checkAuth = require('../../helpers/auth');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  '/add',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  upload.single('image'),
  async (req, res) => {
    try {
      const sku = req.body.sku;
      const name = req.body.name;
      const description = req.body.description;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const taxable = req.body.taxable;
      const isActive = req.body.isActive;
      const brand = req.body.brand;
      const image = req.file;

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

      const foundProduct = await Product.findOne({ sku });

      if (foundProduct) {
        return res.status(400).json({ error: 'This sku is already in use.' });
      }

      let imageUrl = '';
      let imageKey = '';

      if (image) {
        const s3bucket = new AWS.S3({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: process.env.AWS_REGION
        });

        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: image.originalname,
          Body: image.buffer,
          ContentType: image.mimetype,
          ACL: 'public-read'
        };

        const s3Upload = await s3bucket.upload(params).promise();

        imageUrl = s3Upload.Location;
        imageKey = s3Upload.key;
      }

      const product = new Product({
        sku,
        name,
        description,
        quantity,
        price,
        taxable,
        isActive,
        brand,
        imageUrl,
        imageKey
      });

      const savedProduct = await product.save();

      res.status(200).json({
        success: true,
        message: `Product has been added successfully!`,
        product: savedProduct
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch store products api
router.get('/list', async (req, res) => {
  try {
    const userDoc = await checkAuth(req);

    if (userDoc) {
      const products = await Product.aggregate([
        {
          $match: { isActive: true }
        },
        {
          $lookup: {
            from: 'wishlists',
            let: { product: '$_id' },
            pipeline: [
              {
                $match: {
                  $and: [
                    { $expr: { $eq: ['$$product', '$product'] } },
                    { user: new Mongoose.Types.ObjectId(userDoc.id) }
                  ]
                }
              }
            ],
            as: 'isLiked'
          }
        },
        {
          $lookup: {
            from: 'brands',
            localField: 'brand',
            foreignField: '_id',
            as: 'brands'
          }
        },
        {
          $addFields: {
            isLiked: { $arrayElemAt: ['$isLiked.isLiked', 0] }
          }
        },
        {
          $unwind: '$brands'
        },
        {
          $addFields: {
            'brand.name': '$brands.name',
            'brand._id': '$brands._id',
            'brand.isActive': '$brands.isActive'
          }
        },
        { $project: { brands: 0 } }
      ]);

      res.status(200).json({
        products: products.filter(item => item?.brand?.isActive === true)
      });
    } else {
      const products = await Product.find({ isActive: true }).populate({
        path: 'brand',
        select: 'name isActive'
      });

      res.status(200).json({
        products: products.filter(item => item?.brand?.isActive === true)
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch products api
router.get(
  '/',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  async (req, res) => {
    try {
      let products = [];

      if (req.user.merchant) {
        const brands = await Brand.find({
          merchant: req.user.merchant
        }).populate('merchant', '_id');

        const brandId = brands[0]['_id'];

        products = await Product.find({})
          .populate({
            path: 'brand',
            populate: {
              path: 'merchant',
              model: 'Merchant'
            }
          })
          .where('brand', brandId);
      } else {
        products = await Product.find({}).populate({
          path: 'brand',
          populate: {
            path: 'merchant',
            model: 'Merchant'
          }
        });
      }

      res.status(200).json({
        products
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch product api
router.get(
  '/:id',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  async (req, res) => {
    try {
      const productId = req.params.id;

      let productDoc = null;

      if (req.user.merchant) {
        const brands = await Brand.find({
          merchant: req.user.merchant
        }).populate('merchant', '_id');

        const brandId = brands[0]['_id'];

        productDoc = await Product.findOne({ _id: productId })
          .populate({
            path: 'brand',
            select: 'name'
          })
          .where('brand', brandId);
      } else {
        productDoc = await Product.findOne({ _id: productId }).populate({
          path: 'brand',
          select: 'name'
        });
      }

      if (!productDoc) {
        return res.status(404).json({
          message: 'No product found.'
        });
      }

      res.status(200).json({
        product: productDoc
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch product slug api
router.get('/item/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    const productDoc = await Product.findOne({ slug, isActive: true }).populate(
      {
        path: 'brand',
        select: 'name isActive slug'
      }
    );

    if (!productDoc || productDoc?.brand?.isActive === false) {
      return res.status(404).json({
        message: 'No product found.'
      });
    }

    res.status(200).json({
      product: productDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


// fetch  product name search api
router.get('/list/search/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const userDoc = await checkAuth(req);

    const productDoc = await Product.find({ name:{$regex:new RegExp(name),$options: 'is'}, isActive: true},{name:1,slug:1,imageUrl:1,price:1,_id:0});

    if (productDoc.length < 0) {
      return res.status(404).json({
        message: 'No product found.'
      });
    }

    res.status(200).json({
      products: productDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


// fetch all products by category api
router.get('/list/category/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    const userDoc = await checkAuth(req);

    const categoryDoc = await Category.findOne(
      { slug, isActive: true },
      'products -_id'
    ).populate({
      path: 'products',
      match: {
        isActive: true
      },
      populate: {
        path: 'brand',
        model: 'Brand',
        select: 'name isActive'
      }
    });

    if (!categoryDoc) {
      return res.status(404).json({
        message: `Cannot find category with the slug: ${slug}.`
      });
    }

    let products = [];

    if (userDoc) {
      const wishlist = await Wishlist.find({
        user: userDoc.id,
        isLiked: true
      }).populate({
        path: 'product',
        select: '_id'
      });

      const ps = categoryDoc.products || [];

      const newPs = [];
      ps.map(p => {
        let isLiked = false;

        wishlist.map(w => {
          if (String(w.product._id) === String(p._id)) {
            isLiked = true;
          }
        });

        const newProduct = { ...p.toObject(), isLiked };

        newPs.push(newProduct);
      });

      products = newPs;
    } else {
      products = categoryDoc.products;
    }

    res.status(200).json({
      products
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch all products by brand api
router.get('/list/brand/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    const brand = await Brand.findOne({ slug, isActive: true });

    if (!brand) {
      return res.status(404).json({
        message: `Cannot find brand with the slug: ${slug}.`
      });
    }

    const userDoc = await checkAuth(req);

    if (userDoc) {
      const products = await Product.aggregate([
        {
          $match: {
            isActive: true,
            brand: brand._id
          }
        },
        {
          $lookup: {
            from: 'wishlists',
            let: { product: '$_id' },
            pipeline: [
              {
                $match: {
                  $and: [
                    { $expr: { $eq: ['$$product', '$product'] } },
                    { user: new Mongoose.Types.ObjectId(userDoc.id) }
                  ]
                }
              }
            ],
            as: 'isLiked'
          }
        },
        {
          $lookup: {
            from: 'brands',
            localField: 'brand',
            foreignField: '_id',
            as: 'brands'
          }
        },
        {
          $addFields: {
            isLiked: { $arrayElemAt: ['$isLiked.isLiked', 0] }
          }
        },
        {
          $unwind: '$brands'
        },
        {
          $addFields: {
            'brand.name': '$brands.name',
            'brand._id': '$brands._id',
            'brand.isActive': '$brands.isActive'
          }
        },
        { $project: { brands: 0 } }
      ]);

      res.status(200).json({
        products
      });
    } else {
      const products = await Product.find({
        brand: brand._id,
        isActive: true
      }).populate('brand', 'name');

      res.status(200).json({
        products
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.get('/list/select', auth, async (req, res) => {
  try {
    const products = await Product.find({}, 'name');

    res.status(200).json({
      products
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put(
  '/:id',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  async (req, res) => {
    try {
      const productId = req.params.id;
      const update = req.body.product;
      const query = { _id: productId };

      await Product.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'Product has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id/active',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  async (req, res) => {
    try {
      const productId = req.params.id;
      const update = req.body.product;
      const query = { _id: productId };

      await Product.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'Product has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.delete(
  '/delete/:id',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  async (req, res) => {
    try {
      const product = await Product.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: `Product has been deleted successfully!`,
        product
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

module.exports = router;
