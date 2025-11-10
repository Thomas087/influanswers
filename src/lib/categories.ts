export interface CategoryOption {
  label: string
  value: string
}

export interface CategoryGroup {
  label: string
  items: CategoryOption[]
}

export const groupedCategories: CategoryGroup[] = [
  {
    label: 'Core lifestyle & personal interests',
    items: [
      { label: 'Beauty & Cosmetics', value: 'beauty-cosmetics' },
      { label: 'Fashion & Luxury', value: 'fashion-luxury' },
      { label: 'Lifestyle', value: 'lifestyle' },
      { label: 'Health & Wellness', value: 'health-wellness' },
      { label: 'Fitness & Sports', value: 'fitness-sports' },
      { label: 'Nutrition & Diet', value: 'nutrition-diet' },
      { label: 'Mental Health', value: 'mental-health' },
      { label: 'Parenting & Family', value: 'parenting-family' },
      { label: 'Relationships & Dating', value: 'relationships-dating' },
      { label: 'Self-Improvement & Motivation', value: 'self-improvement-motivation' },
    ],
  },
  {
    label: 'Entertainment & culture',
    items: [
      { label: 'Gaming', value: 'gaming' },
      { label: 'Movies & TV', value: 'movies-tv' },
      { label: 'Music', value: 'music' },
      { label: 'Art & Design', value: 'art-design' },
      { label: 'Photography', value: 'photography' },
      { label: 'Books & Literature', value: 'books-literature' },
      { label: 'Pop Culture', value: 'pop-culture' },
      { label: 'Celebrities & Influencers', value: 'celebrities-influencers' },
    ],
  },
  {
    label: 'Travel & experiences',
    items: [
      { label: 'Travel', value: 'travel' },
      { label: 'Adventure & Outdoors', value: 'adventure-outdoors' },
      { label: 'Hospitality & Tourism', value: 'hospitality-tourism' },
      { label: 'Sustainable Travel', value: 'sustainable-travel' },
    ],
  },
  {
    label: 'Technology & innovation',
    items: [
      { label: 'Tech & Gadgets', value: 'tech-gadgets' },
      { label: 'AI & Innovation', value: 'ai-innovation' },
      { label: 'Science & Education', value: 'science-education' },
      { label: 'Automotive', value: 'automotive' },
      { label: 'Cryptocurrency & Blockchain', value: 'cryptocurrency-blockchain' },
      { label: 'Finance & Investing', value: 'finance-investing' },
      { label: 'Startups & Entrepreneurship', value: 'startups-entrepreneurship' },
    ],
  },
  {
    label: 'Food & drink',
    items: [
      { label: 'Food & Beverage', value: 'food-beverage' },
      { label: 'Cooking & Recipes', value: 'cooking-recipes' },
      { label: 'Wine, Beer & Spirits', value: 'wine-beer-spirits' },
      { label: 'Restaurants & Dining', value: 'restaurants-dining' },
      { label: 'Vegan & Plant-Based Living', value: 'vegan-plant-based-living' },
    ],
  },
  {
    label: 'Home & lifestyle',
    items: [
      { label: 'Home Decor & Interior Design', value: 'home-decor-interior-design' },
      { label: 'DIY & Crafts', value: 'diy-crafts' },
      { label: 'Gardening', value: 'gardening' },
      { label: 'Pets & Animals', value: 'pets-animals' },
      { label: 'Real Estate', value: 'real-estate' },
    ],
  },
  {
    label: 'Social & environmental topics',
    items: [
      { label: 'Sustainability & Environment', value: 'sustainability-environment' },
      { label: 'Charity & Social Causes', value: 'charity-social-causes' },
      { label: 'Politics & Activism', value: 'politics-activism' },
      { label: 'Education & Learning', value: 'education-learning' },
    ],
  },
  {
    label: 'Professional & business',
    items: [
      { label: 'Career & Productivity', value: 'career-productivity' },
      { label: 'Marketing & Advertising', value: 'marketing-advertising' },
      { label: 'E-Commerce & Retail', value: 'ecommerce-retail' },
      { label: 'Events & Conferences', value: 'events-conferences' },
    ],
  },
  {
    label: 'Other niches',
    items: [
      { label: 'Luxury Lifestyle', value: 'luxury-lifestyle' },
      { label: 'Weddings & Events', value: 'weddings-events' },
      { label: 'Spirituality & Mindfulness', value: 'spirituality-mindfulness' },
      { label: "Men's Lifestyle", value: 'mens-lifestyle' },
      { label: "Women's Lifestyle", value: 'womens-lifestyle' },
      { label: 'Youth & Student Life', value: 'youth-student-life' },
      { label: 'Other', value: 'other' },
    ],
  },
]

/**
 * Get category label from code
 */
export function getCategoryLabel(code: string): string {
  for (const group of groupedCategories) {
    const category = group.items.find((c) => c.value === code)
    if (category) {
      return category.label
    }
  }
  return code
}

/**
 * Get category code from label (for backward compatibility)
 */
export function getCategoryCode(label: string): string | undefined {
  for (const group of groupedCategories) {
    const category = group.items.find((c) => c.label === label)
    if (category) {
      return category.value
    }
  }
  return undefined
}

