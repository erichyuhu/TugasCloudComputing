import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signOut } from "./firebase_config.js";

const authForm = document.getElementById('authForm'); 
const emailInput = document.getElementById('email'); 
const passwordInput = document.getElementById('password'); 
const btnAuth = document.getElementById('btnAuth'); 
const toggleMode = document.getElementById('toggleMode'); 
const formTitle = document.getElementById('formTitle'); 
const pesanError = document.getElementById('pesanError'); 

// 1. CEK SESI: Hanya izinkan masuk jika email sudah diverifikasi
onAuthStateChanged(auth, (user) => {
    if (user && user.emailVerified) {
        window.location.href = "dashboard.html"; 
    }
});

let isLogin = true; 

toggleMode.addEventListener('click', (e) => {
    e.preventDefault();
    isLogin = !isLogin; 
    
    if(pesanError) {
        pesanError.style.display = 'none';
        pesanError.className = "alert alert-danger text-center"; // Kembalikan ke warna merah
    }
    
    formTitle.innerText = isLogin ? "Login Admin" : "Register Admin";
    btnAuth.innerText = isLogin ? "Masuk" : "Daftar";
    toggleMode.innerText = isLogin ? "Belum punya akun? Register di sini" : "Sudah punya akun? Login di sini";
});

authForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    if(pesanError) {
        pesanError.style.display = 'none';
        pesanError.className = "alert alert-danger text-center"; 
    }

    const email = emailInput.value;
    const password = passwordInput.value;

    if (isLogin) {
        // ================= LOGIKA LOGIN =================
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                // Cek apakah email sudah diverifikasi sebelum pindah halaman
                if (user.emailVerified) {
                    window.location.href = "dashboard.html";
                } else {
                    signOut(auth); // Tendang keluar jika belum verifikasi
                    pesanError.innerText = "Email belum diverifikasi! Silakan cek kotak masuk/spam Anda.";
                    pesanError.style.display = 'block';
                    authForm.reset();
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                
                // Error handling spesifik
                if (errorCode === 'auth/user-not-found' || errorCode === 'auth/invalid-email') {
                    pesanError.innerText = "Gagal Login: Akun tidak ditemukan!";
                } else if (errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-credential') {
                    pesanError.innerText = "Gagal Login: Email atau Password salah!";
                } else {
                    pesanError.innerText = "Gagal Login: " + error.message;
                }
                
                pesanError.style.display = 'block';
                authForm.reset();
            });
    } else {
        // ================= LOGIKA REGISTER =================
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                // Kirim email verifikasi
                sendEmailVerification(user)
                    .then(() => {
                        signOut(auth);
                        
                        // Ubah tampilan notifikasi menjadi hijau (sukses)
                        pesanError.className = "alert alert-success text-center";
                        pesanError.innerText = "Registrasi Berhasil! Link verifikasi telah dikirim ke email Anda.";
                        pesanError.style.display = 'block';
                        
                        // Kembalikan form ke mode Login
                        isLogin = true;
                        formTitle.innerText = "Login Admin";
                        btnAuth.innerText = "Masuk";
                        toggleMode.innerText = "Belum punya akun? Register di sini";
                        authForm.reset();
                    });
            })
            .catch((error) => {
                pesanError.innerText = "Gagal Register: " + error.message;
                pesanError.style.display = 'block';
                authForm.reset();
            });
    }
});