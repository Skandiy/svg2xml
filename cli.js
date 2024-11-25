#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');

// Определяем путь к файлу SVG
const svgPath = path.join(process.cwd(), 'resources', 'splash.svg');

// Определяем путь к конфигу svgo
const svgoConfigPath = path.join(process.cwd(), 'node_modules', 'svg2xml', 'svgo.config.js');

// Команда для выполнения `svgo`
const svgoCommand = `npx svgo --multipass --config ${svgoConfigPath} --pretty ${svgPath} -o -`;

// Выполняем команду `svgo`
exec(svgoCommand, { stdio: 'pipe' }, (error, stdout, stderr) => {
  if (error) {
    console.error('\x1b[31m%s\x1b[0m', `Error executing svgo: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error('\x1b[31m%s\x1b[0m', `svgo stderr: ${stderr}`);
  }

  // Запускаем основной код после успешного выполнения `svgo`
  const mainFunction = require('./index');
  mainFunction(stdout);
});
