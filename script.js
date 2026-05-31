var cart = []; var db = [];

(function(){
    emailjs.init("xSLS8u-87RCHo6bMQ");
})();

var productos_hombres = [
    { name: "Oversized Hoodie 'No Rules' #101", price: 899, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400", stock: 8 },
    { name: "Cargo Pants Tactical Black #102", price: 1150, img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400", stock: 5 },
    { name: "Graphic Tee 'Spider Neon' #103", price: 550, img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=400", stock: 12 },
    { name: "Cyberpunk Windbreaker #104", price: 1450, img: "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=400", stock: 4 },
    { name: "Heavy Cotton Sweatshirt #105", price: 950, img: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?q=80&w=400", stock: 7 }
];

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
        var stkTxt = isOut ? '<span class="text-red-500 font-bold block text-[10px] uppercase tracking-wider mt-1">Agotado</span>' : '<span class="text-gray-500 block text-[10px] font-mono mt-1">STOCK: ' + p.stock + ' UDS</span>';
        
        var btnHtml = isOut ? 
            `<button class="w-full bg-[#121216] text-gray-600 font-bold text-[10px] uppercase tracking-widest py-3 rounded-xl border border-white/5 cursor-not-allowed" disabled>Pieza Agotada</button>` : 
            `<button onclick="add(${p.id})" class="w-full bg-[#0d0d12] border-b-2 border-[#e11d48] hover:bg-[#e11d48] text-white font-bold text-[10px] uppercase tracking-widest py-3 rounded-xl transition-all duration-300 active:scale-[0.98]">Agregar a la Bolsa</button>`;
        
        g.innerHTML += `
            <div class="card p-4 space-y-4 flex flex-col justify-between">
                <div class="aspect-square bg-[#050507] overflow-hidden rounded-2xl border border-white/[0.02]">
                    <img src="${p.img}" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105">
                </div>
                <div class="space-y-2.5">
                    <h3 class="text-xs font-medium text-gray-300 truncate tracking-wide">${p.name}</h3>
                    <div class="flex justify-between items-center">
                        <span class="text-white font-bold text-base font-mono">$${p.price}.00</span>
                        ${stkTxt}
                    </div>
                    
                    <div class="grid grid-cols-2 gap-2.5 pt-1">
                        <div class="flex flex-col gap-1">
                            <span class="text-[9px] uppercase tracking-widest font-bold text-gray-500 font-mono">Talla:</span>
                            <select id="sz-${p.id}" class="select-premium bg-[#111116] text-white outline-none px-3 py-2 text-[11px] rounded-xl border border-white/5 focus:border-[#e11d48]/50 transition-all font-medium text-center">
                                <option value="" disabled selected>Elegir...</option>
                                <option value="CH">CH</option>
                                <option value="M">M</option>
                                <option value="G">G</option>
                                <option value="XG">XG</option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-1">
                            <span class="text-[9px] uppercase tracking-widest font-bold text-gray-500 font-mono">Color:</span>
                            <select id="col-${p.id}" class="select-premium bg-[#111116] text-white outline-none px-3 py-2 text-[11px] rounded-xl border border-white/5 focus:border-[#e11d48]/50 transition-all font-medium text-center">
                                <option value="" disabled selected>Elegir...</option>
                                <option value="Negro">Negro</option>
                                <option value="Gris">Gris</option>
                                <option value="Rojo">Rojo</option>
                                <option value="Blanco">Blanco</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="pt-1">${btnHtml}</div>
            </div>`;
    }
}

function flt(c) { var cat = 'all'; if (c === 'hombres') { cat = 'men'; } if (c === 'mujeres') { cat = 'women'; } var ids = ['all', 'men', 'women']; for (var i = 0; i < ids.length; i++) { var b = document.getElementById('b-' + ids[i]); if (b) b.className = "px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 bg-[#0d0d12] text-gray-400 border border-white/5"; } var btn = document.getElementById('b-' + cat); if (btn) btn.className = "px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 bg-[#e11d48] text-white shadow-lg shadow-[#e11d48]/20"; if (c === 'todos') { rnd(db); } else { rnd(db.filter(function(p) { return p.cat === c; })); } window.location.href = '#catalogo'; }

function add(id) {
    var p = db.find(function(x) { return x.id === id; }); if (!p || p.stock <= 0) return;
    
    var sz = document.getElementById('sz-' + id).value;
    var col = document.getElementById('col-' + id).value;
    
    if (!sz || !col) {
        alert("⚠️ ATENCIÓN ANTONY BLACK:\n\nPor favor, selecciona la TALLA y el COLOR de la prenda antes de guardarla en tu Bolsa de Compra.");
        return;
    }
    
    var i = cart.find(function(x) { return x.id === id && x.size === sz && x.color === col; });
    if (i) { 
        if(i.q < p.stock) i.q++; else return; 
    } else { 
        cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, size: sz, color: col, q: 1 }); 
    }
    
    p.stock--; upUI(); rnd(db); togA(1);
}

