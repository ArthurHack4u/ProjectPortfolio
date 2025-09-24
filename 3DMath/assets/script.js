// Espera a que el botón sea presionado
document.getElementById('calcularBtn').addEventListener('click', function() {

    // 1. OBTENER VALORES DE LOS INPUTS
    // Datos de la pieza
    const gramosPieza = parseFloat(document.getElementById('gramosPieza').value);
    const tiempoImpresion = parseFloat(document.getElementById('tiempoImpresion').value);
    const horasTrabajoActivo = parseFloat(document.getElementById('horasTrabajoActivo').value);
    
    // Costos y Tarifas
    const costoRollo = parseFloat(document.getElementById('costoRollo').value);
    const pesoRollo = parseFloat(document.getElementById('pesoRollo').value);
    const costoKwh = parseFloat(document.getElementById('costoKwh').value);
    const tarifaTrabajo = parseFloat(document.getElementById('tarifaTrabajo').value);
    const costoAmortizacion = parseFloat(document.getElementById('costoAmortizacion').value);
    const cargoFijo = parseFloat(document.getElementById('cargoFijo').value);

    // Márgenes de Negocio
    const consumoImpresora = parseFloat(document.getElementById('consumoImpresora').value);
    const tasaFalloPorcentaje = parseFloat(document.getElementById('tasaFallo').value);
    const gananciaPorcentaje = parseFloat(document.getElementById('ganancia').value);
    
    // Validar campos principales
    if (isNaN(gramosPieza) || isNaN(tiempoImpresion) || isNaN(costoRollo) || isNaN(tarifaTrabajo)) {
        alert("Por favor, llena todos los campos de costos y datos de la pieza.");
        return;
    }

    // 2. REALIZAR LOS CÁLCULOS CON EL MODELO DE NEGOCIO MEJORADO
    
    // Costos directos de la impresión
    const costoMaterial = (costoRollo / pesoRollo) * gramosPieza;
    const costoElectricidad = (consumoImpresora / 1000) * tiempoImpresion * costoKwh;

    // Costos operativos y de tiempo
    const costoManoDeObra = horasTrabajoActivo * tarifaTrabajo;
    const costoDesgaste = tiempoImpresion * costoAmortizacion;
    
    // Subtotal base sumando todos los costos
    const costoBaseProduccion = costoMaterial + costoElectricidad + costoManoDeObra + costoDesgaste + cargoFijo;
    
    // Aplicar márgenes de negocio
    const ajustePorFallos = costoBaseProduccion * (tasaFalloPorcentaje / 100);
    const costoTotalReal = costoBaseProduccion + ajustePorFallos;
    const montoGanancia = costoTotalReal * (gananciaPorcentaje / 100);
    const precioFinal = costoTotalReal + montoGanancia;

    // 3. MOSTRAR LOS RESULTADOS DETALLADOS
    const panelResultados = document.getElementById('resumen');
    
    panelResultados.innerHTML = `
        <p>Costo de Material: <span><strong>$${costoMaterial.toFixed(2)} MXN</strong></span></p>
        <p>Costo de Electricidad: <span><strong>$${costoElectricidad.toFixed(2)} MXN</strong></span></p>
        <p>Mano de Obra Activa: <span><strong>$${costoManoDeObra.toFixed(2)} MXN</strong></span></p>
        <p>Desgaste de Impresora: <span><strong>$${costoDesgaste.toFixed(2)} MXN</strong></span></p>
        <p>Cargo Fijo: <span><strong>$${cargoFijo.toFixed(2)} MXN</strong></span></p>
        <p style="color: #0056b3;"><strong>Costo Base de Producción:</strong> <span><strong>$${costoBaseProduccion.toFixed(2)} MXN</strong></span></p>
        <p>Ajuste por Fallos (${tasaFalloPorcentaje}%): <span><strong>+ $${ajustePorFallos.toFixed(2)} MXN</strong></span></p>
        <hr>
        <p><strong>Costo Total Real:</strong> <span><strong>$${costoTotalReal.toFixed(2)} MXN</strong></span></p>
        <p>Ganancia (${gananciaPorcentaje}%): <span><strong>+ $${montoGanancia.toFixed(2)} MXN</strong></span></p>
        
        <div class="precio-final">
            Precio Sugerido: $${precioFinal.toFixed(2)} MXN
        </div>
    `;
});