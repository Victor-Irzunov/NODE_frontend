// Node JS - Быстрый Курс за 1 час (Все Включено!)  Владилен Минин


//++path
// const path = require('path')
// console.log('название файла', path.basename(__filename))
// console.log('имя директория', path.dirname(__filename))
// console.log('расширение файла', path.extname(__filename))
// console.log('универсал метод Parse:', path.parse(__filename))
// console.log(path.join(__dirname, 'server', 'index.html'))

//++fs
//* File system
// const fs = require('fs')
// const { Buffer } = require('buffer')

// fs.mkdir(path.join(__dirname, 'test1'), (err) => {
// 	if (err) {
// 		throw err
// 	}
// 	console.log('папка создана')
// })
//--------------------------------------------------------------------
// const filePath = path.join(__dirname, 'test1', 'text.txt')
// fs.writeFile(filePath, 'hello hi-hi', err => {
// 	if (err) {
// 		throw err
// 	}
// 	console.log('файл создан')
// })
//-----------------
//*writeFile - может пирретирать уже существ файлы
// fs.writeFile(filePath, 'hello hi-hi', err => {              
// 	if (err) {
// 		throw err
// 	}
// 	console.log('файл создан')

// 	fs.writeFile(filePath, '\n hello ho-ho-ho', err => {              
// 		if (err) {
// 			throw err
// 		}
// 		console.log('файл создан')
// 	})

// })
//--------------------
//*appendFile -добавить 
// fs.writeFile(filePath, 'hello hi-hi', err => {              
// 	if (err) {
// 		throw err
// 	}
// 	console.log('файл создан')

// 	fs.appendFile(filePath, '\n hello ho-ho-ho', err => {              
// 		if (err) {
// 			throw err
// 		}
// 		console.log('файл создан')
// 	})
// })
//---------------------
//*readFile - 
// fs.readFile(filePath, (err, content) => {              
// 		if (err) {
// 			throw err
// 	}
// 	const data = Buffer.from(content)
// 		console.log('content:', data.toString())
// 	})
//? и более удобный спрособ
// fs.readFile(filePath, 'utf-8',(err, content) => {              
// 	if (err) {
// 		throw err
// }
// console.log(content)
// })
//++os
// const os = require('os')

// console.log('оперец систем', os.platform())
// console.log('процессор', os.arch())
// console.log('инфа по процессорам', os.cpus())   //писать более оптимизированное приложение 
// console.log('память', os.freemem())
// console.log('всего памяти', os.totalmem())
// console.log('домашняя директория', os.homedir())
// console.log('время включен:', os.uptime())
// console.log('систем контан', os.constants)
// console.log('операц систем', os.hostname)
// console.log('os.type()')
// console.log('инф о пользователе', userInfo)

//++events
//* События бывают:
//? Readable Streams
//1) data
//2) end
//3) error
//4) close
//5) readable
//? Writable Streams
//6) drain
//7) finish
//8) error
//9) close
//10) pipe/unpipe
//----------------------------------------------------------------------------------------
// const EventEmitter = require('events')

// const emitter = new EventEmitter()

// emitter.on = ('anything', data => {
// 	console.log('ON: anything', data)
// })
// emitter.emit('anything', {a:1})
// emitter.emit('anything', { b: 2 })
//------------class
// class Dispatcher extends EventEmitter{
// 	subscribe(eventName, cb) {
// 		console.log('[Sub...]')
// 		this.on(eventName, cb)
// 	}
// 	dispatch(eventName, data) {
// 		console.log(('[Dis]'))
// 		this.emit(eventName, data)
// 	}
// }
// const dis = new Dispatcher()
// dis.subscribe('aa', data => {
// 	console.log('ON: aa', data)
// })

// dis.dispatch('aa', {aa:2})
//-------------------------------------------------server(простой на)EventEmitter()
//https://www.youtube.com/watch?v=qZ5xzkEdkhg   Фронтенд


// делаем условный сервер используя EventEmitter
const server = new EventEmitter()
server.on('request', () => console.log('New Request'))

//где-то в коде
server.emit('request')
server.emit('request')

//++ модульная система CommonJS
// const circle = require('./circle.js')
// console.log('The area is ${circle.area(4)}')