function upUI() { 
    var c = document.getElementById('c-items'); if (!c) return; c.innerHTML = ''; 
    var t = 0; 
    for (var i = 0; i < cart.length; i++) { 
        var item = cart[i]; t += item.price * item.q; 
        c.innerHTML += `
            <div class="flex gap-3 bg-white/[0.02] border border-white/[0.04] p-3 rounded-2xl items-center text-xs">
                <img src="${item.img}" class="w-11 h-11 object-cover rounded-xl border border-white/5">
                <div class="flex-1 min-w-0">
                    <h4 class="truncate font-medium text-[11px] text-gray-200 tracking-wide">${item.name}</h4>
                    <p class="text-gray-500 text-[10px] pt-0.5">Talla: ${item.size} • Color: ${item.color}</p>
                    <p class="text-[#e11d48] font-mono text-[11px] font-bold pt-0.5">$${item.price} x${item.q}</p>
                </div>
                <button onclick="rem(${item.id},'${item.size}','${item.color}',${item.q})" class="text-gray-600 hover:text-[#e11d48] px-2 transition-all">
                    <i class="fas fa-trash text-xs"></i>
                </button>
            </div>`; 
    } 
    document.getElementById('c-total').textContent = '$' + t.toFixed(2); 
    document.getElementById('c-count').textContent = cart.reduce(function(s, k) { return s + k.q; }, 0); 
}

function rem(id, sz, col, q) { 
    var p = db.find(function(x) { return x.id === id; }); if (p) p.stock += q; 
    cart = cart.filter(function(x) { return !(x.id === id && x.size === sz && x.color === col); }); 
    upUI(); rnd(db); 
}

function togA(o) { document.getElementById('cart').classList[o ? 'add' : 'remove']('open'); }
function togM(id, o) { document.getElementById('m-' + id).classList[o ? 'add' : 'remove']('active'); }

function generarFolioReal() {
    var d = new Date();
    return "AB-" + d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0') + "-" + String(d.getHours()).padStart(2, '0') + String(d.getMinutes()).padStart(2, '0') + "-" + Math.floor(10 + Math.random() * 90);
}

function openCheckout() {
    if(cart.length === 0) return;
    var total = 0; var summaryContainer = document.getElementById('pay-items-summary'); summaryContainer.innerHTML = ''; 
    cart.forEach(function(x) { total += x.price * x.q; summaryContainer.innerHTML += '<div class="flex justify-between text-[11px]"><span>' + x.name + ' (' + x.size + ' / ' + x.color + ') x' + x.q + '</span><span class="text-white font-mono">$' + (x.price * x.q).toFixed(2) + '</span></div>'; });
    document.getElementById('pay-total-display').textContent = '$' + total.toFixed(2);
    var folioActual = generarFolioReal();
    var formContainer = document.getElementById('checkout-form');
    formContainer.innerHTML = `
        <div class="space-y-4">
            <div class="bg-white/[0.02] border border-white/5 rounded-2xl p-3 flex justify-between items-center">
                <span class="text-[9px] uppercase tracking-widest text-gray-500 font-bold font-mono">Folio de Orden:</span>
                <span id="p-folio-txt" class="text-xs font-mono font-bold text-[#e11d48] tracking-wider">${folioActual}</span>
            </div>
            <span class="text-[9px] uppercase tracking-widest text-gray-500 font-bold font-mono block">1. Datos de Entrega</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input id="u-name" type="text" placeholder="Tu Nombre Completo" required class="bg-[#111116] text-white text-xs px-4 py-3.5 rounded-xl outline-none border border-white/5 focus:border-[#e11d48]/40 transition-all placeholder-gray-600">
                <input id="u-phone" type="tel" placeholder="WhatsApp (10 dígitos)" required class="bg-[#111116] text-white text-xs px-4 py-3.5 rounded-xl outline-none border border-white/5 focus:border-[#e11d48]/40 transition-all placeholder-gray-600">
            </div>
            <input id="u-email" type="email" placeholder="Correo Electrónico" required class="w-full bg-[#111116] text-white text-xs px-4 py-3.5 rounded-xl outline-none border border-white/5 focus:border-[#e11d48]/40 transition-all placeholder-gray-600">
            <select class="w-full bg-[#111116] select-premium text-white text-xs px-4 py-3.5 rounded-xl outline-none border border-white/5 focus:border-[#e11d48]/40 transition-all" id="u-delivery">
                <option value="Desviación de Jocotitlán">Entrega: Desviación de Jocotitlán</option>
                <option value="Jocotitlán Centro">Entrega: Jocotitlán Centro (Presidencia)</option>
                <option value="San Pedro de los Baños">Entrega: San Pedro de los Baños</option>
            </select>
        </div>
        <div class="space-y-3 pt-3 border-t border-white/5">
            <span class="text-[9px] uppercase tracking-widest text-[#e11d48] font-bold font-mono block">2. Datos de Transferencia Directa</span>
            <div class="bg-black/40 border border-white/5 rounded-2xl p-4 font-mono text-[11px] space-y-2.5">
                <div class="flex justify-between items-center"><span class="text-gray-500 font-sans">Beneficiario:</span><span class="text-white font-sans font-bold text-right">José Antonio Mejia Hernández</span></div>
                <div class="flex justify-between items-center border-t border-white/5 pt-2"><span class="text-gray-500">Cuenta CLABE:</span><span class="text-[#e11d48] font-bold tracking-wider select-all">722969010522000447</span></div>
                <div class="flex justify-between items-center border-t border-white/5 pt-2"><span class="text-gray-500">Plataforma DiMo:</span><span class="text-emerald-400 font-bold tracking-wider select-all">7122111135</span></div>
            </div>
        </div>
        <div class="pt-3 border-t border-white/5">
            <button type="submit" class="w-full bg-white text-black hover:bg-[#e11d48] hover:text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-2"><i class="fa-solid fa-share-nodes"></i> Compartir Datos y Enviar Pedido</button>
        </div>
    `;
    togA(0); togM('pay', 1); 
}

