// Builds the public CXCR4 + Fluoro-Deoxy-Amentoflavone complex used by the 3D viewer.
// Usage: node scripts/build-structure.mjs <protein.pdb> <output_ligand_01.pdbqt>
// Keeps only receptor ATOM records (no hydrogens) plus the top-ranked Vina pose as HETATM "LIG".
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const [proteinPath, ligandPath] = process.argv.slice(2);
if (!proteinPath || !ligandPath) throw new Error('Usage: node scripts/build-structure.mjs <protein.pdb> <ligand.pdbqt>');

const adType = t => ({ A: 'C', C: 'C', OA: 'O', O: 'O', NA: 'N', N: 'N', HD: 'H', H: 'H', F: 'F', SA: 'S', S: 'S', Cl: 'Cl', Br: 'Br' })[t] || t[0];
const pad = (s, n, right = false) => (right ? String(s).padEnd(n) : String(s).padStart(n)).slice(0, n);

const receptor = readFileSync(proteinPath, 'utf8').split(/\r?\n/)
  .filter(l => l.startsWith('ATOM'))
  .filter(l => (l.slice(76, 78).trim() || l.slice(12, 16).trim()[0]) !== 'H')
  .map(l => l.slice(0, 66).padEnd(66) + '          ' + pad(l.slice(76, 78).trim(), 2));

const ligandLines = [];
for (const l of readFileSync(ligandPath, 'utf8').split(/\r?\n/)) {
  if (l.startsWith('ENDMDL')) break; // first (best) pose only
  if (!/^(ATOM|HETATM)/.test(l)) continue;
  const el = adType(l.slice(77).trim());
  if (el === 'H') continue;
  const serial = receptor.length + ligandLines.length + 1;
  const name = (el + (ligandLines.length + 1)).slice(0, 4);
  ligandLines.push('HETATM' + pad(serial, 5) + ' ' + pad(name, 4, true) + ' LIG L   1    ' + l.slice(30, 54) + '  1.00  0.00          ' + pad(el, 2));
}
if (!ligandLines.length) throw new Error('No ligand atoms parsed');

const header = [
  'REMARK   CXCR4 (PDB 3ODU, prepared) with Fluoro-Deoxy-Amentoflavone, AutoDock Vina pose 1 (-11.9 kcal/mol).',
  'REMARK   Source: U. C. Yildiz, B.Sc. thesis, Inonu University. Hydrogens removed for web display.'
];
mkdirSync('public/structures', { recursive: true });
const out = 'public/structures/cxcr4-fluoro-deoxy-amentoflavone.pdb';
writeFileSync(out, [...header, ...receptor, 'TER', ...ligandLines, 'END', ''].join('\n'));
console.log(`Wrote ${out}: ${receptor.length} receptor atoms, ${ligandLines.length} ligand atoms.`);
