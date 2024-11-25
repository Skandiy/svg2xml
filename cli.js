#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');

// Определяем путь к файлу SVG
const svgPath = path.join(process.cwd(), 'resources', 'splash.svg');

// Определяем путь к конфигу svgo
const svgoConfigPath = path.join(process.cwd(), 'node_modules', 'svg2xml', 'svgo.config.js');

// Команда для выполнения `svgo`
const svgoCommand = `npx svgo --multipass --config ${svgoConfigPath} --pretty ${svgPath} -o ${svgPath}`;

console.log();

// Выполняем команду `svgo`
exec(svgoCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing svgo: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`svgo stderr: ${stderr}`);
  }

  console.log(`svgo stdout: ${stdout}`);

  // Запускаем основной код после успешного выполнения `svgo`
  const mainFunction = require('./index');
  mainFunction();
});
