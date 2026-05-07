// Configuration admin
const ADMIN_PASSWORD = "admin123"; // Changez ce mot de passe
let isAdmin = false;

// Configuration du lien d'achat
let purchaseLink = "https://paypal.me/votrecompte"; // Changez ce lien selon votre système de paiement

// Données des ebooks
const ebooks = [
    {
        id: 1,
        title: "Influenceur IA",
        author: "Expert Digital & IA",
        price: 19.99,
        category: "technologie",
        description: "Devenez un influenceur incontournable grâce à l'intelligence artificielle : stratégies, outils et techniques pour dominer les réseaux sociaux.",
        image: "ChatGPT Image 7 mai 2026, 23_12_39.png",
        rating: 4.8,
        pages: 150,
        purchaseLink: "https://kujisgqe.mychariow.shop/prd_zbd4ut"
    },
    {
        id: 2,
        title: "Ebook 2 - Business & Finance",
        author: "Expert Business",
        price: 24.99,
        category: "business",
        description: "Maîtrisez les stratégies business modernes pour réussir dans votre entreprise.",
        image: "Futuristic digital banner for NEXOVIA.png",
        rating: 4.9,
        pages: 200,
        purchaseLink: "https://kujisgqe.mychariow.shop/prd_vxugl6"
    },
    {
        id: 3,
        title: "Fais de ton Smartphone une Source de Revenus",
        author: "Expert Mobile & Business",
        price: 22.99,
        category: "business",
        description: "Transformez votre smartphone en outil de génération de revenus : applications, freelancing, e-commerce mobile et stratégies éprouvées.",
        image: "Premium Digital Business Banner.png",
        rating: 4.7,
        pages: 180,
        purchaseLink: "https://kujisgqe.mychariow.shop/prd_3e4man"
    },
    {
        id: 4,
        title: "Shopify Mastery Débutant et Adapté",
        author: "Expert E-commerce",
        price: 17.99,
        category: "technologie",
        description: "Maîtrisez Shopify de A à Z : créez, personnalisez et optimisez votre boutique en ligne même si vous êtes débutant.",
        image: "Design sans titre (2).png",
        rating: 4.6,
        pages: 120,
        purchaseLink: "https://kujisgqe.mychariow.shop/prd_0514yw"
    }
];

// État du panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';
let currentSearch = '';

// Éléments DOM
const booksGrid = document.getElementById('booksGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const closeCart = document.getElementById('closeCart');
const clearCart = document.getElementById('clearCart');
const checkoutBtn = document.getElementById('checkoutBtn');
const contactForm = document.getElementById('contactForm');

// Éléments admin
const adminBtn = document.getElementById('adminBtn');
const adminModal = document.getElementById('adminModal');
const closeAdmin = document.getElementById('closeAdmin');
const purchaseLinkInput = document.getElementById('purchaseLink');
const savePurchaseLink = document.getElementById('savePurchaseLink');
const addBookForm = document.getElementById('addBookForm');
const adminBooksList = document.getElementById('adminBooksList');

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    loadEbooks();
    loadPurchaseLink();
    displayBooks();
    updateCartCount();
    setupEventListeners();
    animateOnScroll();

    // Vérifier si on est admin (pour garder la session)
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
        isAdmin = true;
        adminBtn.style.display = 'inline-block';
    }
});

// Configuration des écouteurs d'événements
function setupEventListeners() {
    // Recherche
    searchInput.addEventListener('input', function() {
        currentSearch = this.value.toLowerCase();
        filterBooks();
    });

    // Filtrage par catégorie
    categoryFilter.addEventListener('change', function() {
        currentFilter = this.value;
        filterBooks();
    });

    // Panier
    cartBtn.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    clearCart.addEventListener('click', clearCartItems);
    checkoutBtn.addEventListener('click', handleCheckout);

    // Formulaire de contact
    contactForm.addEventListener('submit', handleContactSubmit);

    // Admin
    adminBtn.addEventListener('click', toggleAdmin);
    closeAdmin.addEventListener('click', toggleAdmin);
    savePurchaseLink.addEventListener('click', savePurchaseLinkHandler);
    addBookForm.addEventListener('submit', handleAddBook);

    // Fermer le modal en cliquant en dehors
    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            toggleCart();
        }
    });

    adminModal.addEventListener('click', function(e) {
        if (e.target === adminModal) {
            toggleAdmin();
        }
    });

    // Double-clic sur le logo pour accéder à l'admin
    const logo = document.querySelector('.nav-logo h1');
    logo.addEventListener('dblclick', checkAdminAccess);
}

