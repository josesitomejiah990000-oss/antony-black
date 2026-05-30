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
    var h_item = raw_h[(i - 1) % raw_h.length];
    var stkH = (i % 7 === 0) ? 0 : Math.floor(Math.random() * 8) + 2;
    db.push({ id: baseId++, name: h_item.name + " #" + (100 + i), price: h_item.price, cat: "hombres", img: h_item.img, stock: stkH });
}
for (var j = 1; j <= 50; j++) {
    var m_item = raw_m[(j - 1) % raw_m.length];
    var stkM = (j % 9 === 0) ? 0 : Math.floor(Math.random() * 8) + 2;
    db.push({ id: baseId++, name: m_item.name + " #" + (200 + j), price: m_item.price, cat: "mujeres", img: m_item.img, stock: stkM });
}
function rnd(arr) {
    var g = document.getElementById('grid'); if (!g) return; g.innerHTML = '';
    for (var i = 0; i < arr.length; i++) {
        var p = arr[i];
        var isOut = p.stock <= 0;
        var stkTxt = isOut ? '<span class="text-red-500 font-bold block text-[11px] mt-1">AGOTADO</span>' : '<span class="text-gray-400 block text-[11px] mt-1">Stock: ' + p.stock + ' pzs</span>';
        var btnHtml = isOut ? '<button class="w-full bg-gray-800 text-gray-500 font-brand text-[11px] uppercase py-2 cursor-not-allowed" disabled>Agotado</button>' : '<button onclick="add(' + p.id + ')" class="w-full bg-[#0d0d12] border border-white/5 hover:bg-[#ff1a1a] text-white font-brand text-[11px] uppercase py-2 transition-all">Agregar</button>';
        g.innerHTML += '<div class="card p-4 space-y-3 flex flex-col justify-between"><div class="aspect-square bg-black overflow-hidden"><img src="' + p.img + '" class="w-full h-full object-cover"></div><div class="space-y-1"><h3 class="text-xs font-bold text-gray-200 truncate">' + p.name + '</h3><div class="flex justify-between items-center"><span class="text-[#ff1a1a] font-brand font-bold text-base">$' + p.price + '</span>' + stkTxt + '</div><div class="flex items-center gap-1 text-[11px] pt-1"><span class="text-gray-500">Talla:</span><select id="sz-' + p.id + '" class="bg-[#1c1c24] text-white outline-none px-1 rounded border border-white/5"><option value="CH">CH</option><option value="M" selected>M</option><option value="G">G</option><option value="XG">XG</option></select></div></div>' + btnHtml + '</div>';
    }
}
function flt(c) { var cat = 'all'; if (c === 'hombres') { cat = 'men'; } if (c === 'mujeres') { cat = 'women'; } var ids = ['all', 'men', 'women']; for (var i = 0; i < ids.length; i++) { var b = document.getElementById('b-' + ids[i]); if (b) b.className = "px-4 py-1.5 rounded-full text-gray-400"; } var btn = document.getElementById('b-' + cat); if (btn) btn.className = "px-4 py-1.5 rounded-full bg-[#ff1a1a] text-white"; if (c === 'todos') { rnd(db); } else { rnd(db.filter(function(p) { return p.cat === c; })); } window.location.href = '#catalogo'; }
function add(id) {
    var p = db.find(function(x) { return x.id === id; }); if (!p || p.stock <= 0) return;
    var sz = document.getElementById('sz-' + id).value;
    var i = cart.find(function(x) { return x.id === id && x.size === sz; });
    if (i) { if(i.q < p.stock) i.q++; else return; } else { cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, size: sz, q: 1 }); }
    p.stock--; upUI(); rnd(db); togA(1);
}
function upUI() { var c = document.getElementById('c-items'); if (!c) return; c.innerHTML = ''; var t = 0; for (var i = 0; i < cart.length; i++) { var item = cart[i]; t += item.price * item.q; c.innerHTML += '<div class="flex gap-3 bg-white/5 p-2 rounded items-center text-xs"><img src="' + item.img + '" class="w-10 h-10 object-cover rounded"><div class="flex-1 min-w-0"><h4 class="truncate font-bold text-[11px] text-gray-200">' + item.name + ' (' + item.size + ')</h4><p class="text-[#ff1a1a] font-brand text-[11px]">' + item.price + ' x' + item.q + '</p></div><button onclick="rem(' + item.id + ',\'' + item.size + '\',' + item.q + ')" class="text-gray-500 hover:text-[#ff1a1a] px-2"><i class="fas fa-trash"></i></button></div>'; } document.getElementById('c-total').textContent = '$' + t.toFixed(2); document.getElementById('c-count').textContent = cart.reduce(function(s, k) { return s + k.q; }, 0); }
function rem(id, sz, q) { var p = db.find(function(x) { return x.id === id; }); if (p) p.stock += q; cart = cart.filter(function(x) { return !(x.id === id && x.size === sz); }); upUI(); rnd(db); }
function togA(o) { document.getElementById('cart').classList[o ? 'add' : 'remove']('open'); }
function togM(id, o) { if (id === 'pay' && cart.length === 0) return; if (id === 'pay' && o) togA(0); document.getElementById('m-' + id).classList[o ? 'add' : 'remove']('active'); }
function togCh() { document.getElementById('c-box').classList.toggle('open'); }
function wsp(isC) { var m = isC ? "🕷️ Comprobante Antony Black:\n" : "🕷️ Pedido Antony Black:\n"; cart.forEach(function(i) { m += "• " + i.q + "x " + i.name + " [Talla: " + i.size + "]\n"; }); window.open("https://wa.me/527122111135?text=" + encodeURIComponent(m), '_blank'); }
function selC(t, v) { ai_t[t] = v; var chips = document.querySelectorAll('[id^="ch-' + t + '-"]'); for (var i = 0; i < chips.length; i++) { chips[i].classList.remove('active'); } var target = document.getElementById('ch-' + t + '-' + v); if (target) target.classList.add('active'); snap(); }
function ldImg(e) { var f = e.target.files[0]; if (f) { var r = new FileReader(); r.onload = function(el) { userImg = el.target.result; snap(); }; r.readAsDataURL(f); } }
function snap() { var p = document.getElementById('v-photo'); if (userImg) { p.src = userImg; } else { p.src = (ai_t.S === 'Hombre') ? 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=400' : 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=400'; } p.classList.remove('hidden'); document.getElementById('ai-res').innerHTML = 'Colorimetría: Armonía para tez ' + ai_t.P + ' y ojos ' + ai_t.O + '. Para tu perfil de tipo <strong>' + ai_t.S + '</strong>, te recomendamos rotundamente combinar una <strong>Camisa Blanca formal con un Pantalón de Mezclilla azul denim</strong> como la imagen mostrada. Este contraste puro de luz equilibra tus facciones faciales dándote un porte imponente antes de complementar tu outfit con las capas oversize oscuras de nuestra marca.'; document.getElementById('anl').classList.remove('hidden'); }
function bot(e) { e.preventDefault(); var i = document.getElementById('c-in'); var m = document.getElementById('c-msg'); var t = i.value.trim().toLowerCase(); if (!t) return; m.innerHTML += '<div class="text-right text-[#ff1a1a] font-brand font-bold">' + i.value + '</div>'; i.value = ''; setTimeout(function() { var r = "Contacto directo: WhatsApp 7122111135. 🕷️"; if (t.indexOf('precio') !== -1 || t.indexOf('cuanto') !== -1) { r = "Sudadera: $899, Pants: $1150, Crop: $750. Puedes ver el total didáctico sumado en tu bolsa."; } else if (t.indexOf('talla') !== -1 || t.indexOf('medida') !== -1) { r = "Corte <strong>Oversize Premium</strong>. Didáctica: Si buscas el estilo holgado de la marca, pide tu talla de siempre. Si la quieres justa, pide una menos."; } else if (t.indexOf('material') !== -1 || t.indexOf('tela') !== -1) { r = "Algodón pesado premium (Heavy Cotton) de alto gramaje. No se deforma y mantiene la caída urbana perfecta."; } else if (t.indexOf('envio') !== -1 || t.indexOf('entrega') !== -1) { r = "Entregamos gratis en Desviación Jocotitlán, San Pedro de los Baños y Jocotitlán Centro (Frente a Palacio)."; } else if (t.indexOf('pago') !== -1 || t.indexOf('cuenta') !== -1) { r = "CLABE SPEI: 722969010522000447 (Mercado Pago Wallet) o directo con tarjeta usando el botón azul de tu bolsa."; } m.innerHTML += '<div class="bg-[#121216] p-2.5 rounded-lg mt-1 border border-white/5">' + r + '</div>'; m.scrollTop = m.scrollHeight; }, 400); }
rnd(db); snap();
