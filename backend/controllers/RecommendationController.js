import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getAIRecommendations = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "Unauthorized." });
    }

    // 1. Fetch order history
    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    // 2. Fetch all products
    const allProducts = await productModel.find({});

    if (allProducts.length === 0) {
      return res.json({ success: false, message: "No products available." });
    }

    // 3. Build purchase profile
    let purchaseProfile = {
      totalOrders: orders.length,
      totalSpent: 0,
      categories: {},
      subCategories: {},
      priceRange: { min: Infinity, max: 0, avg: 0 },
      purchasedProductIds: [],
      recentItems: [],
    };

    orders.forEach((order) => {
      purchaseProfile.totalSpent += order.amount || 0;
      order.items.forEach((item) => {
        if (item._id)
          purchaseProfile.purchasedProductIds.push(item._id.toString());

        if (item.category) {
          purchaseProfile.categories[item.category] =
            (purchaseProfile.categories[item.category] || 0) +
            (item.quantity || 1);
        }
        if (item.subCategory) {
          purchaseProfile.subCategories[item.subCategory] =
            (purchaseProfile.subCategories[item.subCategory] || 0) +
            (item.quantity || 1);
        }
        if (item.price) {
          purchaseProfile.priceRange.min = Math.min(
            purchaseProfile.priceRange.min,
            item.price,
          );
          purchaseProfile.priceRange.max = Math.max(
            purchaseProfile.priceRange.max,
            item.price,
          );
        }
        if (purchaseProfile.recentItems.length < 10) {
          purchaseProfile.recentItems.push({
            name: item.name,
            category: item.category,
            subCategory: item.subCategory,
            price: item.price,
          });
        }
      });
    });

    if (purchaseProfile.priceRange.min === Infinity) {
      purchaseProfile.priceRange = { min: 0, max: 0, avg: 0 };
    }

    const allPrices = orders
      .flatMap((o) => o.items.map((i) => i.price || 0))
      .filter((p) => p > 0);
    purchaseProfile.priceRange.avg =
      allPrices.length > 0
        ? Math.round(allPrices.reduce((a, b) => a + b, 0) / allPrices.length)
        : 0;

    // 4. Product catalog for Gemini
    const productCatalog = allProducts.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      category: p.category,
      subCategory: p.subCategory,
      price: p.price,
      bestseller: p.bestseller || false,
    }));

    const isNewUser = orders.length === 0;

    // 5. Build prompt
    let prompt;

    if (isNewUser) {
      prompt = `You are a fashion recommendation AI for a clothing store called "Forever".

This is a NEW USER with no purchase history.

Available products:
${JSON.stringify(productCatalog)}

Recommend exactly 8 products for a new customer. Mix of bestsellers and popular items.

Respond with ONLY this JSON (no markdown, no extra text):
{"recommendedIds":["id1","id2","id3","id4","id5","id6","id7","id8"],"reason":"brief reason here"}`;
    } else {
      prompt = `You are a fashion recommendation AI for a clothing store called "Forever".

USER PROFILE:
- Total orders: ${purchaseProfile.totalOrders}
- Total spent: Rs.${purchaseProfile.totalSpent}
- Favorite categories: ${JSON.stringify(purchaseProfile.categories)}
- Favorite sub-categories: ${JSON.stringify(purchaseProfile.subCategories)}
- Price range: Rs.${purchaseProfile.priceRange.min} to Rs.${purchaseProfile.priceRange.max} (avg Rs.${purchaseProfile.priceRange.avg})
- Recent purchases: ${JSON.stringify(purchaseProfile.recentItems)}
- Already purchased IDs (EXCLUDE THESE): ${JSON.stringify(purchaseProfile.purchasedProductIds)}

Available products:
${JSON.stringify(productCatalog)}

Recommend exactly 8 products this user will love. Consider their category preferences, price range and past purchases. Do NOT include already purchased products.

Respond with ONLY this JSON (no markdown, no extra text):
{"recommendedIds":["id1","id2","id3","id4","id5","id6","id7","id8"],"reason":"brief reason here"}`;
    }

    // 6. Call Gemini — gemini-1.5-flash is the correct model name
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 512,
      },
    });

    // FIX: Pass prompt as plain string directly to generateContent
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    // 7. Parse response
    let recommendedIds = [];
    let reason = "Based on your shopping preferences and style.";

    try {
      // Strip markdown code fences if Gemini adds them
      const cleaned = responseText
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      if (Array.isArray(parsed)) {
        recommendedIds = parsed;
      } else if (
        parsed.recommendedIds &&
        Array.isArray(parsed.recommendedIds)
      ) {
        recommendedIds = parsed.recommendedIds;
        reason = parsed.reason || reason;
      }
    } catch (parseErr) {
      console.log("JSON parse failed, using regex fallback:", parseErr.message);
      const matches = responseText.match(/[a-f0-9]{24}/g);
      if (matches) recommendedIds = [...new Set(matches)];
    }

    // 8. Fetch recommended products from DB
    const recommendedProducts = await productModel.find({
      _id: { $in: recommendedIds },
    });

    // 9. Preserve Gemini's order
    const orderedProducts = recommendedIds
      .map((id) => recommendedProducts.find((p) => p._id.toString() === id))
      .filter(Boolean);

    // 10. Fallback to bestsellers if too few results
    if (orderedProducts.length < 4) {
      const fallback = allProducts
        .filter((p) => !recommendedIds.includes(p._id.toString()))
        .filter((p) => p.bestseller)
        .slice(0, 8 - orderedProducts.length);
      orderedProducts.push(...fallback);
      reason = "Showing our top-rated picks for you.";
    }

    res.json({
      success: true,
      recommendations: orderedProducts,
      reason,
      isNewUser,
      profile: {
        totalOrders: purchaseProfile.totalOrders,
        topCategory:
          Object.keys(purchaseProfile.categories).sort(
            (a, b) =>
              purchaseProfile.categories[b] - purchaseProfile.categories[a],
          )[0] || null,
        priceRange: purchaseProfile.priceRange,
      },
    });
  } catch (error) {
    console.log("Gemini Recommendation Error:", error.message);

    if (
      error.message?.includes("API_KEY") ||
      error.message?.includes("api key")
    ) {
      return res.json({
        success: false,
        message:
          "Gemini API key is invalid or missing. Check GEMINI_API_KEY in .env",
      });
    }
    if (error.message?.includes("quota") || error.message?.includes("429")) {
      return res.json({
        success: false,
        message: "Gemini API quota exceeded. Please try again in a minute.",
      });
    }
    if (
      error.message?.includes("404") ||
      error.message?.includes("not found")
    ) {
      return res.json({
        success: false,
        message:
          "Gemini model not found. Make sure your API key has access to gemini-1.5-flash.",
      });
    }

    res.json({ success: false, message: error.message });
  }
};

export { getAIRecommendations };
