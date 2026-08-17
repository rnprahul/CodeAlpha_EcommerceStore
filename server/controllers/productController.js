const Product = require('../models/Product');
const { sendSuccess, sendError } = require('../utils/apiResponse');

// Import local dataset as fallback when DB is awaiting Atlas URI
const { products: fallbackProducts } = require('../../src/data/products');

/**
 * @desc    Get all products with filtering, search, sorting & pagination
 * @route   GET /api/v1/products
 * @access  Public
 */
const getProducts = async (req, res, next) => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      rating,
      inStock,
      sort,
      featured,
      trending,
      page = 1,
      limit = 12
    } = req.query;

    try {
      // Build MongoDB query filter
      const query = {};

      if (category && category !== 'all') {
        query.category = category.toLowerCase();
      }

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } }
        ];
      }

      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }

      if (rating) {
        query.rating = { $gte: Number(rating) };
      }

      if (inStock === 'true') {
        query.stock = { $gt: 0 };
      }

      if (featured === 'true') {
        query.featured = true;
      }

      if (trending === 'true') {
        query.trending = true;
      }

      // Build MongoDB Sort
      let sortOptions = {};
      if (sort === 'price-low') sortOptions.price = 1;
      else if (sort === 'price-high') sortOptions.price = -1;
      else if (sort === 'rating') sortOptions.rating = -1;
      else if (sort === 'newest') sortOptions.createdAt = -1;
      else sortOptions.featured = -1; // Default

      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const limitNum = Math.max(1, parseInt(limit, 10) || 12);
      const skip = (pageNum - 1) * limitNum;

      const total = await Product.countDocuments(query);
      const products = await Product.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum);

      return sendSuccess(
        res,
        200,
        'Products retrieved successfully',
        products,
        {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.max(1, Math.ceil(total / limitNum))
        }
      );
    } catch (dbErr) {
      // Fall through to fallback dataset if DB fails/unconnected
    }

    // Fallback in-memory dataset filter pipeline
    let result = [...fallbackProducts];

    if (category && category !== 'all') {
      result = result.filter((p) => p.category === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (maxPrice) {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    if (rating) {
      result = result.filter((p) => p.rating >= Number(rating));
    }

    if (sort === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sort === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;
    const paginated = result.slice(startIndex, startIndex + limitNum);

    return sendSuccess(
      res,
      200,
      'Products retrieved successfully (Mock Fallback)',
      paginated,
      {
        page: pageNum,
        limit: limitNum,
        total: result.length,
        totalPages: Math.ceil(result.length / limitNum)
      }
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/v1/products/:id
 * @access  Public
 */
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);
      if (product) {
        return sendSuccess(res, 200, 'Product details', product);
      }
    } catch (dbErr) {
      // Fall through
    }

    const fallbackProduct = fallbackProducts.find((p) => p.id === id);
    if (fallbackProduct) {
      return sendSuccess(res, 200, 'Product details (Fallback)', fallbackProduct);
    }

    return sendError(res, 404, 'Product not found');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new product (Admin Only)
 * @route   POST /api/v1/products
 * @access  Private/Admin
 */
const createProduct = async (req, res, next) => {
  try {
    const { name, brand, category, price, images, description, stock } = req.body;

    if (!name || !brand || !category || !price || !images || !description) {
      return sendError(res, 400, 'Please provide all required product fields');
    }

    const product = await Product.create(req.body);
    return sendSuccess(res, 201, 'Product created successfully', product);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update product by ID (Admin Only)
 * @route   PUT /api/v1/products/:id
 * @access  Private/Admin
 */
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!product) {
      return sendError(res, 404, 'Product not found');
    }

    return sendSuccess(res, 200, 'Product updated successfully', product);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete product by ID (Admin Only)
 * @route   DELETE /api/v1/products/:id
 * @access  Private/Admin
 */
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return sendError(res, 404, 'Product not found');
    }
    return sendSuccess(res, 200, 'Product deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
