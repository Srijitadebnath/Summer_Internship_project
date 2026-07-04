const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = path.join(__dirname, 'public', 'brands');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const logos = {
  'parryware.png': 'https://companieslogo.com/img/orig/PARRYWARE.NS-be6d7d7d.png',
  'godrej.svg': 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Godrej_Logo.svg',
  'asianpaints.svg': 'https://upload.wikimedia.org/wikipedia/commons/d/da/Asian_Paints_logo.svg',
  'roca.svg': 'https://upload.wikimedia.org/wikipedia/commons/e/ec/RocaLogo.svg',
  'finolex.png': 'https://companieslogo.com/img/orig/FINOLEXIND.NS-7de0560f.png',
  'vguard.png': 'https://companieslogo.com/img/orig/VGUARD.NS-471253d7.png',
  'supreme.png': 'https://supreme.co.in/wp-content/themes/supreme/images/logo.png',
  'penguin.png': 'https://penguintanks.com/wp-content/uploads/2021/04/Penguin-Logo-New.png',
  'hindware.png': 'https://companieslogo.com/img/orig/HINDWAREAP.NS-82084df9.png',
  'sintex.png': 'https://companieslogo.com/img/orig/SINTEX.NS-c01476d0.png'
};

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlink(dest, () => {});
        download(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${path.basename(dest)}`);
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

async function main() {
  console.log('Starting official brand logos download...');
  for (const [name, url] of Object.entries(logos)) {
    const dest = path.join(dir, name);
    try {
      await download(url, dest);
    } catch (e) {
      console.error(`Error downloading ${name}:`, e.message);
    }
  }
  console.log('Download process complete.');
}

main();
