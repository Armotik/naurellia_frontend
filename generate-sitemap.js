import fs from 'fs';
import prettier from 'prettier';

const routes = [
  { path: '/', changefreq: 'daily', priority: 1.0 },
  { path: '/login', changefreq: 'monthly', priority: 0.5 },
  { path: '/blog', changefreq: 'daily', priority: 1.0 },
  { path: '/contact', changefreq: 'monthly', priority: 0.5 },
  { path: '/partenaires', changefreq: 'weekly', priority: 1.0 },
  { path: '/devenir-partenaire', changefreq: 'monthly', priority: 0.5 },
  { path: '/mentions-legales', changefreq: 'monthly', priority: 0.5 },
  { path: '/politique-de-confidentialite', changefreq: 'monthly', priority: 0.5 },
  { path: '/conditions-generales', changefreq: 'monthly', priority: 0.5 },
  { path: '/carte', changefreq: 'daily', priority: 1.0 },
  { path: '/inscription', changefreq: 'monthly', priority: 0.8 },
];

const baseUrl = 'https://www.naurellia.com'; // Remplacez par l'URL de votre site

const generateSitemap = async () => {
  const sitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes
    .map(route => {
      return `
          <url>
            <loc>${baseUrl}${route.path}</loc>
            <changefreq>${route.changefreq}</changefreq>
            <priority>${route.priority}</priority>
          </url>
        `;
    })
    .join('')}
  </urlset>
  `;

  const formatted = await prettier.format(sitemap, { parser: 'html' });

  fs.writeFileSync('public/sitemap.xml', formatted);

  console.log('sitemap.xml généré avec succès!');
};

generateSitemap().catch(error => {
  console.error('Erreur lors de la génération du sitemap:', error);
});
