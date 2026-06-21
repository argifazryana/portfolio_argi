// --- 1. DATA PROYEK (Cukup Edit/Tambah di Sini) ---
const daftarProyek = [
    {
        nama: "ZAFAZ APPAREL",
        deskripsi: "Platform e-commerce brand pakaian dengan sistem katalog, keranjang belanja, dan integrasi pemesanan WhatsApp.",
        kategori: "frontend",
        tags: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
        link: "https://zafazapparel-it.github.io/zafaz-apparel/"
    },
    {
        nama: "Automation Tools Dashboard",
        deskripsi: "Dasbor web internal untuk visualisasi monitoring performa aplikasi dasar atau sistem skrip otomatisasi server Linux.",
        kategori: "system",
        tags: ["React", "CSS Variables", "Linux Core"],
        link: "#"
    },
    {
        nama: "Warehouse Inventory App",
        deskripsi: "Sistem pelacakan stok barang logistik real-time yang efisien dan modular.",
        kategori: "system",
        tags: ["Python", "Flet", "SQLite"],
        link: "#"
    }
];

// --- 2. RENDER PROYEK KE GRID HTML ---
const projectsGrid = document.getElementById('projectsGrid');

function tampilkanProyek(filterKategori = 'all') {
    projectsGrid.innerHTML = ""; // Bersihkan grid
    
    daftarProyek.forEach(p => {
        if (filterKategori === 'all' || p.kategori === filterKategori) {
            // Buat element kartu proyek
            const card = document.createElement('div');
            card.className = "project-card";
            card.setAttribute('data-category', p.kategori);
            
            // Generate tag HTML
            const tagsHTML = p.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            
            card.innerHTML = `
                <div class="project-banner">
                    <span>[ ${p.kategori.toUpperCase()} PROJECT ]</span>
                </div>
                <div class="project-info">
                    <h3>${p.nama}</h3>
                    <p>${p.deskripsi}</p>
                    <div class="project-tags">${tagsHTML}</div>
                    <a href="${p.link}" class="project-link">Lihat Repositori <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            `;
            projectsGrid.appendChild(card);
        }
    });
}

// Jalankan fungsi tampilkan pertama kali saat web dibuka
tampilkanProyek();

// --- 3. FILTERING BUTTONS LOGIC ---
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Ganti kelas active tombol
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        
        // Filter proyek
        const kategori = btn.getAttribute('data-filter');
        tampilkanProyek(kategori);
    });
});

// --- 4. ANIMASI TYPEWRITER ---
const kataKata = ["Muhamad Argi F.", "Junior Web Developer", "Backend Developer"];
let indexKata = 0;
let indexKarakter = 0;
const targetTypewriter = document.getElementById('typewriter');

function ketik() {
    if (indexKarakter < kataKata[indexKata].length) {
        targetTypewriter.textContent += kataKata[indexKata].charAt(indexKarakter);
        indexKarakter++;
        setTimeout(ketik, 100);
    } else {
        setTimeout(hapus, 2000);
    }
}

function hapus() {
    if (indexKarakter > 0) {
        targetTypewriter.textContent = kataKata[indexKata].substring(0, indexKarakter - 1);
        indexKarakter--;
        setTimeout(hapus, 50);
    } else {
        indexKata = (indexKata + 1) % kataKata.length;
        setTimeout(ketik, 500);
    }
}
document.addEventListener("DOMContentLoaded", () => setTimeout(ketik, 1000));

// --- 6. LIVE VISITOR COUNTER (Local Storage) ---
let kunjungan = localStorage.getItem('visitor_count') || 0;
kunjungan++;
localStorage.setItem('visitor_count', kunjungan);
document.getElementById('visitorCount').textContent = kunjungan;

// --- 7. BACK TO TOP PROGRESS LOGIC ---
const backToTopBtn = document.getElementById('backToTop');
const progressValue = document.getElementById('progressValue');
const totalLength = 2 * Math.PI * 20; // Keliling lingkaran r=20

progressValue.style.strokeDasharray = totalLength;

window.addEventListener('scroll', () => {
    const posisiScroll = window.scrollY;
    const tinggiKonten = document.documentElement.scrollHeight - window.innerHeight;
    
    if (posisiScroll > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
    
    // Hitung progress lingkaran
    const progress = totalLength - (posisiScroll / tinggiKonten) * totalLength;
    progressValue.style.strokeDashoffset = progress;
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- 8. WHATSAPP CONTACT FORM SENDING ---
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah halaman reload
        
        // Mengambil nilai dari input
        const nama = document.getElementById('formName').value;
        const email = document.getElementById('formEmail').value;
        const pesan = document.getElementById('formMessage').value;
        
        // Memformat pesan
        const textWhatsApp = `Halo Argi, Saya ${nama} (${email}).\n\nPesan:\n${pesan}`;
        
        // Membuat URL
        const urlWhatsApp = `https://wa.me/6283152993607?text=${encodeURIComponent(textWhatsApp)}`;
        
        // Membuka WhatsApp di tab baru
        window.open(urlWhatsApp, '_blank');
    });
}