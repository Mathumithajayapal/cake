const fs = require('fs');
const path = require('path');

const dir = __dirname;

// Get all html files
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Replace <link rel="icon" ...> or add it if missing?
    // Based on grep search, almost all have <link rel="icon" type="image/jpeg" href="image/product.jpg">
    // Some have <link rel="icon" type="image/png" href="images/cakes.jpg">
    
    // regex to match <link rel="icon" ... >
    const newIconTag = '<link rel="icon" type="image/jpeg" href="images/cakes.jpg">';
    
    if (content.match(/<link rel="icon"[^>]*>/)) {
        content = content.replace(/<link rel="icon"[^>]*>/g, newIconTag);
        modified = true;
    } else {
        // If there's no icon tag, we can add it before </head>
        if (content.includes('</head>')) {
            content = content.replace('</head>', `    ${newIconTag}\n</head>`);
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated favicon in ${file}`);
    }
}
console.log('Favicon fix done!');
