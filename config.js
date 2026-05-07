// Script de configuration rapide pour l'Ebook Store
// Utilisez ce fichier pour configurer facilement votre site

// 1. Changer le mot de passe admin (remplacez "admin123" par votre mot de passe)
const ADMIN_PASSWORD = "admin123";

// 2. Configurer le lien de paiement par défaut
let purchaseLink = "https://paypal.me/votrecompte";

// 3. Informations de contact (modifiez selon vos besoins)
const contactInfo = {
    email: "digitlshidems@gmail.com",
    phone: "+243 975941293",
    address: "Kinshasa, RDC"
};

// 4. Configuration du site
const siteConfig = {
    title: "NEXOVIA Store - Découvrez mes ouvrages",
    description: "Des ebooks de qualité pour votre développement personnel et professionnel",
    author: "ASHUZA MUTALEMBA"
};

// Instructions :
// 1. Modifiez les valeurs ci-dessus selon vos besoins
// 2. Copiez ces valeurs dans le fichier js/script.js
// 3. Sauvegardez et rechargez votre site

console.log("Configuration chargée :", { ADMIN_PASSWORD, purchaseLink, contactInfo, siteConfig });