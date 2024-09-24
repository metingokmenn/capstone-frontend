document.addEventListener("DOMContentLoaded", function() {
    var cells = document.querySelectorAll(".accuracy-cell"); // Accuracy değerlerinin bulunduğu hücreleri seç

    cells.forEach(function(cell) { // Her hücreyi kontrol et
        var accuracy = parseFloat(cell.textContent.replace("%", "").trim()); // Accuracy değerini al ve % işaretini kaldır
        if (accuracy < 50) {
            cell.classList.add("text-danger"); // %50'den küçükse kırmızı class'ını ekle
        } else if (accuracy >= 50 && accuracy < 75) {
            cell.classList.add("text-warning"); // %50 ile %75 arasındaysa sarı class'ını ekle
        } else {
            cell.classList.add("text-success"); // %75 ve üzeriyse yeşil class'ını ekle
        }
    });
});