function procesarOrden(e) {
    e.preventDefault();
    var c_name = document.getElementById('u-name').value;
    var c_phone = document.getElementById('u-phone').value;
    var c_email = document.getElementById('u-email').value;
    var c_spot = document.getElementById('u-delivery').value;
    var c_folio = document.getElementById('p-folio-txt').textContent;
    var resumenRopa = ""; var totalCompra = 0;
    cart.forEach(function(item) { resumenRopa += "• " + item.name + " (Talla: " + item.size + " / Color: " + item.color + ") x" + item.q + " - $" + (item.price * item.q) + "\n"; totalCompra += item.price * item.q; });
    var ticketMensaje = "🕷 *NUEVO PEDIDO REGISTRADO - ANTONY BLACK*\n\n🎫 *FOLIO DE COMPRA:* " + c_folio + "\n\n*DATOS DEL CLIENTE:*\n• Nombre: " + c_name + "\n• WhatsApp: " + c_phone + "\n• Correo: " + c_email + "\n• Punto de Entrega: " + c_spot + "\n\n*PRENDAS SOLICITADAS:*\n" + resumenRopa + "\n*TOTAL NETO A PAGAR:* $" + totalCompra.toFixed(2) + "\n\n⚠️ *FAVOR DE ADJUNTAR SU RECIBO DE PAGO PARA CONFIRMAR LA COMPRA.*\n\n📌 *DATOS DE PAGO DEL PROPIETARIO:*\n• CLABE: 722969010522000447\n• Beneficiario: José Antonio Mejia Hernández\n• DiMo: 7122111135\n";
    var templateParams = { to_email: "atencionalclienteantonyblack@gmail.com", from_name: c_name + " (Folio: " + c_folio + ")", message: ticketMensaje };
    emailjs.send('service_ioiqtrs', 'my_first_template', templateParams).then(function() { concluirPedido(ticketMensaje, c_folio); }, function(error) { console.log("Error:", error); concluirPedido(ticketMensaje, c_folio); });
}

function concluirPedido(msg, folio) {
    navigator.clipboard.writeText("722969010522000447").then(function() {
        alert("🔒 ¡DATOS COPIADOS!\n\nFolio: " + folio + "\n\nLa CLABE se copió automáticamente. Envía el mensaje por WhatsApp junto con tu recibo de pago.");
        window.open("https://wa.me/527122111135?text=" + encodeURIComponent("🕷️ *ORDEN CONFIRMADA " + folio + "* \n\n" + msg), '_blank');
        cart = []; upUI(); togM('pay', 0);
    }).catch(function() {
        window.open("https://wa.me/527122111135?text=" + encodeURIComponent("🕷️ *ORDEN CONFIRMADA " + folio + "* \n\n" + msg), '_blank');
        cart = []; upUI(); togM('pay', 0);
    });
}

