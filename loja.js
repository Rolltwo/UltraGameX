document.addEventListener('DOMContentLoaded', () => {
    // Filtro de categorias
    const categoryButtons = document.querySelectorAll('.category-btn');
    const products = document.querySelectorAll('.product-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.dataset.category;

            products.forEach(product => {
                if (category === 'todos' || product.dataset.category === category) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });

    // Carrinho de compras
    const cartBtn = document.querySelector('.cart-btn');
    const cartCount = document.querySelector('.cart-count');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartClose = document.querySelector('.cart-close');
    const cartItems = document.querySelector('.cart-items');
    const cartTotalPrice = document.querySelector('.cart-total-price');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    let cart = [];

    // Função para atualizar o carrinho
    window.updateCart = function(item) {
        cart.push(item);
        updateCartCount();
        updateCartDisplay();
        
        // Animação do carrinho
        cartBtn.classList.add('pulse');
        setTimeout(() => {
            cartBtn.classList.remove('pulse');
        }, 300);
    };

    // Função para atualizar a exibição do carrinho
    function updateCartDisplay() {
        cartItems.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Seu carrinho está vazio</p>
                </div>
            `;
        } else {
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <span class="cart-item-name">${item.name}</span>
                        <div class="cart-item-options">
                            ${item.size ? `<span>Tamanho: ${item.size}</span><br>` : ''}
                            ${item.color ? `<span>Cor: ${getColorName(item.color)}</span><br>` : ''}
                            <span>Quantidade: ${item.quantity}</span>
                        </div>
                        <span class="cart-item-price">R$ ${itemTotal.toFixed(2)}</span>
                    </div>
                    <button class="cart-item-remove" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                cartItems.appendChild(itemElement);
            });
        }

        cartTotalPrice.textContent = `R$ ${total.toFixed(2)}`;

        // Adicionar event listeners para os botões de remover
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                cart.splice(index, 1);
                updateCartCount();
                updateCartDisplay();
            });
        });
    }

    function getColorName(color) {
        const colors = {
            '#000000': 'Preto',
            '#FFFFFF': 'Branco'
        };
        return colors[color] || color;
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('R$ ', '').replace(',', '.'));
            const productImage = productCard.querySelector('img').src;
            
            const cartItem = {
                name: productName,
                price: productPrice,
                quantity: 1,
                image: productImage
            };
            
            updateCart(cartItem);
            
            // Feedback visual
            button.textContent = 'Adicionado!';
            setTimeout(() => {
                button.textContent = 'Adicionar ao Carrinho';
            }, 2000);
        });
    });

    function updateCartCount() {
        let totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Adiciona animação de pulse ao carrinho
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 0.3s ease-in-out;
        }
    `;
    document.head.appendChild(style);

    // Event listeners para abrir/fechar o carrinho
    cartBtn.addEventListener('click', () => {
        cartOverlay.classList.add('active');
        updateCartDisplay();
    });

    cartClose.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
    });

    // Fechar carrinho ao clicar fora
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            cartOverlay.classList.remove('active');
        }
    });

    // Abrir detalhes do produto ao clicar
    products.forEach(product => {
        product.addEventListener('click', (e) => {
            // Evita abrir os detalhes se clicar no botão de adicionar ao carrinho
            if (e.target.closest('.add-to-cart-btn')) {
                return;
            }

            const productName = product.querySelector('h3').textContent;
            let productImages;

            // Verifica se é uma camisa e configura as imagens de acordo
            let productData = {
                name: productName,
                price: parseFloat(product.querySelector('.price').textContent.replace('R$ ', '').replace(',', '.')),
                description: product.querySelector('p').textContent,
                images: [product.querySelector('img').src]
            };

            if (productName.includes('Camiseta')) {
                if (productName.includes('Modelo 1')) {
                    productImages = {
                        '#000000': 'camisaRT-preta.png',
                        '#FFFFFF': 'camisaRT-branca1.png'
                    };
                } else if (productName.includes('Modelo 2')) {
                    productImages = {
                        '#000000': 'camisaRT-preta2.png',
                        '#FFFFFF': 'camisaRT-branca2.png'
                    };
                }
                productData.sizes = ['P', 'M', 'G', 'GG'];
                productData.colors = ['#000000', '#FFFFFF'];
                productData.colorImages = productImages;
            }

            openProductDetails(productData);
            if (typeof updateLanguage === 'function') {
                const lang = localStorage.getItem('preferredLanguage') || 'pt';
                updateLanguage(lang);
            }
        });
    });

    // Botão de retorno ao topo
    const backToTopButton = document.getElementById('back-to-top');
    
    // Mostrar/esconder o botão baseado no scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Adicionar evento de clique para retornar ao topo
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}); 