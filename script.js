let currentTab = 'all';
let quizData = [];
let currentQuestionIndex = 0;
let score = 0;
let currentQuizPool = [];

// --- ABDULLAH KÖKSAL MASTER DATABASE (730 ITEMS) ---
// Not: Aşağıdaki listeye unique.js içindeki tüm verilerini ekleyebilirsin.
const synapseDatabase = [
    { id: 1, text: "Britleness", meaning: "Kırılganlık", category: "technical", type: "word" },
    { id: 2, text: "Density", meaning: "Yoğunluk", category: "technical", type: "word" },
    { id: 3, text: "Hardness", meaning: "Sertlik", category: "technical", type: "word" },
    { id: 4, text: "Infrastructure", meaning: "Altyapı", category: "technical", type: "word" },
    { id: 5, text: "Circular Polarization", meaning: "Dairesel Polarizasyon", category: "technical", type: "word" },
    { id: 6, text: "Impedance Matching", meaning: "Empedans Uyumu", category: "technical", type: "word" },
    { id: 7, text: "The system utilizes RTK for centimeter-level accuracy.", meaning: "Sistem, santimetre seviyesinde doğruluk için RTK kullanır.", category: "technical", type: "sentence" },
    { id: 8, text: "Collaborate", meaning: "İş birliği yapmak", category: "daily", type: "word" },
    { id: 9, text: "Deadline", meaning: "Son teslim tarihi", category: "daily", type: "word" },
    { id: 10, text: "I am highly motivated to work on autonomous systems.", meaning: "Otonom sistemler üzerinde çalışmak için oldukça motivasyonluyum.", category: "daily", type: "sentence" },
    { id: 11, text: "Versatile", meaning: "Çok yönlü (Hem araçlar hem insanlar için kullanılır)", category: "daily", type: "word" },
    { id: 12, text: "Feasible", meaning: "Yapılabilir / Uygulanabilir", category: "daily", type: "word" },
    { id: 13, text: "Ambiguous", meaning: "Belirsiz", category: "daily", type: "word" },
    { id: 14, text: "Prioritize", meaning: "Önceliklendirmek", category: "daily", type: "word" },
    { id: 15, text: "Reliability", meaning: "Güvenilirlik", category: "daily", type: "word" },
    { id: 16, text: "Obstacle", meaning: "Engel / Mani", category: "daily", type: "word" },
    { id: 17, text: "Innovation", meaning: "Yenilikçilik / İnovasyon", category: "daily", type: "word" },
    { id: 18, text: "Enhance", meaning: "Geliştirmek / Kalitesini artırmak", category: "daily", type: "word" },
    { id: 19, text: "Implement", meaning: "Uygulamaya koymak / Yürütmek", category: "daily", type: "word" },
    { id: 20, text: "Precise", meaning: "Kesin", category: "daily", type: "word" },
    { id: 21, text: "Mitigate", meaning: "Hafifletmek / Etkisini azaltmak (Risk veya gürültü için)", category: "daily", type: "word" },
    { id: 22, text: "foresighted", meaning: "Öngörülü", category: "daily", type: "word" },
    { id: 23, text: "Sustainable", meaning: "Sürdürülebilir", category: "daily", type: "word" },
    { id: 24, text: "Context", meaning: "Bağlam", category: "daily", type: "word" },
    { id: 25, text: "Criteria", meaning: "Kriterler / Ölçütler", category: "daily", type: "word" },
    { id: 26, text: "Allocate", meaning: "Tahsis etmek", category: "daily", type: "word" },
    { id: 27, text: "Insight", meaning: "İçgörü", category: "daily", type: "word" },
    { id: 28, text: "Efficient", meaning: "Verimli", category: "daily", type: "word" },
    { id: 29, text: "Integrate", meaning: "Entegre etmek / Birleştirmek", category: "daily", type: "word" },
    { id: 30, text: "Consistency", meaning: "Tutarlılık / İstikrar", category: "daily", type: "word" },
    { id: 31, text: "Regularly", meaning: "Düzenli olarak", category: "daily", type: "word" },
    { id: 32, text: "Usually", meaning: "Genellikle", category: "daily", type: "word" },
    { id: 33, text: "Sometimes", meaning: "Bazen", category: "daily", type: "word" },
    { id: 34, text: "Often", meaning: "Sık sık", category: "daily", type: "word" },
    { id: 35, text: "Rarely", meaning: "Nadiren", category: "daily", type: "word" },
    { id: 36, text: "Morning", meaning: "Sabah", category: "daily", type: "word" },
    { id: 37, text: "Afternoon", meaning: "Öğleden sonra", category: "daily", type: "word" },
    { id: 38, text: "Evening", meaning: "Akşam", category: "daily", type: "word" },
    { id: 39, text: "Night", meaning: "Gece", category: "daily", type: "word" },
    { id: 40, text: "Today", meaning: "Bugün", category: "daily", type: "word" },
    { id: 41, text: "Tomorrow", meaning: "Yarın", category: "daily", type: "word" },
    { id: 42, text: "Yesterday", meaning: "Dün", category: "daily", type: "word" },
    { id: 43, text: "Always", meaning: "Her zaman", category: "daily", type: "word" },
    { id: 44, text: "Never", meaning: "Asla", category: "daily", type: "word" },
    { id: 45, text: "Quickly", meaning: "Hızlıca", category: "daily", type: "word" },
    { id: 46, text: "Slowly", meaning: "Yavaşça", category: "daily", type: "word" },
    { id: 47, text: "Together", meaning: "Birlikte", category: "daily", type: "word" },
    { id: 48, text: "Alone", meaning: "Yalnız", category: "daily", type: "word" },
    { id: 49, text: "Again", meaning: "Tekrar", category: "daily", type: "word" },
    { id: 50, text: "Already", meaning: "Zaten", category: "daily", type: "word" },
    { id: 51, text: "I wake up early every day.", meaning: "Her gün erken kalkarım.", category: "daily", type: "sentence" },
    { id: 52, text: "I drink coffee in the morning.", meaning: "Sabahları kahve içerim.", category: "daily", type: "sentence" },
    { id: 53, text: "I go to school on weekdays.", meaning: "Hafta içi okula giderim.", category: "daily", type: "sentence" },
    { id: 54, text: "I study in the evening.", meaning: "Akşamları ders çalışırım.", category: "daily", type: "sentence" },
    { id: 55, text: "I check my phone frequently.", meaning: "Telefonumu sık sık kontrol ederim.", category: "daily", type: "sentence" },
    { id: 56, text: "I usually have breakfast at home.", meaning: "Genellikle evde kahvaltı yaparım.", category: "daily", type: "sentence" },
    { id: 57, text: "I listen to music while studying.", meaning: "Ders çalışırken müzik dinlerim.", category: "daily", type: "sentence" },
    { id: 58, text: "I walk to the bus stop.", meaning: "Otobüs durağına yürürüm.", category: "daily", type: "sentence" },
    { id: 59, text: "I arrive home in the evening.", meaning: "Akşam eve varırım.", category: "daily", type: "sentence" },
    { id: 60, text: "I eat dinner with my family.", meaning: "Ailemle akşam yemeği yerim.", category: "daily", type: "sentence" },
    { id: 61, text: "I watch videos before sleeping.", meaning: "Uyumadan önce video izlerim.", category: "daily", type: "sentence" },
    { id: 62, text: "I go to bed late sometimes.", meaning: "Bazen geç yatarım.", category: "daily", type: "sentence" },
    { id: 63, text: "I prepare my bag at night.", meaning: "Çantamı gece hazırlarım.", category: "daily", type: "sentence" },
    { id: 64, text: "I check my emails daily.", meaning: "E-postalarımı günlük kontrol ederim.", category: "daily", type: "sentence" },
    { id: 65, text: "I try to be productive.", meaning: "Verimli olmaya çalışırım.", category: "daily", type: "sentence" },
    { id: 66, text: "I take short breaks while studying.", meaning: "Ders çalışırken kısa molalar veririm.", category: "daily", type: "sentence" },
    { id: 67, text: "I plan my day in advance.", meaning: "Günümü önceden planlarım.", category: "daily", type: "sentence" },
    { id: 68, text: "I spend time on my hobbies.", meaning: "Hobilerime zaman ayırırım.", category: "daily", type: "sentence" },
    { id: 69, text: "I try to sleep early.", meaning: "Erken uyumaya çalışırım.", category: "daily", type: "sentence" },
    { id: 70, text: "I review my notes.", meaning: "Notlarımı gözden geçiririm.", category: "daily", type: "sentence" },
    { id: 71, text: "I drink water regularly.", meaning: "Düzenli olarak su içerim.", category: "daily", type: "sentence" },
    { id: 72, text: "I focus better in the morning.", meaning: "Sabahları daha iyi odaklanırım.", category: "daily", type: "sentence" },
    { id: 73, text: "I finish my tasks on time.", meaning: "İşlerimi zamanında bitiririm.", category: "daily", type: "sentence" },
    { id: 74, text: "I relax after a long day.", meaning: "Uzun bir günün ardından rahatlarım.", category: "daily", type: "sentence" },
    { id: 75, text: "I get ready for the next day.", meaning: "Ertesi gün için hazırlanırım.", category: "daily", type: "sentence" },
    { id: 76, text: "Daily", meaning: "Günlük", category: "daily", type: "word" },
    { id: 77, text: "Routine", meaning: "Rutin", category: "daily", type: "word" },
    { id: 78, text: "Habit", meaning: "Alışkanlık", category: "daily", type: "word" },
    { id: 79, text: "Schedule", meaning: "Program", category: "daily", type: "word" },
    { id: 80, text: "Task", meaning: "Görev", category: "daily", type: "word" },
    { id: 81, text: "Break", meaning: "Mola", category: "daily", type: "word" },
    { id: 82, text: "Focus", meaning: "Odaklanmak", category: "daily", type: "word" },
    { id: 83, text: "Energy", meaning: "Enerji", category: "daily", type: "word" },
    { id: 84, text: "Busy", meaning: "Meşgul", category: "daily", type: "word" },
    { id: 85, text: "Free", meaning: "Boş / Özgür", category: "daily", type: "word" },
    { id: 86, text: "Early", meaning: "Erken", category: "daily", type: "word" },
    { id: 87, text: "Late", meaning: "Geç", category: "daily", type: "word" },
    { id: 88, text: "Healthy", meaning: "Sağlıklı", category: "daily", type: "word" },
    { id: 89, text: "Tired", meaning: "Yorgun", category: "daily", type: "word" },
    { id: 90, text: "Active", meaning: "Aktif", category: "daily", type: "word" },
    { id: 91, text: "Relax", meaning: "Rahatlamak", category: "daily", type: "word" },
    { id: 92, text: "Prepare", meaning: "Hazırlanmak", category: "daily", type: "word" },
    { id: 93, text: "Finish", meaning: "Bitirmek", category: "daily", type: "word" },
    { id: 94, text: "Start", meaning: "Başlamak", category: "daily", type: "word" },
    { id: 95, text: "Continue", meaning: "Devam etmek", category: "daily", type: "word" },
    { id: 96, text: "Improve", meaning: "Geliştirmek", category: "daily", type: "word" },
    { id: 97, text: "Repeat", meaning: "Tekrarlamak", category: "daily", type: "word" },
    { id: 98, text: "Rest", meaning: "Dinlenmek", category: "daily", type: "word" },
    { id: 99, text: "Balance", meaning: "Denge", category: "daily", type: "word" },
    { id: 100, text: "Goal", meaning: "Hedef", category: "daily", type: "word" },
    { id: 101, text: "I usually start my day with a plan.", meaning: "Genellikle güne bir planla başlarım.", category: "daily", type: "sentence" },
    { id: 102, text: "I try to manage my time efficiently.", meaning: "Zamanımı verimli yönetmeye çalışırım.", category: "daily", type: "sentence" },
    { id: 103, text: "I feel more focused in a quiet place.", meaning: "Sessiz bir yerde daha iyi odaklanırım.", category: "daily", type: "sentence" },
    { id: 104, text: "I prefer studying in the morning.", meaning: "Sabah ders çalışmayı tercih ederim.", category: "daily", type: "sentence" },
    { id: 105, text: "I take notes to remember important things.", meaning: "Önemli şeyleri hatırlamak için not alırım.", category: "daily", type: "sentence" },
    { id: 106, text: "I try not to waste my time.", meaning: "Zamanımı boşa harcamamaya çalışırım.", category: "daily", type: "sentence" },
    { id: 107, text: "I feel tired when I sleep late.", meaning: "Geç uyuduğumda yorgun hissederim.", category: "daily", type: "sentence" },
    { id: 108, text: "I check my schedule every morning.", meaning: "Her sabah programımı kontrol ederim.", category: "daily", type: "sentence" },
    { id: 109, text: "I usually finish my tasks before dinner.", meaning: "Genellikle işlerimi akşam yemeğinden önce bitiririm.", category: "daily", type: "sentence" },
    { id: 110, text: "I try to stay organized during the day.", meaning: "Gün boyunca düzenli kalmaya çalışırım.", category: "daily", type: "sentence" },
    { id: 111, text: "I feel relaxed after completing my work.", meaning: "İşlerimi bitirdikten sonra rahatlarım.", category: "daily", type: "sentence" },
    { id: 112, text: "I spend too much time on my phone sometimes.", meaning: "Bazen telefonumda çok fazla zaman geçiririm.", category: "daily", type: "sentence" },
    { id: 113, text: "I try to improve myself every day.", meaning: "Her gün kendimi geliştirmeye çalışırım.", category: "daily", type: "sentence" },
    { id: 114, text: "I feel motivated when I reach my goals.", meaning: "Hedeflerime ulaştığımda motive olurum.", category: "daily", type: "sentence" },
    { id: 115, text: "I plan my tasks based on priority.", meaning: "Görevlerimi önceliğe göre planlarım.", category: "daily", type: "sentence" },
    { id: 116, text: "I prefer simple and clear instructions.", meaning: "Basit ve net talimatları tercih ederim.", category: "daily", type: "sentence" },
    { id: 117, text: "I try to stay calm in stressful situations.", meaning: "Stresli durumlarda sakin kalmaya çalışırım.", category: "daily", type: "sentence" },
    { id: 118, text: "I feel productive when I follow a routine.", meaning: "Bir rutine uyduğumda kendimi verimli hissederim.", category: "daily", type: "sentence" },
    { id: 119, text: "I usually review my work at the end of the day.", meaning: "Genellikle gün sonunda yaptıklarımı gözden geçiririm.", category: "daily", type: "sentence" },
    { id: 120, text: "I try to balance work and rest.", meaning: "Çalışma ve dinlenme arasında denge kurmaya çalışırım.", category: "daily", type: "sentence" },
    { id: 121, text: "I feel stressed when I am late.", meaning: "Geç kaldığımda stresli hissederim.", category: "daily", type: "sentence" },
    { id: 122, text: "I prepare everything before leaving home.", meaning: "Evden çıkmadan önce her şeyi hazırlarım.", category: "daily", type: "sentence" },
    { id: 123, text: "I feel better when I complete my plans.", meaning: "Planlarımı tamamladığımda daha iyi hissederim.", category: "daily", type: "sentence" },
    { id: 124, text: "I try to learn something new every day.", meaning: "Her gün yeni bir şey öğrenmeye çalışırım.", category: "daily", type: "sentence" },
    { id: 125, text: "I usually solve problems step by step.", meaning: "Genellikle problemleri adım adım çözerim.", category: "daily", type: "sentence" },
    { id: 126, text: "I feel confident when I am well prepared.", meaning: "İyi hazırlandığımda kendime güvenirim.", category: "daily", type: "sentence" },
    { id: 127, text: "I try to avoid distractions while working.", meaning: "Çalışırken dikkat dağıtıcı şeylerden kaçınırım.", category: "daily", type: "sentence" },
    { id: 128, text: "I usually keep track of my progress.", meaning: "Genellikle ilerlememi takip ederim.", category: "daily", type: "sentence" },
    { id: 129, text: "I feel satisfied when I use my time well.", meaning: "Zamanımı iyi kullandığımda tatmin olurum.", category: "daily", type: "sentence" },
    { id: 130, text: "I organize my tasks to reduce stress.", meaning: "Stresi azaltmak için görevlerimi düzenlerim.", category: "daily", type: "sentence" },
    { id: 131, text: "I try to stay consistent with my habits.", meaning: "Alışkanlıklarımda tutarlı kalmaya çalışırım.", category: "daily", type: "sentence" },
    { id: 132, text: "I usually feel tired after a long day.", meaning: "Uzun bir günün ardından genellikle yorgun hissederim.", category: "daily", type: "sentence" },
    { id: 133, text: "I try to finish important tasks first.", meaning: "Önemli görevleri önce bitirmeye çalışırım.", category: "daily", type: "sentence" },
    { id: 134, text: "I feel more productive with a clear goal.", meaning: "Net bir hedefle daha verimli hissederim.", category: "daily", type: "sentence" },
    { id: 135, text: "I review my plans when something changes.", meaning: "Bir şey değiştiğinde planlarımı gözden geçiririm.", category: "daily", type: "sentence" },
    { id: 136, text: "I try to stay positive during the day.", meaning: "Gün boyunca pozitif kalmaya çalışırım.", category: "daily", type: "sentence" },
    { id: 137, text: "I usually learn better by practicing.", meaning: "Genellikle pratik yaparak daha iyi öğrenirim.", category: "daily", type: "sentence" },
    { id: 138, text: "I feel motivated when I see progress.", meaning: "İlerleme gördüğümde motive olurum.", category: "daily", type: "sentence" },
    { id: 139, text: "I manage my daily tasks carefully.", meaning: "Günlük görevlerimi dikkatli yönetirim.", category: "daily", type: "sentence" },
    { id: 140, text: "I try to use my energy wisely.", meaning: "Enerjimi akıllıca kullanmaya çalışırım.", category: "daily", type: "sentence" },
    { id: 141, text: "I feel more confident as I improve.", meaning: "Geliştikçe daha özgüvenli hissederim.", category: "daily", type: "sentence" },
    { id: 142, text: "I try to keep my life organized.", meaning: "Hayatımı düzenli tutmaya çalışırım.", category: "daily", type: "sentence" },
    { id: 143, text: "I usually prepare a to-do list.", meaning: "Genellikle yapılacaklar listesi hazırlarım.", category: "daily", type: "sentence" },
    { id: 144, text: "I feel better when I follow my plan.", meaning: "Planıma uyduğumda kendimi daha iyi hissederim.", category: "daily", type: "sentence" },
    { id: 145, text: "I try to finish what I start.", meaning: "Başladığım işi bitirmeye çalışırım.", category: "daily", type: "sentence" },
    { id: 146, text: "I usually reflect on my day at night.", meaning: "Genellikle gece günümü değerlendiririm.", category: "daily", type: "sentence" },
    { id: 147, text: "I feel proud when I achieve my goals.", meaning: "Hedeflerime ulaştığımda gurur duyarım.", category: "daily", type: "sentence" },
    { id: 148, text: "I try to improve my routine over time.", meaning: "Zamanla rutinimi geliştirmeye çalışırım.", category: "daily", type: "sentence" },
    { id: 149, text: "I manage my responsibilities carefully.", meaning: "Sorumluluklarımı dikkatle yönetirim.", category: "daily", type: "sentence" },
    { id: 150, text: "I believe consistency brings success.", meaning: "Tutarlılığın başarı getirdiğine inanırım.", category: "daily", type: "sentence" },
    { id: 151, text: "Linear Polarization", meaning: "Doğrusal Polarizasyon", category: "technical", type: "word" },
    { id: 152, text: "Antenna Gain", meaning: "Anten Kazancı", category: "technical", type: "word" },
    { id: 153, text: "Radiation Pattern", meaning: "Işıma Diyagramı", category: "technical", type: "word" },
    { id: 154, text: "Beamwidth", meaning: "Işın Genişliği", category: "technical", type: "word" },
    { id: 155, text: "Side Lobe", meaning: "Yan Lob", category: "technical", type: "word" },
    { id: 156, text: "Main Lobe", meaning: "Ana Lob", category: "technical", type: "word" },
    { id: 157, text: "Return Loss", meaning: "Geri Dönüş Kaybı", category: "technical", type: "word" },
    { id: 158, text: "Insertion Loss", meaning: "Ekleme Kaybı", category: "technical", type: "word" },
    { id: 159, text: "VSWR", meaning: "Gerilim Duran Dalga Oranı", category: "technical", type: "word" },
    { id: 160, text: "Bandwidth", meaning: "Bant Genişliği", category: "technical", type: "word" },
    { id: 161, text: "Center Frequency", meaning: "Merkez Frekans", category: "technical", type: "word" },
    { id: 162, text: "Resonant Frequency", meaning: "Rezonans Frekansı", category: "technical", type: "word" },
    { id: 163, text: "Electromagnetic Wave", meaning: "Elektromanyetik Dalga", category: "technical", type: "word" },
    { id: 164, text: "Free Space", meaning: "Serbest Uzay", category: "technical", type: "word" },
    { id: 165, text: "Far Field", meaning: "Uzak Alan", category: "technical", type: "word" },
    { id: 166, text: "Near Field", meaning: "Yakın Alan", category: "technical", type: "word" },
    { id: 167, text: "Ground Plane", meaning: "Toprak Düzlemi", category: "technical", type: "word" },
    { id: 168, text: "Microstrip Line", meaning: "Mikroşerit Hat", category: "technical", type: "word" },
    { id: 169, text: "Patch Antenna", meaning: "Yama Anten", category: "technical", type: "word" },
    { id: 170, text: "Array Antenna", meaning: "Dizi Anten", category: "technical", type: "word" },
    { id: 171, text: "Phase Shift", meaning: "Faz Kayması", category: "technical", type: "word" },
    { id: 172, text: "Beamforming", meaning: "Işın Oluşturma", category: "technical", type: "word" },
    { id: 173, text: "Signal-to-Noise Ratio", meaning: "Sinyal-Gürültü Oranı", category: "technical", type: "word" },
    { id: 174, text: "Noise Figure", meaning: "Gürültü Katsayısı", category: "technical", type: "word" },
    { id: 175, text: "Low Noise Amplifier", meaning: "Düşük Gürültülü Yükselteç", category: "technical", type: "word" },
    { id: 176, text: "Band Pass Filter", meaning: "Bant Geçiren Filtre", category: "technical", type: "word" },
    { id: 177, text: "Frequency Response", meaning: "Frekans Tepkisi", category: "technical", type: "word" },
    { id: 178, text: "Attenuation", meaning: "Zayıflama", category: "technical", type: "word" },
    { id: 179, text: "Reflection Coefficient", meaning: "Yansıma Katsayısı", category: "technical", type: "word" },
    { id: 180, text: "Propagation", meaning: "Yayılım", category: "technical", type: "word" },
    { id: 181, text: "Path Loss", meaning: "Yol Kaybı", category: "technical", type: "word" },
    { id: 182, text: "Line of Sight", meaning: "Görüş Hattı", category: "technical", type: "word" },
    { id: 183, text: "Multipath", meaning: "Çok Yollu Yayılım", category: "technical", type: "word" },
    { id: 184, text: "Interference", meaning: "Girişim", category: "technical", type: "word" },
    { id: 185, text: "Jamming", meaning: "Karıştırma", category: "technical", type: "word" },
    { id: 186, text: "Spoofing", meaning: "Aldatıcı Sinyal Üretimi", category: "technical", type: "word" },
    { id: 187, text: "Carrier Frequency", meaning: "Taşıyıcı Frekans", category: "technical", type: "word" },
    { id: 188, text: "Modulation", meaning: "Modülasyon", category: "technical", type: "word" },
    { id: 189, text: "Demodulation", meaning: "Demodülasyon", category: "technical", type: "word" },
    { id: 190, text: "Phase Noise", meaning: "Faz Gürültüsü", category: "technical", type: "word" },
    { id: 191, text: "Clock Drift", meaning: "Saat Kayması", category: "technical", type: "word" },
    { id: 192, text: "Synchronization", meaning: "Senkronizasyon", category: "technical", type: "word" },
    { id: 193, text: "Sampling Rate", meaning: "Örnekleme Frekansı", category: "technical", type: "word" },
    { id: 194, text: "Quantization", meaning: "Nicemleme", category: "technical", type: "word" },
    { id: 195, text: "Digital Signal Processing", meaning: "Sayısal Sinyal İşleme", category: "technical", type: "word" },
    { id: 196, text: "Analog Signal", meaning: "Analog Sinyal", category: "technical", type: "word" },
    { id: 197, text: "Digital Signal", meaning: "Sayısal Sinyal", category: "technical", type: "word" },
    { id: 198, text: "Transmission Line", meaning: "İletim Hattı", category: "technical", type: "word" },
    { id: 199, text: "Electromagnetic Compatibility", meaning: "Elektromanyetik Uyumluluk", category: "technical", type: "word" },
    { id: 200, text: "Engineering", meaning: "Mühendislik", category: "technical", type: "word" },
    { id: 201, text: "Design", meaning: "Tasarım", category: "technical", type: "word" },
    { id: 202, text: "Analysis", meaning: "Analiz", category: "technical", type: "word" },
    { id: 203, text: "System", meaning: "Sistem", category: "technical", type: "word" },
    { id: 204, text: "Component", meaning: "Bileşen", category: "technical", type: "word" },
    { id: 205, text: "Process", meaning: "Süreç", category: "technical", type: "word" },
    { id: 206, text: "Model", meaning: "Model", category: "technical", type: "word" },
    { id: 207, text: "Simulation", meaning: "Simülasyon", category: "technical", type: "word" },
    { id: 208, text: "Prototype", meaning: "Prototip", category: "technical", type: "word" },
    { id: 209, text: "Testing", meaning: "Test", category: "technical", type: "word" },
    { id: 210, text: "Development", meaning: "Geliştirme", category: "technical", type: "word" },
    { id: 211, text: "Implementation", meaning: "Uygulama", category: "technical", type: "word" },
    { id: 212, text: "Optimization", meaning: "Optimizasyon", category: "technical", type: "word" },
    { id: 213, text: "Efficiency", meaning: "Verimlilik", category: "technical", type: "word" },
    { id: 214, text: "Performance", meaning: "Performans", category: "technical", type: "word" },
    { id: 215, text: "Accuracy", meaning: "Doğruluk", category: "technical", type: "word" },
    { id: 216, text: "Precision", meaning: "Hassasiyet", category: "technical", type: "word" },
    { id: 217, text: "Durability", meaning: "Dayanıklılık", category: "technical", type: "word" },
    { id: 218, text: "Safety", meaning: "Güvenlik", category: "technical", type: "word" },
    { id: 219, text: "Standard", meaning: "Standart", category: "technical", type: "word" },
    { id: 220, text: "Specification", meaning: "Teknik Şartname", category: "technical", type: "word" },
    { id: 221, text: "Requirement", meaning: "Gereksinim", category: "technical", type: "word" },
    { id: 222, text: "Constraint", meaning: "Kısıt", category: "technical", type: "word" },
    { id: 223, text: "Tolerance", meaning: "Tolerans", category: "technical", type: "word" },
    { id: 224, text: "Measurement", meaning: "Ölçüm", category: "technical", type: "word" },
    { id: 225, text: "Calibration", meaning: "Kalibrasyon", category: "technical", type: "word" },
    { id: 226, text: "Validation", meaning: "Doğrulama", category: "technical", type: "word" },
    { id: 227, text: "Verification", meaning: "Teyit", category: "technical", type: "word" },
    { id: 228, text: "Inspection", meaning: "Denetim", category: "technical", type: "word" },
    { id: 229, text: "Manufacturing", meaning: "Üretim", category: "technical", type: "word" },
    { id: 230, text: "Assembly", meaning: "Montaj", category: "technical", type: "word" },
    { id: 231, text: "Integration", meaning: "Entegrasyon", category: "technical", type: "word" },
    { id: 232, text: "Maintenance", meaning: "Bakım", category: "technical", type: "word" },
    { id: 233, text: "Operation", meaning: "İşletim", category: "technical", type: "word" },
    { id: 234, text: "Failure", meaning: "Arıza / Hata", category: "technical", type: "word" },
    { id: 235, text: "Fault", meaning: "Kusur", category: "technical", type: "word" },
    { id: 236, text: "Troubleshooting", meaning: "Arıza Giderme", category: "technical", type: "word" },
    { id: 237, text: "Risk", meaning: "Risk", category: "technical", type: "word" },
    { id: 238, text: "Assessment", meaning: "Değerlendirme", category: "technical", type: "word" },
    { id: 239, text: "Project", meaning: "Proje", category: "technical", type: "word" },
    { id: 240, text: "Planning", meaning: "Planlama", category: "technical", type: "word" },
    { id: 241, text: "Scheduling", meaning: "Zamanlama", category: "technical", type: "word" },
    { id: 242, text: "Milestone", meaning: "Kilometre taşı", category: "technical", type: "word" },
    { id: 243, text: "Budget", meaning: "Bütçe", category: "technical", type: "word" },
    { id: 244, text: "Cost", meaning: "Maliyet", category: "technical", type: "word" },
    { id: 245, text: "Resource", meaning: "Kaynak", category: "technical", type: "word" },
    { id: 246, text: "Productivity", meaning: "Üretkenlik", category: "technical", type: "word" },
    { id: 247, text: "Workflow", meaning: "İş Akışı", category: "technical", type: "word" },
    { id: 248, text: "Documentation", meaning: "Dokümantasyon", category: "technical", type: "word" },
    { id: 249, text: "Report", meaning: "Rapor", category: "technical", type: "word" },
    { id: 250, text: "Presentation", meaning: "Sunum", category: "technical", type: "word" },
    { id: 251, text: "Technical Drawing", meaning: "Teknik Çizim", category: "technical", type: "word" },
    { id: 252, text: "Diagram", meaning: "Diyagram", category: "technical", type: "word" },
    { id: 253, text: "Algorithm", meaning: "Algoritma", category: "technical", type: "word" },
    { id: 254, text: "Logic", meaning: "Mantık", category: "technical", type: "word" },
    { id: 255, text: "Automation", meaning: "Otomasyon", category: "technical", type: "word" },
    { id: 256, text: "Control", meaning: "Kontrol", category: "technical", type: "word" },
    { id: 257, text: "Monitoring", meaning: "İzleme", category: "technical", type: "word" },
    { id: 258, text: "Data", meaning: "Veri", category: "technical", type: "word" },
    { id: 259, text: "Database", meaning: "Veritabanı", category: "technical", type: "word" },
    { id: 260, text: "Interface", meaning: "Arayüz", category: "technical", type: "word" },
    { id: 261, text: "Compatibility", meaning: "Uyumluluk", category: "technical", type: "word" },
    { id: 262, text: "Scalability", meaning: "Ölçeklenebilirlik", category: "technical", type: "word" },
    { id: 263, text: "Improvement", meaning: "İyileştirme", category: "technical", type: "word" },
    { id: 264, text: "Sustainability", meaning: "Sürdürülebilirlik", category: "technical", type: "word" },
    { id: 265, text: "Feasibility", meaning: "Yapılabilirlik", category: "technical", type: "word" },
    { id: 266, text: "Solution", meaning: "Çözüm", category: "technical", type: "word" },
    { id: 267, text: "Problem Solving", meaning: "Problem Çözme", category: "technical", type: "word" },
    { id: 268, text: "Critical Thinking", meaning: "Eleştirel Düşünme", category: "technical", type: "word" },
    { id: 269, text: "Decision Making", meaning: "Karar Verme", category: "technical", type: "word" },
    { id: 270, text: "Collaboration", meaning: "İş Birliği", category: "technical", type: "word" },
    { id: 271, text: "Teamwork", meaning: "Takım Çalışması", category: "technical", type: "word" },
    { id: 272, text: "Leadership", meaning: "Liderlik", category: "technical", type: "word" },
    { id: 273, text: "Responsibility", meaning: "Sorumluluk", category: "technical", type: "word" },
    { id: 274, text: "Ethics", meaning: "Etik", category: "technical", type: "word" },
    { id: 275, text: "Quality", meaning: "Kalite", category: "technical", type: "word" },
    { id: 276, text: "Assurance", meaning: "Güvence", category: "technical", type: "word" },
    { id: 277, text: "Constraint Analysis", meaning: "Kısıt Analizi", category: "technical", type: "word" },
    { id: 278, text: "System Architecture", meaning: "Sistem Mimarisi", category: "technical", type: "word" },
    { id: 279, text: "Design Review", meaning: "Tasarım Gözden Geçirme", category: "technical", type: "word" },
    { id: 280, text: "Root Cause", meaning: "Kök Neden", category: "technical", type: "word" },
    { id: 281, text: "Iteration", meaning: "Yineleme", category: "technical", type: "word" },
    { id: 282, text: "Trade-off", meaning: "Ödünleşim", category: "technical", type: "word" },
    { id: 283, text: "Benchmark", meaning: "Kıyaslama", category: "technical", type: "word" },
    { id: 284, text: "Lifecycle", meaning: "Yaşam Döngüsü", category: "technical", type: "word" },
    { id: 285, text: "Deployment", meaning: "Devreye Alma", category: "technical", type: "word" },
    { id: 286, text: "Upgrade", meaning: "Yükseltme", category: "technical", type: "word" },
    { id: 287, text: "Configuration", meaning: "Yapılandırma", category: "technical", type: "word" },
    { id: 288, text: "Version Control", meaning: "Sürüm Kontrolü", category: "technical", type: "word" },
    { id: 289, text: "Debugging", meaning: "Hata Ayıklama", category: "technical", type: "word" },
    { id: 290, text: "Interface Design", meaning: "Arayüz Tasarımı", category: "technical", type: "word" },
    { id: 291, text: "System Integration", meaning: "Sistem Entegrasyonu", category: "technical", type: "word" },
    { id: 292, text: "Compliance", meaning: "Uygunluk", category: "technical", type: "word" },
    { id: 293, text: "Certification", meaning: "Sertifikasyon", category: "technical", type: "word" },
    { id: 294, text: "Documentation Control", meaning: "Doküman Kontrolü", category: "technical", type: "word" },
    { id: 295, text: "Knowledge Transfer", meaning: "Bilgi Aktarımı", category: "technical", type: "word" },
    { id: 296, text: "Continuous Improvement", meaning: "Sürekli İyileştirme", category: "technical", type: "word" },
    { id: 297, text: "However", meaning: "Ancak", category: "daily", type: "word" },
    { id: 298, text: "Therefore", meaning: "Bu nedenle", category: "daily", type: "word" },
    { id: 299, text: "Moreover", meaning: "Ayrıca", category: "daily", type: "word" },
    { id: 300, text: "Although", meaning: "Her ne kadar", category: "daily", type: "word" },
    { id: 301, text: "Despite", meaning: "-e rağmen", category: "daily", type: "word" },
    { id: 302, text: "Whereas", meaning: "Oysa ki", category: "daily", type: "word" },
    { id: 303, text: "Thus", meaning: "Böylece", category: "daily", type: "word" },
    { id: 304, text: "Hence", meaning: "Dolayısıyla", category: "daily", type: "word" },
    { id: 305, text: "Nevertheless", meaning: "Buna rağmen", category: "daily", type: "word" },
    { id: 306, text: "Otherwise", meaning: "Aksi takdirde", category: "daily", type: "word" },
    { id: 307, text: "Meanwhile", meaning: "Bu sırada", category: "daily", type: "word" },
    { id: 308, text: "Furthermore", meaning: "Dahası", category: "daily", type: "word" },
    { id: 309, text: "Likewise", meaning: "Benzer şekilde", category: "daily", type: "word" },
    { id: 310, text: "Instead", meaning: "Bunun yerine", category: "daily", type: "word" },
    { id: 311, text: "Rather", meaning: "Daha doğrusu", category: "daily", type: "word" },
    { id: 312, text: "Accordingly", meaning: "Buna bağlı olarak", category: "daily", type: "word" },
    { id: 313, text: "Nonetheless", meaning: "Yine de", category: "daily", type: "word" },
    { id: 314, text: "Henceforth", meaning: "Bundan böyle", category: "daily", type: "word" },
    { id: 315, text: "Thereby", meaning: "Bu yolla", category: "daily", type: "word" },
    { id: 316, text: "Regardless", meaning: "-e bakmaksızın", category: "daily", type: "word" },
    { id: 317, text: "Albeit", meaning: "Her ne kadar", category: "daily", type: "word" },
    { id: 318, text: "Notwithstanding", meaning: "-e rağmen", category: "daily", type: "word" },
    { id: 319, text: "Thereafter", meaning: "Ondan sonra", category: "daily", type: "word" },
    { id: 320, text: "Therein", meaning: "Bunun içinde", category: "daily", type: "word" },
    { id: 321, text: "Subsequently", meaning: "Sonrasında", category: "daily", type: "word" },
    { id: 322, text: "Previously", meaning: "Önceden", category: "daily", type: "word" },
    { id: 323, text: "Eventually", meaning: "Eninde sonunda", category: "daily", type: "word" },
    { id: 324, text: "Consequently", meaning: "Sonuç olarak", category: "daily", type: "word" },
    { id: 325, text: "Instead of", meaning: "Yerine", category: "daily", type: "word" },
    { id: 326, text: "As long as", meaning: "-dığı sürece", category: "daily", type: "word" },
    { id: 327, text: "In contrast", meaning: "Buna karşılık", category: "daily", type: "word" },
    { id: 328, text: "In addition", meaning: "Ek olarak", category: "daily", type: "word" },
    { id: 329, text: "As a result", meaning: "Sonuç olarak", category: "daily", type: "word" },
    { id: 330, text: "As a whole", meaning: "Genel olarak", category: "daily", type: "word" },
    { id: 331, text: "At least", meaning: "En azından", category: "daily", type: "word" },
    { id: 332, text: "At most", meaning: "En fazla", category: "daily", type: "word" },
    { id: 333, text: "So far", meaning: "Şimdiye kadar", category: "daily", type: "word" },
    { id: 334, text: "In advance", meaning: "Önceden", category: "daily", type: "word" },
    { id: 335, text: "On the other hand", meaning: "Öte yandan", category: "daily", type: "word" },
    { id: 336, text: "By contrast", meaning: "Buna karşın", category: "daily", type: "word" },
    { id: 337, text: "Even though", meaning: "Her ne kadar", category: "daily", type: "word" },
    { id: 338, text: "As soon as", meaning: "-er ermez", category: "daily", type: "word" },
    { id: 339, text: "Provided that", meaning: "Şartıyla", category: "daily", type: "word" },
    { id: 340, text: "In the meantime", meaning: "Bu arada", category: "daily", type: "word" },
    { id: 341, text: "All of a sudden", meaning: "Aniden", category: "daily", type: "word" },
    { id: 342, text: "From time to time", meaning: "Zaman zaman", category: "daily", type: "word" },
    { id: 343, text: "In general", meaning: "Genel olarak", category: "daily", type: "word" },
    { id: 344, text: "By no means", meaning: "Asla", category: "daily", type: "word" },
    { id: 345, text: "Indicate", meaning: "Göstermek", category: "technical", type: "word" },
    { id: 346, text: "Demonstrate", meaning: "Ortaya koymak", category: "technical", type: "word" },
    { id: 347, text: "Reveal", meaning: "Açığa çıkarmak", category: "technical", type: "word" },
    { id: 348, text: "Suggest", meaning: "Öne sürmek", category: "technical", type: "word" },
    { id: 349, text: "Assume", meaning: "Varsaymak", category: "technical", type: "word" },
    { id: 350, text: "Claim", meaning: "İddia etmek", category: "technical", type: "word" },
    { id: 351, text: "Maintain", meaning: "Savunmak / sürdürmek", category: "technical", type: "word" },
    { id: 352, text: "Contribute", meaning: "Katkıda bulunmak", category: "technical", type: "word" },
    { id: 353, text: "Affect", meaning: "Etkilemek", category: "technical", type: "word" },
    { id: 354, text: "Enable", meaning: "Olanak sağlamak", category: "technical", type: "word" },
    { id: 355, text: "Require", meaning: "Gerektirmek", category: "technical", type: "word" },
    { id: 356, text: "Establish", meaning: "Ortaya koymak", category: "technical", type: "word" },
    { id: 357, text: "Determine", meaning: "Belirlemek", category: "technical", type: "word" },
    { id: 358, text: "Limit", meaning: "Sınırlandırmak", category: "technical", type: "word" },
    { id: 359, text: "Evidence", meaning: "Kanıt", category: "technical", type: "word" },
    { id: 360, text: "Approach", meaning: "Yaklaşım", category: "technical", type: "word" },
    { id: 361, text: "Outcome", meaning: "Sonuç", category: "technical", type: "word" },
    { id: 362, text: "Impact", meaning: "Etki", category: "technical", type: "word" },
    { id: 363, text: "Factor", meaning: "Etken", category: "technical", type: "word" },
    { id: 364, text: "Aspect", meaning: "Yön", category: "technical", type: "word" },
    { id: 365, text: "Assumption", meaning: "Varsayım", category: "technical", type: "word" },
    { id: 366, text: "Conclusion", meaning: "Sonuç", category: "technical", type: "word" },
    { id: 367, text: "Scope", meaning: "Kapsam", category: "technical", type: "word" },
    { id: 368, text: "Significant", meaning: "Önemli", category: "technical", type: "word" },
    { id: 369, text: "Relevant", meaning: "İlgili", category: "technical", type: "word" },
    { id: 370, text: "Adequate", meaning: "Yeterli", category: "technical", type: "word" },
    { id: 371, text: "Essential", meaning: "Gerekli", category: "technical", type: "word" },
    { id: 372, text: "Consistent", meaning: "Tutarlı", category: "technical", type: "word" },
    { id: 373, text: "Phenomenon", meaning: "Olgu", category: "technical", type: "word" },
    { id: 374, text: "Hypothesis", meaning: "Hipotez", category: "technical", type: "word" },
    { id: 375, text: "Correlation", meaning: "Korelasyon", category: "technical", type: "word" },
    { id: 376, text: "Implication", meaning: "Çıkarım", category: "technical", type: "word" },
    { id: 377, text: "Framework", meaning: "Çerçeve", category: "technical", type: "word" },
    { id: 378, text: "Underlying", meaning: "Altta yatan", category: "technical", type: "word" },
    { id: 379, text: "Validity", meaning: "Geçerlilik", category: "technical", type: "word" },
    { id: 380, text: "Inference", meaning: "Çıkarım", category: "technical", type: "word" },
    { id: 381, text: "Subsequent", meaning: "Sonraki", category: "technical", type: "word" },
    { id: 382, text: "Preceding", meaning: "Önceki", category: "technical", type: "word" },
    { id: 383, text: "Likely", meaning: "Olası", category: "technical", type: "word" },
    { id: 384, text: "Potential", meaning: "Potansiyel", category: "technical", type: "word" },
    { id: 385, text: "Complex", meaning: "Karmaşık", category: "technical", type: "word" },
    { id: 386, text: "Method", meaning: "Yöntem", category: "technical", type: "word" },
    { id: 387, text: "Trend", meaning: "Eğilim", category: "technical", type: "word" },
    { id: 388, text: "Purpose", meaning: "Amaç", category: "technical", type: "word" },
    { id: 389, text: "The system was designed to improve overall performance.", meaning: "Sistem, genel performansı artırmak için tasarlandı.", category: "technical", type: "sentence" },
    { id: 390, text: "This method is widely used in engineering applications.", meaning: "Bu yöntem mühendislik uygulamalarında yaygın olarak kullanılır.", category: "technical", type: "sentence" },
    { id: 391, text: "The results indicate a significant improvement.", meaning: "Sonuçlar önemli bir iyileşmeye işaret etmektedir.", category: "technical", type: "sentence" },
    { id: 392, text: "The experiment was conducted under controlled conditions.", meaning: "Deney kontrollü koşullar altında gerçekleştirildi.", category: "technical", type: "sentence" },
    { id: 393, text: "The data were analyzed using statistical methods.", meaning: "Veriler istatistiksel yöntemler kullanılarak analiz edildi.", category: "technical", type: "sentence" },
    { id: 394, text: "This approach reduces the overall system cost.", meaning: "Bu yaklaşım toplam sistem maliyetini azaltır.", category: "technical", type: "sentence" },
    { id: 395, text: "The proposed solution meets the required standards.", meaning: "Önerilen çözüm gerekli standartları karşılamaktadır.", category: "technical", type: "sentence" },
    { id: 396, text: "The model was validated through multiple tests.", meaning: "Model birden fazla test ile doğrulandı.", category: "technical", type: "sentence" },
    { id: 397, text: "System reliability is a critical factor.", meaning: "Sistem güvenilirliği kritik bir faktördür.", category: "technical", type: "sentence" },
    { id: 398, text: "The design process includes several stages.", meaning: "Tasarım süreci birkaç aşamadan oluşur.", category: "technical", type: "sentence" },
    { id: 399, text: "The performance depends on various parameters.", meaning: "Performans çeşitli parametrelere bağlıdır.", category: "technical", type: "sentence" },
    { id: 400, text: "The algorithm improves processing efficiency.", meaning: "Algoritma işlem verimliliğini artırır.", category: "technical", type: "sentence" },
    { id: 401, text: "The system operates within defined limits.", meaning: "Sistem tanımlı sınırlar içinde çalışır.", category: "technical", type: "sentence" },
    { id: 402, text: "This technique minimizes energy consumption.", meaning: "Bu teknik enerji tüketimini en aza indirir.", category: "technical", type: "sentence" },
    { id: 403, text: "The experiment confirmed the initial hypothesis.", meaning: "Deney başlangıç hipotezini doğruladı.", category: "technical", type: "sentence" },
    { id: 404, text: "The process was optimized for better efficiency.", meaning: "Süreç daha iyi verimlilik için optimize edildi.", category: "technical", type: "sentence" },
    { id: 405, text: "The results were consistent with previous studies.", meaning: "Sonuçlar önceki çalışmalarla tutarlıydı.", category: "technical", type: "sentence" },
    { id: 406, text: "The system requires regular maintenance.", meaning: "Sistem düzenli bakım gerektirir.", category: "technical", type: "sentence" },
    { id: 407, text: "The analysis focuses on key performance metrics.", meaning: "Analiz temel performans metriklerine odaklanır.", category: "technical", type: "sentence" },
    { id: 408, text: "The device was tested under real-world conditions.", meaning: "Cihaz gerçek dünya koşullarında test edildi.", category: "technical", type: "sentence" },
    { id: 409, text: "The method provides reliable results.", meaning: "Yöntem güvenilir sonuçlar sağlar.", category: "technical", type: "sentence" },
    { id: 410, text: "The system architecture supports scalability.", meaning: "Sistem mimarisi ölçeklenebilirliği destekler.", category: "technical", type: "sentence" },
    { id: 411, text: "The experiment aims to evaluate system behavior.", meaning: "Deney sistem davranışını değerlendirmeyi amaçlar.", category: "technical", type: "sentence" },
    { id: 412, text: "The solution was implemented successfully.", meaning: "Çözüm başarıyla uygulandı.", category: "technical", type: "sentence" },
    { id: 413, text: "The data suggest a strong correlation.", meaning: "Veriler güçlü bir korelasyon olduğunu göstermektedir.", category: "technical", type: "sentence" },
    { id: 414, text: "The system must comply with safety regulations.", meaning: "Sistem güvenlik yönetmeliklerine uymalıdır.", category: "technical", type: "sentence" },
    { id: 415, text: "The design was revised based on feedback.", meaning: "Tasarım geri bildirimlere göre revize edildi.", category: "technical", type: "sentence" },
    { id: 416, text: "The experiment highlights potential limitations.", meaning: "Deney potansiyel sınırlamaları ortaya koymaktadır.", category: "technical", type: "sentence" },
    { id: 417, text: "The process ensures consistent quality.", meaning: "Süreç tutarlı kaliteyi garanti eder.", category: "technical", type: "sentence" },
    { id: 418, text: "The system integrates multiple components.", meaning: "Sistem birden fazla bileşeni entegre eder.", category: "technical", type: "sentence" },
    { id: 419, text: "The results were obtained through careful analysis.", meaning: "Sonuçlar dikkatli bir analizle elde edildi.", category: "technical", type: "sentence" },
    { id: 420, text: "The approach enhances overall system stability.", meaning: "Yaklaşım genel sistem kararlılığını artırır.", category: "technical", type: "sentence" },
    { id: 421, text: "The system performance was evaluated thoroughly.", meaning: "Sistem performansı ayrıntılı şekilde değerlendirildi.", category: "technical", type: "sentence" },
    { id: 422, text: "The method reduces operational complexity.", meaning: "Yöntem operasyonel karmaşıklığı azaltır.", category: "technical", type: "sentence" },
    { id: 423, text: "The experiment produced repeatable results.", meaning: "Deney tekrarlanabilir sonuçlar üretti.", category: "technical", type: "sentence" },
    { id: 424, text: "The system was developed using modern tools.", meaning: "Sistem modern araçlar kullanılarak geliştirildi.", category: "technical", type: "sentence" },
    { id: 425, text: "The design meets functional requirements.", meaning: "Tasarım işlevsel gereksinimleri karşılar.", category: "technical", type: "sentence" },
    { id: 426, text: "The analysis considers multiple variables.", meaning: "Analiz birden fazla değişkeni dikkate alır.", category: "technical", type: "sentence" },
    { id: 427, text: "The solution improves system reliability.", meaning: "Çözüm sistem güvenilirliğini artırır.", category: "technical", type: "sentence" },
    { id: 428, text: "The experiment supports the proposed model.", meaning: "Deney önerilen modeli desteklemektedir.", category: "technical", type: "sentence" },
    { id: 429, text: "The system performance varies with conditions.", meaning: "Sistem performansı koşullara göre değişir.", category: "technical", type: "sentence" },
    { id: 430, text: "The process was designed to minimize errors.", meaning: "Süreç hataları en aza indirecek şekilde tasarlandı.", category: "technical", type: "sentence" },
    { id: 431, text: "The data were collected over a long period.", meaning: "Veriler uzun bir süre boyunca toplandı.", category: "technical", type: "sentence" },
    { id: 432, text: "The system ensures efficient resource usage.", meaning: "Sistem kaynakların verimli kullanımını sağlar.", category: "technical", type: "sentence" },
    { id: 433, text: "The results highlight key performance trends.", meaning: "Sonuçlar temel performans eğilimlerini vurgular.", category: "technical", type: "sentence" },
    { id: 434, text: "The design improves operational efficiency.", meaning: "Tasarım operasyonel verimliliği artırır.", category: "technical", type: "sentence" },
    { id: 435, text: "The experiment reveals important insights.", meaning: "Deney önemli çıkarımlar ortaya koymaktadır.", category: "technical", type: "sentence" },
    { id: 436, text: "The system configuration affects performance.", meaning: "Sistem yapılandırması performansı etkiler.", category: "technical", type: "sentence" },
    { id: 437, text: "The method was chosen for its simplicity.", meaning: "Yöntem sadeliği nedeniyle seçildi.", category: "technical", type: "sentence" },
    { id: 438, text: "The results are relevant to practical applications.", meaning: "Sonuçlar pratik uygulamalar için önemlidir.", category: "technical", type: "sentence" },
    { id: 439, text: "The system supports continuous operation.", meaning: "Sistem sürekli çalışmayı destekler.", category: "technical", type: "sentence" },
    { id: 440, text: "The analysis identifies key problem areas.", meaning: "Analiz temel problem alanlarını belirler.", category: "technical", type: "sentence" },
    { id: 441, text: "The experiment was repeated for accuracy.", meaning: "Deney doğruluk için tekrarlandı.", category: "technical", type: "sentence" },
    { id: 442, text: "The design process requires careful planning.", meaning: "Tasarım süreci dikkatli planlama gerektirir.", category: "technical", type: "sentence" },
    { id: 443, text: "The system achieves high performance levels.", meaning: "Sistem yüksek performans seviyelerine ulaşır.", category: "technical", type: "sentence" },
    { id: 444, text: "The solution reduces overall system complexity.", meaning: "Çözüm genel sistem karmaşıklığını azaltır.", category: "technical", type: "sentence" },
    { id: 445, text: "The experiment confirms system stability.", meaning: "Deney sistem kararlılığını doğrular.", category: "technical", type: "sentence" },
    { id: 446, text: "The method ensures accurate measurements.", meaning: "Yöntem doğru ölçümler sağlar.", category: "technical", type: "sentence" },
    { id: 447, text: "The system design follows industry standards.", meaning: "Sistem tasarımı endüstri standartlarını takip eder.", category: "technical", type: "sentence" },
    { id: 448, text: "The results contribute to future research.", meaning: "Sonuçlar gelecekteki araştırmalara katkı sağlar.", category: "technical", type: "sentence" },
    { id: 449, text: "The system was optimized for long-term use.", meaning: "Sistem uzun vadeli kullanım için optimize edildi.", category: "technical", type: "sentence" },
    { id: 450, text: "The experiment demonstrates method effectiveness.", meaning: "Deney yöntemin etkinliğini göstermektedir.", category: "technical", type: "sentence" },
    { id: 451, text: "The analysis improves decision-making processes.", meaning: "Analiz karar verme süreçlerini iyileştirir.", category: "technical", type: "sentence" },
    { id: 452, text: "The system configuration was carefully selected.", meaning: "Sistem yapılandırması dikkatle seçildi.", category: "technical", type: "sentence" },
    { id: 453, text: "The results validate the proposed approach.", meaning: "Sonuçlar önerilen yaklaşımı doğrulamaktadır.", category: "technical", type: "sentence" },
    { id: 454, text: "The design minimizes operational risks.", meaning: "Tasarım operasyonel riskleri en aza indirir.", category: "technical", type: "sentence" },
    { id: 455, text: "The experiment highlights system limitations.", meaning: "Deney sistem sınırlamalarını ortaya koyar.", category: "technical", type: "sentence" },
    { id: 456, text: "The method improves system accuracy.", meaning: "Yöntem sistem doğruluğunu artırır.", category: "technical", type: "sentence" },
    { id: 457, text: "The system was evaluated under various scenarios.", meaning: "Sistem çeşitli senaryolar altında değerlendirildi.", category: "technical", type: "sentence" },
    { id: 458, text: "The results show consistent performance.", meaning: "Sonuçlar tutarlı performans göstermektedir.", category: "technical", type: "sentence" },
    { id: 459, text: "The design supports efficient system integration.", meaning: "Tasarım verimli sistem entegrasyonunu destekler.", category: "technical", type: "sentence" },
    { id: 460, text: "The experiment provides valuable data.", meaning: "Deney değerli veriler sağlar.", category: "technical", type: "sentence" },
    { id: 461, text: "The system performance meets expectations.", meaning: "Sistem performansı beklentileri karşılar.", category: "technical", type: "sentence" },
    { id: 462, text: "The analysis reveals critical system parameters.", meaning: "Analiz kritik sistem parametrelerini ortaya çıkarır.", category: "technical", type: "sentence" },
    { id: 463, text: "The method ensures reliable system operation.", meaning: "Yöntem güvenilir sistem çalışmasını sağlar.", category: "technical", type: "sentence" },
    { id: 464, text: "The system was designed for high efficiency.", meaning: "Sistem yüksek verimlilik için tasarlandı.", category: "technical", type: "sentence" },
    { id: 465, text: "The experiment supports future development.", meaning: "Deney gelecekteki geliştirmeleri destekler.", category: "technical", type: "sentence" },
    { id: 466, text: "The design process improves system quality.", meaning: "Tasarım süreci sistem kalitesini artırır.", category: "technical", type: "sentence" },
    { id: 467, text: "The results emphasize the importance of optimization.", meaning: "Sonuçlar optimizasyonun önemini vurgular.", category: "technical", type: "sentence" },
    { id: 468, text: "The system was tested for robustness.", meaning: "Sistem dayanıklılık açısından test edildi.", category: "technical", type: "sentence" },
    { id: 469, text: "The method contributes to efficient system design.", meaning: "Yöntem verimli sistem tasarımına katkı sağlar.", category: "technical", type: "sentence" },
    { id: 470, text: "The experiment confirms performance improvements.", meaning: "Deney performans iyileştirmelerini doğrular.", category: "technical", type: "sentence" },
    { id: 471, text: "The analysis focuses on system reliability.", meaning: "Analiz sistem güvenilirliğine odaklanır.", category: "technical", type: "sentence" },
    { id: 472, text: "The system operates under predefined conditions.", meaning: "Sistem önceden tanımlanmış koşullar altında çalışır.", category: "technical", type: "sentence" },
    { id: 473, text: "The results support the initial assumptions.", meaning: "Sonuçlar başlangıç varsayımlarını destekler.", category: "technical", type: "sentence" },
    { id: 474, text: "The design enhances system functionality.", meaning: "Tasarım sistem işlevselliğini artırır.", category: "technical", type: "sentence" },
    { id: 475, text: "The experiment identifies key performance factors.", meaning: "Deney temel performans faktörlerini belirler.", category: "technical", type: "sentence" },
    { id: 476, text: "The method improves overall system performance.", meaning: "Yöntem genel sistem performansını artırır.", category: "technical", type: "sentence" },
    { id: 477, text: "The system was analyzed for efficiency.", meaning: "Sistem verimlilik açısından analiz edildi.", category: "technical", type: "sentence" },
    { id: 478, text: "The results demonstrate method reliability.", meaning: "Sonuçlar yöntemin güvenilirliğini göstermektedir.", category: "technical", type: "sentence" },
    { id: 479, text: "The design process supports continuous improvement.", meaning: "Tasarım süreci sürekli iyileştirmeyi destekler.", category: "technical", type: "sentence" },
    { id: 480, text: "The experiment validates system performance.", meaning: "Deney sistem performansını doğrular.", category: "technical", type: "sentence" },
    { id: 481, text: "The analysis contributes to better system design.", meaning: "Analiz daha iyi sistem tasarımına katkı sağlar.", category: "technical", type: "sentence" },
    { id: 482, text: "The system meets all functional requirements.", meaning: "Sistem tüm işlevsel gereksinimleri karşılar.", category: "technical", type: "sentence" },
    { id: 483, text: "The results provide a basis for further studies.", meaning: "Sonuçlar ileri çalışmalar için bir temel sağlar.", category: "technical", type: "sentence" },
    { id: 484, text: "The design ensures long-term system stability.", meaning: "Tasarım uzun vadeli sistem kararlılığını sağlar.", category: "technical", type: "sentence" },
    { id: 485, text: "The experiment confirms the effectiveness of the method.", meaning: "Deney yöntemin etkinliğini doğrular.", category: "technical", type: "sentence" },
    { id: 486, text: "The system was optimized based on test results.", meaning: "Sistem test sonuçlarına göre optimize edildi.", category: "technical", type: "sentence" },
    { id: 487, text: "The analysis highlights critical design factors.", meaning: "Analiz kritik tasarım faktörlerini vurgular.", category: "technical", type: "sentence" },
    { id: 488, text: "The results demonstrate successful system implementation.", meaning: "Sonuçlar başarılı sistem uygulamasını göstermektedir.", category: "technical", type: "sentence" },
    { id: 489, text: "Plan", meaning: "Plan", category: "daily", type: "word" },
    { id: 490, text: "Priority", meaning: "Öncelik", category: "daily", type: "word" },
    { id: 491, text: "Effort", meaning: "Çaba", category: "daily", type: "word" },
    { id: 492, text: "Result", meaning: "Sonuç", category: "daily", type: "word" },
    { id: 493, text: "Progress", meaning: "İlerleme", category: "daily", type: "word" },
    { id: 494, text: "Success", meaning: "Başarı", category: "daily", type: "word" },
    { id: 495, text: "Motivation", meaning: "Motivasyon", category: "daily", type: "word" },
    { id: 496, text: "I usually plan my day in advance.", meaning: "Genellikle günümü önceden planlarım.", category: "daily", type: "sentence" },
    { id: 497, text: "I try to focus on my tasks.", meaning: "Görevlerime odaklanmaya çalışırım.", category: "daily", type: "sentence" },
    { id: 498, text: "I feel tired after a long day.", meaning: "Uzun bir günün ardından yorgun hissederim.", category: "daily", type: "sentence" },
    { id: 499, text: "I try to use my time efficiently.", meaning: "Zamanımı verimli kullanmaya çalışırım.", category: "daily", type: "sentence" },
    { id: 500, text: "I prepare my tasks based on priority.", meaning: "Görevlerimi önceliğe göre hazırlarım.", category: "daily", type: "sentence" },
    { id: 501, text: "I usually finish my work on time.", meaning: "Genellikle işlerimi zamanında bitiririm.", category: "daily", type: "sentence" },
    { id: 502, text: "I try to stay motivated during the day.", meaning: "Gün boyunca motive kalmaya çalışırım.", category: "daily", type: "sentence" },
    { id: 503, text: "I review my progress at the end of the day.", meaning: "Gün sonunda ilerlememi gözden geçiririm.", category: "daily", type: "sentence" },
    { id: 504, text: "I feel productive when I stay focused.", meaning: "Odaklandığımda kendimi verimli hissederim.", category: "daily", type: "sentence" },
    { id: 505, text: "I usually start important tasks first.", meaning: "Genellikle önemli görevlere önce başlarım.", category: "daily", type: "sentence" },
    { id: 506, text: "I feel satisfied when I complete my goals.", meaning: "Hedeflerimi tamamladığımda tatmin olurum.", category: "daily", type: "sentence" },
    { id: 507, text: "I feel relaxed after finishing my tasks.", meaning: "Görevlerimi bitirdikten sonra rahatlarım.", category: "daily", type: "sentence" },
    { id: 508, text: "I manage my daily routine carefully.", meaning: "Günlük rutinimi dikkatle yönetirim.", category: "daily", type: "sentence" },
    { id: 509, text: "I feel confident when I am prepared.", meaning: "Hazırlıklı olduğumda kendime güvenirim.", category: "daily", type: "sentence" },
    { id: 510, text: "I believe small steps lead to success.", meaning: "Küçük adımların başarıya götürdüğüne inanırım.", category: "daily", type: "sentence" },
    { id: 511, text: "Parameter", meaning: "Parametre", category: "technical", type: "word" },
    { id: 512, text: "Architecture", meaning: "Mimari", category: "technical", type: "word" },
    { id: 513, text: "The system was designed to meet technical requirements.", meaning: "Sistem teknik gereksinimleri karşılamak üzere tasarlandı.", category: "technical", type: "sentence" },
    { id: 514, text: "The model was tested using simulation tools.", meaning: "Model simülasyon araçları kullanılarak test edildi.", category: "technical", type: "sentence" },
    { id: 515, text: "The results indicate improved system performance.", meaning: "Sonuçlar geliştirilmiş sistem performansını göstermektedir.", category: "technical", type: "sentence" },
    { id: 516, text: "The design process includes multiple stages.", meaning: "Tasarım süreci birden fazla aşama içerir.", category: "technical", type: "sentence" },
    { id: 517, text: "The system performance depends on various parameters.", meaning: "Sistem performansı çeşitli parametrelere bağlıdır.", category: "technical", type: "sentence" },
    { id: 518, text: "The proposed solution reduces system complexity.", meaning: "Önerilen çözüm sistem karmaşıklığını azaltır.", category: "technical", type: "sentence" },
    { id: 519, text: "The design meets established engineering standards.", meaning: "Tasarım belirlenmiş mühendislik standartlarını karşılar.", category: "technical", type: "sentence" },
    { id: 520, text: "The results were validated through repeated tests.", meaning: "Sonuçlar tekrarlanan testlerle doğrulandı.", category: "technical", type: "sentence" },
    { id: 521, text: "The experiment confirms the initial hypothesis.", meaning: "Deney başlangıç hipotezini doğrular.", category: "technical", type: "sentence" },
    { id: 522, text: "The design was optimized for efficiency.", meaning: "Tasarım verimlilik için optimize edildi.", category: "technical", type: "sentence" },
    { id: 523, text: "The results are consistent with previous studies.", meaning: "Sonuçlar önceki çalışmalarla tutarlıdır.", category: "technical", type: "sentence" },
    { id: 524, text: "The analysis identifies critical design factors.", meaning: "Analiz kritik tasarım faktörlerini belirler.", category: "technical", type: "sentence" },
    { id: 525, text: "The method improves overall system reliability.", meaning: "Yöntem genel sistem güvenilirliğini artırır.", category: "technical", type: "sentence" },
    { id: 526, text: "The system was evaluated under real-world conditions.", meaning: "Sistem gerçek dünya koşulları altında değerlendirildi.", category: "technical", type: "sentence" },
    { id: 527, text: "The experiment provides data for further analysis.", meaning: "Deney ileri analiz için veri sağlar.", category: "technical", type: "sentence" },
    { id: 528, text: "The system meets functional and safety requirements.", meaning: "Sistem işlevsel ve güvenlik gereksinimlerini karşılar.", category: "technical", type: "sentence" },
    { id: 529, text: "The results demonstrate successful implementation.", meaning: "Sonuçlar başarılı uygulamayı göstermektedir.", category: "technical", type: "sentence" },
    { id: 530, text: "The analysis contributes to improved system design.", meaning: "Analiz geliştirilmiş sistem tasarımına katkı sağlar.", category: "technical", type: "sentence" },
    { id: 531, text: "Breakfast", meaning: "Kahvaltı", category: "daily", type: "word" },
    { id: 532, text: "Lunch", meaning: "Öğle yemeği", category: "daily", type: "word" },
    { id: 533, text: "Dinner", meaning: "Akşam yemeği", category: "daily", type: "word" },
    { id: 534, text: "Snack", meaning: "Atıştırmalık", category: "daily", type: "word" },
    { id: 535, text: "Appetite", meaning: "İştah", category: "daily", type: "word" },
    { id: 536, text: "Hungry", meaning: "Aç", category: "daily", type: "word" },
    { id: 537, text: "Thirsty", meaning: "Susamış", category: "daily", type: "word" },
    { id: 538, text: "Delicious", meaning: "Lezzetli", category: "daily", type: "word" },
    { id: 539, text: "Tasty", meaning: "Lezzetli", category: "daily", type: "word" },
    { id: 540, text: "Spicy", meaning: "Acılı", category: "daily", type: "word" },
    { id: 541, text: "Sweet", meaning: "Tatlı", category: "daily", type: "word" },
    { id: 542, text: "Salty", meaning: "Tuzlu", category: "daily", type: "word" },
    { id: 543, text: "Bitter", meaning: "Acı (tat)", category: "daily", type: "word" },
    { id: 544, text: "Sour", meaning: "Ekşi", category: "daily", type: "word" },
    { id: 545, text: "Fresh", meaning: "Taze", category: "daily", type: "word" },
    { id: 546, text: "Hot", meaning: "Sıcak", category: "daily", type: "word" },
    { id: 547, text: "Warm", meaning: "Ilık", category: "daily", type: "word" },
    { id: 548, text: "Cold", meaning: "Soğuk", category: "daily", type: "word" },
    { id: 549, text: "Boil", meaning: "Kaynatmak", category: "daily", type: "word" },
    { id: 550, text: "Fry", meaning: "Kızartmak", category: "daily", type: "word" },
    { id: 551, text: "Bake", meaning: "Fırınlamak", category: "daily", type: "word" },
    { id: 552, text: "Grill", meaning: "Izgara yapmak", category: "daily", type: "word" },
    { id: 553, text: "Chop", meaning: "Doğramak", category: "daily", type: "word" },
    { id: 554, text: "Slice", meaning: "Dilimlemek", category: "daily", type: "word" },
    { id: 555, text: "Mix", meaning: "Karıştırmak", category: "daily", type: "word" },
    { id: 556, text: "Stir", meaning: "Karıştırmak", category: "daily", type: "word" },
    { id: 557, text: "Pour", meaning: "Dökmek", category: "daily", type: "word" },
    { id: 558, text: "Serve", meaning: "Servis etmek", category: "daily", type: "word" },
    { id: 559, text: "Order", meaning: "Sipariş vermek", category: "daily", type: "word" },
    { id: 560, text: "Menu", meaning: "Menü", category: "daily", type: "word" },
    { id: 561, text: "Reservation", meaning: "Rezervasyon", category: "daily", type: "word" },
    { id: 562, text: "Table", meaning: "Masa", category: "daily", type: "word" },
    { id: 563, text: "Waiter", meaning: "Garson", category: "daily", type: "word" },
    { id: 564, text: "Bill", meaning: "Hesap", category: "daily", type: "word" },
    { id: 565, text: "Tip", meaning: "Bahşiş", category: "daily", type: "word" },
    { id: 566, text: "Ingredient", meaning: "Malzeme", category: "daily", type: "word" },
    { id: 567, text: "Recipe", meaning: "Tarif", category: "daily", type: "word" },
    { id: 568, text: "Kitchen", meaning: "Mutfak", category: "daily", type: "word" },
    { id: 569, text: "Plate", meaning: "Tabak", category: "daily", type: "word" },
    { id: 570, text: "Bowl", meaning: "Kase", category: "daily", type: "word" },
    { id: 571, text: "Cup", meaning: "Fincan/Bardak", category: "daily", type: "word" },
    { id: 572, text: "Glass", meaning: "Bardak", category: "daily", type: "word" },
    { id: 573, text: "Fork", meaning: "Çatal", category: "daily", type: "word" },
    { id: 574, text: "Spoon", meaning: "Kaşık", category: "daily", type: "word" },
    { id: 575, text: "Knife", meaning: "Bıçak", category: "daily", type: "word" },
    { id: 576, text: "Napkin", meaning: "Peçete", category: "daily", type: "word" },
    { id: 577, text: "Kettle", meaning: "Su ısıtıcısı", category: "daily", type: "word" },
    { id: 578, text: "Oven", meaning: "Fırın", category: "daily", type: "word" },
    { id: 579, text: "Stove", meaning: "Ocak", category: "daily", type: "word" },
    { id: 580, text: "Microwave", meaning: "Mikrodalga", category: "daily", type: "word" },
    { id: 581, text: "Fridge", meaning: "Buzdolabı", category: "daily", type: "word" },
    { id: 582, text: "Freezer", meaning: "Dondurucu", category: "daily", type: "word" },
    { id: 583, text: "Coffee", meaning: "Kahve", category: "daily", type: "word" },
    { id: 584, text: "Tea", meaning: "Çay", category: "daily", type: "word" },
    { id: 585, text: "Water", meaning: "Su", category: "daily", type: "word" },
    { id: 586, text: "Juice", meaning: "Meyve suyu", category: "daily", type: "word" },
    { id: 587, text: "Milk", meaning: "Süt", category: "daily", type: "word" },
    { id: 588, text: "Soda", meaning: "Gazlı içecek", category: "daily", type: "word" },
    { id: 589, text: "Sparkling water", meaning: "Maden suyu", category: "daily", type: "word" },
    { id: 590, text: "Sandwich", meaning: "Sandviç", category: "daily", type: "word" },
    { id: 591, text: "Soup", meaning: "Çorba", category: "daily", type: "word" },
    { id: 592, text: "Salad", meaning: "Salata", category: "daily", type: "word" },
    { id: 593, text: "Rice", meaning: "Pilav/Pirinç", category: "daily", type: "word" },
    { id: 594, text: "Pasta", meaning: "Makarna", category: "daily", type: "word" },
    { id: 595, text: "Bread", meaning: "Ekmek", category: "daily", type: "word" },
    { id: 596, text: "Cheese", meaning: "Peynir", category: "daily", type: "word" },
    { id: 597, text: "Egg", meaning: "Yumurta", category: "daily", type: "word" },
    { id: 598, text: "Chicken", meaning: "Tavuk", category: "daily", type: "word" },
    { id: 599, text: "Meat", meaning: "Et", category: "daily", type: "word" },
    { id: 600, text: "Fish", meaning: "Balık", category: "daily", type: "word" },
    { id: 601, text: "Vegetable", meaning: "Sebze", category: "daily", type: "word" },
    { id: 602, text: "Fruit", meaning: "Meyve", category: "daily", type: "word" },
    { id: 603, text: "Dessert", meaning: "Tatlı", category: "daily", type: "word" },
    { id: 604, text: "Chocolate", meaning: "Çikolata", category: "daily", type: "word" },
    { id: 605, text: "Ice cream", meaning: "Dondurma", category: "daily", type: "word" },
    { id: 606, text: "Chat", meaning: "Sohbet", category: "daily", type: "word" },
    { id: 607, text: "Conversation", meaning: "Konuşma", category: "daily", type: "word" },
    { id: 608, text: "Topic", meaning: "Konu", category: "daily", type: "word" },
    { id: 609, text: "Joke", meaning: "Şaka", category: "daily", type: "word" },
    { id: 610, text: "Laugh", meaning: "Gülmek", category: "daily", type: "word" },
    { id: 611, text: "Smile", meaning: "Gülümsemek", category: "daily", type: "word" },
    { id: 612, text: "Introduce", meaning: "Tanıştırmak/Kendini tanıtmak", category: "daily", type: "word" },
    { id: 613, text: "Invite", meaning: "Davet etmek", category: "daily", type: "word" },
    { id: 614, text: "Join", meaning: "Katılmak", category: "daily", type: "word" },
    { id: 615, text: "Meet up", meaning: "Buluşmak", category: "daily", type: "word" },
    { id: 616, text: "Hang out", meaning: "Takılmak/Vakit geçirmek", category: "daily", type: "word" },
    { id: 617, text: "Call", meaning: "Aramak", category: "daily", type: "word" },
    { id: 618, text: "Message", meaning: "Mesaj", category: "daily", type: "word" },
    { id: 619, text: "Reply", meaning: "Cevap vermek", category: "daily", type: "word" },
    { id: 620, text: "Explain", meaning: "Açıklamak", category: "daily", type: "word" },
    { id: 621, text: "Agree", meaning: "Katılmak (aynı fikirde olmak)", category: "daily", type: "word" },
    { id: 622, text: "Disagree", meaning: "Katılmamak", category: "daily", type: "word" },
    { id: 623, text: "Maybe", meaning: "Belki", category: "daily", type: "word" },
    { id: 624, text: "Sure", meaning: "Tabii/Eminim", category: "daily", type: "word" },
    { id: 625, text: "Of course", meaning: "Tabii ki", category: "daily", type: "word" },
    { id: 626, text: "No problem", meaning: "Sorun değil", category: "daily", type: "word" },
    { id: 627, text: "Take care", meaning: "Kendine iyi bak", category: "daily", type: "word" },
    { id: 628, text: "See you", meaning: "Görüşürüz", category: "daily", type: "word" },
    { id: 629, text: "Gym", meaning: "Spor salonu", category: "daily", type: "word" },
    { id: 630, text: "Workout", meaning: "Antrenman", category: "daily", type: "word" },
    { id: 631, text: "Market", meaning: "Market", category: "daily", type: "word" },
    { id: 632, text: "Grocery", meaning: "Bakkaliye", category: "daily", type: "word" },
    { id: 633, text: "Shopping", meaning: "Alışveriş", category: "daily", type: "word" },
    { id: 634, text: "Cart", meaning: "Alışveriş arabası", category: "daily", type: "word" },
    { id: 635, text: "Basket", meaning: "Sepet", category: "daily", type: "word" },
    { id: 636, text: "Price", meaning: "Fiyat", category: "daily", type: "word" },
    { id: 637, text: "Cheap", meaning: "Ucuz", category: "daily", type: "word" },
    { id: 638, text: "Expensive", meaning: "Pahalı", category: "daily", type: "word" },
    { id: 639, text: "Discount", meaning: "İndirim", category: "daily", type: "word" },
    { id: 640, text: "Sale", meaning: "İndirimli satış", category: "daily", type: "word" },
    { id: 641, text: "Cash", meaning: "Nakit", category: "daily", type: "word" },
    { id: 642, text: "Credit card", meaning: "Kredi kartı", category: "daily", type: "word" },
    { id: 643, text: "Receipt", meaning: "Fiş", category: "daily", type: "word" },
    { id: 644, text: "Change", meaning: "Para üstü", category: "daily", type: "word" },
    { id: 645, text: "Total", meaning: "Toplam", category: "daily", type: "word" },
    { id: 646, text: "Queue", meaning: "Kuyruk", category: "daily", type: "word" },
    { id: 647, text: "Checkout", meaning: "Kasa", category: "daily", type: "word" },
    { id: 648, text: "Customer", meaning: "Müşteri", category: "daily", type: "word" },
    { id: 649, text: "Seller", meaning: "Satıcı", category: "daily", type: "word" },
    { id: 650, text: "Product", meaning: "Ürün", category: "daily", type: "word" },
    { id: 651, text: "Brand", meaning: "Marka", category: "daily", type: "word" },
    { id: 652, text: "Quality", meaning: "Kalite", category: "daily", type: "word" },
    { id: 653, text: "Size", meaning: "Beden/Boyut", category: "daily", type: "word" },
    { id: 654, text: "Try on", meaning: "Denemek (kıyafet)", category: "daily", type: "word" },
    { id: 655, text: "Fit", meaning: "Uymak", category: "daily", type: "word" },
    { id: 656, text: "Bus", meaning: "Otobüs", category: "daily", type: "word" },
    { id: 657, text: "Metro", meaning: "Metro", category: "daily", type: "word" },
    { id: 658, text: "Train", meaning: "Tren", category: "daily", type: "word" },
    { id: 659, text: "Taxi", meaning: "Taksi", category: "daily", type: "word" },
    { id: 660, text: "Traffic", meaning: "Trafik", category: "daily", type: "word" },
    { id: 661, text: "Ticket", meaning: "Bilet", category: "daily", type: "word" },
    { id: 662, text: "Station", meaning: "İstasyon", category: "daily", type: "word" },
    { id: 663, text: "Stop", meaning: "Durak", category: "daily", type: "word" },
    { id: 664, text: "Route", meaning: "Güzergâh", category: "daily", type: "word" },
    { id: 665, text: "Delay", meaning: "Gecikme", category: "daily", type: "word" },
    { id: 666, text: "Departure", meaning: "Kalkış", category: "daily", type: "word" },
    { id: 667, text: "Arrival", meaning: "Varış", category: "daily", type: "word" },
    { id: 668, text: "Crowded", meaning: "Kalabalık", category: "daily", type: "word" },
    { id: 669, text: "Empty", meaning: "Boş", category: "daily", type: "word" },
    { id: 670, text: "Commute", meaning: "İşe gidiş geliş", category: "daily", type: "word" },
    { id: 671, text: "Home", meaning: "Ev", category: "daily", type: "word" },
    { id: 672, text: "Room", meaning: "Oda", category: "daily", type: "word" },
    { id: 673, text: "Furniture", meaning: "Mobilya", category: "daily", type: "word" },
    { id: 674, text: "Clean", meaning: "Temizlemek", category: "daily", type: "word" },
    { id: 675, text: "Mess", meaning: "Dağınıklık", category: "daily", type: "word" },
    { id: 676, text: "Laundry", meaning: "Çamaşır", category: "daily", type: "word" },
    { id: 677, text: "Wash", meaning: "Yıkamak", category: "daily", type: "word" },
    { id: 678, text: "Dry", meaning: "Kurutmak", category: "daily", type: "word" },
    { id: 679, text: "Iron", meaning: "Ütülemek", category: "daily", type: "word" },
    { id: 680, text: "Vacuum", meaning: "Süpürmek", category: "daily", type: "word" },
    { id: 681, text: "Trash", meaning: "Çöp", category: "daily", type: "word" },
    { id: 682, text: "Bin", meaning: "Çöp kutusu", category: "daily", type: "word" },
    { id: 683, text: "Repair", meaning: "Tamir etmek", category: "daily", type: "word" },
    { id: 684, text: "Fix", meaning: "Onarmak", category: "daily", type: "word" },
    { id: 685, text: "Tool", meaning: "Alet", category: "daily", type: "word" },
    { id: 686, text: "Electricity", meaning: "Elektrik", category: "daily", type: "word" },
    { id: 687, text: "Water bill", meaning: "Su faturası", category: "daily", type: "word" },
    { id: 688, text: "Rent", meaning: "Kira", category: "daily", type: "word" },
    { id: 689, text: "Neighbor", meaning: "Komşu", category: "daily", type: "word" },
    { id: 690, text: "Noise", meaning: "Gürültü", category: "daily", type: "word" },
    { id: 691, text: "Morning", meaning: "Sabah", category: "daily", type: "word" },
    { id: 692, text: "Noon", meaning: "Öğle", category: "daily", type: "word" },
    { id: 693, text: "Evening", meaning: "Akşam", category: "daily", type: "word" },
    { id: 694, text: "Midnight", meaning: "Gece yarısı", category: "daily", type: "word" },
    { id: 695, text: "Weekend", meaning: "Hafta sonu", category: "daily", type: "word" },
    { id: 696, text: "Weekday", meaning: "Hafta içi", category: "daily", type: "word" },
    { id: 697, text: "Holiday", meaning: "Tatil", category: "daily", type: "word" },
    { id: 698, text: "Free time", meaning: "Boş zaman", category: "daily", type: "word" },
    { id: 699, text: "Appointment", meaning: "Randevu", category: "daily", type: "word" },
    { id: 700, text: "Reminder", meaning: "Hatırlatıcı", category: "daily", type: "word" },
    { id: 701, text: "Late", meaning: "Geç", category: "daily", type: "word" },
    { id: 702, text: "Early", meaning: "Erken", category: "daily", type: "word" },
    { id: 703, text: "Busy", meaning: "Meşgul", category: "daily", type: "word" },
    { id: 704, text: "Available", meaning: "Müsait", category: "daily", type: "word" },
    { id: 705, text: "Cancel", meaning: "İptal etmek", category: "daily", type: "word" },
    { id: 706, text: "Reschedule", meaning: "Yeniden planlamak", category: "daily", type: "word" },
    { id: 707, text: "Plan", meaning: "Plan yapmak", category: "daily", type: "word" },
    { id: 708, text: "Decision", meaning: "Karar", category: "daily", type: "word" },
    { id: 709, text: "Option", meaning: "Seçenek", category: "daily", type: "word" },
    { id: 710, text: "Choice", meaning: "Seçim", category: "daily", type: "word" },
    { id: 711, text: "Problem", meaning: "Sorun", category: "daily", type: "word" },
    { id: 712, text: "Solution", meaning: "Çözüm", category: "daily", type: "word" },
    { id: 713, text: "Help", meaning: "Yardım", category: "daily", type: "word" },
    { id: 714, text: "Support", meaning: "Destek", category: "daily", type: "word" },
    { id: 715, text: "Advice", meaning: "Tavsiye", category: "daily", type: "word" },
    { id: 716, text: "Agree", meaning: "Katılmak", category: "daily", type: "word" },
    { id: 717, text: "Disagree", meaning: "Katılmamak", category: "daily", type: "word" },
    { id: 718, text: "Explain", meaning: "Açıklamak", category: "daily", type: "word" },
    { id: 719, text: "Discuss", meaning: "Tartışmak", category: "daily", type: "word" },
    { id: 720, text: "Share", meaning: "Paylaşmak", category: "daily", type: "word" },
    { id: 721, text: "Experience", meaning: "Deneyim", category: "daily", type: "word" },
    { id: 722, text: "Memory", meaning: "Anı/Hafıza", category: "daily", type: "word" },
    { id: 723, text: "Feeling", meaning: "His", category: "daily", type: "word" },
    { id: 724, text: "Mood", meaning: "Ruh hali", category: "daily", type: "word" },
    { id: 725, text: "Stress", meaning: "Stres", category: "daily", type: "word" },
    { id: 726, text: "Relax", meaning: "Rahatlamak", category: "daily", type: "word" },
    { id: 727, text: "Enjoy", meaning: "Keyif almak", category: "daily", type: "word" },
    { id: 728, text: "Comfort", meaning: "Rahatlık", category: "daily", type: "word" },
    { id: 729, text: "Peaceful", meaning: "Huzurlu", category: "daily", type: "word" },
    { id: 730, text: "Tired", meaning: "Yorgun", category: "daily", type: "word" },
    { id: 731, text: "I usually have breakfast at home.", meaning: "Genellikle kahvaltıyı evde yaparım.", category: "daily", type: "sentence" },
    { id: 732, text: "I am hungry, so I want a snack.", meaning: "Açım, bu yüzden bir atıştırmalık istiyorum.", category: "daily", type: "sentence" },
    { id: 733, text: "This food looks delicious.", meaning: "Bu yemek lezzetli görünüyor.", category: "daily", type: "sentence" },
    { id: 734, text: "I prefer coffee in the morning.", meaning: "Sabahları kahveyi tercih ederim.", category: "daily", type: "sentence" },
    { id: 735, text: "I drink water throughout the day.", meaning: "Gün boyunca su içerim.", category: "daily", type: "sentence" },
    { id: 736, text: "We ordered dinner from the menu.", meaning: "Menüden akşam yemeği sipariş ettik.", category: "daily", type: "sentence" },
    { id: 737, text: "The soup is too hot to eat.", meaning: "Çorba yemek için çok sıcak.", category: "daily", type: "sentence" },
    { id: 738, text: "I like spicy food.", meaning: "Acılı yemekleri severim.", category: "daily", type: "sentence" },
    { id: 739, text: "She prepared a simple recipe.", meaning: "Basit bir tarif hazırladı.", category: "daily", type: "sentence" },
    { id: 740, text: "I usually cook dinner at home.", meaning: "Genellikle akşam yemeğini evde yaparım.", category: "daily", type: "sentence" },
    { id: 741, text: "I went to the market after work.", meaning: "İşten sonra markete gittim.", category: "daily", type: "sentence" },
    { id: 742, text: "The price of this product is high.", meaning: "Bu ürünün fiyatı yüksek.", category: "daily", type: "sentence" },
    { id: 743, text: "There is a discount on groceries today.", meaning: "Bugün market ürünlerinde indirim var.", category: "daily", type: "sentence" },
    { id: 744, text: "I paid in cash at the checkout.", meaning: "Kasada nakit ödedim.", category: "daily", type: "sentence" },
    { id: 745, text: "I forgot to take the receipt.", meaning: "Fişi almayı unuttum.", category: "daily", type: "sentence" },
    { id: 746, text: "The shop was very crowded.", meaning: "Dükkan çok kalabalıktı.", category: "daily", type: "sentence" },
    { id: 747, text: "I waited in the queue for ten minutes.", meaning: "Kuyrukta on dakika bekledim.", category: "daily", type: "sentence" },
    { id: 748, text: "This brand is known for quality.", meaning: "Bu marka kalitesiyle bilinir.", category: "daily", type: "sentence" },
    { id: 749, text: "I tried on the jacket before buying it.", meaning: "Ceketi almadan önce denedim.", category: "daily", type: "sentence" },
    { id: 750, text: "The size fits me well.", meaning: "Beden bana iyi uyuyor.", category: "daily", type: "sentence" },
    { id: 751, text: "I usually go to work by bus.", meaning: "Genellikle işe otobüsle giderim.", category: "daily", type: "sentence" },
    { id: 752, text: "The metro is faster than the bus.", meaning: "Metro otobüsten daha hızlıdır.", category: "daily", type: "sentence" },
    { id: 753, text: "The train was delayed this morning.", meaning: "Tren bu sabah gecikti.", category: "daily", type: "sentence" },
    { id: 754, text: "I bought a ticket at the station.", meaning: "İstasyondan bilet aldım.", category: "daily", type: "sentence" },
    { id: 755, text: "Traffic is heavy in the evening.", meaning: "Akşamları trafik yoğundur.", category: "daily", type: "sentence" },
    { id: 756, text: "I arrived home late last night.", meaning: "Dün gece eve geç geldim.", category: "daily", type: "sentence" },
    { id: 757, text: "My commute takes about thirty minutes.", meaning: "İşe gidiş gelişim yaklaşık otuz dakika sürer.", category: "daily", type: "sentence" },
    { id: 758, text: "The bus stop is near my house.", meaning: "Otobüs durağı evime yakın.", category: "daily", type: "sentence" },
    { id: 759, text: "The taxi was expensive.", meaning: "Taksi pahalıydı.", category: "daily", type: "sentence" },
    { id: 760, text: "I checked the route on my phone.", meaning: "Güzergâhı telefondan kontrol ettim.", category: "daily", type: "sentence" },
    { id: 761, text: "I cleaned the room in the morning.", meaning: "Sabah odayı temizledim.", category: "daily", type: "sentence" },
    { id: 762, text: "The house was a mess.", meaning: "Ev çok dağınıktı.", category: "daily", type: "sentence" },
    { id: 763, text: "I did the laundry today.", meaning: "Bugün çamaşır yıkadım.", category: "daily", type: "sentence" },
    { id: 764, text: "I forgot to take out the trash.", meaning: "Çöpü çıkarmayı unuttum.", category: "daily", type: "sentence" },
    { id: 765, text: "I vacuum the floor every weekend.", meaning: "Her hafta sonu yeri süpürürüm.", category: "daily", type: "sentence" },
    { id: 766, text: "Something in the kitchen needs repair.", meaning: "Mutfakta bir şeyin tamir edilmesi gerekiyor.", category: "daily", type: "sentence" },
    { id: 767, text: "I fixed the problem with a tool.", meaning: "Sorunu bir aletle çözdüm.", category: "daily", type: "sentence" },
    { id: 768, text: "The electricity bill is high this month.", meaning: "Bu ay elektrik faturası yüksek.", category: "daily", type: "sentence" },
    { id: 769, text: "I paid the rent yesterday.", meaning: "Kira dün ödendi.", category: "daily", type: "sentence" },
    { id: 770, text: "My neighbor is very friendly.", meaning: "Komşum çok cana yakın.", category: "daily", type: "sentence" },
    { id: 771, text: "It is noisy outside tonight.", meaning: "Bu gece dışarısı gürültülü.", category: "daily", type: "sentence" },
    { id: 772, text: "I usually wake up early on weekdays.", meaning: "Hafta içi genellikle erken uyanırım.", category: "daily", type: "sentence" },
    { id: 773, text: "I like to relax on the weekend.", meaning: "Hafta sonu dinlenmeyi severim.", category: "daily", type: "sentence" },
    { id: 774, text: "I have an appointment tomorrow.", meaning: "Yarın bir randevum var.", category: "daily", type: "sentence" },
    { id: 775, text: "I set a reminder on my phone.", meaning: "Telefonuma hatırlatıcı kurdum.", category: "daily", type: "sentence" },
    { id: 776, text: "I was late because of traffic.", meaning: "Trafik yüzünden geç kaldım.", category: "daily", type: "sentence" },
    { id: 777, text: "I am available in the evening.", meaning: "Akşam müsaitim.", category: "daily", type: "sentence" },
    { id: 778, text: "We canceled the plan.", meaning: "Planı iptal ettik.", category: "daily", type: "sentence" },
    { id: 779, text: "We decided to reschedule the meeting.", meaning: "Toplantıyı yeniden planlamaya karar verdik.", category: "daily", type: "sentence" },
    { id: 780, text: "I need to make a decision.", meaning: "Bir karar vermem gerekiyor.", category: "daily", type: "sentence" },
    { id: 781, text: "This is the best option for me.", meaning: "Bu benim için en iyi seçenek.", category: "daily", type: "sentence" },
    { id: 782, text: "I asked for help.", meaning: "Yardım istedim.", category: "daily", type: "sentence" },
    { id: 783, text: "She gave me good advice.", meaning: "Bana iyi bir tavsiye verdi.", category: "daily", type: "sentence" },
    { id: 784, text: "I agree with your idea.", meaning: "Fikrine katılıyorum.", category: "daily", type: "sentence" },
    { id: 785, text: "They disagreed about the plan.", meaning: "Plan konusunda anlaşamadılar.", category: "daily", type: "sentence" },
    { id: 786, text: "We discussed the problem together.", meaning: "Sorunu birlikte tartıştık.", category: "daily", type: "sentence" },
    { id: 787, text: "I want to share my experience.", meaning: "Deneyimimi paylaşmak istiyorum.", category: "daily", type: "sentence" },
    { id: 788, text: "This memory makes me smile.", meaning: "Bu anı beni gülümsetiyor.", category: "daily", type: "sentence" },
    { id: 789, text: "I am in a good mood today.", meaning: "Bugün iyi bir ruh halindeyim.", category: "daily", type: "sentence" },
    { id: 790, text: "Work stress makes me tired.", meaning: "İş stresi beni yoruyor.", category: "daily", type: "sentence" },
    { id: 791, text: "I try to relax after work.", meaning: "İşten sonra rahatlamaya çalışırım.", category: "daily", type: "sentence" },
    { id: 792, text: "I really enjoyed the conversation.", meaning: "Sohbetten gerçekten keyif aldım.", category: "daily", type: "sentence" },
    { id: 793, text: "The place feels very peaceful.", meaning: "Burası çok huzurlu hissettiriyor.", category: "daily", type: "sentence" },
    { id: 794, text: "I feel tired but happy.", meaning: "Yorgun ama mutluyum.", category: "daily", type: "sentence" },
    { id: 795, text: "We decided to hang out tonight.", meaning: "Bu akşam takılmaya karar verdik.", category: "daily", type: "sentence" },
    { id: 796, text: "I invited my friends for dinner.", meaning: "Arkadaşlarımı akşam yemeğine davet ettim.", category: "daily", type: "sentence" },
    { id: 797, text: "We met up at the café.", meaning: "Kafede buluştuk.", category: "daily", type: "sentence" },
    { id: 798, text: "I sent a message but got no reply.", meaning: "Mesaj attım ama cevap gelmedi.", category: "daily", type: "sentence" },
    { id: 799, text: "We laughed at the joke.", meaning: "Şakaya güldük.", category: "daily", type: "sentence" },
    { id: 800, text: "I explained the situation clearly.", meaning: "Durumu net bir şekilde açıkladım.", category: "daily", type: "sentence" },
    { id: 801, text: "I am sure everything will be fine.", meaning: "Her şeyin yoluna gireceğinden eminim.", category: "daily", type: "sentence" },
    { id: 802, text: "Of course, I can help you.", meaning: "Tabii ki sana yardım edebilirim.", category: "daily", type: "sentence" },
    { id: 803, text: "No problem, take your time.", meaning: "Sorun değil, acele etme.", category: "daily", type: "sentence" },
    { id: 804, text: "Take care and see you soon.", meaning: "Kendine iyi bak, yakında görüşürüz.", category: "daily", type: "sentence" },
    { id: 805, text: "I need some free time today.", meaning: "Bugün biraz boş zamana ihtiyacım var.", category: "daily", type: "sentence" },
    { id: 806, text: "I will go to the gym after work.", meaning: "İşten sonra spor salonuna gideceğim.", category: "daily", type: "sentence" },
    { id: 807, text: "The workout was very tiring.", meaning: "Antrenman çok yorucuydu.", category: "daily", type: "sentence" },
    { id: 808, text: "I usually exercise on weekdays.", meaning: "Genellikle hafta içi spor yaparım.", category: "daily", type: "sentence" },
    { id: 809, text: "I enjoy walking in the evening.", meaning: "Akşam yürüyüş yapmaktan keyif alırım.", category: "daily", type: "sentence" },
    { id: 810, text: "I try to keep a healthy routine.", meaning: "Sağlıklı bir rutin sürdürmeye çalışırım.", category: "daily", type: "sentence" },
    { id: 811, text: "I felt better after a short rest.", meaning: "Kısa bir dinlenmeden sonra daha iyi hissettim.", category: "daily", type: "sentence" },
    { id: 812, text: "I need to plan my day.", meaning: "Günümü planlamam gerekiyor.", category: "daily", type: "sentence" },
    { id: 813, text: "I made a simple choice.", meaning: "Basit bir seçim yaptım.", category: "daily", type: "sentence" },
    { id: 814, text: "I shared the bill with my friend.", meaning: "Hesabı arkadaşımla paylaştım.", category: "daily", type: "sentence" },
    { id: 815, text: "The service was very good.", meaning: "Hizmet çok iyiydi.", category: "daily", type: "sentence" },
    { id: 816, text: "I left a small tip.", meaning: "Küçük bir bahşiş bıraktım.", category: "daily", type: "sentence" },
    { id: 817, text: "The café was quiet and comfortable.", meaning: "Kafe sessiz ve rahattı.", category: "daily", type: "sentence" },
    { id: 818, text: "I ordered a sandwich and tea.", meaning: "Bir sandviç ve çay sipariş ettim.", category: "daily", type: "sentence" },
    { id: 819, text: "The dessert was very sweet.", meaning: "Tatlı çok şekerliydi.", category: "daily", type: "sentence" },
    { id: 820, text: "I ate ice cream after dinner.", meaning: "Akşam yemeğinden sonra dondurma yedim.", category: "daily", type: "sentence" },
    { id: 821, text: "I enjoy chatting with friends.", meaning: "Arkadaşlarla sohbet etmeyi severim.", category: "daily", type: "sentence" },
    { id: 822, text: "The conversation lasted for hours.", meaning: "Sohbet saatlerce sürdü.", category: "daily", type: "sentence" },
    { id: 823, text: "We talked about many topics.", meaning: "Birçok konu hakkında konuştuk.", category: "daily", type: "sentence" },
    { id: 824, text: "I laughed a lot last night.", meaning: "Dün gece çok güldüm.", category: "daily", type: "sentence" },
    { id: 825, text: "I felt relaxed after the chat.", meaning: "Sohbetten sonra rahatladım.", category: "daily", type: "sentence" },
    { id: 826, text: "I usually say goodbye politely.", meaning: "Genellikle kibarca vedalaşırım.", category: "daily", type: "sentence" },
    { id: 827, text: "I told them to take care.", meaning: "Onlara kendinize iyi bakın dedim.", category: "daily", type: "sentence" },
    { id: 828, text: "I will see you tomorrow.", meaning: "Yarın görüşürüz.", category: "daily", type: "sentence" },
    { id: 829, text: "I was too tired to go out.", meaning: "Dışarı çıkamayacak kadar yorgundum.", category: "daily", type: "sentence" },
    { id: 830, text: "I went to bed early.", meaning: "Erken yattım.", category: "daily", type: "sentence" }

];

