import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  showLibrary: defineTable({
    idx: v.number(),
    name: v.string(),
    image: v.string(),
    link: v.string(),
    tags: v.array(v.string()),
    userId: v.string(),
  }).index("by_user", ["userId"]),
});
