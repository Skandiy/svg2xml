const fs = require('fs');
const path = require('path');
const { DOMParser } = require('xmldom');

// Функция для преобразования SVG в XML
function svgToXml(svg) {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svg, "image/svg+xml");

  const paths = svgDoc.getElementsByTagName("path");

  let xml = `
<vector xmlns:android="http://schemas.android.com/apk/res/android"
        android:width="288dp"
        android:height="288dp"
        android:viewportWidth="288"
        android:viewportHeight="288">`;

    Array.from(paths).forEach((path) => {
        const fillColor = path.getAttribute("fill") || "#000000";
        const pathData = path.getAttribute("d") || "";
        xml += `
    <path
            android:fillColor="${fillColor}"
            android:pathData="${pathData}" />`;
    });

    xml += `
</vector>`;

    return xml.trim();
}

// Основная функция для чтения и записи файлов
function main() {
    const svgFilePath = path.join(process.cwd(), 'resources', 'splash.svg');
    const xmlFilePath = path.join(process.cwd(), 'resources', 'splash.xml');

  // Чтение SVG файла
  fs.readFile(svgFilePath, 'utf8', (err, svgData) => {
    if (err) {
      console.error('Не удалось прочитать SVG файл:', err);
      return;
    }

    // Преобразование SVG в XML
    const xmlData = svgToXml(svgData);

    // Запись XML в файл
    fs.writeFile(xmlFilePath, xmlData, 'utf8', (err) => {
      if (err) {
        console.error('Не удалось записать XML файл:', err);
      } else {
        console.log('SVG успешно преобразован в XML и сохранен в ', xmlFilePath);
      }
    });
  });
}

// index.js
module.exports = function() {
  // Запуск основной функции
  main();
};

