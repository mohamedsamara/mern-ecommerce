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

    if (!productDoc || (productDoc && productDoc?.brand?.isActive === false)) {
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

    const productDoc = await Product.find(
      { name: { $regex: new RegExp(name), $options: 'is' }, isActive: true },
      { name: 1, slug: 1, imageUrl: 1, price: 1, _id: 0 }
    );

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

// fetch store products by advancedFilters api
router.post('/list', async (req, res) => {
  const pageSize = 8;
  const page = Number(req.body.pageNumber) || 1;
  const name = req.body.name || '';
  const category = req.body.category || '';
  const brand = req.body.brand || '';
  const order = req.body.order || '';
  const min =
    req.body.min && Number(req.body.min) !== 0 ? Number(req.body.min) : 0;
  const max =
    req.body.max && Number(req.body.max) !== 0 ? Number(req.body.max) : 0;
  const rating =
    req.body.rating && Number(req.body.rating) !== 0
      ? Number(req.body.rating)
      : 0;

  const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
  const brandFilter = brand ? { brand } : {};
  const categoryFilter = category ? { category } : {};
  const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
  const ratingFilter = rating
    ? { rating: { $gte: rating } }
    : { rating: { $gte: rating } };
  const sortOrder =
    order === 'Price Low to High'
      ? { price: 1 }
      : order === 'Price High to Low'
      ? { price: -1 }
      : { _id: -1 };


  const basicQuery = [
    {
      $lookup: {
        from: 'brands',
        localField: 'brand',
        foreignField: '_id',
        as: 'brands'
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
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'product',
        as: 'reviews'
      }
    },
    {
      $addFields: {
        totalRatings: { $sum: '$reviews.rating' },
        totalReviews: { $size: '$reviews' }
      }
    },
    {
      $addFields: {
        averageRating: {
          $cond: [
            { $eq: ['$totalReviews', 0] },
            0,
            { $divide: ['$totalRatings', '$totalReviews'] }
          ]
        }
      }
    },
    {
      $match: {
        isActive: true,
        price: priceFilter.price,
        averageRating: ratingFilter.rating
      }
    },
    { $project: { brands: 0, reviews: 0 } }
  ];

  try {
    const userDoc = await checkAuth(req);
    const categoryDoc = await Category.findOne({ slug:categoryFilter.category, isActive: true },'products -_id')
     if(categoryDoc && categoryFilter !== category){
       basicQuery.push({
         $match: {
           isActive : true,
           _id: {
             $in: Array.from(categoryDoc.products)
           }
         }
       })
     }
    if (userDoc) {
      const productsCount = await Product.aggregate(
        [
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
            $addFields: {
              isLiked: { $arrayElemAt: ['$isLiked.isLiked', 0] }
            }
          }
        ].concat(basicQuery)
      );

      const paginateQuery = [
        { $sort: sortOrder },
        { $skip: pageSize * (productsCount.length > 8 ? page - 1 : 0) },
        { $limit: pageSize }
      ];

      const products = await Product.aggregate(
        [
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
            $addFields: {
              isLiked: { $arrayElemAt: ['$isLiked.isLiked', 0] }
            }
          }
        ]
          .concat(basicQuery)
          .concat(paginateQuery)
      );

      res.status(200).json({
        products: products.filter(item => item?.brand?.isActive === true),
        page: page,
        pages:
          productsCount.length > 0
            ? Math.ceil(productsCount.length / pageSize)
            : 0,
        totalProducts: productsCount.length
      });
    } else {
      const productsCount = await Product.aggregate(basicQuery);
      const paginateQuery = [
        { $sort: sortOrder },
        { $skip: pageSize * (productsCount.length > 8 ? page - 1 : 0) },
        { $limit: pageSize }
      ];
      const products = await Product.aggregate(
        basicQuery.concat(paginateQuery)
      );

      res.status(200).json({
        products: products.filter(item => item?.brand?.isActive === true),
        page: page,
        pages:
          productsCount.length > 0
            ? Math.ceil(productsCount.length / pageSize)
            : 0,
        totalProducts: productsCount.length
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


// fetch store products by brand api
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
        products: products
          .reverse()
          .slice(0, 8),
        page: 1,
        pages: products.length > 0 ? Math.ceil(products.length / 8) : 0,
        totalProducts: products.length
      });
    } else {
      const products = await Product.find({
        brand: brand._id,
        isActive: true
      }).populate('brand', 'name');

      res.status(200).json({
        products: products
          .reverse()
          .slice(0, 8),
        page: 1,
        pages: products.length > 0 ? Math.ceil(products.length / 8) : 0,
        totalProducts: products.length
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

// add product api
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
