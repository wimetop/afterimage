import sharp from 'sharp';
await sharp('public/assets/membrane.png').resize({width:1600,withoutEnlargement:true}).webp({quality:88}).toFile('public/assets/membrane.webp');
await sharp('public/assets/contact-sheet.png').webp({quality:90}).toFile('public/assets/contact-sheet.webp');
