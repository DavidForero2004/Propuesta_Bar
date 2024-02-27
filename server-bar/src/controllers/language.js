const i18n = require('i18n');


//alter language
const language = async (req, res) => {
    const { lang } = req.body;

    try {
        i18n.removeLocale();

        i18n.configure({
            locales: ['en', 'es'],
            directory: './locals/',
            defaultLocale: `${lang}`,
            objectNotation: true
        });

        i18n.setLocale(req, lang);

        res.status(200).json({ message: `Server language updated to ${lang}` });
    } catch (error) {
        console.error("Error al cambiar el idioma:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { language };
