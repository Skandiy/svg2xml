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
function main(svg) {
  const xmlFilePath = path.join(process.cwd(), 'resources', 'android', 'xml', 'splash.xml');

  // Преобразование SVG в XML
  const xmlData = svgToXml(svg);

  // Запись XML в файл
  fs.writeFile(xmlFilePath, xmlData, 'utf8', (err) => {
    if (err) {
      console.error('\x1b[31m%s\x1b[0m', 'Не удалось записать XML файл:', err);
    } else {
      console.log('\x1b[32m%s\x1b[0m', 'SVG успешно преобразован в XML и сохранен в', xmlFilePath);
    }
  });
}

// index.js
module.exports = function(svg) {
  // Запуск основной функции
  main(svg);
};

