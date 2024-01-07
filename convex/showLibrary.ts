import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const getLibrary = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const shows = await ctx.db
      .query("showLibrary")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      // .filter((q) =>
      //   q.eq(q.field("isArchived"), false),
      // )
      // .order("desc")
      .collect();

    return shows;
  },
});

export const create = mutation({
  args: {
    idx: v.number(),
    name: v.string(),
    image: v.string(),
    link: v.string(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const show = await ctx.db.insert("showLibrary", {
      ...args,
      userId,
    });

    return show;
  },
});

export const isInLibrary = query({
  args: { idx: v.number() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const show = await ctx.db
      .query("showLibrary")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("idx"), args.idx))
      .first();

    return !!show;
  },
});

export const remove = mutation({
  args: { id: v.id("showLibrary") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingShow = await ctx.db.get(args.id);

    if (!existingShow) {
      throw new Error("Not found");
    }

    if (existingShow.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const show = await ctx.db.delete(args.id);

    return show;
  },
});

export const update = mutation({
  args: {
    id: v.id("showLibrary"),
    idx: v.optional(v.number()),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    link: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const { id, ...rest } = args;

    const existingShow = await ctx.db.get(args.id);

    if (!existingShow) {
      throw new Error("Not found");
    }

    if (existingShow.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const show = await ctx.db.patch(args.id, {
      ...rest,
    });

    return show;
  },
});
