/**
 * Step Definitons are the glue code which drive
 * the feature scenarios, Cucumber helps us provide
 * gherkin language syntax's - Given, When, Then
 */

const {Given, When, Then} = require('cucumber');
const sleep = require('system-sleep');
import {expect} from 'chai';
process.stdout.write("Ждём  загрузки данных 9 секунд: ");
//console.log('Ждём  загрузки данных 9 секунд');
for (let y = 0; y < 9; y++) {
    process.stdout.write((y+1)+" ");
    sleep(1000);
}
process.stdout.write("\n");

Given(/^Главная страница$/, () => {
    const el = browser.element('//span[contains(text(), "Вход")]');
    expect(el.value).to.not.equal(null);
});

Given(/^Страница Уведомления$/, () => {
    const el = browser.element('//div[contains(text(), "Уведомления")]');
    expect(el.value).to.not.equal(null);
});

When(/^Нажимаем кнопку "(.*?)"$/, (txt: string) => {
    const el = browser.element('//span[contains(text(), "' + txt + '")]');
    el.click();
});

Then(/^Мы видим адрес$/, () => {
    const el = browser.element('//ion-label[contains(text(), "Адрес")]');
    return expect(el.value).to.not.equal(null);
});

Then(/^Вводим "(.*?)" "(.*?)"$/, (field: string, txt: string) => {
    let el: any = browser.element('//ion-label[contains(text(), "' + field + '")]');
    el = el.elements('../*').value[1];
    el = el.elements('./*').value[0];
    while (el.getAttribute('value') !== txt) {
        if (!el.getAttribute('value')) console.log(el.getAttribute('value'));
        el.clearElement();
        el.setValue(txt);
    }
    expect(el.getAttribute('value')).equal(txt);
});

Then(/^Вводим имя пользователя "(.*?)"$/, (txt: string) => {
    let el: any = browser.element('//ion-input[@name="username"]');
    el = el.elements('./*').value[0];
    while (el.getAttribute('value') !== txt) {
        if (!!(el.getAttribute('value'))) console.log("'"+el.getAttribute('value')+"'");
        el.clearElement();
        el.setValue(txt);
    }
    expect(el.getAttribute('value')).equal(txt);
});

Then(/^Вводим пароль "(.*?)"$/, (txt: string) => {
    let el: any = browser.element('//ion-input[@name="password"]');
    el = el.elements('./*').value[0];
    while (el.getAttribute('value') !== txt) {
        if (!!el.getAttribute('value')) console.log("'"+el.getAttribute('value')+"'");
        el.clearElement();
        el.setValue(txt);
    }
    expect(el.getAttribute('value')).equal(txt);
});

When(/^Ждем загрузку данных до "(.*?)" секунд$/, (time: number) => {
    process.stdout.write("Ждем загрузку данных до "+time+" секунд: ");
    for (let y = 0; y < time; y++) {
        //console.log(y);
        process.stdout.write((y+1)+" ");
        const el: any = browser.element('//h3[contains(text(),"Загрузка данных завершена")]');
        if (el.value != null) { break; }
        sleep(1000);
    }
    process.stdout.write("\n");
});

Then(/^Ждем "(.*?)" сек$/, (time: number) => {
    process.stdout.write("Ждем "+time+" секунд: ");
    let i=1;
    if (time<1) i=time;
    for (let y = 0; y < time; y++) {
        process.stdout.write((y+1)+" ");
        sleep(i*1000);
    }
    process.stdout.write("\n");
});

Then(/^Прокликиваем уведомления$/, () => {
    /*const len = browser.elements('//ion-card').value.length;
    const arr = browser.elements('//ion-card').value;
    for (let y = 0; y < len; y++) {
        let el = browser.elementIdElement(arr[y].ELEMENT,'.*');
        console.log(el);
        el = el.element('//ion-card-header');
        el.click();
    }*/
    let el = browser.element('//ion-card-header');//[contains(text(),"Получено новое задание")]
    while ( el.value != null) {
        el.click();
        //console.log(el);
        el = browser.element('//ion-card-header');//[contains(text(),"Получено новое задание")]
    }
});

Then(/^Кликаем "(.*?)"-е уведомление, если есть$/, (order: number) => {
    let el = browser.element('//ion-card-header['+order+']');//[contains(text(),"Получено новое задание")]
    if( el.value != null) {
        el.click();
    }
});

When(/^Нажимаем, если есть, кнопку "(.*?)"$/, (txt: string) => {
    try {
        const el = browser.element('//span[contains(text(), "' + txt + '")]');
        if (el.value != null) {
            el.click()/*.catch(function(){
            console.log("Нажать кнопку '"+txt+"' не удалось");
        })*/;
        }
    }catch (e) {
        console.log("Не удалось нажать кнопку '"+txt+"'");
    }
});

