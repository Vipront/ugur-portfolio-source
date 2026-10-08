# Yayın doğrulaması

[English](VALIDATION.md) | [Türkçe](VALIDATION.tr.md)

9 Ekim 2026'da (Europe/Istanbul) doğrulandı:

- `npm ci`: temiz kaynak kopyasında `package-lock.json` kullanılarak geçti.
- `npm run build`: geçti; altı statik sayfa üretildi.
- Kaynak ve derlenmiş çıktı kontrolleri; kanonik/dil metaverileri, bağlantılar/varlıklar, betik CSP özetleri, özel dosyaların dışarıda tutulması ve Türkçe/İngilizce CV eşleşmesi için geçti.
- Yerel Türkçe ana sayfa tarayıcıda açıldı; güncel görüntüsü `portfolio-preview.png` dosyasında.
- Gitleaks v8.30.1: güncel kaynakta ve özgün Git geçmişinde bulgu yok.

Özgün geçmişte buna rağmen iki tez Word belgesi bulunuyor. Bu kopya yeni geçmişle başlar ve o dosyaları içermez. Gitleaks gizli bilgi kalıplarını tarar; kişisel belge sınıflandırıcısı değildir.

Bu yayın belgeleri düzenler; önizleme görselleri ve kullanım hakkı bildirimi ekler. Uygulama kaynağı doğrulanmış `1f8e632fff49c58faa6dbbacacfd9ca6fb5e138e` commit'inden korunmuştur; ilgisiz yerel CSS değişiklikleri alınmamıştır. Önceki dağıtımın tarayıcı etkileşimi, erişilebilirlik ve hız paketleri bu belge değişikliği için yeniden çalıştırılmadı. Yeni telefon, Safari veya gerçek kullanıcı performansı iddiası yoktur.