document.addEventListener('DOMContentLoaded', () => {
    // Tema ve Hata Sayısı Yükleme
    if(localStorage.getItem('synapse-theme') === 'dark') {
        document.body.classList.add('dark-theme');
        updateThemeButton(true);
    }
    updateMistakeCount();
    refreshUI();
    updateDateTime();
    setFunRecommendations();
    setInterval(updateDateTime, 60000);
});

// --- SMART QUIZ LOGIC ---

function startQuiz() {
    // Arayüzü Quiz Moduna Hazırla
    document.getElementById('contentGrid').style.display = 'none';
    document.querySelector('.top-bar').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('quizSelection').style.display = 'block';
    document.getElementById('quizActiveArea').style.display = 'none';
    document.getElementById('quizProgress').innerText = "Select Mode";
    updateMistakeCount();
}

function prepareQuiz(mode) {
    let pool = [];
    const mistakes = JSON.parse(localStorage.getItem('synapse-mistakes') || '[]');

    if (mode === 'mistakes') {
        pool = synapseDatabase.filter(item => mistakes.includes(item.id));
        if (pool.length === 0) {
            alert("No mistakes recorded yet! Great job!");
            return;
        }
    } else if (mode === 'word' || mode === 'sentence') {
        pool = synapseDatabase.filter(item => item.type === mode);
    } else {
        pool = [...synapseDatabase];
    }

    // Soruları karıştır ve 10 tane seç (Eğer havuz 10'dan azsa hepsini al)
    quizData = pool.sort(() => 0.5 - Math.random()).slice(0, 10);
    currentQuizPool = pool; // Şık üretmek için havuzu sakla
    
    document.getElementById('quizSelection').style.display = 'none';
    document.getElementById('quizActiveArea').style.display = 'block';
    
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        showQuizResult();
        return;
    }

    const currentItem = quizData[currentQuestionIndex];
    document.getElementById('quizProgress').innerText = `Question ${currentQuestionIndex + 1}/${quizData.length}`;
    document.getElementById('quizQuestion').innerText = currentItem.text;

    // Şık üretme: 1 Doğru + 3 Yanlış (Aynı türden)
    let sameTypeItems = synapseDatabase.filter(i => i.type === currentItem.type);
    let options = [currentItem.meaning];
    
    while (options.length < 4 && sameTypeItems.length >= 4) {
        let randomItem = sameTypeItems[Math.floor(Math.random() * sameTypeItems.length)];
        if (!options.includes(randomItem.meaning)) {
            options.push(randomItem.meaning);
        }
    }
    options.sort(() => 0.5 - Math.random());

    const optionsGrid = document.getElementById('quizOptions');
    optionsGrid.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(btn, opt, currentItem);
        optionsGrid.appendChild(btn);
    });
}

