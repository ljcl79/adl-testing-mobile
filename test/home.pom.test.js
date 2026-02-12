const { remote } = require('webdriverio');
const HomePage = require('./pom/homePage');


const capabilities = {
    'platformName': 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',
    'appium:app': '/Users/leonardo/proyectos/ADL/Talleres/Tester Engineer/Tema 6/CalculadoraIMC.apk', // ¡Usa tu ruta absoluta aquí!
    'appium:appPackage': 'com.calculadoraimc', // Reemplaza con el package de tu app
    'appium:appActivity': '.MainActivity', // Reemplaza con la activity principal de tu app
}

const wdOpts = {
    hostname: '127.0.0.1',
    port: 4723,
    logLevel: 'info',
    capabilities
}

let driver;
let objHomePage;

beforeAll(async () => {
    driver = await remote(wdOpts);
    objHomePage = new HomePage(driver);
});

afterAll(async () => {
    if (driver) {
        await driver.deleteSession();
    }
});

beforeEach(() => {

});

afterEach(() => {

});

describe("Validando calculos", () => {

    it('Cálculo con valores válidos', async () => {

        await objHomePage.calcularIMC('83', '180');
        expect(await objHomePage.obtenerTextoResultado()).toBe('25.62');
        expect(await objHomePage.obtenerTextoCategoria()).toBe('Sobrepeso');

    });

    /*
    it('Cálculo con valores no válidos', async () => {

        await objHomePage.calcularIMC('WW', '180');

        const bmiResult = await driver.$('//android.widget.TextView[@content-desc="Resultado del IMC: 25.62"]');
        const bmiCategory = await driver.$('//android.widget.TextView[@content-desc="Categoría del IMC: Sobrepeso"]');

        expect(await bmiResult.isDisplayed()).toBe(true);
        expect(await bmiCategory.isDisplayed()).toBe(true);

    });

    it('Cálculo con valores vacíos', async () => {

        await objHomePage.calcularIMC('', '');

        const bmiResult = await driver.$('//android.widget.TextView[@content-desc="Resultado del IMC: 25.62"]');
        const bmiCategory = await driver.$('//android.widget.TextView[@content-desc="Categoría del IMC: Sobrepeso"]');

        expect(await bmiResult.isDisplayed()).toBe(true);
        expect(await bmiCategory.isDisplayed()).toBe(true);
    });
    */
});