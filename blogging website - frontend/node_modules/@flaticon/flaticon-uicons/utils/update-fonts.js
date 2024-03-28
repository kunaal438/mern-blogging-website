const fs = require("fs");
const https = require("https");

const CSS_FOLDER = "src/uicons/css";
const WEBFONTS_FOLDER = "src/uicons/webfonts";
const CDN_URL = 'https://cdn-uicons.flaticon.com';

const ICON_STYLES = [
    'bold',
    'regular',
    'solid'
];

const ICON_FAMILIES = [
    'rounded',
    'straight'
];

const WEBFONT_EXTENSIONS = [
    'eot',
    'woff2',
    'woff'
];

function updateStyles() {
    for (style of ICON_STYLES) {
        for (family of ICON_FAMILIES) {
            const url = `/uicons-${style}-${family}/css/uicons-${style}-${family}.css`;
            const path = `/${style}/${family}.css`;
            const id = `uicons-${style}-${family}`;

            updateFont(url, path, id);
        }
    }
}

function updateBrands() {
    const url = `/uicons-brands/css/uicons-brands.css`;
    const path = `/brands/all.css`;

    updateFont(url, path, 'uicons-brands');
}

function updateCssFile(url, filePath, id) {
    url = CDN_URL + url;
    const fullFilePath = CSS_FOLDER + filePath;
        
    https.get(url, res => {
        let content = '';

        res.on('data', data => content += data);

        res.on('end', () => {            
            const regexpr = new RegExp(`${CDN_URL}/${id}`, 'g');
            const newContent = content.replace(regexpr, '../..');

            fs.writeFileSync(fullFilePath, newContent, 'utf8')
            console.log(`updated!: ${filePath}`);
        })
    });
}

function downloadWebFont(id) {

    const fontUrlBase = `${CDN_URL}/${id}/webfonts`;

    for(ext of WEBFONT_EXTENSIONS) {
        const fileName = `${id}.${ext}`;
        const fontUrl = `${fontUrlBase}/${fileName}`;

        const file = fs.createWriteStream(`${WEBFONTS_FOLDER}/${fileName}`);

        https.get(fontUrl, res => {
            const stream = res.pipe(file);

            stream.on('finish', () => console.log(`donwloaded ${fileName}`));
            
        })
    }
}

function updateFont(url, filePath, id) {
    updateCssFile(url, filePath, id);
    downloadWebFont(id);
};

updateStyles();
updateBrands();