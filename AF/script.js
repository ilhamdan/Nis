const NOMOR_WHATSAPP = "6283188681324";
let responsPengguna = null;
let intervalHati;

function init() {
    buatBintang();
    mulaiSpamHati(3);
    document.getElementById('tombolWhatsappYa').addEventListener('click', kirimKeWhatsApp);
    document.getElementById('tombolWhatsappTidak').addEventListener('click', kirimKeWhatsApp);

    document.body.addEventListener('click', handleFirstClick, { once: true });
}

function buatBintang() {
    const jumlahBintang = 100;
    const body = document.body;

    for (let i = 0; i < jumlahBintang; i++) {
        const bintang = document.createElement('div');
        bintang.className = 'bintang';

        const ukuran = Math.random() * 3 + 1;
        bintang.style.width = `${ukuran}px`;
        bintang.style.height = `${ukuran}px`;
        bintang.style.left = `${Math.random() * 100}vw`;
        bintang.style.top = `${Math.random() * 100}vh`;
        bintang.style.animationDelay = `${Math.random() * 2}s`;

        body.appendChild(bintang);
    }
}

function buatHati() {
    const warnaHati = ['#ff0077', '#ff1493', '#ff00aa', '#ff0088', '#ff0066'];
    const emojiHati = ['❤️', '💖', '💗', '💓'];

    const hati = document.createElement('div');
    hati.className = 'hati';


    hati.innerHTML = emojiHati[Math.floor(Math.random() * emojiHati.length)];
    hati.style.left = `${Math.random() * 100}vw`;
    hati.style.color = warnaHati[Math.floor(Math.random() * warnaHati.length)];


    hati.style.fontSize = `${Math.random() * 10 + 25}px`;
    hati.style.opacity = `${Math.random() * 0.3 + 0.6}`;


    const duration = Math.random() * 2 + 8
    hati.style.animationDuration = `${duration}s`;

    document.body.appendChild(hati);

    // Hapus setelah animasi selesai
    setTimeout(() => {
        if (hati.parentNode) hati.parentNode.removeChild(hati);
    }, duration * 1000);
}

function mulaiSpamHati(intensitas = 1) {
    clearInterval(intervalHati);

    // Buat hati pertama kali
    for (let i = 0; i < intensitas * 5; i++) {
        setTimeout(() => buatHati(), i * 200);
    }

    // Atur interval pembuatan hati
    intervalHati = setInterval(() => {
        for (let i = 0; i < intensitas; i++) {
            buatHati();
        }
    }, 800);
}

function langkahBerikutnya(langkahSaatIni) {
    if (langkahSaatIni === 1) {
        const header = document.getElementById("headerContent");
        header.style.opacity = "0";
        setTimeout(() => header.style.display = "none", 500);
    }

    document.getElementById(`langkah${langkahSaatIni}`).classList.add("tersembunyi");
    const langkahSelanjutnya = document.getElementById(`langkah${langkahSaatIni+1}`);
    langkahSelanjutnya.classList.remove("tersembunyi");

    animasiMuncul(langkahSelanjutnya);
    document.getElementById("clickSound").play();

    // Tingkatkan intensitas hati
    mulaiSpamHati(langkahSaatIni + 1);
}

function langkahSebelumnya(langkahSaatIni) {
    document.getElementById(`langkah${langkahSaatIni}`).classList.add("tersembunyi");
    const langkahSebelum = document.getElementById(`langkah${langkahSaatIni-1}`);
    langkahSebelum.classList.remove("tersembunyi");

    if (langkahSaatIni === 2) {
        const header = document.getElementById("headerContent");
        header.style.display = "block";
        setTimeout(() => header.style.opacity = "1", 10);
    }

    clearInterval(intervalHati);
    document.getElementById("clickSound").play();
}

function animasiMuncul(container) {
    const elements = container.querySelectorAll('.pengakuan');
    elements.forEach((elemen, index) => {
        setTimeout(() => {
            elemen.style.opacity = "1";
            elemen.style.transform = "translateY(0)";
        }, index * 500);
    });
}

function pilihRespons(diterima) {
    responsPengguna = diterima;
    const suara = document.getElementById(diterima ? "happySound" : "thoughtfulSound");
    suara.volume = 0.3;
    suara.play();

    if (diterima) {
        mulaiSpamHati(8);
    }

    tampilkanResponsVisual(diterima);
}

function tampilkanResponsVisual(diterima) {
    document.getElementById("langkah5").classList.add("tersembunyi");
    const idRespons = diterima ? "responsPositif" : "responsNetral";
    const containerRespons = document.getElementById(idRespons);

    containerRespons.classList.remove("tersembunyi");
    animasiMuncul(containerRespons);
}

function kirimKeWhatsApp() {
    const pesan = responsPengguna ?
        "Hai ini Annisa. Ya, aku mau, mari kita mulai dengan bismillah" :
        "Hai ini Annisa, Aku butuh waktu untuk memikirkannya, tapi aku menghargai perasaanmu";

    localStorage.setItem('jawabanTerkirim', 'true');

    const tombolWhatsapp = document.getElementById(responsPengguna ? 'tombolWhatsappYa' : 'tombolWhatsappTidak');
    tombolWhatsapp.innerHTML = '<i class="fas fa-check"></i> Jawaban Terkirim';
    tombolWhatsapp.style.backgroundColor = '#4CAF50';
    tombolWhatsapp.disabled = true;

    window.open(`https://wa.me/${NOMOR_WHATSAPP}?text=${encodeURIComponent(pesan)}`, '_blank');
}

function ulangiPesan() {
    location.reload();
}

function handleFirstClick() {
    document.getElementById("bgMusic").play().catch(e => console.log("Autoplay dicegah"));
}

document.addEventListener('DOMContentLoaded', init);