When(/^Нажимаем меню$/, () => {
    const el = browser.element('//ion-icon[@name="menu"]/../..');
    el.click();
});

Then(/^Мы видим меню$/, () => {
    const el = browser.element('//ion-icon[@name="person"]');
    expect(el.isVisible).to.not.equal(true);
});

When(/^Заходим в аккаунт$/, () => {
    const el = browser.element('//ion-icon[@name="person"]');
    el.click();
});

Then(/^Мы видим аккаунт$/, () => {
    const el = browser.element('//div[contains(@class, "toolbar-title") and contains(text(), "Информация о пользователе")]');
    expect(el.isVisible).to.not.equal(true);

});

When(/^Заходим в "(.*?)"$/, (txt:string) => {
    const el = browser.element('//ion-label[contains(text(), "' + txt + '")]/..');
    el.click();
});

When(/^Выходим из "(.*?)"$/, (txt:string) => {
    const el = browser.element('//div[contains(@class, "toolbar-title") and contains(text(),"'+txt+'")]/../../../button[contains(@class, "back-button")]');
    el.click();
});

When(/^Заходим в историю заданий$/, () => {
    const el = browser.element('//ion-icon[@name="archive"]/../..');
    el.click();
});

When(/^Открываем инфо "(.*?)"-го задания в статусе "(.*?)"$/, (order: number,status: string) => {
    if(status=="В работе")status="checklist_bg_in_progress";
    if(status=="Новое")status="checklist_bg_new";
    if(status=="Выполнено")status="checklist_bg_complete";
    if(status=="Закрыто")status="checklist_bg_closed";
    const el = browser.element('//ion-card-header[contains(@class, "'+status+'")]['+order+']//ion-icon[@name="ios-arrow-down"]');
    el.click();
});

When(/^Закрываем инфо "(.*?)"-го задания в статусе "(.*?)"$/, (order: number,status: string) => {
    if(status=="В работе")status="checklist_bg_in_progress";
    if(status=="Новое")status="checklist_bg_new";
    if(status=="Выполнено")status="checklist_bg_complete";
    if(status=="Закрыто")status="checklist_bg_closed";
    const el = browser.element('//ion-card-header[contains(@class, "'+status+'")]['+order+']//ion-icon[@name="ios-arrow-up"]');
    el.click();
});

When(/^Проваливаемся в "(.*?)"-е задание в статусе "(.*?)"$/, (order: number,status: string) => {
    if(status=="В работе")status="checklist_bg_in_progress";
    if(status=="Новое")status="checklist_bg_new";
    if(status=="Выполнено")status="checklist_bg_complete";
    if(status=="Закрыто")status="checklist_bg_closed";
    const el = browser.element('//ion-card-header[contains(@class, "'+status+'")]['+order+']/*/*/*');
    el.click();
});

When(/^Нажимаем назад$/, () => {
    const el = browser.element('//ion-icon[@name="paper"]/../../../../button[1]');
    el.click();
});

Then(/^Проваливаемся "(.*?)"-й лист задания$/, (order: number) => {
    //order++;
    let el = browser.element('//checklists-list//checklist-card//ion-card-header['+order+']/..');//[contains(text(),"Получено новое задание")]
    //if( el.value != null) {
        el.click();
    //}
});

Then(/^Заходим во вложения "(.*?)"-ой записи со скрепкой$/, (order: number) => {
    let el = browser.element('//ion-icon[@name="attach"]['+order+']/..');//[contains(text(),"Получено новое задание")]
    //if( el.value != null) {
    el.click();
    //}
});

Then(/^Выбираем внизу "(.*?)"$/, (name: string) => {
    if(name=="Дефект")name="sad";
    if(name=="Выход")name="exit";
    if(name=="Загрузить")name="cloud-download";
    if(name=="Выгрузить")name="cloud-upload";
    let el = browser.element('//ion-icon[@name="'+name+'"]/../..');
    el.click();
    //}
});

Then(/^Заполняем поле "(.*?)" значением "(.*?)"$/, (field: string, value: string) => {
    let el = browser.element('//textarea[@placeholder="'+field+'"]');
    while (el.getAttribute('value') !== value) {
        if (!(el.getAttribute('value').trim())) console.log(el.getAttribute('value'));
        el.clearElement();
        el.setValue(value);
    }
    expect(el.getAttribute('value')).equal(value);
});

Then(/^Ждем команды$/, () => {
    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('What do you think of Node.js? ', (answer) => {
        // TODO: Log the answer in a database
        console.log(`Thank you for your valuable feedback: ${answer}`);

        rl.close();
    });
});




