// Import dari file konfigurasi yang sudah kita buat
import { auth, signOut, onAuthStateChanged, db, ref, push } from './firebase_config.js';

document.getElementById('formPeminjaman').addEventListener('submit', (e) => {
    e.preventDefault(); // Mencegah halaman refresh
    
    // Ambil nilai dari input form
    const dataBaru = {
        nama: document.getElementById('nama').value,
        barang: document.getElementById('barang').value,
        tanggal: document.getElementById('tanggal').value,
        jumlah: document.getElementById('jumlah').value,
        status: document.getElementById('status').value
    };

    // Proses simpan data (Create)
    const dbRef = ref(db, 'peminjaman');
    push(dbRef, dataBaru)
        .then(() => {
            alert('Data berhasil disimpan!');
            document.getElementById('formPeminjaman').reset();
            window.location.href = "history.html";
        })
        .catch((error) => {
            alert('Terjadi kesalahan: ' + error);
        });
});

onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = "index.html"; 
        }
    });

    const btnLogout = document.getElementById('btnLogout');
    
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            // Konfirmasi sebelum logout
            const konfirmasi = confirm("Apakah Anda yakin ingin logout?");
            
            if (konfirmasi) {
                signOut(auth)
                    .then(() => {
                        alert("Anda telah berhasil logout.");
                        window.location.href = "index.html"; // Arahkan kembali ke halaman login
                    })
                    .catch((error) => {
                        alert("Gagal logout: " + error.message);
                    });
            }
        });
    }