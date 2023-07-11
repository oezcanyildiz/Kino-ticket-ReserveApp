const container = document.querySelector(".container");
const count = document.querySelector("#count");
const amount = document.querySelector("#amount");
const select = document.getElementById("movie");
const seats=document.querySelectorAll(".seat:not(.reserved)");

getFromLocalStorage();
calculateTotal();

container.addEventListener("click", function (e) {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("reserved")) {
        e.target.classList.toggle("selected");
        calculateTotal();
        // let selectedSeatCount=container.querySelectorAll(".seat.selected").length;
        // let price=select.value;
        // count.innerText= selectedSeatCount;
        // amount.innerText=selectedSeatCount*price;
        // fonsiyonu cok lu yazmak yerine ayri bir fonksiyon olarak yazip kullaniyoruz function calculateTotal()
    
    }
});
select.addEventListener("change", function (e) {
    calculateTotal();
});

function calculateTotal() {
    const selectedSeats=container.querySelectorAll(".seat.selected");
    console.log(seats);

    const selectedSeatsArr=[];
    const seatsArr=[];

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat);
    })

    //spread methode

    seats.forEach(function(seat){
        seatsArr.push(seat);
    })
    let selectedSeatIndexs=selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    })

    console.log(selectedSeatIndexs);

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;
    saveToLocalStorage(selectedSeatIndexs);
}
function getFromLocalStorage(){
    const selectSeats =JSON.parse(localStorage.getItem("selectedSeats"));
    if(selectSeats!=null && selectSeats.length>0){
        seats.forEach(function(seat,index){
            if(selectSeats.indexOf(index)>-1)
            seat.classList.add("selected");
        })
    }
    const selectedMovieIndex= JSON.parse(localStorage.getItem("selectedMovieIndex"));
    if (selectedMovieIndex !=null){
        select.selectedMovieIndex=selectedMovieIndex;
    }
}
function saveToLocalStorage(indexs){
    localStorage.setItem("selectedSeats",JSON.stringify(indexs));
    localStorage.setItem("selectedMovieIndex",select.selectedIndex);
}