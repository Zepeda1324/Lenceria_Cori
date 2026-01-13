// Datos de productos
const productos = [
    {
        id: 1,
        nombre: 'Camiseta Básica',
        categoria: 'hombre',
        precio: 29.99,
        imagen: '👕',
        descripcion: 'Camiseta de algodón 100%'
    },
    {
        id: 2,
        nombre: 'Jeans Clásicos',
        categoria: 'hombre',
        precio: 59.99,
        imagen: '👖',
        descripcion: 'Jeans de mezclilla resistente'
    },
    {
        id: 3,
        nombre: 'Vestido Elegante',
        categoria: 'mujer',
        precio: 79.99,
        imagen: '👗',
        descripcion: 'Vestido perfecto para ocasiones especiales'
    },
    {
        id: 4,
        nombre: 'Blusa Floral',
        categoria: 'mujer',
        precio: 39.99,
        imagen: '👚',
        descripcion: 'Blusa con diseño floral moderno'
    },
    {
        id: 5,
        nombre: 'Chaqueta de Cuero',
        categoria: 'hombre',
        precio: 129.99,
        imagen: '🧥',
        descripcion: 'Chaqueta de cuero genuino'
    },
    {
        id: 6,
        nombre: 'Zapatillas Deportivas',
        categoria: 'accesorios',
        precio: 89.99,
        imagen: '👟',
        descripcion: 'Zapatillas cómodas para deporte'
    },
    {
        id: 7,
        nombre: 'Bolso de Mano',
        categoria: 'accesorios',
        precio: 49.99,
        imagen: '👜',
        descripcion: 'Bolso elegante de mano'
    },
    {
        id: 8,
        nombre: 'Gorra Casual',
        categoria: 'accesorios',
        precio: 19.99,
        imagen: '🧢',
        descripcion: 'Gorra ajustable casual'
    },
    {
        id: 9,
        nombre: 'Sudadera con Capucha',
        categoria: 'hombre',
        precio: 49.99,
        imagen: '🧥',
        descripcion: 'Sudadera cómoda con capucha'
    },
    {
        id: 10,
        nombre: 'Falda Plisada',
        categoria: 'mujer',
        precio: 44.99,
        imagen: '👗',
        descripcion: 'Falda plisada moderna'
    },
    {
        id: 11,
        nombre: 'Camisa Formal',
        categoria: 'hombre',
        precio: 54.99,
        imagen: '👔',
        descripcion: 'Camisa formal para oficina'
    },
    {
        id: 12,
        nombre: 'Bufanda de Lana',
        categoria: 'accesorios',
        precio: 24.99,
        imagen: '🧣',
        descripcion: 'Bufanda tejida de lana'
    }
];

// Carrito de compras
let carrito = [];

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    renderizarProductos(productos);
    configurarFiltros();
    configurarCarrito();
    configurarFormularios();
    configurarNavegacion();
});

// Renderizar productos en el grid
function renderizarProductos(productosArray) {
    const grid = document.getElementById('productosGrid');
    grid.innerHTML = '';
    
    productosArray.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.setAttribute('data-category', producto.categoria);
        
        card.innerHTML = `
            <div class="producto-img">${producto.imagen}</div>
            <div class="producto-info">
                <div class="producto-category">${producto.categoria}</div>
                <h3 class="producto-name">${producto.nombre}</h3>
                <p class="producto-price">$${producto.precio.toFixed(2)}</p>
                <div class="producto-actions">
                    <button class="btn-add-cart" onclick="agregarAlCarrito(${producto.id})">
                        <i class="fas fa-cart-plus"></i> Agregar
                    </button>
                    <button class="btn-favorite">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Configurar filtros de categoría
function configurarFiltros() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            const categoria = this.getAttribute('data-category');
            filtrarProductos(categoria);
        });
    });
}

// Filtrar productos por categoría
function filtrarProductos(categoria) {
    const productoCards = document.querySelectorAll('.producto-card');
    
    productoCards.forEach(card => {
        if (categoria === 'todos' || card.getAttribute('data-category') === categoria) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s';
        } else {
            card.style.display = 'none';
        }
    });
}

// Agregar producto al carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    
    if (!producto) return;
    
    const itemExistente = carrito.find(item => item.id === idProducto);
    
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    actualizarCarrito();
    mostrarNotificacion('Producto agregado al carrito');
}

// Actualizar carrito
function actualizarCarrito() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartCount.textContent = totalItems;
    
    renderizarCarrito();
}

// Renderizar items del carrito
function renderizarCarrito() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutTotal = document.getElementById('checkoutTotal');
    
    if (carrito.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-cart" style="font-size: 3rem; color: var(--gray);"></i><p>Tu carrito está vacío</p></div>';
        cartTotal.textContent = '0.00';
        checkoutTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    carrito.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        
        const itemTotal = item.precio * item.cantidad;
        total += itemTotal;
        
        itemElement.innerHTML = `
            <div class="cart-item-img">${item.imagen}</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.nombre}</div>
                <div class="cart-item-price">$${item.precio.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="cambiarCantidad(${item.id}, -1)">-</button>
                    <span>${item.cantidad}</span>
                    <button class="quantity-btn" onclick="cambiarCantidad(${item.id}, 1)">+</button>
                    <span style="margin-left: auto; font-weight: bold;">$${itemTotal.toFixed(2)}</span>
                </div>
            </div>
            <button class="remove-item" onclick="eliminarDelCarrito(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItems.appendChild(itemElement);
    });
    
    cartTotal.textContent = total.toFixed(2);
    checkoutTotal.textContent = total.toFixed(2);
}

