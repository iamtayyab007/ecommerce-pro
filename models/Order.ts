import mongoose, { Schema, models } from "mongoose";

const OrderItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  title: String,
  price: Number,
  quantity: Number,
  image: String,
});

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [OrderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    stripeSessionId: String,

    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Order = models.Order || mongoose.model("Order", OrderSchema);
