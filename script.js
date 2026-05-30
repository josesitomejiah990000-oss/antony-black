var cart = []; var db = [];

// Los 5 productos exclusivos de hombre para ANTONY BLACK
var productos_hombres = [
    { name: "Oversized Hoodie 'No Rules' #101", price: 899, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400", stock: 8 },
    { name: "Cargo Pants Tactical Black #102", price: 1150, img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400", stock: 5 },
    { name: "Graphic Tee 'Spider Neon' #103", price: 550, img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=400", stock: 12 },
    { name: "Cyberpunk Windbreaker #104", price: 1450, img: "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=400", stock: 4 },
    { name: "Heavy Cotton Sweatshirt #105", price: 950, img: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?q=80&w=400", stock: 7 }
];

// Los 5 productos exclusivos de mujer para ANTONY BLACK
var productos_mujeres = [
    { name: "Crop Hoodie 'Rebel' Red #201", price: 750, img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400", stock: 6 },
    { name: "Wide Leg Jeans Vintage Gray #202", price: 990, img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=400", stock: 9 },
    { name: "Oversize Tee 'Dark Angel' #203", price: 520, img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=400", stock: 10 },
    { name: "Tactical Vest 'Gothic Pink' #204", price: 1200, img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=400", stock: 3 },
    { name: "Streetwear Cargo Skirt #205", price: 850, img: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=400", stock: 5 }
];

var baseId = 1;
productos_hombres.forEach(function(p) { db.push({ id: baseId++, name: p.name, price: p.price, cat: "hombres", img: p.img, stock: p.stock }); });
productos_mujeres.forEach(function(p) { db.push({ id: baseId++, name: p.name, price: p.price, cat: "mujeres", img: p.img, stock: p.stock }); });

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
function togM(id, o) { document.getElementById('m-' + id).classList[o ? 'add' : 'remove']('active'); }

// Salta directo a tu pasarela oficial y real de Mercado Pago sin rodeos
function openCheckout() {
    if(cart.length === 0) return;
    
    // 💳 TU ENLACE PERSONALIZADO OFICIAL INTEGRADO
    var linkMercadoPago = "https://link.mercadopago.com.mx/antonyblack"; 

    var cartContainer = document.getElementById('cart');
    var btnPagarOriginal = cartContainer.querySelector('button[onclick="openCheckout()"]');
    if(btnPagarOriginal) {
        btnPagarOriginal.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> Abriendo Mercado Pago Seguro...';
        btnPagarOriginal.disabled = true;
    }

    setTimeout(function() {
        // Redirección directa hacia tu cuenta de cobro de Antony Black
        window.open(linkMercadoPago, '_blank');
        
        // Limpiamos la bolsa local tras despachar al cliente al banco
        cart = []; 
        upUI(); 
        togA(0);
        
        if(btnPagarOriginal) {
            btnPagarOriginal.innerHTML = 'Proceder al Pago Seguro';
            btnPagarOriginal.disabled = false;
        }
    }, 800);
}

function procesarOrden(e) { if(e) e.preventDefault(); openCheckout(); }

/* CHATBOT CON IA */
var initChat = false;
function openSuggestedChips() {
    if (initChat) return; var m = document.getElementById('c-msg');
    m.innerHTML += '<div id="quick-chips" class="flex flex-wrap gap-1.5 pt-2"><button onclick="triggerQuickBot(\'precios\')" class="bg-[#1c1c24] text-white text-[10px] font-bold px-2.5 py-1 rounded border border-white/5 hover:bg-[#e11d48]">💰 Lista de Precios</button><button onclick="triggerQuickBot(\'tallas\')" class="bg-[#1c1c24] text-white text-[10px] font-bold px-2.5 py-1 rounded border border-white/5 hover:bg-[#e11d48]">📏 Dudas con Tallas</button><button onclick="triggerQuickBot(\'materiales\')" class="bg-[#1c1c24] text-white text-[10px] font-bold px-2.5 py-1 rounded border border-white/5 hover:bg-[#e11d48]">🕷️ Tipo de Tela</button><button onclick="triggerQuickBot(\'envios\')" class="bg-[#1c1c24] text-white text-[10px] font-bold px-2.5 py-1 rounded border border-white/5 hover:bg-[#e11d48]">📍 Puntos de Entrega</button></div>';
    initChat = true;
}
function togCh() { var box = document.getElementById('c-box'); if(box) { box.classList.toggle('open'); if(box.classList.contains('open')) { openSuggestedChips(); } } }
document.getElementById('t-cht').onclick = togCh;
function triggerQuickBot(key) { answerBot(key, key.toUpperCase()); }
function bot(e) { if(e) e.preventDefault(); var i = document.getElementById('c-in'); var t = i.value.trim(); if (!t) return false; answerBot(t.toLowerCase(), t); i.value = ''; return false; }
function answerBot(cleanText, rawText) {
    var m = document.getElementById('c-msg'); m.innerHTML += '<div class="flex justify-end mb-2"><div class="bg-[#e11d48] text-white p-2.5 rounded-xl rounded-tr-none max-w-[85%] font-bold text-right">' + rawText + '</div></div>';
    setTimeout(function() {
        var r = "Excelente pregunta. En ANTONY BLACK nos enfocamos en el diseño disruptivo y la cultura urbana de alta costura para que cada prenda eleve tu presencia en las calles.";
        if (cleanText.indexOf('precio') !== -1 || cleanText.indexOf('cuanto') !== -1 || cleanText.indexOf('costo') !== -1) { r = "Nuestras prendas premium manejan los siguientes costos didácticos: Sudaderas Oversize en $899, Cargo Pants en $1150, Crop Hoodies en $750 y Wide Leg Jeans en $990. Vale totalmente cada centavo por el gramaje pesado de confección."; }
        else if (cleanText.indexOf('talla') !== -1 || cleanText.indexOf('medida') !== -1) { r = "El corte es Oversize de patrón amplio con hombros caídos. Pide tu talla de siempre si te gusta el look holgado urbano original, o una talla menos si prefieres que te quede más justo. Stock en CH, M, G y XG."; }
        else if (cleanText.indexOf('material') !== -1 || cleanText.indexOf('tela') !== -1 || cleanText.indexOf('algodon') !== -1) { r = "Confeccionamos únicamente con Heavy Cotton (Algodón pesado de alto gramaje). Esto le da una estructura rígida e imponente al cuerpo que no pierde la forma con las lavadas."; }
        else if (cleanText.indexOf('envio') !== -1 || cleanText.indexOf('entrega') !== -1 || cleanText.indexOf('punto') !== -1 || cleanText.indexOf('lugar') !== -1) { r = "Hacemos entregas personales totalmente gratuitas en Jocotitlán: Centro (Frente a Presidencia), Desviación de Jocotitlán, y San Pedro de los Baños. Coordinamos la hora exacta de inmediato por WhatsApp."; }
        else if (cleanText.indexOf('pago') !== -1 || cleanText.indexOf('cuenta') !== -1) { r = "Puedes procesar tu pago seguro de forma 100% real a través de nuestra pasarela oficial conectada a Mercado Pago."; }
        var remateVenta = "<br><br>📦 <strong>Por cierto, hermano: ¿Te interesa comprar ropa hoy mismo para apartar tu talla y coordinar tu entrega antes de que se agote el stock?</strong>";
        var btnWsp = '<div class="mt-2.5"><button onclick="window.open(\'https://wa.me/527122111135?text=Hola%20José%20Antonio\',\'_blank\')" class="w-full bg-[#25D366] text-white text-[10px] font-bold py-2 rounded-lg transition-all uppercase tracking-wider flex items-center justify-center gap-1.5"><i class="fab fa-whatsapp text-xs"></i> Comprar Ropa por WhatsApp 🕷️</button></div>';
        m.innerHTML += '<div class="flex justify-start mb-2"><div class="bg-[#1c1c21] text-gray-200 p-2.5 rounded-xl rounded-tl-none max-w-[85%] border border-white/5 shadow-md leading-relaxed">' + r + remateVenta + btnWsp + '</div></div>'; m.scrollTop = m.scrollHeight;
    }, 50);
}
rnd(db);
