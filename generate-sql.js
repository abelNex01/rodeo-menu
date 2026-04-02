import fs from 'fs';
import path from 'path';

const data = JSON.parse(fs.readFileSync('src/data/rodeomenu.json', 'utf8'));

let sql = `-- Clear existing data
DELETE FROM menu_items;
DELETE FROM categories;

-- Update Store Settings to ETB
UPDATE store_settings 
SET value = jsonb_set(value, '{currency}', '"ETB"')
WHERE key = 'general';

`;

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const escape = (text) => text ? text.replace(/'/g, "''") : '';

const categories = data.categories;
const categoryInserts = [];
const itemInserts = [];

categories.forEach(cat => {
  const catId = slugify(cat.name);
  categoryInserts.push(`('${catId}', '${escape(cat.name)}', null)`);
  
  cat.items.forEach((item, index) => {
    const itemId = slugify(item.name) + '-' + Math.random().toString(36).substr(2, 5);
    const keywords = (item.image_query || item.name || 'food').split(' ').join(',');
    const imageUrl = `https://loremflickr.com/400/300/${encodeURIComponent(keywords)}`;
    
    itemInserts.push(`(
      '${itemId}', 
      '${catId}', 
      '${escape(item.name)}', 
      '${escape(item.short_description)}', 
      ${item.price}, 
      '${imageUrl}', 
      4.5, 
      15, 
      true
    )`);
  });
});

sql += `INSERT INTO categories (id, name, image_url) VALUES 
${categoryInserts.join(',\n')};

`;

const chunkSize = 50;
for (let i = 0; i < itemInserts.length; i += chunkSize) {
  const chunk = itemInserts.slice(i, i + chunkSize);
  sql += `INSERT INTO menu_items (id, category_id, name, description, price, image_url, rating, preparation_time, available) VALUES 
${chunk.join(',\n')};

`;
}

fs.writeFileSync('supabase/real-menu-seed.sql', sql);
console.log('SQL Seed generated successfully in supabase/real-menu-seed.sql');
