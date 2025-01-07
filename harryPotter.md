**Harry Potter API (HP API)**, Harry Potter evrenindeki karakterler, evler, büyüler ve diğer bilgiler hakkında JSON formatında veri sağlayan ücretsiz bir API'dir. Bu API, Harry Potter temalı uygulamalar geliştirmek veya programlama pratiği yapmak için kullanılabilir.

---

### **API'ye Genel Bakış**
- **Base URL:**  
  `https://hp-api.onrender.com/`

- **Endpointler:**
  1. **Karakterler (Characters)**  
     - URL: `/api/characters`  
     - Açıklama: Harry Potter evrenindeki tüm karakterleri döner.
  2. **Ev Karakterleri (House Characters)**  
     - URL: `/api/characters/house/{house}`  
     - Açıklama: Belirli bir evin (örneğin Gryffindor, Slytherin) üyelerini döner.
     - Örnek: `/api/characters/house/gryffindor`
  3. **Personel (Staff)**  
     - URL: `/api/characters/staff`  
     - Açıklama: Hogwarts personelini döner.
  4. **Öğrenciler (Students)**  
     - URL: `/api/characters/students`  
     - Açıklama: Hogwarts öğrencilerini döner.

---

### **API Kullanımı**
#### 1. Tüm Karakterleri Çekmek:
```javascript
fetch('https://hp-api.onrender.com/api/characters')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('API Hatası:', error));
```

#### 2. Gryffindor Karakterlerini Çekmek:
```javascript
fetch('https://hp-api.onrender.com/api/characters/house/gryffindor')
  .then(response => response.json())
  .then(data => console.log('Gryffindor:', data))
  .catch(error => console.error('API Hatası:', error));
```

#### 3. Hogwarts Öğrencilerini Listelemek:
```javascript
fetch('https://hp-api.onrender.com/api/characters/students')
  .then(response => response.json())
  .then(data => console.log('Hogwarts Öğrencileri:', data))
  .catch(error => console.error('API Hatası:', error));
```

---

### **Örnek API Yanıtı (JSON Formatı)**
Bir karakter isteğinin örnek yanıtı şu şekilde olabilir:
```json
[
  {
    "name": "Harry Potter",
    "house": "Gryffindor",
    "ancestry": "half-blood",
    "patronus": "stag",
    "actor": "Daniel Radcliffe",
    "image": "https://hp-api.onrender.com/images/harry.jpg"
  },
  {
    "name": "Hermione Granger",
    "house": "Gryffindor",
    "ancestry": "muggle-born",
    "patronus": "otter",
    "actor": "Emma Watson",
    "image": "https://hp-api.onrender.com/images/hermione.jpeg"
  }
]
```

- **`name`**: Karakterin adı  
- **`house`**: Karakterin ait olduğu ev  
- **`ancestry`**: Soy durumu (örneğin, half-blood, muggle-born)  
- **`patronus`**: Karakterin patronusu  
- **`actor`**: Karakteri canlandıran oyuncu  
- **`image`**: Karakterin resmi

---

### **API'nin Avantajları**
- Ücretsizdir ve kullanımı kolaydır.
- Eğitim ve uygulamalar için idealdir.
- JSON formatında temiz ve düzenli veri sunar.

### **Önemli Notlar**
1. API'nın sunucusu ücretsiz olduğundan, yoğun kullanımda bazen yavaş yanıt verebilir.
2. API'den dönen verileri önbelleğe almak, uygulamanızın performansını artırabilir.

Herhangi bir konuda daha fazla detay istersen, örneklerle destekleyebilirim! 😊