// Cambiar cantidad de producto en el carrito
function cambiarCantidad(idProducto, cambio) {
    const item = carrito.find(item => item.id === idProducto);
    if (!item) return;
    item.cantidad += cambio;
    if (item.cantidad <= 0) {
        eliminarDelCarrito(idProducto);
    } else {
        actualizarCarrito();
    }
}

function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    actualizarCarrito();
}

// Configurar modales y botones del carrito
function configurarCarrito() {
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckout = document.getElementById('closeCheckout');
    
    // Abrir carrito
    cartBtn.addEventListener('click', function() {
        cartModal.classList.add('active');
    });
    
    // Cerrar carrito
    closeCart.addEventListener('click', function() {
        cartModal.classList.remove('active');
    });
    
    // Cerrar al hacer click fuera del modal
    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });
    
    // Abrir checkout
    checkoutBtn.addEventListener('click', function() {
        if (carrito.length === 0) {
            mostrarNotificacion('El carrito está vacío');
            return;
        }
        cartModal.classList.remove('active');
        checkoutModal.classList.add('active');
    });
    
    // Cerrar checkout
    closeCheckout.addEventListener('click', function() {
        checkoutModal.classList.remove('active');
    });
    
    checkoutModal.addEventListener('click', function(e) {
        if (e.target === checkoutModal) {
            checkoutModal.classList.remove('active');
        }
    });
}

// Configurar formularios
function configurarFormularios() {
    const contactForm = document.getElementById('contactForm');
    const checkoutForm = document.getElementById('checkoutForm');
    
    // Campos de checkout
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const postal = document.getElementById('postal');
    const ccName = document.getElementById('ccName');
    const cardNumber = document.getElementById('cardNumber');
    const cardExpiry = document.getElementById('cardExpiry');
    const cardCvv = document.getElementById('cardCvv');
    
    // Formulario de contacto
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        mostrarNotificacion('¡Mensaje enviado! Nos pondremos en contacto pronto.');
        contactForm.reset();
    });
    
    // Formulario de checkout
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Reset de errores
        limpiarErrores([firstName,lastName,email,phone,address,city,postal,ccName,cardNumber,cardExpiry,cardCvv]);

        let esValido = true;

        // Validaciones básicas
        if (!minLength(firstName.value, 2)) esValido = setFieldError(firstName, 'Ingresa tu nombre (mín. 2 caracteres)') && esValido;
        if (!minLength(lastName.value, 2)) esValido = setFieldError(lastName, 'Ingresa tus apellidos (mín. 2 caracteres)') && esValido;
        if (!validEmail(email.value)) esValido = setFieldError(email, 'Ingresa un email válido') && esValido;
        if (!validPhone(phone.value)) esValido = setFieldError(phone, 'Ingresa un teléfono válido (8-15 dígitos)') && esValido;
        if (!minLength(address.value, 5)) esValido = setFieldError(address, 'Dirección demasiado corta') && esValido;
        if (!minLength(city.value, 2)) esValido = setFieldError(city, 'Ciudad inválida') && esValido;
        if (!/^[0-9]{4,10}$/.test(onlyDigits(postal.value))) esValido = setFieldError(postal, 'CP inválido') && esValido;

        const numDigits = onlyDigits(cardNumber.value);
        if (numDigits.length !== 16 || !luhnCheck(numDigits)) esValido = setFieldError(cardNumber, 'Tarjeta inválida') && esValido;
        if (!minLength(ccName.value.trim(), 5)) esValido = setFieldError(ccName, 'Nombre como aparece en la tarjeta') && esValido;
        if (!validExpiry(cardExpiry.value)) esValido = setFieldError(cardExpiry, 'Vencimiento inválido (MM/AA)') && esValido;
        if (!/^[0-9]{3}$/.test(cardCvv.value)) esValido = setFieldError(cardCvv, 'CVV debe tener 3 dígitos') && esValido;

        if (!esValido) {
            mostrarNotificacion('Revisa los campos marcados');
            return;
        }

        // Simular procesamiento de pago
        mostrarNotificacion('¡Procesando pago...');
        setTimeout(() => {
            mostrarNotificacion('¡Compra realizada con éxito! Gracias por tu compra.');
            carrito = [];
            actualizarCarrito();
            document.getElementById('checkoutModal').classList.remove('active');
            checkoutForm.reset();
        }, 1500);
    });

    // Formatos y restricciones de entrada
    cardNumber.addEventListener('input', () => {
        const digits = onlyDigits(cardNumber.value).slice(0, 16);
        cardNumber.value = digits.replace(/(.{4})/g, '$1 ').trim();
        clearFieldError(cardNumber);
    });

    cardExpiry.addEventListener('input', () => {
        let v = onlyDigits(cardExpiry.value).slice(0, 4);
        if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2);
        cardExpiry.value = v;
        clearFieldError(cardExpiry);
    });

    cardCvv.addEventListener('input', () => {
        cardCvv.value = onlyDigits(cardCvv.value).slice(0, 3);
        clearFieldError(cardCvv);
    });

    phone.addEventListener('input', () => {
        phone.value = onlyDigits(phone.value).slice(0, 15);
        clearFieldError(phone);
    });
}

