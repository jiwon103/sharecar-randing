/* ==========================================
   ShareCar Admin CMS
========================================== */

let cars = [];

let editingId = null;

const table = document.getElementById("carTable");

const totalCount = document.getElementById("totalCount");
const saleCount = document.getElementById("saleCount");
const reserveCount = document.getElementById("reserveCount");
const soldCount = document.getElementById("soldCount");

const drawer = document.getElementById("carDrawer");

const addBtn = document.getElementById("addCarBtn");

const closeBtn = document.getElementById("closeDrawer");

const searchInput = document.getElementById("searchInput");

async function loadCars(){

        cars = await getCars();

    console.log(cars);

    drawTable(cars);

    updateSummary();

}

function updateSummary(){

    totalCount.textContent = cars.length;

    saleCount.textContent =
    cars.filter(car=>car.status=="판매중").length;

    reserveCount.textContent =
    cars.filter(car=>car.status=="예약중").length;

    soldCount.textContent =
    cars.filter(car=>car.status=="판매완료").length;

}

function drawTable(list = cars){

    table.innerHTML = "";

    list.forEach(car=>{

        table.innerHTML += `

        <tr data-id="${car.id}">

            <td>

                <img src="${car.imageurl}">

            </td>

            <td>${car.model}</td>

            <td>${car.type}</td>

            <td>${car.year}</td>

            <td>${car.color}</td>

            <td>${car.mileage}</td>

            <td>${Number(car.price).toLocaleString()}원</td>

            <td>

                <span class="${badge(car.status)}">

                    ${car.status}

                </span>

            </td>

            <td>

                <div class="action">

                    <button
                        class="edit-btn"
                        data-id="${car.id}">

                        수정

                    </button>

                    <button
                        class="delete-btn"
                        data-id="${car.id}">

                        삭제

                    </button>

                </div>

            </td>

        </tr>

        `;

    });

}

function badge(status){

    switch(status){

        case "판매중":

            return "status sale";

        case "예약중":

            return "status reserve";

        case "판매완료":

            return "status sold";

        default:

            return "status";

    }

}

loadCars();

/* ==========================================
   Drawer
========================================== */

function openDrawer(){

    drawer.classList.add("open");

}

function closeDrawer(){

    drawer.classList.remove("open");

}

addBtn.addEventListener("click",openDrawer);

closeBtn.addEventListener("click",closeDrawer);

/* ==========================================
   차량 등록
========================================== */

const form=document.getElementById("carForm");

form.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const car={

    model:document.getElementById("model").value,

    type:document.getElementById("type").value,

    year:document.getElementById("year").value,

    color:document.getElementById("color").value,

    fuel:document.getElementById("fuel").value,

    mileage:document.getElementById("mileage").value,

    price:document.getElementById("price").value,

    imageurl:document.getElementById("imageurl").value,

    status:document.getElementById("status").value

    };

let result;

if (editingId) {

    car.id = editingId;

    result = await updateCar(car);

} else {

    result = await addCar(car);

}
///////////////////////////////

    if(result.success){

        alert("등록 완료");

        closeDrawer();

        editingId = null;

        form.reset();

        loadCars();

    }else{

        alert("등록 실패");

    }

});


// const form = document.getElementById("carForm");

// form.addEventListener("submit",async function(e){

//     e.preventDefault();

//     const car={

//         model:document.getElementById("model").value,

//         type:document.getElementById("type").value,

//         year:document.getElementById("year").value,

//         color:document.getElementById("color").value,

//         fuel:document.getElementById("fuel").value,

//         mileage:document.getElementById("mileage").value,

//         price:document.getElementById("price").value,

//         imageurl:document.getElementById("imageurl").value,

//         status:document.getElementById("status").value

//     };

//     try{

//         await addCar(car);

//         alert("차량이 등록되었습니다.");

//         form.reset();

//         closeDrawer();

//         await loadCars();

//     }catch(error){

//         console.error(error);

//         alert("등록 실패");

//     }

// });

/* ==========================================
   검색
========================================== */

searchInput.addEventListener("input",function(){

    const keyword=this.value.toLowerCase();

    const result=cars.filter(car=>{

        return car.model.toLowerCase().includes(keyword);

    });

    drawTable(result);

});

/* ==========================================
자동 새로고침
========================================== */

setInterval(loadCars,30000);

document.addEventListener("click", function (e) {

    if (!e.target.classList.contains("edit-btn")) return;

    const id = e.target.dataset.id;

    const car = cars.find(c => String(c.id) === String(id));

    if (!car) return;

    editingId = id;

    document.getElementById("model").value = car.model;
    document.getElementById("type").value = car.type;
    document.getElementById("year").value = car.year;
    document.getElementById("color").value = car.color;
    document.getElementById("fuel").value = car.fuel;
    document.getElementById("mileage").value = car.mileage;
    document.getElementById("price").value = car.price;
    document.getElementById("imageurl").value = car.imageurl;
    document.getElementById("status").value = car.status;

    openDrawer();

});

/* ==========================================
   차량 삭제
========================================== */

document.addEventListener("click", async function (e) {

    if (!e.target.classList.contains("delete-btn")) return;

    const id = e.target.dataset.id;

    const ok = confirm("정말 삭제하시겠습니까?");

    if (!ok) return;

    try {

        const result = await deleteCar(id);

        if (result.success) {

            alert("삭제되었습니다.");

            await loadCars();

        } else {

            alert("삭제 실패");

        }

    } catch (error) {

        console.error(error);

        alert("삭제 중 오류가 발생했습니다.");

    }

});