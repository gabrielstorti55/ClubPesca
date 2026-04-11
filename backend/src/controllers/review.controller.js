import {
  createReview,
  getReviewsByBusinessId,
  updateReview,
  deleteReview,
  getAverageRating,
} from "../services/review.service.js";
import { HttpError } from "../utils/http-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const create = asyncHandler(async (req, res) => {
  try {
    const review = await createReview({
      ...req.body,
      userId: req.userId,
    });
    return res.status(201).json(review);
  } catch (error) {
    throw new HttpError(400, error.message);
  }
});

export const getByBusinessId = asyncHandler(async (req, res) => {
  const reviews = await getReviewsByBusinessId(req.params.businessId);
  return res.json(reviews);
});

export const getAverage = asyncHandler(async (req, res) => {
  const stats = await getAverageRating(req.params.businessId);
  return res.json(stats);
});

export const update = asyncHandler(async (req, res) => {
  try {
    const updatedReview = await updateReview(req.params.id, req.userId, req.body);
    return res.json(updatedReview);
  } catch (error) {
    throw new HttpError(400, error.message);
  }
});

export const deleteReviewById = asyncHandler(async (req, res) => {
  try {
    await deleteReview(req.params.id, req.userId);
    return res.status(204).send();
  } catch (error) {
    throw new HttpError(400, error.message);
  }
});
