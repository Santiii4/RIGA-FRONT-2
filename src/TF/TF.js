import * as tf from '@tensorflow/tfjs';
const LONGITUD_ALFABETO = 26;
const LONGITUD_MUESTRA = 1;
const LONGITUD_MAXIMA_PALABRA = 10;
let modelo;
// const tf = require('@tensorflow/tfjs');
let etiquetas_predichas;
export async function configurar() {
    modelo = await crear_modelo(LONGITUD_MAXIMA_PALABRA, LONGITUD_ALFABETO);

    modelo = await cargarModeloDesdeArchivo();

    document.getElementById('entrada-texto').addEventListener('keyup', async () => {
        const patron = new RegExp('^[a-z]{1,' + LONGITUD_MAXIMA_PALABRA + '}$');
        let características_predichas = [];
        características_predichas.push(document.getElementById('entrada-texto').value);
        if (características_predichas[0].length < LONGITUD_MUESTRA + 1 || !patron.test(características_predichas[0])) {
            document.getElementById('etiquetas_predichas').style.display = 'none';
            document.getElementById('etiquetas_predichas').innerHTML = '';
            return;
        }
        características_predichas = preprocesamiento_etapa_2(características_predichas, LONGITUD_MAXIMA_PALABRA);
        características_predichas = preprocesamiento_etapa_5(características_predichas, LONGITUD_MAXIMA_PALABRA, LONGITUD_ALFABETO);
        etiquetas_predichas = await modelo.predict(características_predichas);
        etiquetas_predichas = postprocesamiento_etapa_1(etiquetas_predichas)
        etiquetas_predichas = postprocesamiento_etapa_2(etiquetas_predichas, LONGITUD_MAXIMA_PALABRA);
        etiquetas_predichas = etiquetas_predichas.join("");
        document.getElementById('etiquetas_predichas').style.display = 'block';
        document.getElementById('etiquetas_predichas').innerHTML = etiquetas_predichas;
    });

    document.getElementById('etiquetas_predichas').addEventListener('click', () => {
        document.getElementById('entrada-texto').value = document.getElementById('etiquetas_predichas').innerHTML;

        document.getElementById('etiquetas_predichas').style.display = 'none';
    });
}
function preprocesamiento_etapa_2(palabras,longitud_maxima){
    let palabras_enteros = [];
    for (let i in palabras){
        palabras_enteros.push(palabra_a_entero(palabras[i],longitud_maxima))
    }
    return palabras_enteros;
}
function preprocesamiento_etapa_5(palabras, longitud_maxima, longitud_alfabeto) {
    return tf.oneHot(tf.tensor2d(palabras, [palabras.length, longitud_maxima], 'int32'), longitud_alfabeto);
}
function postprocesamiento_etapa_1(palabras){
    return palabras.argMax(-1).arraySync();
}
function postprocesamiento_etapa_2(palabras, longitud_maxima){
    let resultados = [];
    for (let i in palabras){
        resultados.push(entero_a_palabra(palabras[i], longitud_maxima));
    }
    return resultados;
}
function palabra_a_entero (palabra, longitud_maxima){
    let codificar = [];
    for (let i = 0; i < longitud_maxima; i++) {
        if(i<palabra.length){
        let letra = palabra.slice(i, i+1);
        codificar.push(letra.charCodeAt(0)-96);
        }else{
        codificar.push(0)
        }
    }
    return codificar;
}
function entero_a_palabra (palabra, longitud_maxima){
    let decodificar = []
    for (let i = 0; i < longitud_maxima; i++) {
        if(palabra[i]===0){
            decodificar.push("");
        }else{
            decodificar.push(String.fromCharCode(palabra[i]+96))
        }
        
    }
    return decodificar;
}
async function crear_modelo(longitud_maxima,longitud_alfabeto){
    var modelo = tf.sequential();
    await modelo.add(tf.layers.lstm({
        units:longitud_alfabeto*2,
        inputShape:[longitud_maxima,longitud_alfabeto],
        dropout:0.2,
        recurrentDropout:0.2,
        useBias: true,
        returnSequences:true,
        activation:"relu"
    }))
    await modelo.add(tf.layers.timeDistributed({
        layer: tf.layers.dense({
        units: longitud_alfabeto,
        dropout:0.2,
        activation:"softmax"
        })
    }));
    modelo.summary();
    return modelo
}

async function cargarModeloDesdeArchivo() {
    try {
        const modeloUrl = 'http://127.0.0.1:3000/a.json'

        return await tf.loadLayersModel(tf.io.browserHTTPRequest(modeloUrl));
    } catch (error) {
        console.error('Error cargando el modelo:', error);
        throw error;
    }
}