// //? Circle.js содержит:
// const { PI } = Math
// exports.area = r => PI * r ** 2
// exports.circumference = r => 2 * PI * r

// //-- экспорт по другому
// module.exports = class Square {
// 	constructor(width) {
// 		this.width = width
// 	}
// 	area() {
// 		return this.width ** 2
// 	}
// }
// // Используем в новом модуле
// const Square = require('./square.js')
// const mySquare(2)

//++ Стрим - это обстракция с помощью которой можно обработывать данные небоьшими частями
const fs = require('fs')
const server = require('http').createServer()

server.on(('request'), (req, res) => {                                 //.on читаем событие request
	const src = fs.createReadStream('./big.file')                       //вот этот файл я хочу читать не полностьью а по частям
	src.pipe(res)                                                       //каждую часть ты по тиху отдовай в response
})

server.listen(8000)
//----------------------------------------------------------------------------------------
//**стримы бывают:
//Readable - стрим из которого данные могут быть прочитаны(текстовый файл, ввод склавиатуры)
//Writable - в который данные могутбыть записаны
//Duplex - в который данные могут быть записаныи могут быть прочитанными
//Transform - который трансформирует данные при чтении и записи

//++  Дочерние процессы:

//? можно содать спомщью ф-ций:
// spawn -создает новый процесс - возвращает обьект, ключи - stdio Streams
// execFile - буферизирет стримы и отдает на выход обычную строку
// exec - создает bash и исполняет строку с комндой
// fork - создает дочерний процесс вместе с каналом длясвязи
//https://medium.com/the-guild/getting-to-know-nodes-child-process-module-8ed63038f3fa

//---spawn
const { spawn } = require('child_process')           //кор мод

spawn('git', ['log']).stdout.pipe(process.stdout)     //'git' путь до испл файла  //['log'] массив аргументов которые будут переданны исполн файлу

//* возвращает обьект нового процесса, у которго есть в свою очередь св-ва:
//stdin(WriteStream)
//stdout(DuplexStream)  //stdout всё что выводиться в консоль из процеса
//stderr(ReadStream)
//----execFile
// (если кол - во данных не большое можно испл)
const { execFile } = require('child_process')

execFile('git', ['log'], (err, out) => {
	if (err) {
		console.error(err)
	}
	else {
		console.log(out)
	}
})
//----exec
// позволяет записать команду для исполнения в строку и выпольнить ее. Тоже буферизирует вывод. Под капотом просто испольует execFile
const { exec } = require('child_process')

// Выведетвсе комиты, содержащие Merge
exec('git log --format="%s" | grep foo', (err, out) => {
	if (err) {
		console.error(err)
	}
	else {
		console.log(out)
	}
})
//----fork()
// создает канал для общения родительского и дочерненго процесов
/* Parent process script */

//===============главный скрипт
const { fork } = require('child_process');
const n = fork(`${__dirname}/child.js`);

n.on('message', (m) => {
	console.log('PARENT got message:', m);
});

// Causes the child to print: CHILD got message: { hello: 'world' }
n.send({ hello: 'world' });

//====================================================================второй скрипт  (в разных файлах находятся)
/* Child process script - child.js */

process.on('message', (m) => {
	console.log('CHILD got message:', m);
});

// Causes the parent to print: PARENT got message: { foo: 'bar', baz: null }
process.send({ foo: 'bar', baz: NaN });

//++ Неблокирующий/Блокирующий ввод/вывод
//? Блокирующий ввод.вывод 
// в Node лучше не делать никогда лучше исп Промисы
const fs = require(' fs')

try {
	const data = fs.readFileSync('./file.md')            //.readFileSync можно если пишем простой скрипт
	console.log(data)
}
catch (err) {
	console.log(err.message)
}
//.readFileSync останавливает дальше код не пойдет

//? Не блокирущий ввод/вывод
const fs = require('fs')
let data = null
fs.readFile('./file.md', (err, fileData) => {
	if (err) throw err
	data = fileData
	console.log(data)
})
console.log(data)
//ошибу обрабатываем в коллбэке

//++ Event Loop
//цикл событий это конструкция которая занимается управлением событиями
//надо вспомнить когда сервер тормозит


