#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');

// Определяем путь к файлу SVG
const svgPath = path.join(process.cwd(), 'resources', 'splash.svg');

// Команда для выполнения `svgo`
const svgoCommand = `svgo --multipass --pretty ${svgPath} -o ${svgPath}`;

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
