var cart = []; var ai_t = { S: 'Hombre', P: 'Claro', O: 'Cafes' }; var userImg = null;
var raw_h = [
    { name: "Oversized Hoodie 'No Rules'", price: 899, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400" },
    { name: "Cargo Pants Tactical Black", price: 1150, img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400" },
    { name: "Graphic Tee 'Spider Neon'", price: 550, img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=400" },
    { name: "Cyberpunk Windbreaker", price: 1450, img: "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=400" }
];
var raw_m = [
    { name: "Crop Hoodie 'Rebel' Red", price: 750, img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400" },
    { name: "Wide Leg Jeans Vintage Gray", price: 990, img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=400" },
    { name: "Oversize Tee 'Dark Angel'", price: 520, img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=400" },
    { name: "Tactical Vest 'Gothic Pink'", price: 1200, img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=400" }
];
var db = []; var baseId = 1;
for (var i = 1; i <= 50; i++) {
    var h_item = raw_h[(i - 1) % raw_h.length]; var stkH = (i % 7 === 0) ? 0 : Math.floor(Math.random() * 8) + 2;
    db.push({ id: baseId++, name: h_item.name + " #" + (100 + i), price: h_item.price, cat: "hombres", img: h_item.img, stock: stkH });
}
for (var j = 1; j <= 50; j++) {
    var m_item = raw_m[(j - 1) % raw_m.length]; var stkM = (j % 9 === 0) ? 0 : Math.floor(Math.random() * 8) + 2;
    db.push({ id: baseId++, name: m_item.name + " #" + (200 + j), price: m_item.price, cat: "mujeres", img: m_item.img, stock: stkM });
}
function rnd(arr) {
    var g = document.getElementById('grid'); if (!g) return; g.innerHTML = '';
    for (var i = 0; i < arr.length; i++) {
        var p = arr[i]; var isOut = p.stock <= 0;
        var stkTxt = isOut ? '<span class="text-red-500 font-bold block text-[11px] mt-1">AGOTADO</span>' : '<span class="text-gray-400 block text-[11px] mt-1">Stock: ' + p.stock + ' pzs</span>';
        var btnHtml = isOut ? '<button class="w-full bg-gray-800 text-gray-500 font-brand text-[11px] uppercase py-2 cursor-not-allowed" disabled>Agotado</button>' : '<button onclick="add(' + p.id + ')" class="w-full bg-[#0d0d12] border border-white/5 hover:bg-[#e11d48] text-white font-brand text-[11px] uppercase py-2 transition-all">Agregar</button>';
        g.innerHTML += '<div class="card p-4 space-y-3 flex flex-col justify-between"><div class="aspect-square bg-black overflow-hidden"><img src="' + p.img + '" class="w-full h-full object-cover"></div><div class="space-y-1"><h3 class="text-xs font-bold text-gray-200 truncate">' + p.name + '</h3><div class="flex justify-between items-center"><span class="text-[#e11d48] font-brand font-bold text-base">$' + p.price + '</span>' + stkTxt + '</div><div class="flex items-center gap-1 text-[11px] pt-1"><span class="text-gray-500">Talla:</span><select id="sz-' + p.id + '" class="bg-[#1c1c24] text-white outline-none px-1 rounded border border-white/5"><option value="CH">CH</option><option value="M" selected>M</option><option value="G">G</option><option value="XG">XG</option></select></div></div>' + btnHtml + '</div>';
    }
}
function flt(c) { var cat = 'all'; if (c === 'hombres') { cat = 'men'; } if (c === 'mujeres') { cat = 'women'; } var ids = ['all', 'men', 'women']; for (var i = 0; i < ids.length; i++) { var b = document.getElementById('b-' + ids[i]); if (b) b.className = "px-5 py-2 rounded-full text-xs uppercase tracking-wider font-medium bg-[#121214] text-gray-400 border border-white/5"; } var btn = document.getElementById('b-' + cat); if (btn) btn.className = "px-5 py-2 rounded-full text-xs uppercase tracking-wider font-medium bg-[#e11d48] text-white"; if (c === 'todos') { rnd(db); } else { rnd(db.filter(function(p) { return p.cat === c; })); } window.location.href = '#catalogo'; }
function add(id) {
    var p = db.find(function(x) { return x.id === id; }); if (!p || p.stock <= 0) return;
    var sz = document.getElementById('sz-' + id) ? document.getElementById('sz-' + id).value : 'M';
    var i = cart.find(function(x) { return x.id === id && x.size === sz; });
    if (i) { if(i.q < p.stock) i.q++; else return; } else { cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, size: sz, q: 1 }); }
    p.stock--; upUI(); rnd(db); togA(1);
}
function upUI() { var c = document.getElementById('c-items'); if (!c) return; c.innerHTML = ''; var t = 0; for (var i = 0; i < cart.length; i++) { var item = cart[i]; t += item.price * item.q; c.innerHTML += '<div class="flex gap-3 bg-white/5 p-2 rounded items-center text-xs"><img src="' + item.img + '" class="w-10 h-10 object-cover rounded"><div class="flex-1 min-w-0"><h4 class="truncate font-bold text-[11px] text-gray-200">' + item.name + ' (' + item.size + ')</h4><p class="text-[#e11d48] font-brand text-[11px]">' + item.price + ' x' + item.q + '</p></div><button onclick="rem(' + item.id + ',\'' + item.size + '\',' + item.q + ')" class="text-gray-500 hover:text-[#e11d48] px-2"><i class="fas fa-trash"></i></button></div>'; } document.getElementById('c-total').textContent = '$' + t.toFixed(2); document.getElementById('c-count').textContent = cart.reduce(function(s, k) { return s + k.q; }, 0); }
function rem(id, sz, q) { var p = db.find(function(x) { return x.id === id; }); if (p) p.stock += q; cart = cart.filter(function(x) { return !(x.id === id && x.size === sz); }); upUI(); rnd(db); }
function togA(o) { document.getElementById('cart').classList[o ? 'add' : 'remove']('open'); }
function togM(id, o) { if (id === 'pay' && cart.length === 0) return; if (id === 'pay' && o) togA(0); document.getElementById('m-' + id).classList[o ? 'add' : 'remove']('active'); }

var initChat = false;
function openSuggestedChips() {
    if (initChat) return; var m = document.getElementById('c-msg');
    m.innerHTML += '<div id="quick-chips" class="flex flex-wrap gap-1.5 pt-2"><button onclick="triggerQuickBot(\'precios\')" class="bg-[#1c1c24] text-white text-[10px] font-bold px-2.5 py-1 rounded border border-white/5 hover:bg-[#e11d48]">💰 Lista de Precios</button><button onclick="triggerQuickBot(\'tallas\')" class="bg-[#1c1c24] text-white text-[10px] font-bold px-2.5 py-1 rounded border border-white/5 hover:bg-[#e11d48]">📏 Dudas con Tallas</button><button onclick="triggerQuickBot(\'materiales\')" class="bg-[#1c1c24] text-white text-[10px] font-bold px-2.5 py-1 rounded border border-white/5 hover:bg-[#e11d48]">🕷️ Tipo de Tela</button><button onclick="triggerQuickBot(\'envios\')" class="bg-[#1c1c24] text-white text-[10px] font-bold px-2.5 py-1 rounded border border-white/5 hover:bg-[#e11d48]">📍 Puntos de Entrega</button></div>';
    initChat = true;
}
function togCh() { var box = document.getElementById('c-box'); if(box) { box.classList.toggle('open'); if(box.classList.contains('open')) { openSuggestedChips(); } } }
document.getElementById('t-cht').onclick = togCh;
function triggerQuickBot(key) { answerBot(key, key.toUpperCase()); }
function selC(t, v) { ai_t[t] = v; var chips = document.querySelectorAll('[id^="ch-' + t + '-"]'); for (var i = 0; i < chips.length; i++) { chips[i].classList.remove('active'); } var target = document.getElementById('ch-' + t + '-' + v); if (target) target.classList.add('active'); snap(); }

function ldImg(e) { 
    var f = e.target.files[0]; 
    if (f) { 
        var r = new FileReader(); 
        r.onload = function(el) { userImg = el.target.result; snap(); }; 
        r.readAsDataURL(f); 
    } 
}

/* LÓGICA DEL PROBADOR POR SUPERPOSICIÓN (ROSTRO INTEGRAL SIN ALTERAR) */
var clothingScale = 1;
function snap() {
    var p = document.getElementById('v-photo'); var res = document.getElementById('ai-res');
    var container = p.parentElement;
    
    // Si el usuario sube su foto, se pone de fondo intacta
    if (userImg) { 
        p.src = userImg; 
    } else { 
        p.src = (ai_t.S === 'Hombre') ? 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=400' : 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=400'; 
    }
    p.classList.remove('hidden');

    // Remover capas de ropa anteriores para no encimarlas
    var oldOverlay = document.getElementById('ropa-overlay');
    if (oldOverlay) oldOverlay.remove();

    // Crear la capa flotante con la ropa de Antony Black (PNG recortado de alta definición)
    var overlay = document.createElement('img');
    overlay.id = 'ropa-overlay';
    overlay.src = (ai_t.S === 'Hombre') ? 'https://i.ibb.co/6wXGgYm/saco-gabardina-removebg.png' : 'https://i.ibb.co/V3pSg7G/crop-hoodie-removebg.png';
    overlay.className = "absolute z-20 pointer-events-auto cursor-move select-none";
    
    // Estilos iniciales para centrar la prenda sobre el cuerpo del usuario
    overlay.style.width = "65%";
    overlay.style.top = "40%";
    overlay.style.left = "18%";
    overlay.style.filter = "drop-shadow(0px 10px 20px rgba(0,0,0,0.6))";
    container.appendChild(overlay);

    // Permitir al usuario ajustar el tamaño de la prenda con una barra o botones si lo desea
    overlay.onclick = function() {
        clothingScale = (clothingScale === 1) ? 1.15 : (clothingScale === 115) ? 0.85 : 1;
        overlay.style.transform = "scale(" + clothingScale + ")";
    };

    var ptEntrega = "Desviación Jocotitlán"; if (ai_t.O === 'Azules') ptEntrega = "Jocotitlán Centro (Presidencia)"; if (ai_t.O === 'Verdes') ptEntrega = "San Pedro de los Baños";
    
    res.innerHTML = '<strong>[SISTEMA DE SUPERPOSICIÓN PREMIUM]</strong><br>• Integridad Facial: 100% GARANTIZADA (Tu rostro no se altera).<br>• Capa de Ropa Ajustable: Toca la prenda sobre la pantalla para escalar su tamaño.<br><br><strong>📍 COORDINACIÓN LOCAL:</strong><br>Punto: ' + ptEntrega + '<br><br>Usa esta vista didáctica para calcular cómo contrasta el largo de la prenda oversize con tu silueta antes de mandar tu pedido.';
    document.getElementById('anl').classList.remove('hidden');
}

function bot(e) { if(e) e.preventDefault(); var i = document.getElementById('c-in'); var t = i.value.trim(); if (!t) return false; answerBot(t.toLowerCase(), t); i.value = ''; return false; }
function answerBot(cleanText, rawText) {
    var m = document.getElementById('c-msg'); m.innerHTML += '<div class="flex justify-end mb-2"><div class="bg-[#e11d48] text-white p-2.5 rounded-xl rounded-tr-none max-w-[85%] font-bold text-right">' + rawText + '</div></div>';
    setTimeout(function() {
        var r = "Qué onda hermano, claro que sí. Oye, ¿te interesa comprar alguna de nuestras prendas de ropa hoy? Te puedo apartar tu talla de una vez.";
        if (cleanText.indexOf('precio') !== -1 || cleanText.indexOf('cuanto') !== -1 || cleanText.indexOf('costo') !== -1 || cleanText.indexOf('valen') !== -1) { r = "<strong>🔥 LISTA DE PRECIOS:</strong> Sudadera Oversize: $899, Cargo Pants: $1150, Crop Hoodies: $750 y Wide Leg Jeans: $990. Vale totalmente cada centavo por el gramaje pesado.<br><br><strong>🛒 ¿Te gustaría comprar alguna de estas piezas de ropa ahorita mismo?</strong>"; }
        else if (cleanText.indexOf('talla') !== -1 || cleanText.indexOf('medida') !== -1 || cleanText.indexOf('ch') !== -1) { r = "Manejamos un corte Oversize de patrón amplio con hombros caídos. Pide tu talla de siempre si te gusta holgado, o una menos si lo quieres justo. Tenemos stock real en CH, M, G y XG.<br><br><strong>📦 ¿Quieres comprar tu ropa en alguna talla antes de que se agote?</strong>"; }
        else if (cleanText.indexOf('material') !== -1 || cleanText.indexOf('tela') !== -1 || cleanText.indexOf('algodon') !== -1) { r = "Confeccionamos únicamente con Heavy Cotton (Algodón pesado de alto gramaje). Esto garantiza una estructura rígida e imponente en el cuerpo que no pierde la forma.<br><br><strong>🔥 ¿Estás listo para estrenar y comprar ropa con este nivel de calidad textil?</strong>"; }
        else if (cleanText.indexOf('envio') !== -1 || cleanText.indexOf('entrega') !== -1 || cleanText.indexOf('punto') !== -1) { r = "Hacemos entregas personales gratuitas en Jocotitlán: Centro (Frente a Presidencia), Desviación y San Pedro de los Baños. Al concretar tu pedido, coordinamos por WhatsApp.<br><br><strong>📍 ¿Te gustaría comprar ropa hoy para coordinar tu entrega de inmediato?</strong>"; }
        else if (cleanText.indexOf('pago') !== -1 || cleanText.indexOf('cuenta') !== -1) { r = "Puedes liquidar tu pedido directo con tarjeta usando el botón de la bolsa o por transferencia SPEI a nuestra cuenta de Mercado Pago Wallet (CLABE: 722969010522000447).<br><br><strong>💳 ¿Quieres proceder a comprar tu ropa y apartar tu pedido en este momento?</strong>"; }
        else if (cleanText.indexOf('comprar') !== -1 || cleanText.indexOf('ropa') !== -1 || cleanText.indexOf('catalogo') !== -1 || cleanText.indexOf('quiero') !== -1 || cleanText.indexOf('recomiendas') !== -1) { r = "Te recomiendo arrancar con nuestro combo estrella: el <strong>Oversized Hoodie 'No Rules'</strong> junto al <strong>Cargo Pants Tactical Black</strong>. Es una combinación brutal.<br><br><strong>¿Te interesa comprar ropa hoy mismo o prefieres seguir viendo el catálogo?</strong>"; }
        else if (cleanText.indexOf('hola') !== -1 || cleanText.indexOf('que onda') !== -1) { r = "¡Qué onda hermano! Qué gusto tenerte aquí. Puedo resolver cualquier duda que tengas sobre telas, diseños, logística o lo que sea de la marca."; }
        else { r = "Excelente pregunta. En ANTONY BLACK nos enfocamos en el diseño disruptivo y la cultura urbana de alta costura para que cada prenda eleve tu presencia en las calles."; }
        var remateVenta = "<br><br>📦 <strong>¿Te interesa comprar ropa hoy mismo para apartar tu talla y coordinar tu entrega antes de que se agote el stock?</strong>";
        var btnWsp = '<div class="mt-2.5"><button onclick="window.open(\'https://wa.me/527122111135?text=Hola%20José%20Antonio\',\'_blank\')" class="w-full bg-[#25D366] text-white text-[10px] font-bold py-2 rounded-lg transition-all uppercase tracking-wider flex items-center justify-center gap-1.5"><i class="fab fa-whatsapp text-xs"></i> Comprar Ropa por WhatsApp 🕷️</button></div>';
        m.innerHTML += '<div class="flex justify-start mb-2"><div class="bg-[#1c1c21] text-gray-200 p-2.5 rounded-xl rounded-tl-none max-w-[85%] border border-white/5 shadow-md leading-relaxed">' + r + remateVenta + btnWsp + '</div></div>'; m.scrollTop = m.scrollHeight;
    }, 50);
}
rnd(db); snap();
