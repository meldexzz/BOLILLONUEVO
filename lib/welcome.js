import { DOMImplementation, XMLSerializer } from 'xmldom';
import JsBarcode from 'jsbarcode';
import { JSDOM } from 'jsdom';  
import { readFileSync } from 'fs';
import { join } from 'path';
import { spawn } from 'child_process';

const src = join(__dirname, '..', 'src');
const _svg = readFileSync(join(src, 'welcome.svg'), 'utf-8');

const barcode = data => {
    const xmlSerializer = new XMLSerializer();
    const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
    const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    JsBarcode(svgNode, data, { xmlDocument: document });

    return xmlSerializer.serializeToString(svgNode);
}

const imageSetter = (img, value) => img.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', value);
const textSetter = (el, value) => el.textContent = value;

let { document: svg } = new JSDOM(_svg).window;

// Verifica que svg se cargue correctamente
if (!svg) {
    console.error("Error al cargar el SVG");
    process.exit(1);
}

/**
 * Genera el SVG de bienvenida
 * @param {object} param0
 * @param {string} param0.wid
 * @param {string} param0.pp
 * @param {string} param0.name
 * @param {string} param0.text
 * @param {string} param0.background
 * @returns {string}
 */
const genSVG = async ({ wid = '', pp = join(src, 'avatar_contact.png'), title = '', name = '', text = '', background = '' }) => {
    let el = {
        code: ['#_1661899539392 > g:nth-child(6) > image', imageSetter, toBase64(await toImg(barcode(wid.replace(/[^0-9]/g, '')), 'png'), 'image/png')],
        pp: ['#_1661899539392 > g:nth-child(3) > image', imageSetter, pp],
        text: ['#_1661899539392 > text.fil1.fnt0', textSetter, text],
        title: ['#_1661899539392 > text.fil2.fnt1', textSetter, title],
        name: ['#_1661899539392 > text.fil2.fnt2', textSetter, name],
        bg: ['#_1661899539392 > g:nth-child(2) > image', imageSetter, background],
    };

    for (let [selector, set, value] of Object.values(el)) {
        const element = svg.querySelector(selector);
        if (element) {
            set(element, value);
        } else {
            console.error(`Error: El selector ${selector} no encontró un elemento.`);
        }
    }

    return svg.body.innerHTML;
}

/**
 * Convierte SVG a imagen
 * @param {string} svg
 * @param {string} format
 * @returns {Promise<Buffer>}
 */
const toImg = (svg, format = 'png') => new Promise((resolve, reject) => {
    if (!svg) return resolve(Buffer.alloc(0));

    let bufs = [];
    let im = spawn('magick', ['convert', 'svg:-', `${format}:-`]);

    im.on('error', e => {
        console.error("Error al ejecutar ImageMagick", e);
        reject(e);
    });

    im.stdout.on('data', chunk => bufs.push(chunk));
    im.stdin.write(Buffer.from(svg));
    im.stdin.end();

    im.on('close', code => {
        if (code !== 0) {
            console.error("Error al convertir la imagen, código:", code);
            reject(code);
        }
        resolve(Buffer.concat(bufs));
    });
});

/**
 * Convierte un buffer a base64
 * @param {Buffer} buffer
 * @param {string} mime
 * @returns {string}
 */
const toBase64 = (buffer, mime) => `data:${mime};base64,${buffer.toString('base64')}`;

/**
 * Renderiza el SVG de bienvenida
 * @param {object} param0
 * @param {string} param0.wid
 * @param {string} param0.pp
 * @param {string} param0.name
 * @param {string} param0.text
 * @param {string} param0.background
 * @returns {Promise<Buffer>}
 */
const render = async ({
    wid = '',
    pp = toBase64(readFileSync(join(src, 'avatar_contact.png')), 'image/png'),
    name = '',
    title = '',
    text = '',
    background = toBase64(readFileSync(join(src, 'Aesthetic', 'Aesthetic_000.jpeg')), 'image/jpeg'),
} = {}, format = 'png') => {
    let svg = await genSVG({
        wid, pp, name, text, background, title
    });
    return await toImg(svg, format);
}

// Si se ejecuta directamente
if (require.main === module) {
    render({
        wid: '1234567890',
        name: 'John Doe',
        text: 'Lorem ipsum\ndot sit color',
        title: 'grup testing'
    }, 'jpg').then(result => {
        process.stdout.write(result);
    }).catch(err => {
        console.error("Error al generar la imagen:", err);
    });
} else {
    module.exports = render;
}