var initChat = false;
function renderChips() { return `<div id="quick-chips" class="flex flex-wrap gap-2 pt-2 animate-pulse"><button onclick="triggerQuickBot('precios')" class="bg-[#1c1c24] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl border border-white/5 hover:bg-[#e11d48] transition-all">💰 Precios</button><button onclick="triggerQuickBot('tallas')" class="bg-[#1c1c24] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl border border-white/5 hover:bg-[#e11d48] transition-all">📏 Tallas</button><button onclick="triggerQuickBot('materiales')" class="bg-[#1c1c24] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl border border-white/5 hover:bg-[#e11d48] transition-all">🕷️ Tela</button><button onclick="triggerQuickBot('envios')" class="bg-[#1c1c24] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl border border-white/5 hover:bg-[#e11d48] transition-all">📍 Entregas</button></div>`; }
function openSuggestedChips() { if (initChat) return; var m = document.getElementById('c-msg'); m.innerHTML += `<div class="flex justify-start mb-2"><div class="bg-[#1c1c21] text-gray-200 p-3.5 rounded-2xl rounded-tl-none max-w-[85%] border border-white/5 text-xs">👋¡Hola! Soporte oficial de <strong>ANTONY BLACK</strong>. ¿En qué podemos asesorarte hoy? 👇${renderChips()}</div></div>`; m.scrollTop = m.scrollHeight; initChat = true; }
function togCh() { var box = document.getElementById('c-box'); if(box) { box.classList.toggle('open'); if(box.classList.contains('open')) { setTimeout(openSuggestedChips, 300); } } }
document.getElementById('t-cht').onclick = togCh;
function triggerQuickBot(key) { answerBot(key, key.toUpperCase()); }
function bot(e) { if(e) e.preventDefault(); var i = document.getElementById('c-in'); var t = i.value.trim(); if (!t) return false; answerBot(t.toLowerCase(), t); i.value = ''; return false; }

function answerBot(cleanText, rawText) {
    var m = document.getElementById('c-msg'); m.innerHTML += `<div class="flex justify-end mb-3"><div class="bg-[#e11d48] text-white p-2.5 rounded-xl rounded-tr-none max-w-[85%] font-bold text-xs">${rawText}</div></div>`; m.scrollTop = m.scrollHeight;
    var oldChips = document.getElementById('quick-chips'); if(oldChips) oldChips.remove();
    var typingId = "typing-" + Date.now(); m.innerHTML += `<div id="${typingId}" class="flex justify-start mb-3"><div class="bg-[#1c1c21] text-gray-500 px-4 py-2.5 rounded-xl text-xs">●●● <span>Escribiendo...</span></div></div>`; m.scrollTop = m.scrollHeight;
    setTimeout(function() {
        var typingElement = document.getElementById(typingId); if(typingElement) typingElement.remove();
        var r = "Excelente consulta. En ANTONY BLACK desarrollamos piezas con diseño disruptivo streetwear.";
        var btnAction = `<button onclick="window.location.href='#catalogo'; togCh();" class="mt-2 w-full bg-[#121214] hover:bg-[#e11d48] text-white text-[10px] font-bold py-2 rounded-xl border border-white/5 uppercase">⚡ Ver Colección</button>`;
        if (cleanText.indexOf('precio') !== -1 || cleanText.indexOf('cuanto') !== -1 || cleanText.indexOf('costo') !== -1) { r = "💵 <strong>Precios Oficiales:</strong><br><br>• Sudaderas: $899<br>• Cargo Pants: $1,150<br>• Crop Hoodies: $750<br>• Wide Leg Jeans: $990"; btnAction = `<button onclick="window.location.href='#catalogo'; togCh();" class="mt-2 w-full bg-[#e11d48] text-white text-[10px] font-bold py-2 rounded-xl">🛍️ Ver Modelos</button>`; }
        else if (cleanText.indexOf('talla') !== -1 || cleanText.indexOf('medida') !== -1) { r = "📏 <strong>Tallas:</strong><br><br>Corte Oversize Amplio. Pide tu talla de siempre para look holgado urbano. Stock en CH, M, G y XG."; }
        else if (cleanText.indexOf('material') !== -1 || cleanText.indexOf('tela') !== -1) { r = "🕷️ <strong>Tela:</strong><br><br>Heavy Cotton (Algodón Premium Pesado). Mantiene su estructura rígida e imponente."; }
        else if (cleanText.indexOf('envio') !== -1 || cleanText.indexOf('entrega') !== -1) { r = "📍 <strong>Entregas en Jocotitlán:</strong><br><br>Gratis en Centro (Presidencia), Desviación de Jocotitlán, y San Pedro de los Baños."; btnAction = `<button onclick="window.open('https://wa.me/527122111135','_blank')" class="mt-2 w-full bg-[#25D366] text-white text-[10px] font-bold py-2 rounded-xl">💬 WhatsApp Vivo</button>`; }
        m.innerHTML += `<div class="flex justify-start mb-3"><div class="bg-[#1c1c21] text-gray-200 p-3.5 rounded-2xl rounded-tl-none max-w-[85%] border border-white/5 text-xs">${r}<br><br>${btnAction}<div class="mt-3 pt-2 border-t border-white/
