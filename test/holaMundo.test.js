const { remote } = require('webdriverio');

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

beforeAll(async () => {
    driver = await remote(wdOpts);
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

describe("Verificando conexión", () => {
    it("Seleccionar un elmento", async () => {
        const titulo = await driver.$('~Título: Calculadora de IMC');
        expect(await titulo.isDisplayed()).toBe(true);
    });

    it("Calcular peso con valores validos", async () => {
        const entradaPeso = await driver.$('~Entrada de Peso en kilogramos');
        const entradaAltura = await driver.$('android=new UiSelector().resourceId("height_input")');
        const botonCalcular = await driver.$('//android.view.ViewGroup[@content-desc="Botón para calcular el IMC"]');

        expect(await botonCalcular.isDisplayed()).toBe(true);

        await entradaPeso.setValue('83');
        await entradaAltura.setValue('180');
        await botonCalcular.click();

        const bmiResult = await driver.$('//android.widget.TextView[@content-desc="Resultado del IMC: 25.62"]');
        const bmiCategory = await driver.$('//android.widget.TextView[@content-desc="Categoría del IMC: Sobrepeso"]');
        console.log(bmiResult);
        expect(await bmiResult.isDisplayed()).toBe(true);
        expect(await bmiCategory.isDisplayed()).toBe(true);
    });
});