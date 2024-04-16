function boldTitle(id) {
    var search = document.getElementById('search');
    var booking = document.getElementById('booking');
    var myrecord = document.getElementById('myrecord');

    var target = document.getElementById(id)

    search.style.fontWeight = '';
    booking.style.fontWeight = '';
    myrecord.style.fontWeight = '';

    target.style.fontWeight = "bold";
}