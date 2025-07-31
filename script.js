document.addEventListener('DOMContentLoaded', function() {

    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.display = 'none';
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if (this.getAttribute('href') !== '#') {
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    async function loadPortfolioData() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();

            // Memuat data Profil
            const profil = data.profil;
            document.title = `Portofolio - ${profil.nama}`;
            document.getElementById('foto-profil').src = profil.fotoProfil;
            document.getElementById('nama-profil').textContent = profil.nama;
            document.getElementById('jabatan-profil').textContent = profil.jabatan;
            document.getElementById('deskripsi-profil').textContent = profil.deskripsi;
            document.querySelector('.nav-button').href = profil.linkGithub;
            document.getElementById('footer-text').innerHTML = `&copy; ${new Date().getFullYear()} - Dibuat oleh ${profil.nama}`;
            
            const socialLinksContainer = document.getElementById('social-links-container');
            socialLinksContainer.innerHTML = `
                <a href="${profil.linkGithub}" target="_blank" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
                <a href="${profil.linkLinkedin}" target="_blank" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
                <a href="${profil.linkInstagram}" target="_blank" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            `;

            // Memuat data Sertifikat
            const sertifikatGrid = document.getElementById('sertifikat-grid');
            sertifikatGrid.innerHTML = data.sertifikat.map(item => `
                <a href="${item.gambar}" target="_blank" class="card-sertifikat-link" data-aos="fade-up">
                    <div class="card-sertifikat-image">
                        <img src="${item.gambar}" alt="Sertifikat ${item.nama}">
                    </div>
                    <div class="card-sertifikat-content">
                        <h3>${item.nama}</h3>
                        <p>Diterbitkan oleh ${item.penerbit}</p>
                    </div>
                </a>
            `).join('');

            // Memuat data Proyek Pribadi
            const proyekPribadiGrid = document.getElementById('proyek-pribadi-grid');
            proyekPribadiGrid.innerHTML = data.proyekPribadi.map(item => `
                <div class="card" data-aos="fade-up">
                    <h3>${item.nama}</h3>
                    <p>${item.deskripsi}</p>
                    <a href="${item.link}" target="_blank" class="card-link">Lihat Proyek &rarr;</a>
                </div>
            `).join('');
            
            // Memuat data Proyek Pesanan
            const proyekPesananGrid = document.getElementById('proyek-pesanan-grid');
            proyekPesananGrid.innerHTML = data.proyekPesanan.map(item => `
                <div class="card" data-aos="fade-up">
                    <h3>${item.nama}</h3>
                    <p>${item.deskripsi}</p>
                    <a href="${item.link}" target="_blank" class="card-link">Kunjungi Website &rarr;</a>
                </div>
            `).join('');

        } catch (error) {
            console.error("Gagal memuat data portofolio:", error);
        }
    }

    loadPortfolioData();
});