// Affichage des ebooks
function displayBooks(booksToDisplay = ebooks) {
    booksGrid.innerHTML = '';

    if (booksToDisplay.length === 0) {
        booksGrid.innerHTML = `
            <div class="no-books">
                <i class="fas fa-book-open fa-3x" style="color: #ccc; margin-bottom: 20px;"></i>
                <h3>Aucun ebook disponible</h3>
                <p>Les ebooks seront bientôt disponibles. Revenez plus tard !</p>
            </div>
        `;
        return;
    }

    booksToDisplay.forEach(book => {
        const bookCard = createBookCard(book);
        booksGrid.appendChild(bookCard);
    });
}

// Création d'une carte ebook
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card fade-in-up';
    card.innerHTML = `
        <div class="book-image">
            <img src="${book.image}" alt="${book.title}" class="book-img" onerror="this.src='images/placeholder.svg'">
            <div class="book-overlay">
                <a href="#" class="overlay-btn" onclick="viewBookDetails(${book.id})">Voir détails</a>
            </div>
        </div>
        <div class="book-content">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">Par ${book.author}</p>
            <p class="book-description">${book.description.substring(0, 100)}...</p>
            <div class="book-footer">
                <span class="book-price">${book.price.toFixed(2)}€</span>
                <button class="add-to-cart-btn" onclick="addToCart(${book.id})">
                    <i class="fas fa-cart-plus"></i> Ajouter
                </button>
            </div>
        </div>
    `;
    return card;
}

// Filtrage des ebooks
function filterBooks() {
    let filteredBooks = ebooks;

    // Filtrage par recherche
    if (currentSearch) {
        filteredBooks = filteredBooks.filter(book =>
            book.title.toLowerCase().includes(currentSearch) ||
            book.author.toLowerCase().includes(currentSearch) ||
            book.description.toLowerCase().includes(currentSearch)
        );
    }

    // Filtrage par catégorie
    if (currentFilter !== 'all') {
        filteredBooks = filteredBooks.filter(book => book.category === currentFilter);
    }

    displayBooks(filteredBooks);
}

