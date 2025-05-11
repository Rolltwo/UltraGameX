// Função para abrir a tela de detalhes do produto
function openProductDetails(product) {
    const overlay = document.querySelector('.product-details-overlay');
    const mainImage = document.querySelector('.product-details-main-image');
    const thumbnailsContainer = document.querySelector('.product-details-thumbnails');
    const title = document.querySelector('.product-details-title');
    const price = document.querySelector('.product-details-price');
    const description = document.querySelector('.product-details-description');
    const sizeButtons = document.querySelector('#size-options .product-details-option-buttons');
    const colorButtons = document.querySelector('#color-options .product-details-option-buttons');
    const addToCartBtn = document.querySelector('.product-details-add-to-cart');

    // Preencher informações básicas
    title.textContent = product.name;
    price.textContent = `R$ ${product.price.toFixed(2)}`;
    description.textContent = product.description;

    // Configurar imagens
    mainImage.src = product.images[0];
    thumbnailsContainer.innerHTML = '';
    product.images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image;
        thumbnail.alt = `Thumbnail ${index + 1}`;
        thumbnail.addEventListener('click', () => {
            mainImage.src = image;
            updateActiveThumbnail(thumbnail);
        });
        if (index === 0) thumbnail.classList.add('active');
        thumbnailsContainer.appendChild(thumbnail);
    });

    // Configurar opções de tamanho
    if (product.sizes && product.sizes.length > 0) {
        document.getElementById('size-options').style.display = '';
        sizeButtons.innerHTML = '';
        product.sizes.forEach(size => {
            const button = document.createElement('button');
            button.textContent = size;
            button.addEventListener('click', () => {
                document.querySelectorAll('#size-options button').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
            sizeButtons.appendChild(button);
        });
    } else {
        document.getElementById('size-options').style.display = 'none';
    }

    // Configurar opções de cor
    if (product.colors && product.colors.length > 0) {
        document.getElementById('color-options').style.display = '';
        colorButtons.innerHTML = '';
        product.colors.forEach(color => {
            const button = document.createElement('button');
            button.style.backgroundColor = color;
            button.addEventListener('click', () => {
                document.querySelectorAll('#color-options button').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Atualizar imagem se houver imagens específicas para cada cor
                if (product.colorImages && product.colorImages[color]) {
                    mainImage.src = product.colorImages[color];
                    // Atualizar thumbnail também
                    thumbnailsContainer.innerHTML = '';
                    const thumbnail = document.createElement('img');
                    thumbnail.src = product.colorImages[color];
                    thumbnail.alt = `${product.name} - ${color}`;
                    thumbnail.classList.add('active');
                    thumbnailsContainer.appendChild(thumbnail);
                }
            });
            colorButtons.appendChild(button);
        });
    } else {
        document.getElementById('color-options').style.display = 'none';
    }

    // Configurar botão de adicionar ao carrinho
    addToCartBtn.onclick = () => {
        const selectedSize = document.querySelector('#size-options button.active')?.textContent;
        const selectedColor = document.querySelector('#color-options button.active')?.style.backgroundColor;
        const quantity = parseInt(document.querySelector('.quantity-input').value);

        // Só exige seleção se o produto tiver essas opções
        if ((product.sizes && product.sizes.length > 0 && !selectedSize) || (product.colors && product.colors.length > 0 && !selectedColor)) {
            alert('Por favor, selecione um tamanho e uma cor antes de adicionar ao carrinho.');
            return;
        }

        const cartItem = {
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: mainImage.src
        };
        if (selectedSize) cartItem.size = selectedSize;
        if (selectedColor) cartItem.color = selectedColor;

        // Adicionar ao carrinho
        if (typeof updateCart === 'function') {
            updateCart(cartItem);
        } else {
            // Fallback se a função updateCart não existir
            const cartCount = document.querySelector('.cart-count');
            const currentCount = parseInt(cartCount.textContent);
            cartCount.textContent = currentCount + 1;
        }

        // Feedback visual
        const originalText = addToCartBtn.textContent;
        addToCartBtn.textContent = 'Produto Adicionado!';
        addToCartBtn.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            addToCartBtn.textContent = originalText;
            addToCartBtn.style.backgroundColor = '';
            closeProductDetails();
        }, 2000);
    };

    // Mostrar overlay
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Função para atualizar thumbnail ativa
function updateActiveThumbnail(activeThumbnail) {
    document.querySelectorAll('.product-details-thumbnails img').forEach(thumb => {
        thumb.classList.remove('active');
    });
    activeThumbnail.classList.add('active');
}

// Função para fechar a tela de detalhes
function closeProductDetails() {
    const overlay = document.querySelector('.product-details-overlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Fechar overlay ao clicar no botão de fechar
    document.querySelector('.product-details-close').addEventListener('click', closeProductDetails);

    // Fechar overlay ao clicar fora do container
    document.querySelector('.product-details-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeProductDetails();
        }
    });

    // Gerenciar quantidade
    const quantityInput = document.querySelector('.quantity-input');
    document.querySelector('.quantity-btn.minus').addEventListener('click', () => {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });
    document.querySelector('.quantity-btn.plus').addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });
}); 