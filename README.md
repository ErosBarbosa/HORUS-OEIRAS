<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HÓRUS SUS - OEIRAS-PI</title>

    <!-- === PWA / Meta Tags para App Android === --><meta name="theme-color" content="#4f46e5">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Hórus SUS">
    
    <!-- Manifesto do App (embutido) --><link rel="manifest" href="data:application/json;base64,eyJuYW1lIjoiSE9SVVMgU1VTIC0gT0VJUkFTIiwic2hvcnRfbmFtZSI6IkhvcnVzIFNVUyIsImRlc2NyaXB0aW9uIjoiR3VpYSBJbnRlcmF0aXZvIGRlIFRyZWluYW1lbnRvIEhvcnVzIFNVUyAtIE9laXJhcyIsInN0YXJ0X3VybCI6Ii4iLCJkaXNwbGF5Ijoic3RhbmRhbG9uZSIsImJhY2tncm91bmRfY29sb3IiOiIjMTExODI3IiwidGhlbWVfY29sb3IiOiIjNGY0NmU1IiwiY29ucyI6W3sic3JjIjoiaHR0cHM6Ly9wbGFjZWhvbGQuY28vMTkyeDE5Mi80ZjQ2ZTUvZmZmZmZmP3RleHQ9SCZmb250PWJvcHBpbnMiLCJzaXplcyI6IjE5MngxOTIiLCJ0eXBlIjoiaW1hZ2UvcG5nIn0LHsic3JjIjoiaHR0cHM6Ly9wbGFjZWhvbGQuY28vNTEyeDUxMi80ZjQ2ZTUvZmZmZmZmP3RleHQ9SCZmb250PWJvcHBpbnMiLCJzaXplcyI6IjUxMng1MTIiLCJ0eXBlIjoiaW1hZ2UvcG5nIn1dfQ==">
    <!-- Ícone para iOS --><link rel="apple-touch-icon" href="https://placehold.co/192x192/4f46e5/ffffff?text=H&font=poppins">
    <!-- === Fim das Tags PWA === --><!-- Carrega o Tailwind CSS --><script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Google Fonts: Poppins --><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            background-color: #f3f4f6; /* bg-gray-100 - Fundo cinza claro */
            min-height: 100vh; 
            min-height: -webkit-fill-available; /* Para iOS Safari */
        }
        html {
            height: -webkit-fill-available; /* Para iOS Safari */
        }
        .backdrop-blur-custom {
            backdrop-filter: blur(10px) brightness(0.8); /* Efeito de vidro fosco para o conteúdo principal */
            background-color: rgba(255, 255, 255, 0.1); /* Um pouco de cor para o fundo */
        }
        .video-container {
            position: relative;
            padding-bottom: 56.25%; /* Proporção 16:9 */
            height: 0;
            overflow: hidden;
            width: 100%;
            border-radius: 0.5rem; /* Bordas arredondadas para o player */
        }
        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .btn-gradient {
            background-image: linear-gradient(to right, var(--tw-gradient-stops));
            transition: all 0.3s ease;
        }
        .btn-gradient:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
    </style>
