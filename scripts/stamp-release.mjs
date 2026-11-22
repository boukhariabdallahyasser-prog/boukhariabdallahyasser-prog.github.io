import {readFileSync,writeFileSync} from 'node:fs';
const sha=process.env.GITHUB_SHA;
if(!sha||!/^[a-f0-9]{40}$/.test(sha))throw new Error('Missing or invalid source SHA');
const release={version:JSON.parse(readFileSync('package.json','utf8')).version,commit:sha};
const html=readFileSync('dist/index.html','utf8');
writeFileSync('dist/index.html',html.replace('</head>','<meta name="yzr-release" content="'+sha+'"></head>'));
writeFileSync('dist/release.json',JSON.stringify(release)+'\n');
writeFileSync('dist/.nojekyll','');
