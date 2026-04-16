# SWAPI Wiki - Evren Genişletme ve İleri Etkileşim Planı

Bu plan, Star Wars Wiki projesine yepyeni modüller (Türler ve Araçlar) eklenmesini, sayfa içi ilişkisel verilerin güçlendirilmesini ve siteyi daha interaktif yapacak yaratıcı fikirlerin sisteme dahil edilmesini açıklamaktadır.

## User Review Required

> [!IMPORTANT]
> Bu plan doğrultusunda projeye **2 tam yeni modül**, API rotaları ve 10'dan fazla dosyada büyük güncellemeler gerçekleşecektir. Sistemin mevcut tasarım dilinin bozulmaması için Framer Motion ve Tailwind standartları tüm yeni eklentilere kopyalanacaktır. Onaylıyor musunuz?
>
> Ayrıca planın en altındaki **"Ekstra İnteraktif Fikirler"** bölümünü inceleyebilir misiniz? Bu fikirlerden istediklerinizi uygulamanın bir sonraki etabında hayata geçireceğim.

## Proposed Changes

---

### 1. API Servis Katmanı
API servisine SWAPI'deki kalan ana omurga istek fonksiyonlarını ekleyeceğiz.

#### [MODIFY] [api.js](file:///c:/Users/emree/Desktop/Projeler/WEB%20PROG/Midterm/star-wars-wiki/src/services/api.js)
- `getVehicles(page, search)` ve `getVehicleById(id)` fonksiyonları eklenecek.
- `getSpecies(page, search)` ve `getSpeciesById(id)` fonksiyonları eklenecek.

---

### 2. Yeni Sayfaların (Modüllerin) Oluşturulması
UI dilini (Framer motion, arama çubukları, grid yapıları) koruyarak Araçlar ve Türler modüllerini oluşturacağız.

#### [NEW] [Vehicles.jsx](file:///c:/Users/emree/Desktop/Projeler/WEB%20PROG/Midterm/star-wars-wiki/src/pages/Vehicles.jsx)
- Arabalar, Yürüyen tanklar ve repulsorcraft araçlar için listeleme ve arama ekranı.

#### [NEW] [VehicleDetail.jsx](file:///c:/Users/emree/Desktop/Projeler/WEB%20PROG/Midterm/star-wars-wiki/src/pages/VehicleDetail.jsx)
- Kargo kapasitesi, hız ve araç sınıflarının gösterileceği detay ekranı.

#### [NEW] [Species.jsx](file:///c:/Users/emree/Desktop/Projeler/WEB%20PROG/Midterm/star-wars-wiki/src/pages/Species.jsx)
- Wookiee, Yoda's species, Droid gibi türlerin listelendiği sayfa.

#### [NEW] [SpeciesDetail.jsx](file:///c:/Users/emree/Desktop/Projeler/WEB%20PROG/Midterm/star-wars-wiki/src/pages/SpeciesDetail.jsx)
- Diller, ortalama boy, sınıfı, ve bu türe özgü özellikleri barındıran ekran.

---

### 3. Uygulama Rotası ve Ana Sayfa Güncellemeleri
Yeni sayfaları navigasyona entegre edeceğiz.

#### [MODIFY] [App.jsx](file:///c:/Users/emree/Desktop/Projeler/WEB%20PROG/Midterm/star-wars-wiki/src/App.jsx)
- `/vehicles`, `/vehicles/:id`, `/species`, `/species/:id` rotalarının React Router'a tanımlanması.

#### [MODIFY] [Navbar.jsx](file:///c:/Users/emree/Desktop/Projeler/WEB%20PROG/Midterm/star-wars-wiki/src/components/Navbar.jsx)
- "Species" (DNA vb. bir ikon ile) ve "Vehicles" (Araba/Kamyon ikonu ile) linklerinin üst menüye yerleştirilmesi.

#### [MODIFY] [Home.jsx](file:///c:/Users/emree/Desktop/Projeler/WEB%20PROG/Midterm/star-wars-wiki/src/pages/Home.jsx)
- Hızlı giriş buton kartlarının bulunduğu bölüme Species ve Vehicles için 2 kart daha eklenmesi (Grid yapısı ayarlanacaktır).

#### [MODIFY] [Favorites.jsx](file:///c:/Users/emree/Desktop/Projeler/WEB%20PROG/Midterm/star-wars-wiki/src/pages/Favorites.jsx)
- Kategori sekmelerine (Tabs) Species ve Vehicles filtrelerinin eklenmesi.

---

### 4. Ekstra "İlişkisel Veri" (Cross-linking) Entegrasyonu
Detay sayfalarının kendi aralarındaki navigasyon köprülerini derinleştiriyoruz.

#### [MODIFY] [CharacterDetail.jsx](file:///c:/Users/emree/Desktop/Projeler/WEB%20PROG/Midterm/star-wars-wiki/src/pages/CharacterDetail.jsx)
- Karakterin **Türünü (Species)**, uçurduğu **Araçları (Vehicles) / Uzay Gemilerini (Starships)** ve oynadığı **Filmleri (Films)** çeken ve butonlar halinde listeleyen yatay kaydırma / grid modüllerinin eklenmesi.

#### [MODIFY] [PlanetDetail.jsx](file:///c:/Users/emree/Desktop/Projeler/WEB%20PROG/Midterm/star-wars-wiki/src/pages/PlanetDetail.jsx)
- Gezegenin ev sahipliği yaptığı veya geçtiği efsanevi **Filmlerin (Films)** listeye eklenmesi.

---

## Ekstra İnteraktif Fikirler (Tavsiyeler)

Daha "canlı" ve interaktif bir web sitesi elde etmek için şu özellikleri önerebilirim. Planı uygularken bunlardan beğendiklerini son aşamada projeye dahil edebilirim:
1. **Dinamik Arka Plan Starfield (Yıldız Tarlası) Efekti:** Düz arka plan rengi yerine, kullanıcının faresi ile hareket eden veya usulca kayan minik bir yavaş yıldız kayması efekti eklenebilir. Bu sayfanın derinliğini muazzam artıracaktır.
2. **Hover ve Ses Efektleri (Optional Audio):** Card veya Butonların üstüne gelindiğinde usulca ve sadece istenirse çalışan Lightsaber veya uzay gemisi düğmesi mikro sesleri.
3. **Random Explorer Butonu (Rastgele Keşfet):** Sayfanın sağ altına yerleşen hareketli bir zar/küp tarzı ikon. Kullanıcı ne zaman basarsa Onu SWAPI içinde rastgele bir gezegene, gemiye veya karaktere ışınlar (Tüm veriyi sürpriz şekillerde keşfetmek için).

## Verification Plan
1. `npm run dev` ile site çalıştırılacak ve tüm sayfaların API'den verileri doğru bir şekilde harmanladığı doğrulanacak.
2. Character sayfasında tıklanan bir ek ilişkisel linkin (Örn: Türüne tıklanınca) doğru detay sayfasına yönlendirdiği check edilecek.
3. Navbar, Home page, ve Favorites sekmelerinde overflow/taşma tasarımları mobilde de sorunsuz test edilecek.