</head>
<body class="flex flex-col min-h-screen bg-gray-100 text-gray-800">

    <!-- NOVO CABEÇALHO DO SITE --><header class="w-full bg-white shadow-lg z-10 sticky top-0">
        <div class="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
            <!-- Logo --><div class="flex-shrink-0 flex items-center">
                <img src="https://sts-gestao.s3.amazonaws.com/uploads/clientes_imagem/17ab2a009c559ad9bb9be968711a3461.jpeg" alt="Brasão de Oeiras e Governo Municipal" class="h-22 md:h-20 w-auto">
            </div>
            <!-- Título --><div class="text-center sm:text-left sm:ml-6 mt-3 sm:mt-0">
                <h1 class="text-3xl font-extrabold text-gray-800">
                    HÓRUS SUS - <span class="text-green-600">OEIRAS</span>
                </h1>
                <p class="text-lg text-gray-600">Guia Interativo de Treinamento</p>
            </div>
        </div>
    </header>

    <!-- Conteúdo Principal --><main class="w-full max-w-3xl mx-auto my-auto p-6 md:p-10">
        <!-- Título do App (REMOVIDO, agora está no cabeçalho) -->

        <!-- Seção de Botões --><section class="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6">
            <!-- Botão Cadastro --><button 
                onclick="showVideo('cadastro')"
                class="btn-gradient from-green-600 to-green-800 text-white font-semibold py-5 px-6 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-75 flex items-center justify-center space-x-3">
                <span class="text-3xl">📝</span>
                <span class="text-xl">Cadastro</span>
            </button>

            <!-- Botão Entrada --><button 
                onclick="showVideo('entrada')"
                class="btn-gradient from-blue-600 to-blue-800 text-white font-semibold py-5 px-6 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-75 flex items-center justify-center space-x-3">
                <span class="text-3xl">📦</span>
                <span class="text-xl">Entrada</span>
            </button>

            <!-- Botão Movimentação --><button 
                onclick="showVideo('movimentacao')"
                class="btn-gradient from-green-600 to-green-800 text-white font-semibold py-5 px-6 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-75 flex items-center justify-center space-x-3">
                <span class="text-3xl">🚚</span>
                <span class="text-xl">Movimentação</span>
            </button>

            <!-- Botão Dispensação --><button 
                onclick="showVideo('dispensacao')"
                class="btn-gradient from-blue-600 to-blue-800 text-white font-semibold py-5 px-6 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-75 flex items-center justify-center space-x-3">
                <span class="text-3xl">💊</span>
                <span class="text-xl">Dispensação</span>
            </button>
        </section>
    </main>

    <!-- Rodapé --><footer class="w-full text-center py-6 mt-8">
        <p class="text-sm text-gray-600">
            Desenvolvido por Eros Fernandes
        </p>
    </footer>

    <!-- Modal de Vídeo (Oculto por padrão) -->
    <!-- CORREÇÃO: Restaurando a estrutura do modal que estava quebrada -->
    <div id="videoModal" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 hidden" onclick="closeModal()">
        
        <!-- Conteúdo do Modal -->
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden transform scale-95 opacity-0 transition-all duration-300 ease-out" onclick="event.stopPropagation()">
            
            <!-- Cabeçalho do Modal -->
            <div class="flex justify-between items-center p-4 md:p-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <h3 id="modalTitle" class="text-xl md:text-2xl font-semibold"></h3>
                <button onclick="closeModal()" class="text-white hover:text-gray-200 transition-colors duration-200">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <!-- Corpo do Modal (Player de Vídeo) --><div class="p-4 md:p-6 bg-gray-100">
                <div class="video-container shadow-xl">
                    <!-- O Iframe do vídeo será inserido aqui pelo JavaScript --><iframe id="videoPlayer" width="560" height="315" src="" title="Vídeo de Treinamento" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>

    <script>
        // --- IMPORTANTE: Edite os links dos vídeos aqui ---
        const videoLinks = {
            'cadastro': {
                title: '📝 Como Fazer Cadastro no Hórus',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // SUBSTITUA ESTE LINK
            },
            'entrada': {
                title: '📦 Como Lançar Entrada de Medicamentos',
                url: 'https://www.youtube.com/embed/L_jWHffIx5E' // SUBSTITUA ESTE LINK
            },
            'movimentacao': {
                title: '🚚 Como Fazer Movimentação entre Estoques',
                url: 'https://www.youtube.com/embed/5qap5aO4i9A' // SUBSTITUA ESTE LINK
            },
            'dispensacao': {
                title: '💊 Como Realizar a Dispensação',
                url: 'https://www.youtube.com/embed/3JZ_D3ELwOQ' // SUBSTITUA ESTE LINK
            }
        };
        // --------------------------------------------------

        const modal = document.getElementById('videoModal');
        const modalContent = modal.querySelector('.max-w-4xl'); 
        const modalTitle = document.getElementById('modalTitle');
        const videoPlayer = document.getElementById('videoPlayer');

        function showVideo(topic) {
            if (videoLinks[topic]) {
                const videoData = videoLinks[topic];
                modalTitle.textContent = videoData.title;
                videoPlayer.src = videoData.url;
                modal.classList.remove('hidden');
                setTimeout(() => {
                    modalContent.classList.add('scale-100', 'opacity-100');
                    modalContent.classList.remove('scale-95', 'opacity-0');
                }, 10); 
            } else {
                console.error('Tópico do vídeo não encontrado:', topic);
            }
        }

        function closeModal() {
            modalContent.classList.remove('scale-100', 'opacity-100');
            modalContent.classList.add('scale-95', 'opacity-0');
            
            modalContent.addEventListener('transitionend', function handler() {
                modal.classList.add('hidden');
                videoPlayer.src = ''; 
                modalContent.removeEventListener('transitionend', handler);
            }, { once: true });
        }

        document.addEventListener('keydown', function(event) {
            if (event.key === "Escape" && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    </script>

    <!-- === SCRIPT DO SERVICE WORKER REMOVIDO === -->
    <!-- O script do Service Worker que estava aqui foi removido para corrigir o erro de protocolo 'blob:' no ambiente atual. -->
    <!-- 
    <script>
        if ('serviceWorker' in navigator) {
            ... (código do sw removido) ...
        }
    </script>
    -->

</body>
</html>