function checkAnswer(btn, selected, item) {
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(b => b.disabled = true);

    if (selected === item.meaning) {
        btn.classList.add('correct');
        score++;
        // Eğer hata modundaysak ve doğru bildiysek listeden çıkar
        handleMistakeRemoval(item.id);
    } else {
        btn.classList.add('wrong');
        allButtons.forEach(b => {
            if (b.innerText === item.meaning) b.classList.add('correct');
        });
        // Yanlış bildiğimizde listeye ekle
        saveMistake(item.id);
    }

    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 1600);
}

function saveMistake(id) {
    let mistakes = JSON.parse(localStorage.getItem('synapse-mistakes') || '[]');
    if (!mistakes.includes(id)) {
        mistakes.push(id);
        localStorage.setItem('synapse-mistakes', JSON.stringify(mistakes));
    }
    updateMistakeCount();
}

function handleMistakeRemoval(id) {
    // Sadece "Hatalar" modunda çözüyorsak ve doğru bildiysek hatayı sileriz
    let mistakes = JSON.parse(localStorage.getItem('synapse-mistakes') || '[]');
    const index = mistakes.indexOf(id);
    if (index > -1) {
        mistakes.splice(index, 1);
        localStorage.setItem('synapse-mistakes', JSON.stringify(mistakes));
    }
    updateMistakeCount();
}