// Gestion du panier
function addToCart(bookId) {
    const book = ebooks.find(b => b.id === bookId);
    if (!book) return;

    const existingItem = cart.find(item => item.id === bookId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
            image: book.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    showNotification(`${book.title} ajouté au panier !`);
}

function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    saveCart();
    updateCartCount();
    updateCartDisplay();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function toggleCart() {
    if (cartModal.style.display === 'flex') {
        cartModal.style.display = 'none';
    } else {
        updateCartDisplay();
        cartModal.style.display = 'flex';
    }
}

function updateCartDisplay() {
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
        cartTotal.innerHTML = '<h4>Total: 0.00€</h4>';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" onerror="this.src='images/placeholder.svg'">
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <p>${item.author}</p>
                <p>Quantité: ${item.quantity}</p>
            </div>
            <span class="cart-item-price">${(item.price * item.quantity).toFixed(2)}€</span>
            <button class="remove-item" onclick="removeFromCart(${item.id})">Retirer</button>
        `;
        cartItems.appendChild(cartItem);
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerHTML = `<h4>Total: ${total.toFixed(2)}€</h4>`;
}

function clearCartItems() {
    cart = [];
    saveCart();
    updateCartCount();
    updateCartDisplay();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function handleCheckout() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide !', 'error');
        return;
    }

    // Ouvrir les liens d'achat de chaque ebook dans de nouveaux onglets
    cart.forEach(item => {
        const ebook = ebooks.find(e => e.id === item.id);
        if (ebook && ebook.purchaseLink) {
            window.open(ebook.purchaseLink, '_blank');
        }
    });

    showNotification('Redirection vers les pages d\'achat...', 'info');

    // Vider le panier après la commande
    setTimeout(() => {
        clearCartItems();
        showNotification('Merci pour votre achat !', 'success');
    }, 2000);
}

// Gestion du formulaire de contact
function handleContactSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Simulation d'envoi
    showNotification('Message envoyé avec succès !', 'success');

    // Réinitialiser le formulaire
    e.target.reset();
}

// Navigation mobile
function setupMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Smooth scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animations au scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.book-card, .testimonial-card, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Voir les détails d'un ebook
function viewBookDetails(bookId) {
    const book = ebooks.find(b => b.id === bookId);
    if (!book) return;

    // Ici, vous pourriez ouvrir un modal avec plus de détails
    showNotification(`Détails de "${book.title}" - ${book.pages} pages, Note: ${book.rating}/5`);
}

// Notifications
function showNotification(message, type = 'success') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Styles de base
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '5px',
        color: 'white',
        fontWeight: '500',
        zIndex: '3000',
        maxWidth: '300px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });

    // Couleurs selon le type
    if (type === 'success') {
        notification.style.background = '#2ed573';
    } else if (type === 'error') {
        notification.style.background = '#ff4757';
    } else if (type === 'info') {
        notification.style.background = '#3742fa';
    }

    document.body.appendChild(notification);

    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Suppression automatique
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Fonctionnalités avancées
function setupAdvancedFeatures() {
    // Lazy loading des images
    setupLazyLoading();

    // Validation de formulaire en temps réel
    setupFormValidation();

    // Sauvegarde automatique du panier
    setupAutoSave();
}

function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

function setupFormValidation() {
    const inputs = document.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';

    switch(field.name) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                message = 'Le nom doit contenir au moins 2 caractères';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Veuillez entrer un email valide';
            }
            break;
        case 'subject':
            if (value.length < 5) {
                isValid = false;
                message = 'Le sujet doit contenir au moins 5 caractères';
            }
            break;
        case 'message':
            if (value.length < 10) {
                isValid = false;
                message = 'Le message doit contenir au moins 10 caractères';
            }
            break;
    }

    field.style.borderColor = isValid ? '#667eea' : '#ff4757';

    // Afficher/masquer le message d'erreur
    let errorElement = field.parentElement.querySelector('.error-message');
    if (!isValid) {
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = '#ff4757';
            errorElement.style.fontSize = '12px';
            errorElement.style.marginTop = '5px';
            field.parentElement.appendChild(errorElement);
        }
        errorElement.textContent = message;
    } else if (errorElement) {
        errorElement.remove();
    }

    return isValid;
}

function setupAutoSave() {
    // Sauvegarde automatique du panier toutes les 30 secondes
    setInterval(() => {
        if (cart.length > 0) {
            saveCart();
        }
    }, 30000);
}

// Initialisation des fonctionnalités avancées
setupAdvancedFeatures();

// Fonctions Admin
function checkAdminAccess() {
    const password = prompt("Mot de passe administrateur:");
    if (password === ADMIN_PASSWORD) {
        isAdmin = true;
        localStorage.setItem('isAdmin', 'true');
        adminBtn.style.display = 'inline-block';
        showNotification('Accès administrateur activé', 'success');
        loadAdminData();
    } else {
        showNotification('Mot de passe incorrect', 'error');
    }
}

function toggleAdmin() {
    if (!isAdmin) {
        checkAdminAccess();
        return;
    }

    if (adminModal.style.display === 'flex') {
        adminModal.style.display = 'none';
    } else {
        loadAdminData();
        adminModal.style.display = 'flex';
    }
}

function loadAdminData() {
    // Charger le lien de paiement
    purchaseLinkInput.value = purchaseLink;

    // Charger la liste des ebooks
    displayAdminBooks();
}

function savePurchaseLinkHandler() {
    const newLink = purchaseLinkInput.value.trim();
    if (newLink) {
        purchaseLink = newLink;
        localStorage.setItem('purchaseLink', purchaseLink);
        showNotification('Lien de paiement sauvegardé', 'success');
    } else {
        showNotification('Veuillez entrer un lien valide', 'error');
    }
}

function handleAddBook(e) {
    e.preventDefault();

    const newBook = {
        id: Date.now(), // ID unique basé sur timestamp
        title: document.getElementById('bookTitle').value,
        author: document.getElementById('bookAuthor').value,
        price: parseFloat(document.getElementById('bookPrice').value),
        category: document.getElementById('bookCategory').value,
        description: document.getElementById('bookDescription').value,
        image: document.getElementById('bookImage').value || 'images/placeholder.svg',
        rating: parseFloat(document.getElementById('bookRating').value) || 0,
        pages: parseInt(document.getElementById('bookPages').value) || 0,
        purchaseLink: document.getElementById('bookPurchaseLink').value || ''
    };

    ebooks.push(newBook);
    saveEbooks();
    displayBooks();
    displayAdminBooks();

    // Réinitialiser le formulaire
    addBookForm.reset();
    showNotification('Ebook ajouté avec succès', 'success');
}

function displayAdminBooks() {
    adminBooksList.innerHTML = '';

    if (ebooks.length === 0) {
        adminBooksList.innerHTML = '<p>Aucun ebook ajouté pour le moment.</p>';
        return;
    }

    ebooks.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'admin-book-item';
        bookItem.innerHTML = `
            <div class="admin-book-info">
                <h5>${book.title}</h5>
                <p>${book.author} - ${book.price}€ - ${book.category}</p>
            </div>
            <div class="admin-book-actions">
                <button class="btn btn-small btn-edit" onclick="editBook(${book.id})">Modifier</button>
                <button class="btn btn-small btn-delete" onclick="deleteBook(${book.id})">Supprimer</button>
            </div>
        `;
        adminBooksList.appendChild(bookItem);
    });
}

function editBook(bookId) {
    const book = ebooks.find(b => b.id === bookId);
    if (!book) return;

    // Remplir le formulaire avec les données existantes
    document.getElementById('bookTitle').value = book.title;
    document.getElementById('bookAuthor').value = book.author;
    document.getElementById('bookPrice').value = book.price;
    document.getElementById('bookCategory').value = book.category;
    document.getElementById('bookDescription').value = book.description;
    document.getElementById('bookImage').value = book.image;
    document.getElementById('bookRating').value = book.rating;
    document.getElementById('bookPages').value = book.pages;
    document.getElementById('bookPurchaseLink').value = book.purchaseLink || '';

    // Supprimer l'ancien livre
    deleteBook(bookId);

    // Faire défiler vers le formulaire
    document.querySelector('.admin-section h4').scrollIntoView({ behavior: 'smooth' });
}

function deleteBook(bookId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet ebook ?')) {
        const index = ebooks.findIndex(b => b.id === bookId);
        if (index > -1) {
            ebooks.splice(index, 1);
            saveEbooks();
            displayBooks();
            displayAdminBooks();
            showNotification('Ebook supprimé', 'success');
        }
    }
}

function saveEbooks() {
    localStorage.setItem('ebooks', JSON.stringify(ebooks));
}

function loadEbooks() {
    const saved = localStorage.getItem('ebooks');
    if (saved) {
        const savedEbooks = JSON.parse(saved);
        ebooks.push(...savedEbooks);
    }
}

function loadPurchaseLink() {
    const saved = localStorage.getItem('purchaseLink');
    if (saved) {
        purchaseLink = saved;
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    loadEbooks();
    loadPurchaseLink();
    displayBooks();
    updateCartCount();
    setupEventListeners();
    animateOnScroll();

    // Vérifier si on est admin (pour garder la session)
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
        isAdmin = true;
        adminBtn.style.display = 'inline-block';
    }
});