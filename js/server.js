const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Enable CORS to allow the frontend to seamlessly send save requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/save') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const { filename, content } = data;
                
                // Security check to prevent basic path traversal
                if (!filename || filename.includes('..') || filename.includes('/')) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: 'Invalid filename' }));
                    return;
                }

                const filePath = path.join(__dirname, '..', filename);
                fs.writeFileSync(filePath, content, 'utf8');

                console.log(`[Success] Overwrote ${filename} securely.`);
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'File saved successfully!' }));
            } catch (err) {
                console.error('[Error] Saving file:', err);
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Failed to complete save operation' }));
            }
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(` CMS Backend running at http://localhost:${PORT}`);
    console.log(`=========================================`);
    console.log(` You can use your Live Server like normal.`);
    console.log(` Clicking 'Save Page' will silently hit this backend and rewrite your files.`);
});