function updateMistakeCount() {
    const mistakes = JSON.parse(localStorage.getItem('synapse-mistakes') || '[]');
    const countEl = document.getElementById('mistakeCount');
    if (countEl) countEl.innerText = mistakes.length;
}

function showQuizResult() {
    const activeArea = document.getElementById('quizActiveArea');
    activeArea.innerHTML = `
        <div style="text-align:center; padding: 20px;">
            <i class="fas fa-chart-line" style="font-size: 4rem; color: var(--primary); margin-bottom: 20px;"></i>
            <h2>Practice Done!</h2>
            <p style="font-size: 1.5rem;">Score: <strong>${score} / ${quizData.length}</strong></p>
            <div style="margin-top: 25px; display:flex; gap:10px; justify-content:center;">
                <button onclick="startQuiz()" class="select-btn" style="width:auto;">New Session</button>
                <button onclick="exitQuiz()" class="exit-btn" style="margin:0;">Main Page</button>
            </div>
        </div>
    `;
}

function exitQuiz() {
    location.reload(); 
}

// --- CORE UI & SYSTEM FUNCTIONS ---

function refreshUI() {
    const grid = document.getElementById('contentGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    let filtered = synapseDatabase;
    if (currentTab === 'tech-word') filtered = synapseDatabase.filter(i => i.category === 'technical' && i.type === 'word');
    else if (currentTab === 'tech-sentence') filtered = synapseDatabase.filter(i => i.category === 'technical' && i.type === 'sentence');
    else if (currentTab === 'daily-word') filtered = synapseDatabase.filter(i => i.category === 'daily' && i.type === 'word');
    else if (currentTab === 'daily-sentence') filtered = synapseDatabase.filter(i => i.category === 'daily' && i.type === 'sentence');

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = `item-card ${item.category}`;
        card.innerHTML = `
            <small style="font-weight:700; color:var(--primary);">${item.category.toUpperCase()} ${item.type.toUpperCase()}</small>
            <h3 style="margin: 10px 0;">${item.text}</h3>
            <p>${item.meaning}</p>
        `;
        grid.appendChild(card);
    });
    updateStats();
}

