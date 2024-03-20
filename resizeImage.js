const fs = require("fs");
const sharp = require("sharp");

// Pasta onde estão localizadas as imagens originais
const pastaDeImagensOriginais = "./fotos";
// Pasta onde serão salvas as imagens redimensionadas
const pastaDeImagensRedimensionadas = "./fotos_redimensionados";

// Cria a pasta de imagens redimensionadas se ela não existir
if (!fs.existsSync(pastaDeImagensRedimensionadas)) {
  fs.mkdirSync(pastaDeImagensRedimensionadas);
}

// Loop através dos arquivos na pasta de imagens originais
fs.readdir(pastaDeImagensOriginais, (err, arquivos) => {
  if (err) {
    console.error("Erro ao ler a pasta de imagens:", err);
    return;
  }

  // Para cada arquivo na pasta
  arquivos.forEach((arquivo) => {
    // Verifica se o arquivo é uma imagem webp
    if (arquivo.endsWith(".webp")) {
      // Caminho completo para a imagem original
      const caminhoOriginal = `${pastaDeImagensOriginais}/${arquivo}`;
      // Caminho onde será salva a imagem redimensionada
      const caminhoRedimensionado = `${pastaDeImagensRedimensionadas}/${arquivo}`;

      // Redimensiona a imagem para 500x500
      sharp(caminhoOriginal)
        .resize(500, 500)
        .toFile(caminhoRedimensionado, (err, info) => {
          if (err) {
            console.error("Erro ao redimensionar a imagem:", err);
          } else {
            console.log(
              `Imagem ${arquivo} redimensionada com sucesso e salva em ${pastaDeImagensRedimensionadas}.`
            );
          }
        });
    }
  });
});
