const fs = require('fs');
const path = require('path');
const SmilesDrawer = require('../app.js');

const samples = {
  PE: '{CC}n',
  PS: '{CC(c1ccccc1)}n',
  PEG: '{OCCO}n',
  PMMA: '{CC(C)(C(=O)OC)}n',
  PET: '{OCCOC(=O)c1ccc(cc1)C(=O)}n',
  PVC: '{C(CCl)}n'
};

const outDir = path.join(__dirname, '..', 'tmp', 'polymer-samples');
fs.mkdirSync(outDir, { recursive: true });

for (const [name, smiles] of Object.entries(samples)) {
  const drawer = new SmilesDrawer.SmiDrawer({
    width: 500,
    height: 400,
    compactDrawing: false
  });
  const tree = SmilesDrawer.Parser.parse(smiles);
  const svg = drawer.drawer.draw(tree, null, 'light');
  const filePath = path.join(outDir, `${name}.svg`);
  fs.writeFileSync(filePath, svg.outerHTML, 'utf8');
  console.log(`${name}: ${smiles} -> ${filePath}`);
}
