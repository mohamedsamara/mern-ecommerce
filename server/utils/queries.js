const Mongoose = require('mongoose');

exports.getStoreProductsQuery = (min, max, rating) => {
  rating = Number(rating);
  max = Number(max);
  min = Number(min);

  const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
  const ratingFilter = rating
    ? { rating: { $gte: rating } }
    : { rating: { $gte: rating } };

  const matchQuery = {
    isActive: true,
    price: priceFilter.price,
    averageRating: ratingFilter.rating
  };

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
      $unwind: {
        path: '$brands',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $addFields: {
        'brand.name': '$brands.name',
        'brand._id': '$brands._id',
        'brand.isActive': '$brands.isActive'
      }
    },
    {
      $match: {
        'brand.isActive': true
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
      $match: matchQuery
    },
    {
      $project: {
        brands: 0,
        reviews: 0
      }
    }
  ];

  return basicQuery;
};

exports.getStoreProductsWishListQuery = userId => {
  const wishListQuery = [
    {
      $lookup: {
        from: 'wishlists',
        let: { product: '$_id' },
        pipeline: [
          {
            $match: {
              $and: [
                { $expr: { $eq: ['$$product', '$product'] } },
                { user: new Mongoose.Types.ObjectId(userId) }
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
  ];

  return wishListQuery;
};
