'use strict';

function addContact(name, mobile) {
    var home = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '없음';
    var address = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '없음';
    var email = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '없음';

    var str = 'name=' + name + ', mobile=' + mobile + ', home=' + home + ', address=' + address + ', email=' + email;
    console.log(str);
}

addContact('홍길동', '010-222-3331');
addContact('홍길동', '010-222-3331', '02-3422-9000', '서울시');