// Configurar navegación suave
function configurarNavegacion() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los links
            navLinks.forEach(l => l.classList.remove('active'));
            // Agregar clase active al link clickeado
            this.classList.add('active');
            
            // Scroll suave a la sección
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Actualizar link activo al hacer scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Mostrar notificación
function mostrarNotificacion(mensaje) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: var(--shadow-hover);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
    `;
    notificacion.textContent = mensaje;
    
    // Agregar animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notificacion);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notificacion.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, 3000);
}

// Funcionalidad de favoritos (toggle)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('fa-heart') || e.target.classList.contains('btn-favorite')) {
        const button = e.target.classList.contains('btn-favorite') ? e.target : e.target.parentElement;
        const icon = button.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.style.background = 'var(--secondary-color)';
            button.style.color = 'var(--white)';
            mostrarNotificacion('Agregado a favoritos');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.style.background = '';
            button.style.color = '';
            mostrarNotificacion('Eliminado de favoritos');
        }
    }
});

// Utilidades de validación y formato
function onlyDigits(v) {
    return (v || '').replace(/\D/g, '');
}

function minLength(v, n) {
    return (v || '').trim().length >= n;
}

function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((v || '').trim());
}

function setFieldError(input, msg) {
    input.classList.add('invalid');
    const small = input.parentElement.querySelector('small.error');
    if (small) small.textContent = msg;
    return false;
}

function clearFieldError(input) {
    input.classList.remove('invalid');
    const small = input.parentElement.querySelector('small.error');
    if (small) small.textContent = '';
}

function limpiarErrores(inputs) {
    inputs.forEach(clearFieldError);
}

function luhnCheck(num) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = num.length - 1; i >= 0; i--) {
        let digit = parseInt(num.charAt(i), 10);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}

function validExpiry(v) {
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(v)) return false;
    const [mm, yy] = v.split('/').map(n => parseInt(n, 10));
    const now = new Date();
    const currentYear = now.getFullYear() % 100; // dos dígitos
    const currentMonth = now.getMonth() + 1; // 1-12

    if (yy < currentYear) return false;
    if (yy === currentYear && mm < currentMonth) return false;
    return true;
}

// Detección de marca
function detectCardBrand(digits) {
    const d = (digits || '').toString();
    if (/^4/.test(d)) return 'visa';
    if (/^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/.test(d)) return 'mastercard';
    if (/^3[47]/.test(d)) return 'amex';
    if (/^(6011|65|64[4-9]|622)/.test(d)) return 'discover';
    if (/^3(?:0[0-5]|[68])/.test(d)) return 'diners';
    if (/^(?:2131|1800|35)/.test(d)) return 'jcb';
    return 'unknown';
}

function updateCardBrandUI(brand) {
    const pill = document.getElementById('cardBrand');
    if (!pill) return;
    pill.className = `brand-pill brand-${brand === 'unknown' ? 'unknown' : brand}`;
    const text = pill.querySelector('.brand-text');
    const icon = pill.querySelector('i');
    if (text) {
        const map = { visa: 'Visa', mastercard: 'Mastercard', amex: 'American Express', discover: 'Discover', diners: 'Diners', jcb: 'JCB', unknown: 'Desconocida' };
        text.textContent = map[brand] || 'Desconocida';
    }
    if (icon) {
        icon.className = 'fas fa-credit-card';
        if (brand === 'visa') icon.className = 'fab fa-cc-visa';
        else if (brand === 'mastercard') icon.className = 'fab fa-cc-mastercard';
        else if (brand === 'amex') icon.className = 'fab fa-cc-amex';
        else if (brand === 'discover') icon.className = 'fab fa-cc-discover';
    }
}

function updateCvvConstraints(brand) {
    const cvv = document.getElementById('cardCvv');
    if (!cvv) return;
    if (brand === 'amex') {
        cvv.maxLength = 4;
        cvv.placeholder = '4 dígitos';
    } else {
        cvv.maxLength = 3;
        cvv.placeholder = '3 dígitos';
    }
}

function getCurrentBrand() {
    const digits = onlyDigits(document.getElementById('cardNumber').value);
    return detectCardBrand(digits);
}
