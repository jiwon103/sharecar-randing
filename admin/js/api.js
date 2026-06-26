const API_URL = "https://script.google.com/macros/s/AKfycbykIWE_B3pt_Sb-sfAZPzttcm90bdjo9I1vDzPTJhQxLbgKQT_oyhtmh0tOvVS6S5r3pg/exec";

async function getCars(){

    const response = await fetch(API_URL);

    if(!response.ok){
        throw new Error("API Error");
    }

    return await response.json();

}
async function addCar(car){

    const response=await fetch(API_URL,{

        method:"POST",

        body:JSON.stringify({

            action:"add",

            ...car

        })

    });

    return await response.json();

}
async function updateCar(car){

    const response = await fetch(API_URL,{

        method:"POST",

        body:JSON.stringify({

            action:"update",

            ...car

        })

    });

    return await response.json();

}

async function deleteCar(id){

    const response = await fetch(API_URL,{

        method:"POST",

        body:JSON.stringify({

            action:"delete",

            id

        })

    });

    return await response.json();

}

// // Google Apps Script Web App URL
// const API_URL = "https://script.google.com/macros/s/AKfycbykIWE_B3pt_Sb-sfAZPzttcm90bdjo9I1vDzPTJhQxLbgKQT_oyhtmh0tOvVS6S5r3pg/exec";

// /* 차량 목록 가져오기 */
// async function getCars() {

//     const response = await fetch(API_URL);

//     const data = await response.json();

//     return data;

// }

// /* 로그인 */
// async function login(id, password) {

//     const response = await fetch(API_URL, {

//         method: "POST",

//         body: JSON.stringify({

//             action: "login",

//             id,

//             password

//         })

//     });

//     return await response.json();

// }

// /* 차량 등록 */
// async function addCar(car) {

//     const response = await fetch(API_URL, {

//         method: "POST",

//         body: JSON.stringify({

//             action: "add",

//             ...car

//         })

//     });

//     return await response.json();

// }