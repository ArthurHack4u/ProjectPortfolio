// Espera a que el botón sea presionado
document.getElementById('calcularBtn').addEventListener('click', function() {

    // 1. OBTENER TODOS LOS VALORES DE LOS INPUTS Y CONVERTIRLOS A NÚMEROS
    const costoRollo = parseFloat(document.getElementById('costoRollo').value);
    const pesoRollo = parseFloat(document.getElementById('pesoRollo').value);
    const gramosPieza = parseFloat(document.getElementById('gramosPieza').value);
    const tiempoImpresion = parseFloat(document.getElementById('tiempoImpresion').value);
    const consumoImpresora = parseFloat(document.getElementById('consumoImpresora').value);
    const costoKwh = parseFloat(document.getElementById('costoKwh').value);
    const manoDeObraPorcentaje = parseFloat(document.getElementById('manoDeObra').value);
    const tasaFalloPorcentaje = parseFloat(document.getElementById('tasaFallo').value);
    const gananciaPorcentaje = parseFloat(document.getElementById('ganancia').value);
    
    // Validar que todos los campos estén llenos
    if (isNaN(costoRollo) || isNaN(gramosPieza) || isNaN(tiempoImpresion)) {
        alert("Por favor, llena todos los campos principales (costo, gramos y tiempo).");
        return;
    }

    // 2. REALIZAR LOS CÁLCULOS
    
    // Costo de Material
    const costoPorGramo = costoRollo / pesoRollo;
    const costoMaterial = gramosPieza * costoPorGramo;

    // Costo de Electricidad
    const consumoEnKw = consumoImpresora / 1000;
    const kwhConsumidos = consumoEnKw * tiempoImpresion;
    const costoElectricidad = kwhConsumidos * costoKwh;

    // Costo de Producción (Subtotal antes de ajustes)
    const costoProduccion = costoMaterial + costoElectricidad;
    const costoManoDeObra = costoProduccion * (manoDeObraPorcentaje / 100);
    const subtotal = costoProduccion + costoManoDeObra;
    
    // Subtotal Ajustado por Tasa de Fallo
    const subtotalAjustado = subtotal * (1 + (tasaFalloPorcentaje / 100));

    // Precio Final con Ganancia
    const montoGanancia = subtotalAjustado * (gananciaPorcentaje / 100);
    const precioFinal = subtotalAjustado + montoGanancia;

    // 3. MOSTRAR LOS RESULTADOS EN EL PANEL DERECHO
    const panelResultados = document.getElementById('resumen');
    
    panelResultados.innerHTML = `
        <p>Costo de Material: <strong>$${costoMaterial.toFixed(2)} MXN</strong></p>
        <p>Costo de Electricidad: <strong>$${costoElectricidad.toFixed(2)} MXN</strong></p>
        <p>Costo de Mano de Obra: <strong>$${costoManoDeObra.toFixed(2)} MXN</strong></p>
        <p>Subtotal de Producción: <strong>$${subtotal.toFixed(2)} MXN</strong></p>
        <p>Ajuste por Fallos (${tasaFalloPorcentaje}%): <strong>+ $${(subtotalAjustado - subtotal).toFixed(2)} MXN</strong></p>
        <hr>
        <p><strong>Costo Total Real: $${subtotalAjustado.toFixed(2)} MXN</strong></p>
        <p>Ganancia (${gananciaPorcentaje}%): <strong>+ $${montoGanancia.toFixed(2)} MXN</strong></p>
        
        <div class="precio-final">
            Precio Sugerido: $${precioFinal.toFixed(2)} MXN
        </div>
    `;
});