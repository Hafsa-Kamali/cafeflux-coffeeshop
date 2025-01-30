/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
    },
    {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'productImage',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'discountPrice',
      title: 'Discount Price',
      type: 'number',
      validation: (Rule) =>
        Rule.custom((discountPrice, context: any) => {
          const price = context.parent?.price; // Use optional chaining safely
          if (discountPrice != null && price != null && discountPrice >= price) {
            return 'Discount price must be less than the original price';
          }
          return true;
        }),
    },
    {
      name: 'isNew',
      title: 'Is New',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Coffee', value: 'coffee' },
          { title: 'Tea', value: 'tea' },
          { title: 'Latte', value: 'Latte' },
          { title: 'Cappuccino', value: 'Cappuccino' },
          { title: 'Espresso', value: 'Espresso' },
          { title: 'Macchiato', value: 'Macchiato' },
          { title: 'Mocha', value: 'Mocha' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'stock',
      title: 'Stock',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
});
