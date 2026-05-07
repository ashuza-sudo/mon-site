# Site de Promotion et Vente d'Ebooks

Un site web moderne et puissant pour promouvoir et vendre vos ebooks, créé avec HTML, CSS et JavaScript pur.

## Fonctionnalités

### 🏪 Catalogue d'Ebooks
- Affichage dynamique des ebooks avec images, descriptions et prix
- Recherche en temps réel par titre, auteur ou description
- Filtrage par catégories (Développement personnel, Business, Technologie, Santé)
- Design responsive avec animations fluides

### 🛒 Système de Panier
- Ajout d'ebooks au panier
- Gestion des quantités
- Sauvegarde automatique dans le localStorage
- Modal de panier avec calcul automatique du total
- Suppression d'articles

### 🔗 Liens d'Achat Individuels
- Chaque ebook peut avoir son propre lien d'achat
- Configuration via le panneau d'administration
- Ouverture automatique des liens lors de la commande
- Support pour plusieurs ebooks dans un même panier

### 📱 Design Responsive
- Optimisé pour desktop, tablette et mobile
- Navigation mobile avec menu hamburger
- Animations et transitions fluides
- Design moderne avec dégradés et effets visuels

### 📧 Formulaire de Contact
- Validation en temps réel des champs
- Messages d'erreur contextuels
- Simulation d'envoi avec notifications

### 🎨 Interface Utilisateur
- Header fixe avec navigation
- Section hero accrocheuse
- Section témoignages clients
- Footer complet avec liens sociaux
- Animations au scroll

## Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Flexbox, Grid, Animations, Media Queries
- **JavaScript ES6+** : DOM manipulation, localStorage, événements

## Structure des Fichiers

```
/
├── index.html          # Page principale
├── css/
│   └── style.css       # Styles CSS
├── js/
│   └── script.js       # Logique JavaScript
└── images/
    └── placeholder.svg # Image placeholder pour les ebooks
```

## Comment Utiliser

1. **Ouvrir le site** : Ouvrez `index.html` dans votre navigateur web
2. **Accéder au panneau admin** : Double-cliquez sur le logo "Ebook Store" en haut à gauche
3. **Mot de passe** : Entrez `admin123` (ou le mot de passe que vous avez configuré)
4. **Configurer le lien de paiement** : Dans l'onglet "Configuration du Lien d'Achat"
5. **Ajouter des ebooks** : Remplissez le formulaire dans l'onglet "Ajouter un Nouveau Ebook" avec le lien d'achat de chaque ebook
6. **Explorer le catalogue** : Parcourez les ebooks disponibles
7. **Rechercher** : Utilisez la barre de recherche pour trouver des ebooks spécifiques
8. **Filtrer** : Utilisez le menu déroulant pour filtrer par catégorie
9. **Ajouter au panier** : Cliquez sur "Ajouter" pour mettre des ebooks dans votre panier
10. **Voir le panier** : Cliquez sur l'icône du panier pour voir vos articles
11. **Commander** : Le bouton "Commander" ouvre tous les liens d'achat dans de nouveaux onglets
12. **Contacter** : Utilisez le formulaire de contact en bas de page

## Personnalisation

### Ajouter des Ebooks

Modifiez le tableau `ebooks` dans `js/script.js` :

```javascript
{
    id: 9,
    title: "Votre Nouveau Livre",
    author: "Votre Nom",
    price: 19.99,
    category: "développement", // ou "business", "technologie", "santé"
    description: "Description de votre livre...",
    image: "images/votre-image.jpg",
    rating: 4.8,
    pages: 250
}
```

### Modifier les Styles

Le fichier `css/style.css` contient toutes les règles de style. Les variables de couleur principales sont :
- `--primary-color`: #667eea (bleu principal)
- `--secondary-color`: #764ba2 (violet)
- `--text-color`: #333
- `--background-color`: #f8f9fa

### Intégration de Paiement Réel

Pour un site en production, remplacez la fonction `handleCheckout()` par une intégration réelle :

- **Stripe** : Intégrez Stripe Elements
- **PayPal** : Utilisez PayPal Buttons
- **Autres** : Adaptez selon vos besoins

## Fonctionnalités Avancées

- **Panneau d'Administration** : Accessible en double-cliquant sur le logo "Ebook Store"
  - Mot de passe : `admin123` (à changer dans le code)
  - Configuration du lien de paiement
  - Ajout/Modification/Suppression d'ebooks
  - Sauvegarde automatique des données
- **Système de Paiement Configurable** : Le bouton "Commander" redirige vers le lien configuré
- **Persistance des Données** : Ebooks et paramètres sauvegardés dans localStorage
- **Lazy Loading** : Les images se chargent à la demande
- **Validation de Formulaire** : Vérification en temps réel
- **Sauvegarde Automatique** : Le panier se sauvegarde automatiquement
- **Notifications** : Système de notifications toast
- **Animations** : Animations CSS et JavaScript fluides

## Compatibilité

- Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Responsive sur tous les appareils
- Support du localStorage pour la persistance des données

## Sécurité

- **Mot de passe admin** : Changez le mot de passe par défaut dans `js/script.js` (ligne 4)
- **Session admin** : L'accès admin est sauvegardé pendant la session
- **Données locales** : Toutes les données sont stockées localement (localStorage)

## Configuration Rapide

Un fichier `config.js` est disponible pour configurer facilement :
- Mot de passe administrateur
- Lien de paiement par défaut
- Informations de contact
- Configuration du site

Modifiez les valeurs dans `config.js` puis copiez-les dans `js/script.js`.

## Déploiement

1. Téléchargez tous les fichiers sur votre serveur web
2. Assurez-vous que les chemins relatifs sont corrects
3. Pour un domaine personnalisé, mettez à jour les URLs dans le code

## Support

Ce site utilise uniquement HTML, CSS et JavaScript vanilla - pas de frameworks ou bibliothèques externes (sauf Font Awesome et Google Fonts pour les icônes et polices).

Pour des fonctionnalités supplémentaires ou de l'aide, consultez la documentation ou contactez-moi.