function switchTab(tab) {
    currentTab = tab;
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('contentGrid').style.display = 'grid';
    document.querySelector('.top-bar').style.display = 'flex';
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${tab}`).classList.add('active');
    if(window.innerWidth <= 768) document.getElementById('sidebar').classList.remove('active');
    refreshUI();
}

function searchItems() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('.item-card').forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(q) ? 'block' : 'none';
    });
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('synapse-theme', isDark ? 'dark' : 'light');
    updateThemeButton(isDark);
}

function updateThemeButton(isDark) {
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.innerHTML = isDark ? '<i class="fas fa-sun"></i> <span>Light Mode</span>' : '<i class="fas fa-moon"></i> <span>Dark Mode</span>';
}

function updateStats() {
    const total = synapseDatabase.length;
    const tech = synapseDatabase.filter(i => i.category === 'technical').length;
    const daily = synapseDatabase.filter(i => i.category === 'daily').length;
    document.getElementById('stats-total').innerText = `Total Entries: ${total}`;
    document.getElementById('stats-tech').innerText = `Tech: ${tech}`;
    document.getElementById('stats-daily').innerText = `Daily: ${daily}`;
}

function updateDateTime() {
    const now = new Date();
    document.getElementById('current-date').innerText = now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById('current-time').innerText = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function setFunRecommendations() {
  const musics = [
  "Interstellar Main Theme",
  "Hans Zimmer - Time",
  "Hans Zimmer - Cornfield Chase",
  "Hans Zimmer - Mountains",
  "Hans Zimmer - No Time for Caution",
  "Daft Punk - Contact",
  "Daft Punk - Derezzed",
  "Daft Punk - Solar Sailer",
  "Pink Floyd - Learning to Fly",
  "Pink Floyd - Time",
  "Pink Floyd - High Hopes",
  "Pink Floyd - Shine On You Crazy Diamond",
  "M83 - Outro",
  "M83 - Midnight City",
  "Ludovico Einaudi - Experience",
  "Ludovico Einaudi - Nuvole Bianche",
  "Max Richter - On The Nature of Daylight",
  "Max Richter - November",
  "Vangelis - Conquest of Paradise",
  "Vangelis - Blade Runner Blues",
  "Clint Mansell - Lux Aeterna",
  "Clint Mansell - Death Is the Road to Awe",
  "John Murphy - Adagio in D Minor",
  "Ramin Djawadi - Light of the Seven",
  "Ramin Djawadi - Westworld Main Theme",
  "Howard Shore - The Breaking of the Fellowship",
  "Ólafur Arnalds - Near Light",
  "Ólafur Arnalds - Saman",
  "Nils Frahm - Says",
  "Nils Frahm - My Friend the Forest",
  "Explosions in the Sky - Your Hand in Mine",
  "Explosions in the Sky - First Breath After Coma",
  "Trent Reznor & Atticus Ross - Hand Covers Bruise",
  "Trent Reznor & Atticus Ross - In Motion",
  "Jóhann Jóhannsson - Flight from the City",
  "Jóhann Jóhannsson - The Theory of Everything",
  "Hania Rani - F Major",
  "A Winged Victory for the Sullen - Steep Hills of Vicodin Tears",
  "Brian Eno - An Ending (Ascent)",
  "Brian Eno - Apollo: Atmospheres",
  "The Cinematic Orchestra - Arrival of the Birds",
  "The Cinematic Orchestra - To Build a Home",
  "Boards of Canada - Dayvan Cowboy",
  "Boards of Canada - Reach for the Dead",
  "Tycho - Awake",
  "Tycho - Horizon",
  "Dead Can Dance - The Host of Seraphim",
  "Two Steps From Hell - Heart of Courage",
  "Audiomachine - Blood and Stone"
];

const movies = [
  "Interstellar",
  "Inception",
  "The Imitation Game",
  "A Beautiful Mind",
  "The Theory of Everything",
  "Oppenheimer",
  "Arrival",
  "Ex Machina",
  "Blade Runner 2049",
  "The Martian",
  "Good Will Hunting",
  "The Social Network",
  "Her",
  "Gattaca",
  "Minority Report",
  "Matrix",
  "Matrix Reloaded",
  "Matrix Revolutions",
  "Tenet",
  "Moon",
  "Contact",
  "Gravity",
  "2001: A Space Odyssey",
  "Dune",
  "Dune Part Two",
  "Edge of Tomorrow",
  "District 9",
  "Elysium",
  "Chappie",
  "Source Code",
  "Predestination",
  "The Prestige",
  "Shutter Island",
  "Fight Club",
  "Se7en",
  "Whiplash",
  "Black Swan",
  "Ford v Ferrari",
  "Moneyball",
  "The Big Short",
  "Snowden",
  "Dark Waters",
  "The Founder",
  "Jobs",
  "Steve Jobs",
  "Apollo 13",
  "First Man",
  "October Sky",
  "Hidden Figures",
  "A.I. Artificial Intelligence"
];

    document.getElementById('daily-music').innerText = musics[Math.floor(Math.random() * musics.length)];
    document.getElementById('daily-movie').innerText = movies[Math.floor(Math.random() * movies.length)];
}

window.onscroll = function() {
    const btn = document.getElementById("backToTop");
    if (window.scrollY > 300) btn.style.display = "block";
    else btn.style.display = "none";
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}