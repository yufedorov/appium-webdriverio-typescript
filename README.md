Перед началом работы, должно быть предустановлено node, npm, adb, JAVA_HOME, ANDROID_HOME
Дополнительно можно установить Android Emulator
Можно проверить готовность среды разработки с помощью утилиты appium-doctor:
npm install -g appium-doctor
appium-doctor --android

Развертка теста
1. Устанавливаем и запускаем appium
npm install -g appium
appium
2. Устанавливаем необходимые модули в проекте
npm install

PS: может возникнуть ошибка npm ERR! cb() never called!

тогда нужно выполнить npm i -g npm semver , и тогда ошибка уйдёт

3. В папке app помещаем не верифицированный apk для дебага
4. В папку chromedriver помещаем необходимую версию дров, в соответствии с версией браузера на телефоне 
3. Настраиваем /chromedriver/map.json
4. Запускаем тест: npm test
5. После выполнения можем выполнить npm run report , чтобы посмотреть сформированные результаты теста

Основные файлы:

/config/wdio.mb.config.js - хранит настройки запускаемого теста

/features/mb.feature - файл хранит сценарий тестирования

/stepDefinitions/mbSteps.ts - файл хранит исполняемый код команд

Разбор файла wdio.mb.config.js

capabilities: [
{
appiumVersion: '1.8.1', // версия вашего appium
browserName: '', // можно оставить пустым
platformName: 'Android',
app: 'C:\\Users\\yufedorov\\Documents\\Projects\\Mobile\\BitBucket\\appium-webdriverio-typescript\\app\\app-debug.apk', // заменить путь до apk
appPackage: 'ru.borlas.mobilemonitor.phosagro', // должно быть заполнено для node
//platformVersion: '5.1.1', // Android platform version of the device
deviceName: 'YSLFY9VSEMTOLZQW', // имя вашего девайса
autoWebview: true, // перенаправляет на WebView 
chromedriverExecutableDir:'C:\\Users\\yufedorov\\Documents\\Projects\\Mobile\\BitBucket\\appium-webdriverio-typescript\\chromedriver', // папка с дровами
chromedriverChromeMappingFile:'C:\\Users\\yufedorov\\Documents\\Projects\\Mobile\\BitBucket\\appium-webdriverio-typescript\\chromedriver\\map.json', //файл мапинга
waitforTimeout: waitforTimeout,
commandTimeout: commandTimeout,
newCommandTimeout: 30 * 60000,
autoGrantPermissions: true, // автоматически даёт разрешения приложению
noReset: false, // должно быть false для autoGrantPermissions : true
}
],