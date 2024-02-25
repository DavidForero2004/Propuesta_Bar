const i18n = require('i18n');

const language = async (req, res) => {
    const { lang } = req.body;

    try {
        // Eliminar el idioma actualmente configurado
        i18n.removeLocale();

        // Configurar el nuevo idioma
        i18n.configure({
            locales: ['en', 'es'], // lista de idiomas soportados
            directory: './locals/', // directorio donde se encuentran los archivos de traducción
            defaultLocale: `${lang}`, // idioma por defecto
            objectNotation: true // permite usar notación de objeto para acceder a las traducciones
        });

        // Cambiar el idioma de la solicitud actual
        i18n.setLocale(req, lang);

        res.status(200).json({ message: `Server language updated to ${lang}` });
    } catch (error) {
        console.error("Error al cambiar el idioma:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { language };
