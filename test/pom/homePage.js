class HomePage {

    constructor(driver) {
        this.driver = driver;
    }

    elements = {
        inputPeso: '~Entrada de Peso en kilogramos',
        inputAltura: 'android=new UiSelector().resourceId("height_input")',
        botonCalcular: '//android.view.ViewGroup[@content-desc="Botón para calcular el IMC"]',
        textoResultado: 'android=new UiSelector().resourceId("bmi_result_value")',
        textoCategoria: 'android=new UiSelector().resourceId("bmi_category_text")',
        tituloAlert: 'android=new UiSelector().resourceId("com.calculadoraimc:id/alert_title")',
        mensajeAlert: '//android.widget.TextView[@resource-id="android:id/message"]',
        botonOk: '//android.widget.Button[@resource-id="android:id/button1"]'
    }

    async llenarPeso(valorPeso) {
        const input = await this.driver.$(this.elements.inputPeso);
        await input.setValue(valorPeso);
    }

    async llenarAltura(valorAltura) {
        const input = await this.driver.$(this.elements.inputAltura);
        await input.setValue(valorAltura);
    }

    async clickBoton() {
        await this.driver.$(this.elements.botonCalcular).click();
    }

    async obtenerTextoResultado() {
        return await this.driver.$(this.elements.textoResultado).getText();
    }

    async obtenerTextoCategoria() {
        return await this.driver.$(this.elements.textoCategoria).getText();
    }

    async calcularIMC(valorPeso, valorAltura) {
        await this.llenarPeso(valorPeso);
        await this.llenarAltura(valorAltura);
        await this.clickBoton();
    }
}

module.exports = HomePage;