import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const srcDir = path.join(rootDir, 'src');

// Configuration des tailles d'images pour les différents écrans
const sizes = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

// Extensions d'images à traiter
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

/**
 * Optimise une image avec Sharp
 * @param {string} inputPath Chemin d'entrée du fichier
 */
async function optimizeImage(inputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    if (!imageExtensions.includes(ext)) return;

    const filename = path.basename(inputPath, ext);
    const dir = path.dirname(inputPath);
    const outputWebP = path.join(dir, `${filename}.webp`);

    console.log(`Optimisation de ${inputPath}`);

    // Si c'est déjà un webp, on l'optimise juste
    if (ext === '.webp') {
      await sharp(inputPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(outputWebP + '.tmp');

      await fs.rename(outputWebP + '.tmp', inputPath);
      console.log(`  ✓ Optimisé: ${inputPath}`);
      return;
    }

    // Pour les autres formats, on convertit en webp
    await sharp(inputPath)
      .webp({ quality: 80, effort: 6 })
      .toFile(outputWebP);

    console.log(`  ✓ Converti: ${outputWebP}`);
  } catch (error) {
    console.error(`Erreur lors de l'optimisation de ${inputPath}:`, error);
  }
}

/**
 * Parcourt récursivement un répertoire à la recherche d'images
 * @param {string} dir Chemin du répertoire
 */
async function processDirectory(dir) {
  try {
    const items = await fs.readdir(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        await processDirectory(fullPath);
      } else if (item.isFile()) {
        const ext = path.extname(item.name).toLowerCase();
        if (imageExtensions.includes(ext)) {
          await optimizeImage(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`Erreur lors du parcours du répertoire ${dir}:`, error);
  }
}

// Fonction principale
async function main() {
  console.log('Début de l\'optimisation des images...');

  // Traiter les images dans le répertoire public
  console.log('Traitement des images dans /public');
  await processDirectory(publicDir);

  // Traiter les images dans src/assets
  console.log('Traitement des images dans /src/assets');
  await processDirectory(path.join(srcDir, 'assets'));

  console.log('Optimisation terminée!');
}

// Exécuter le script
main().catch(err => {
  console.error('Erreur:', err);
  process.exit(1);
});
