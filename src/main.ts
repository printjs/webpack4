// import "./resources/1.css";
require("./resources/1.css");

export class Test {
    constructor() {
        console.log("1111");
    }
}


// if (module.hot) {
//     module.hot.accept();
// }
console.log(new Test());
